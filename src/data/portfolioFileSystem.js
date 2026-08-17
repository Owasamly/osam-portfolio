const textFile = (name, content, extras = {}) => ({
  name,
  type: 'file',
  ext: name.endsWith('.json') ? 'JSON Document' : 'Text Document',
  icon: name.endsWith('.json') ? 'code' : 'text',
  color: name.endsWith('.json') ? 'text-cyan-400' : 'text-emerald-500',
  action: 'text',
  content,
  ...extras,
});

const jsonFile = (name, data, extras = {}) =>
  textFile(name, JSON.stringify(data, null, 2), extras);

/*
 * IMAGE FILES — THE PART YOU WILL CUSTOMIZE
 *
 * Usage:
 * imageFile(
 *   'Name_Shown_In_Portfolio.png', // 1. Name shown in Dolphin
 *   'image',                       // 2. Icon name
 *   '/folder/actual-image.png',    // 3. Real file inside public/
 * );
 *
 * Example public file:
 * public/juice_shop/architecture.png
 *
 * Its source path here is:
 * /juice_shop/architecture.png
 *
 * If you do not provide a source path, the sample placeholder is used.
 */
const normalizeAssetPath = (src) => src ? `/${src.replace(/^\/+/, '')}` : null;

const imageFile = (name, icon = 'image', src) => {
  const extension = name.split('.').pop()?.toLowerCase();
  const typeLabels = {
    gif: 'GIF Image',
    jpeg: 'JPEG Image',
    jpg: 'JPEG Image',
    png: 'PNG Image',
    webp: 'WebP Image',
  };

  return {
    name,
    type: 'file',
    ext: typeLabels[extension] || 'Image File',
    icon,
    color: 'text-purple-500',
    action: 'media',
    mediaType: extension === 'gif' ? 'gif' : 'image',
    src: normalizeAssetPath(src),
    disabled: !src,
    statusMessage: !src ? `${name} has not been added to the portfolio yet.` : undefined,
  };
};

/*
 * VIDEO FILES — SAME IDEA AS IMAGE FILES
 *
 * Example:
 * videoFile('Demo.mp4', 'film', '/juice_shop/demo.mp4')
 *
 * That loads:
 * public/juice_shop/demo.mp4
 *
 * If you omit the third value, the sample video is used.
 */
const videoFile = (name, icon = 'video', src) => {
  const extension = name.split('.').pop()?.toLowerCase();
  const typeLabels = {
    avi: 'AVI Video',
    mkv: 'Matroska Video',
    mov: 'QuickTime Video',
    mp4: 'MPEG-4 Video',
    webm: 'WebM Video',
  };

  return {
    name,
    type: 'file',
    ext: typeLabels[extension] || 'Video File',
    icon,
    color: 'text-blue-500',
    action: 'media',
    mediaType: 'video',
    src: normalizeAssetPath(src),
    disabled: !src,
    statusMessage: !src ? `${name} has not been added to the portfolio yet.` : undefined,
  };
};

const pdfFile = (name, icon = 'text', file) => ({
  name,
  type: 'file',
  ext: 'PDF Document',
  icon,
  color: 'text-red-500',
  action: 'pdf',
  file: normalizeAssetPath(file)?.slice(1),
  disabled: !file,
  statusMessage: !file ? `${name} has not been added to the portfolio yet.` : undefined,
});

const webLink = (name, url, extras = {}) => ({
  name,
  type: 'file',
  ext: 'Web Link',
  icon: 'globe',
  color: 'text-blue-400',
  action: 'browser',
  url,
  ...extras,
});

const directory = (name, target, extras = {}) => ({
  name,
  type: 'dir',
  ext: 'Folder',
  icon: 'folder',
  color: 'text-amber-500',
  target,
  ...extras,
});

const projectOverview = ({ title, summary, stack, highlights }) =>
  `${title}\n${'='.repeat(title.length)}\n\n${summary}\n\nStack\n-----\n${stack}\n\nWhat it demonstrates\n--------------------\n${highlights}`;

const GITHUB = 'https://github.com/Owasamly';

export const places = [
  { id: 'about', name: 'Home (~)', icon: 'user' },
  { id: 'projects', name: 'Projects', icon: 'folder' },
  { id: 'experience', name: 'Experience', icon: 'briefcase' },
  { id: 'education', name: 'Education', icon: 'education' },
  { id: 'documents', name: 'Documents', icon: 'text' },
  { id: 'downloads', name: 'Downloads', icon: 'download' },
  { id: 'pictures', name: 'Pictures', icon: 'image' },
  { id: 'videos', name: 'Videos', icon: 'video' },
  { id: 'music', name: 'Music', icon: 'music' },
  { id: 'trash', name: 'Trash', icon: 'trash' },
];

export const directoryContents = {
  about: [
    {
      name: '00_START_HERE.sh',
      type: 'file',
      ext: 'Shell Script',
      icon: 'terminal',
      color: 'text-emerald-500',
      action: 'terminal',
    },
    textFile(
      'About_Me.txt',
      `Osama Nurhussen Kahsay\nMunich, Germany\n\nCybersecurity master's student focused on DevSecOps, cloud-native security and practical automation. I build hands-on systems that connect CI/CD security, policy-as-code, GitOps and Kubernetes runtime monitoring.\n\nExplore Projects for implementation evidence, Experience for shipped work, or open the CV for the complete profile.`,
    ),
    directory('Projects', 'projects'),
    directory('Experience', 'experience'),
    directory('Education', 'education'),
    jsonFile(
      'Technical_Skills.json',
        {
          programming_and_scripting: ['Python', 'JavaScript', 'TypeScript', 'Node.js', 'Bash'],
          containers_and_infrastructure: ['Docker', 'Docker Compose', 'Kubernetes', 'Helm', 'k3d', 'Terraform', 'LocalStack'],
          devsecops_and_security: ['GitHub Actions', 'Argo CD', 'OPA/Rego', 'Falco', 'Trivy', 'Semgrep', 'TruffleHog'],
          development_and_data: ['REST APIs', 'PostgreSQL', 'MySQL', 'MongoDB', 'Firebase'],
          systems_and_tools: ['Linux', 'Git/GitHub', 'Command Line Tools', 'Wireshark'],
          currently_learning: ['HashiCorp Vault', 'OpenID Connect', 'Syft', 'Cosign', 'Kyverno', 'DefectDojo'],
        },
    ),
    pdfFile('Osama_Kahsay_CV_EN.pdf', 'text', 'docs/CV_EN.pdf'),
    pdfFile('Osama_Kahsay_CV_DE.pdf', 'text', 'docs/CV_DE.pdf'),
    
    webLink('GitHub.url', GITHUB),
    webLink('LinkedIn.url', 'https://www.linkedin.com/in/osama-nurhussen/', { icon: 'linkedin', color: 'text-[#0A66C2]' }),
    {
      name: 'Contact_Me',
      type: 'file',
      
      ext: 'Contact Info',
      icon: 'mail',
      color: 'text-sky-400',
      action: 'contact',
    },
  ],

  projects: [
    {
      name: '00_PROJECT_INDEX.sh',
      type: 'file',
      ext: 'Shell Script',
      icon: 'terminal',
      color: 'text-emerald-500',
      action: 'terminal',
    },
    directory('Kubernetes_Runtime_Security', 'kubernetes_runtime_security'),
    directory('Local_Kubernetes_GitOps', 'local_kubernetes_gitops'),
    directory('Terraform_OPA_Guardrails', 'terraform_opa_guardrails'),
    directory('DevSecOps_Juice_Shop', 'devsecops_juice_shop'),
    directory('MK_Delivery', 'mk_delivery_project'),
    directory('Snippy_AI_Cursor', 'snippy_ai_cursor', { badge: 'Prototype', badgeTone: 'amber' }),
    directory('Vault_OIDC_Secrets', null, {
      badge: 'In progress',
      badgeTone: 'amber',
      disabled: true,
      statusMessage: 'Zero-Trust Ephemeral Secrets Pipeline is currently in progress.',
    }),
    directory('Secure_Supply_Chain', null, {
      badge: 'In progress',
      badgeTone: 'amber',
      disabled: true,
      statusMessage: 'Cryptographic Software Supply Chain Gatekeeper is currently in progress.',
    }),
    directory('AI_Auto_Remediation', null, {
      badge: 'In progress',
      badgeTone: 'amber',
      disabled: true,
      statusMessage: 'ASPM Aggregator and Local AI Auto-Remediation is currently in progress.',
    }),
    webLink('GitHub.url', GITHUB),
  ],

  kubernetes_runtime_security: [
    jsonFile(
      'Project_Overview.json',
      {
        title: 'Kubernetes Runtime Security',
        summary: 'A local Kubernetes runtime-security environment that deploys OWASP Juice Shop and detects suspicious container activity with Falco and FalcoSidekick.',
        stack: ['Kubernetes', 'k3d', 'Helm', 'Falco', 'FalcoSidekick', 'OWASP Juice Shop', 'Traefik', 'HPA'],
        highlights: ['Multi-node local Kubernetes cluster', 'Custom Falco rule for interactive shell detection', 'FalcoSidekick alert forwarding', 'Replicated Juice Shop workload with autoscaling'],
      },
    ),
    imageFile('Architecture.png', 'image', '/runtime_security/architecture.png'),
    imageFile('Falco_Alerts.jpeg', 'fileImage','/runtime_security/falco-runtime-alerts.png'),
    imageFile('Falco_Dashboard.webp', 'images','/runtime_security/runtime-security-dashboard.png'),
    videoFile('Runtime_Demo.mp4', 'film', 'runtime_security/runtime-security-demo.mp4'),
    webLink('GitHub.url', `${GITHUB}/kubernetes-runtime-security`),
  ],

  local_kubernetes_gitops: [
    textFile(
      'Project_Overview.txt',
      projectOverview({
        title: 'Local Kubernetes GitOps',
        summary: 'A local GitOps platform where Argo CD continuously reconciles a Helm-managed application from GitHub into a k3d Kubernetes cluster.',
        stack: 'Docker, Kubernetes, k3d, Helm, Argo CD, GitHub Actions, Traefik',
        highlights: '- Declarative application deployment\n- Automated synchronization from Git\n- Drift detection and self-healing\n- Helm-based application packaging',
      }),
    ),
    imageFile('Architecture.png', 'image', '/local_kubernetes_gitops/local-kubernetes-gitops-architecture.png'),
    videoFile('Self_Healing_Demo.mp4', 'video', '/local_kubernetes_gitops/self_healing_demo.mp4'),
    imageFile('ArgoCD_Resources.jpg', 'images', '/local_kubernetes_gitops/argocd-synced-resources.png'),
    imageFile('Github_Actions_Validation.png', 'fileImage', '/local_kubernetes_gitops/github-actions-validation.png'),
    webLink('GitHub.url', `${GITHUB}/local-kubernetes-gitops`),
  ],

  terraform_opa_guardrails: [
    textFile(
      'Project_Overview.txt',
      projectOverview({
        title: 'Infrastructure Guardrails with Policy-as-Code',
        summary: 'Terraform infrastructure is evaluated by OPA/Rego policies before deployment to a local AWS environment, blocking insecure S3 configurations.',
        stack: 'Terraform, Open Policy Agent, Rego, LocalStack, GitHub Actions',
        highlights: '- Terraform plan exported as JSON\n- Policies reject public, unencrypted or unversioned S3 buckets\n- CI pipeline fails on policy violations\n- Secure configuration passes the same automated gate',
      }),
    ),
    imageFile('Architecture.png', 'images', 'devsecops_policy_as_code/policy-as-code-architecture.png'),
    imageFile('Policy_Detection.webp', 'fileImage', 'devsecops_policy_as_code/policy-violations-detected.png'),
    imageFile('Policy_Passed.jpeg', 'images', 'devsecops_policy_as_code/secure-policy-gate-passed.png'),
    imageFile('LocalStack_Verification.jpeg', 'fileImage', 'devsecops_policy_as_code/localstack-controls-verified.png'),
    webLink('GitHub.url', `${GITHUB}/devsecops-policy-as-code`),
  ],

  devsecops_juice_shop: [
    jsonFile(
      'Project_Overview.json',
      {
        title: 'DevSecOps Juice Shop',
        summary: 'A security-focused CI/CD project built around OWASP Juice Shop, using automated checks to expose risks early in the development workflow.',
        stack: ['GitHub Actions', 'TruffleHog', 'Semgrep', 'Trivy', 'Docker', 'TypeScript'],
        highlights: ['Automated secrets scanning', 'Static application security testing', 'Dependency and container vulnerability scanning', 'Pipeline enforcement for serious findings'],
      },
    ),
    
    imageFile(
      'Architecture.png',
      'image',
      '/devsecops_juice_shop/architecture.png',
    ),
    imageFile(
      'Pipeline_Success.png',
      'fileImage',
      '/devsecops_juice_shop/ci-security-pipeline-success.png',
    ),
    imageFile(
      'Security_Findings.png',
      'images',
      '/devsecops_juice_shop/security-findings.png',
    ),

   
    
    videoFile('Pipeline_Demo.mp4', 'film', '/devsecops_juice_shop/juice-shop-demo.mp4'),
     
    webLink('GitHub.url', `${GITHUB}/devsecops-juice-shop`),
  ],

  mk_delivery_project: [
    textFile(
      'Role_and_Overview.txt',
      `MK Delivery\n===========\n\nA food-delivery product created for restaurants and customers in Mekelle. The application reached more than 3,000 users/downloads and provided practical experience building and operating a real product.\n\nRole\n----\nFounder and developer, covering product planning, application development, restaurant onboarding and iteration based on real user needs.`,
    ),
    imageFile('App_Home.jpg', 'camera', '/mk_delivery/Home.png'),
    imageFile('Restaurant_View.png', 'fileImage', '/mk_delivery/Restaurant.png'),
    textFile(
      'Project_History.txt',
      `MK Delivery was built as a practical response to local delivery needs in Mekelle. It grew beyond a classroom project, serving real customers and collaborating with restaurants and cafes.\n\nThis project represents product ownership, direct user feedback and the realities of shipping software outside a controlled academic environment.`,
    ),
  ],

  snippy_ai_cursor: [
    textFile(
      'Concept_Overview.txt',
      `Snippy AI Cursor\n================\n\nSnippy explores an AI-powered desktop cursor assistant that can understand the user's current application context and teach difficult workflows directly inside the interface. A possible use case is guiding someone through video-editing tasks step by step without forcing them to constantly switch to external tutorials.\n\nThe concept combines contextual AI assistance, desktop interaction design and learning-by-doing.`,
    ),
    imageFile('Prototype.webp', 'images'),
    jsonFile(
      'Current_Status.json',
      {
        status: 'Prototype / Paused',
        challenge: 'Reliable context recognition and application-level guidance made the scope more complex than expected.',
        representation: 'Experimental prototype, not a completed product.',
        next_step: 'Narrow the first implementation to one application and a small number of well-defined workflows.',
      },
    ),
    webLink('GitHub.url', `${GITHUB}/Snippy-app`),
  ],

  experience: [
    imageFile('Experience_Timeline.png'),
    textFile(
      'MK_Delivery.txt',
      `Founder and Developer — MK Delivery\n\nBuilt and operated a food-delivery application in Mekelle that reached more than 3,000 users/downloads. Worked across product development, restaurant onboarding and iteration based on practical feedback.\n\nOpen Projects/MK_Delivery for the full case study.`,
    ),
    jsonFile(
      'Mekelle_University_ICT.json',
      {
        role: 'ICT Intern',
        organization: 'Mekelle University',
        project: 'ICT Resource Management System',
        contribution: 'Led development and worked with the operational needs of a real institutional environment.',
      },
    ),
  ],

  education: [
    imageFile('Education_Timeline.jpeg', 'fileImage'),
    jsonFile(
      'HDBW_MSc_Cybersecurity.json',
      {
        degree: 'M.Sc. Cybersecurity',
        institution: 'Hochschule der Bayerischen Wirtschaft (HDBW)',
        location: 'Munich, Germany',
        focus: ['DevSecOps', 'Cloud-native security', 'Autonomous vulnerability research', 'Security automation'],
      },
    ),
    textFile(
      'Bachelors_Degree.txt',
      `Bachelor's Degree\n\nSoftware-development foundation covering programming, databases, web and mobile development, networking and practical information systems.`,
    ),
    pdfFile('FABA_Research_Paper.pdf'),
  ],

  documents: [
    pdfFile('Osama_Kahsay_CV_EN.pdf', 'text', 'docs/CV_EN.pdf'),
    jsonFile(
      'Master_Thesis_Ideas.json',
      {
        status: 'Working directions, not completed projects',
        ideas: ['Feedback-driven autonomous binary analysis (FABA)', 'Agentic DevSecOps auditing and monitoring', 'AI-assisted vulnerability aggregation and remediation'],
      },
    ),
    pdfFile('FABA_Research_Paper.pdf'),
    jsonFile(
      'DevSecOps_Learning_Path.json',
      {
        completed: ['CI/CD security scanning', 'Terraform policy-as-code', 'Kubernetes GitOps', 'Kubernetes runtime monitoring'],
        next: ['Vault and OIDC ephemeral secrets', 'Signed software supply chain', 'ASPM aggregation and local AI remediation'],
      },
    ),
    textFile(
      'Portfolio_README.txt',
      `Welcome to Osama's interactive Linux portfolio.\n\nClick or tap items once to open them. Project folders contain concise overviews, evidence, demonstrations and direct repository links. Placeholder media will be replaced as project assets are prepared.`,
    ),
    textFile(
      'Reading_List.txt',
      `Current topics\n==============\n\n- Kubernetes security and policy enforcement\n- Software supply-chain security\n- Autonomous vulnerability research\n- DevSecOps platform engineering\n- Practical AI-assisted security automation`,
    ),
  ],

  downloads: [
    pdfFile('Osama_Kahsay_CV_EN.pdf', 'text', 'docs/CV_EN.pdf'),
    pdfFile('Osama_Kahsay_CV_DE.pdf', 'text', 'docs/CV_DE.pdf'),
  ],

  pictures: [
    imageFile('GitOps_Architecture.png', 'image', '/local_kubernetes_gitops/local-kubernetes-gitops-architecture.png'),
    imageFile('ArgoCD_Synchronized.png', 'fileImage', '/local_kubernetes_gitops/argocd-synced-resources.png'),
    imageFile('OPA_Policy_Rejection.png', 'images', '/devsecops_policy_as_code/policy-violations-detected.png'),
    imageFile('Falco_Alert.png', 'fileImage', '/runtime_security/falco-runtime-alerts.png'),
    imageFile('MK_Delivery_Home.png', 'camera', '/mk_delivery/Home.png'),
  ],

  videos: [
    videoFile('GitOps_Self_Healing.mp4', 'monitorPlay', '/local_kubernetes_gitops/self_healing_demo.mp4'),
    videoFile('Falco_Runtime_Detection.mp4', 'video', '/runtime_security/runtime-security-demo.mp4'),
    videoFile('DevSecOps_Pipeline_Demo.mp4', 'film', '/devsecops_juice_shop/juice-shop-demo.mp4'),
  ],

  music: [
    webLink('Focus_Playlist.url', 'https://open.spotify.com', { ext: 'Music Playlist', icon: 'music', color: 'text-pink-500' }),
    webLink('Favourite_Music.url', 'https://open.spotify.com', { ext: 'Music Playlist', icon: 'music', color: 'text-pink-500' }),
    textFile(
      'About_These_Playlists.txt',
      `Music is part of this desktop because the portfolio is meant to feel personal and lived-in, not like a generic project grid. The final playlist links will replace the current Spotify placeholders.`,
    ),
  ],

  trash: [
    { name: 'generic_portfolio_template.zip', type: 'file', ext: 'Archive', icon: 'archive', color: 'text-gray-400', disabled: true },
    { name: 'hardcoded_passwords.txt', type: 'file', ext: 'Text Document', icon: 'text', color: 'text-gray-400', disabled: true },
    { name: 'final_final_CV_v12.pdf', type: 'file', ext: 'PDF Document', icon: 'text', color: 'text-gray-400', disabled: true },
  ],
};
