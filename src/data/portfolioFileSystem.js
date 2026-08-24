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

const imageFile = (name, icon = 'image', src, extras = {}) => {
  const extension = name.split('.').pop()?.toLowerCase();
  const { darkSrc, ...fileExtras } = extras;
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
    darkSrc: normalizeAssetPath(darkSrc),
    disabled: !src,
    statusMessage: !src ? `${name} has not been added to the portfolio yet.` : undefined,
    ...fileExtras,
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
      `Osama Nurhussen Kahsay\nMunich, Germany\n\nCybersecurity master's student building across AI automation, cloud infrastructure, DevSecOps and cybersecurity. I connect Python and API workflows with CI/CD, policy-as-code, GitOps, Kubernetes and runtime security—bringing an automation mindset to both product and platform problems.\n\nExplore Projects for implementation evidence, Experience for shipped work, or open the CV for the complete profile.`,
    ),
    directory('Projects', 'projects'),
    directory('Experience', 'experience'),
    directory('Education', 'education'),
    jsonFile(
      'Technical_Skills.json',
        {
          programming_and_scripting: ['Python', 'JavaScript', 'TypeScript', 'Node.js', 'Bash'],
          ai_automation_and_agents: ['LLM APIs', 'Structured outputs', 'Tool calling', 'Browser automation', 'Human-in-the-loop validation', 'MCP concepts'],
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
    directory('Agentic_Job_Search', 'agentic_job_search', { badge: 'In progress', badgeTone: 'amber' }),
    directory('Kubernetes_Runtime_Security', 'kubernetes_runtime_security'),
    directory('Local_Kubernetes_GitOps', 'local_kubernetes_gitops'),
    directory('Terraform_OPA_Guardrails', 'terraform_opa_guardrails'),
    directory('DevSecOps_Juice_Shop', 'devsecops_juice_shop'),
    directory('MK_Delivery', 'mk_delivery_project'),
    directory('Snippy_AI_Cursor', 'snippy_ai_cursor', { badge: 'Prototype', badgeTone: 'amber' }),
    directory('Vault_OIDC_Secrets', 'vault_oidc_secrets', {
      badge: 'In progress',
      badgeTone: 'amber',
    }),
    directory('Secure_Supply_Chain', 'secure_supply_chain', {
      badge: 'In progress',
      badgeTone: 'amber',
    }),
    directory('AI_Auto_Remediation', 'ai_auto_remediation', {
      badge: 'In progress',
      badgeTone: 'amber',
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
      `MK Delivery\n===========\n\nA food-delivery product created for restaurants and customers in Mekelle. The application reached 3,000+ registered users and 1,000+ Google Play installs, providing practical experience building and operating a real product.\n\nRole\n----\nCo-Founder and Software Developer, covering product planning, application development, releases, restaurant onboarding and iteration based on real user needs.`,
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
      `Snippy AI Cursor\n================\n\nSnippy is an experimental desktop assistant designed to guide users through unfamiliar software without making them leave the application to search for a tutorial.\n\nThe prototype combines a floating prompt panel with a visual cursor overlay. A user can ask for help, and Snippy can translate the requested workflow into a sequence of on-screen steps. The cursor then moves toward relevant interface areas while short instructions explain what to do next.\n\nPrototype scope\n---------------\n- Electron-based desktop overlay\n- Compact assistant panel with keyboard shortcut\n- Prompt input, response controls and optional audio feedback\n- Cursor-position tracking\n- Multi-step guided sequences\n- In-context learning instead of switching between an application and a tutorial\n\nThe screenshots show the working overlay running above VS Code and the early implementation of the cursor-guidance logic. This is a functional proof of concept, not a finished AI product.`,
    ),
    imageFile('Assistant_Overlay_Prototype.webp', 'images', '/snippy/snippy-assistant-prototype.webp'),
    imageFile('Guided_Cursor_Prototype.webp', 'images', '/snippy/snippy-guided-cursor-prototype.webp'),
    jsonFile(
      'Current_Status.json',
      {
        status: 'Functional proof of concept / paused',
        problem: 'Software tutorials usually force users to repeatedly switch between the task and an external video or article.',
        proposed_solution: 'A context-aware desktop overlay that explains a workflow and visually guides the cursor through each step inside the active application.',
        implemented: [
          'Electron desktop overlay',
          'Floating assistant prompt panel',
          'Keyboard shortcut and audio-control interface',
          'Cursor-position updates',
          'Scripted multi-step guidance sequences',
        ],
        screenshots: {
          Assistant_Overlay_Prototype: 'The compact Snippy Assistant panel running above VS Code.',
          Guided_Cursor_Prototype: 'The visual cursor and the code responsible for advancing through guided steps.',
        },
        main_challenge: 'Reliable application-context recognition and safe interaction across different desktop interfaces made the original scope too broad.',
        honest_positioning: 'A functional interaction prototype that validates the interface concept; it is not presented as a production-ready autonomous agent.',
        next_step: 'Limit the first complete version to one application and a small set of well-defined, testable workflows.',
      },
    ),
    webLink('GitHub.url', `${GITHUB}/Snippy-app`),
  ],

  agentic_job_search: [
    textFile(
      'Project_Overview.txt',
      projectOverview({
        title: 'Agentic Job Search & Resume Tailoring',
        summary: 'A local, human-in-the-loop workflow for turning a job description and verified master resume into structured, role-specific content, then assisting with visible browser-based resume editing.',
        stack: 'Node.js, browser automation, LLM APIs, structured JSON, validation, persistent local browser sessions',
        highlights: '- Produces reviewable structured resume content\n- Keeps generated claims grounded in verified source material\n- Matches known resume concepts to visible editor fields\n- Requires human review before content is used\n- Keeps credentials and browser-profile data local',
      }),
    ),
    jsonFile(
      'Current_Status.json',
      {
        status: 'Local prototype / actively in progress',
        implemented: [
          'Job-description and master-resume input workflow',
          'Provider-configurable LLM generation',
          'Structured resume-content review',
          'Visible browser session with persistent local profile',
          'Conservative matching for headline, summary and skills fields',
        ],
        safety_boundaries: [
          'No automatic job submission',
          'No credentials stored in source code',
          'Human review required for generated claims and filled fields',
          'Private repository while personal-data handling is refined',
        ],
        next_steps: [
          'Add site-specific mappings for rich-text resume sections',
          'Separate reusable candidate data from generated role variants',
          'Add repeatable evaluation cases for factuality and field matching',
          'Expand from resume tailoring into tracked, approval-based application assistance',
        ],
      },
    ),
    imageFile('Workflow_Architecture.svg', 'image', '/agentic_job_search/workflow-architecture.svg'),
    textFile(
      'Why_It_Matters.txt',
      `This project explores the less glamorous parts of agentic automation: grounding, validation, browser-state handling, safe failure and explicit human approval.\n\nIt is intentionally presented as an in-progress local prototype. The goal is dependable assistance rather than unsupervised application volume.`,
    ),
  ],

  vault_oidc_secrets: [
    jsonFile(
      'Current_Status.json',
      {
        project: 'Zero-Trust Ephemeral Secrets Pipeline',
        status: 'Design and implementation in progress',
        goal: 'Replace long-lived CI/CD credentials with short-lived, identity-bound secrets.',
        planned_stack: ['HashiCorp Vault', 'OpenID Connect', 'GitHub Actions', 'Kubernetes'],
        planned_evidence: ['OIDC trust flow', 'Short-lived credential issuance', 'Policy boundaries', 'Rotation and failure tests'],
        disclaimer: 'Planned work is listed separately from completed implementation evidence.',
      },
    ),
  ],

  secure_supply_chain: [
    jsonFile(
      'Current_Status.json',
      {
        project: 'Cryptographic Software Supply Chain Gatekeeper',
        status: 'Design and implementation in progress',
        goal: 'Verify build provenance, signatures and policy compliance before Kubernetes deployment.',
        planned_stack: ['Syft', 'Cosign', 'GitHub Actions', 'Kyverno', 'Kubernetes'],
        planned_evidence: ['SBOM generation', 'Image signing', 'Admission-policy rejection', 'Verified deployment path'],
        disclaimer: 'Planned work is listed separately from completed implementation evidence.',
      },
    ),
  ],

  ai_auto_remediation: [
    jsonFile(
      'Current_Status.json',
      {
        project: 'ASPM Aggregator and Local AI Auto-Remediation',
        status: 'Research and architecture in progress',
        goal: 'Aggregate security findings, propose bounded remediations and require explicit approval before changes.',
        planned_stack: ['Python', 'Security scanner APIs', 'Local LLM', 'Structured outputs', 'DefectDojo'],
        planned_evidence: ['Finding normalization', 'Grounded remediation proposal', 'Approval gate', 'Validation and rollback checks'],
        disclaimer: 'No autonomous production remediation is claimed.',
      },
    ),
  ],

  experience: [
    imageFile('Experience_Timeline.png', 'image', '/timelines/experience-timeline.png', {
      darkSrc: '/timelines/experience-timeline-dark.png',
    }),
    textFile(
      'MK_Delivery.txt',
      `Co-Founder and Software Developer — MK Delivery\n\nBuilt and operated a food-delivery application in Mekelle that reached 3,000+ registered users and 1,000+ Google Play installs. Worked across product development, releases, restaurant onboarding and iteration based on operational feedback.\n\nOpen Projects/MK_Delivery for the full case study.`,
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
    imageFile('Education_Timeline.png', 'image', '/timelines/education-timeline.png', {
      darkSrc: '/timelines/education-timeline-dark.png',
    }),
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
    textFile(
      'Research_Direction_FABA.txt',
      `Feedback-Driven Autonomous Binary Analysis (FABA)\n=================================================\n\nA proposed research direction for combining iterative binary analysis with explicit feedback and validation loops. This is a thesis/research interest, not a completed paper.`,
    ),
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
    imageFile('Education_Timeline.png', 'image', '/timelines/education-timeline.png', {
      darkSrc: '/timelines/education-timeline-dark.png',
    }),
    imageFile('Experience_Timeline.png', 'image', '/timelines/experience-timeline.png', {
      darkSrc: '/timelines/experience-timeline-dark.png',
    }),
    imageFile('Agentic_Workflow_Architecture.svg', 'image', '/agentic_job_search/workflow-architecture.svg'),
    imageFile('GitOps_Architecture.png', 'image', '/local_kubernetes_gitops/local-kubernetes-gitops-architecture.png'),
    imageFile('ArgoCD_Synchronized.png', 'fileImage', '/local_kubernetes_gitops/argocd-synced-resources.png'),
    imageFile('OPA_Policy_Rejection.png', 'images', '/devsecops_policy_as_code/policy-violations-detected.png'),
    imageFile('Falco_Alert.png', 'fileImage', '/runtime_security/falco-runtime-alerts.png'),
    imageFile('MK_Delivery_Home.png', 'camera', '/mk_delivery/Home.png'),
    imageFile('MK_Delivery_Details.png', 'camera', '/mk_delivery/Detail.png'),
    imageFile('MK_Delivery_Checkout.png', 'camera', '/mk_delivery/Checkout.png'),
    imageFile('MK_Delivery_Order_Success.png', 'camera', '/mk_delivery/Order_successful.png'),
  ],

  videos: [
    videoFile('GitOps_Self_Healing.mp4', 'monitorPlay', '/local_kubernetes_gitops/self_healing_demo.mp4'),
    videoFile('Falco_Runtime_Detection.mp4', 'video', '/runtime_security/runtime-security-demo.mp4'),
    videoFile('DevSecOps_Pipeline_Demo.mp4', 'film', '/devsecops_juice_shop/juice-shop-demo.mp4'),
  ],

  music: [
    textFile(
      'About_These_Playlists.txt',
      `Music is part of this desktop because the portfolio is meant to feel personal and lived-in, not like a generic project grid. Public playlist links are intentionally not included until a curated selection is ready.`,
    ),
  ],

  trash: [
    { name: 'generic_portfolio_template.zip', type: 'file', ext: 'Archive', icon: 'archive', color: 'text-gray-400', disabled: true },
    { name: 'hardcoded_passwords.txt', type: 'file', ext: 'Text Document', icon: 'text', color: 'text-gray-400', disabled: true },
    { name: 'final_final_CV_v12.pdf', type: 'file', ext: 'PDF Document', icon: 'text', color: 'text-gray-400', disabled: true },
  ],
};
