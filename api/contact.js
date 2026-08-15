import { Resend } from 'resend';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');

    return response.status(405).json({
      error: 'Method not allowed.',
    });
  }

  try {
    const { name, email, message, company } = request.body || {};

    // Honeypot: pretend the message succeeded when filled by a bot.
    if (company) {
      return response.status(200).json({
        success: true,
      });
    }

    const cleanName = String(name || '').trim();
    const cleanEmail = String(email || '').trim().toLowerCase();
    const cleanMessage = String(message || '').trim();

    if (!cleanName || !cleanEmail || !cleanMessage) {
      return response.status(400).json({
        error: 'Please complete all fields.',
      });
    }

    if (cleanName.length > 100) {
      return response.status(400).json({
        error: 'The name is too long.',
      });
    }

    if (
      cleanEmail.length > 254 ||
      !EMAIL_PATTERN.test(cleanEmail)
    ) {
      return response.status(400).json({
        error: 'Please enter a valid email address.',
      });
    }

    if (
      cleanMessage.length < 10 ||
      cleanMessage.length > 3000
    ) {
      return response.status(400).json({
        error: 'The message must contain between 10 and 3,000 characters.',
      });
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is missing.');

      return response.status(500).json({
        error: 'The email service is not configured.',
      });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const subjectName = cleanName
      .replace(/[\r\n]+/g, ' ')
      .slice(0, 100);

    const { data, error } = await resend.emails.send({
     from: 'Osama Portfolio <contact@send.osamakahsay.dev>',
      to: ['ousamnur@gmail.com'],
      replyTo: cleanEmail,
      subject: `Portfolio message from ${subjectName}`,
      text: [
        `Name: ${cleanName}`,
        `Email: ${cleanEmail}`,
        '',
        'Message:',
        cleanMessage,
      ].join('\n'),
    });

    if (error) {
      console.error('Resend error:', error);

      return response.status(502).json({
        error: 'The email provider could not send the message.',
      });
    }

    return response.status(200).json({
      success: true,
      id: data?.id,
    });
  } catch (error) {
    console.error('Contact endpoint error:', error);

    return response.status(500).json({
      error: 'An unexpected error occurred.',
    });
  }
}