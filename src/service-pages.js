// Primary service inventory and intentional compatibility redirects.
export const servicePages = [
  {
    slug: "web-development",
    title: "Web Design & Development",
    group: 0,
    scene: 1,
    accent: "cyan",
    headline: "Web experiences designed to make an impression.",
    description:
      "Design-led business websites, landing pages and e-commerce experiences. We connect Figma and UI/UX decisions with responsive HTML, CSS, JavaScript, React and WordPress development, then refine accessibility, performance and maintenance.",
    deliverables: [
      "An agreed sitemap, page layouts and content direction, shaped around the questions your visitors bring.",
      "Responsive development with reusable components, accessible interactions and considered image performance.",
      "A tested launch, practical editing guidance and a handover covering hosting, content and maintenance responsibilities.",
    ],
    problems: [
      [
        "An unclear first impression",
        "We organise your services, proof and calls to action into a clear path from discovery to enquiry.",
      ],
      [
        "A difficult mobile experience",
        "We design around smaller screens, touch targets and readable content before refining the desktop experience.",
      ],
      [
        "A site that is hard to maintain",
        "We agree how content will be updated and choose an editing approach your team can realistically manage.",
      ],
    ],
    capabilities: [
      [
        "Figma & UI/UX",
        "Map user journeys, prototype key pages and define a coherent interface system before production development.",
      ],
      [
        "Responsive web foundations",
        "Use semantic HTML5, CSS3 and JavaScript to build readable, keyboard-accessible interfaces across devices.",
      ],
      [
        "Business websites & landing pages",
        "Structure services, useful proof and clear calls to action around the questions your visitors bring.",
      ],
      [
        "React development",
        "Build reusable interfaces and purposeful interactive features where a component-based approach fits the scope.",
      ],
      [
        "WordPress & e-commerce",
        "Configure an agreed editing and catalogue workflow, with payment and fulfilment responsibilities identified.",
      ],
      [
        "Website optimization",
        "Review loading behaviour, image sizing, accessibility, content hierarchy and avoidable navigation friction.",
      ],
      [
        "Maintenance & handover",
        "Document hosting, content updates and scoped upkeep so the website remains manageable after launch.",
      ],
    ],
    processOutputs: [
      "A prioritised page and content brief, with an agreed audience and enquiry journey.",
      "Reviewed page prototypes and a reusable interface direction.",
      "Responsive pages with the agreed editing and contact workflows connected.",
      "A launch checklist and handover for content, hosting and scoped maintenance.",
    ],
    process: [
      [
        "Discover",
        "Review your audience, current website, business goals and available content.",
      ],
      [
        "Design",
        "Agree the sitemap and visual direction, then refine key layouts together.",
      ],
      [
        "Develop",
        "Build responsive pages and connect the agreed content and contact mechanisms.",
      ],
      [
        "Launch",
        "Test the experience, prepare hosting and give your team an editing handover.",
      ],
    ],
    technologies: [
      "figma",
      "html5",
      "css3",
      "javascript",
      "react",
      "wordpress",
    ],
    examples: [
      [
        "A professional services website",
        "An example firm needs distinct service pages and a clear enquiry route, replacing one long page of disconnected text.",
      ],
      [
        "A small business redesign",
        "An example local business keeps its existing domain while improving mobile readability, navigation and content editing.",
      ],
      [
        "A focused campaign destination",
        "An example launch needs a concise landing page, clear campaign messaging and a measurable next step.",
      ],
    ],
    faqs: [
      [
        "Can you redesign an existing website?",
        "Yes. We first review its content, platform and hosting so useful material can be retained and migration risks identified.",
      ],
      [
        "Do we need to supply the content?",
        "Bring what you have. We can organise existing material; new copywriting can be included as a separately agreed part of the scope.",
      ],
      [
        "Will our team be able to update it?",
        "We discuss who edits the website and how often, then agree an appropriate CMS or documented development workflow.",
      ],
      [
        "What is included in launch testing?",
        "We check the agreed pages on representative screen sizes, along with links, enquiry behaviour, keyboard access and deployment settings.",
      ],
      [
        "Are domain and hosting costs included?",
        "They are identified during scoping. Provider subscriptions and renewal responsibilities are agreed explicitly rather than assumed.",
      ],
    ],
    related: ["software-development", "digital-marketing", "cloud-computing"],
    path: "/services/web-development",
    environment: "design",
  },
  {
    slug: "software-development",
    title: "Custom Software & Web Applications",
    group: 0,
    scene: 0,
    accent: "violet",
    headline: "Powerful software. Built around your ambition.",
    description:
      "Custom enterprise applications, business dashboards and Android experiences built around your real workflows. We connect React interfaces with Node.js or Java services, appropriate MongoDB or MySQL data models, and supported APIs.",
    deliverables: [
      "A documented feature scope, user journeys and data model that make the first useful release concrete.",
      "A working application with agreed roles, forms, validation and integrations, developed in reviewable stages.",
      "Testing, deployment notes and a handover covering access, backups, known limitations and ongoing support options.",
    ],
    problems: [
      [
        "Repeated manual entry",
        "We trace where information begins and design a single, coherent route through the application.",
      ],
      [
        "Off-the-shelf tools do not fit",
        "We distinguish essential business rules from preferences before deciding what needs custom development.",
      ],
      [
        "A large idea with no clear first release",
        "We prioritise a manageable starting version and make later improvements visible in a backlog.",
      ],
    ],
    capabilities: [
      [
        "Enterprise applications",
        "Translate roles, approvals and business rules into a focused application release and reviewable backlog.",
      ],
      [
        "React & UI/UX",
        "Use Figma and prototypes to refine dashboards, forms, states and user journeys before implementation.",
      ],
      [
        "Node.js & Java backends",
        "Choose an appropriate service architecture, define business logic and connect supported APIs.",
      ],
      [
        "MongoDB & MySQL architecture",
        "Compare document and relational models, define validation and plan data ownership, migrations and backups.",
      ],
      [
        "Android applications",
        "Scope Android interfaces, API connectivity and device testing around the actual users and deployment requirements.",
      ],
      [
        "API integration & automation",
        "Connect supported systems with clear authentication, exception handling and human approval boundaries.",
      ],
      [
        "GitHub & release practices",
        "Keep changes reviewable, test representative workflows and document deployment and support responsibilities.",
      ],
    ],
    processOutputs: [
      "An agreed workflow map, user roles and prioritised software scope.",
      "Interface prototypes and an architecture plan covering APIs and data responsibilities.",
      "A working application increment with reviewed code and documented integration points.",
      "Test evidence, deployment instructions and a plan for ongoing support.",
    ],
    process: [
      [
        "Map",
        "Understand users, records, business rules and the problem the first release must solve.",
      ],
      [
        "Prototype",
        "Validate important screens and workflows before committing to full implementation.",
      ],
      [
        "Build",
        "Develop in small increments, review progress and test real examples.",
      ],
      [
        "Release",
        "Deploy the agreed version and document ownership, support and future priorities.",
      ],
    ],
    technologies: [
      "nodejs",
      "java",
      "react",
      "mongodb",
      "mysql",
      "github",
      "android",
      "figma",
    ],
    examples: [
      [
        "An enterprise dashboard",
        "An illustrative team needs role-based views of requests, approvals and operational information across existing systems.",
      ],
      [
        "An Android field workflow",
        "An illustrative service team needs a mobile interface for capturing information and connecting it to a supported backend.",
      ],
      [
        "A connected business application",
        "An illustrative company needs its customer portal, database and internal approvals to follow one consistent workflow.",
      ],
    ],
    faqs: [
      [
        "Can you build both web and Android applications?",
        "We scope interfaces, supported devices, backend requirements and distribution responsibilities before agreeing an implementation.",
      ],
      [
        "When would you use Java instead of Node.js?",
        "The existing environment, business rules, operational needs and maintainability determine the choice; there is no single default for every project.",
      ],
      [
        "Should we choose MongoDB or MySQL?",
        "We review relationships, query patterns and consistency requirements before recommending a document or relational model.",
      ],
      [
        "Can the software integrate with existing tools?",
        "We first assess supported APIs, access, licensing and failure conditions rather than promising an unverified connection.",
      ],
      [
        "What happens after the first release?",
        "We hand over the agreed deployment and documentation. Maintenance, incident response and further features need an explicit support scope.",
      ],
    ],
    related: [
      "web-development",
      "erp-integration",
      "university-project-support",
    ],
    path: "/services/software-development",
    environment: "software",
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing & SEO",
    group: 2,
    scene: 4,
    accent: "amber",
    headline: "Stand out. Get discovered. Grow.",
    description:
      "Bring campaign strategy, paid advertising, organic search, content writing and branding into one coherent direction. We connect Meta and PPC campaigns with search research, useful creative work and a measurement plan that respects consent and real business goals.",
    deliverables: [
      "An audience, competitor and channel review with a practical plan for campaigns, content and search priorities.",
      "Scoped Meta or PPC campaign setup, on-page SEO improvements and creative/content deliverables, subject to account access and approval.",
      "A consent-aware conversion and analytics measurement plan, with reporting that distinguishes observation from marketing assumptions.",
    ],
    problems: [
      [
        "Useful services are difficult to find",
        "We review search intent, page structure and internal links to make relevant information easier to discover.",
      ],
      [
        "Traffic arrives without a clear next step",
        "We connect content to meaningful calls to action rather than treating visits as the only goal.",
      ],
      [
        "Too many SEO tasks compete for attention",
        "We prioritise improvements based on their practical impact and implementation dependencies.",
      ],
    ],
    capabilities: [
      [
        "Campaign strategy",
        "Define the audience, message, offer, channels and approval process before allocating effort or advertising spend.",
      ],
      [
        "Meta advertising",
        "Plan Facebook and Instagram creative, audience tests and campaign structure within your approved account and budget.",
      ],
      [
        "PPC advertising",
        "Research paid-search intent, structure relevant ads and landing pages, and agree controls for spend and review.",
      ],
      [
        "Search engine optimization",
        "Improve page structure, crawlability, internal links and content relevance without ranking guarantees.",
      ],
      [
        "Ahrefs & competitor research",
        "Use available licensed research access to assess topics, competitor patterns and search opportunities; estimates remain estimates.",
      ],
      [
        "Content writing & social media",
        "Develop useful website copy, articles and social content with a consistent publishing and feedback workflow.",
      ],
      [
        "Branding & creative direction",
        "Clarify tone, messaging and visual consistency using your actual business identity and supporting evidence.",
      ],
      [
        "Google Analytics & conversions",
        "Plan meaningful events and consent-aware tracking, then interpret reports against defined business objectives.",
      ],
    ],
    processOutputs: [
      "An audience, channel and measurement brief based on the available account data.",
      "Approved creative concepts, content priorities and a scoped campaign plan.",
      "Configured campaigns or search improvements with agreed tracking and consent checks.",
      "A review of available results and a prioritised next round of work.",
    ],
    process: [
      [
        "Research",
        "Review audiences, competitors, current channels and the evidence available.",
      ],
      [
        "Plan",
        "Agree campaign, search, content and creative priorities along with budget ownership.",
      ],
      [
        "Launch",
        "Prepare approved assets, configure the scoped work and check measurement.",
      ],
      [
        "Learn",
        "Review meaningful signals and adapt the next cycle without guaranteed results.",
      ],
    ],
    technologies: ["meta", "ahrefs", "analytics"],
    examples: [
      [
        "A coordinated service launch",
        "An illustrative business combines search-friendly pages, useful social content and approved advertising around one new offering.",
      ],
      [
        "A clearer conversion journey",
        "An illustrative campaign needs aligned creative, a relevant landing page and a consent-aware enquiry event.",
      ],
      [
        "An organic visibility programme",
        "An illustrative website needs competitor research, better topic coverage, technical fixes and a realistic publishing plan.",
      ],
    ],
    faqs: [
      [
        "Are SEO, writing and branding included together?",
        "This page combines those capabilities. The exact deliverables and approval rounds are agreed in a single engagement scope.",
      ],
      [
        "Are advertising budgets included in your fee?",
        "Provider spend, fees and account ownership are defined separately from the agreed planning and production work.",
      ],
      [
        "Can you guarantee rankings or enquiries?",
        "No. We improve the work and review evidence without promising outcomes controlled by competition or platform decisions.",
      ],
      [
        "Do we need an Ahrefs subscription?",
        "Research access and licensing are checked during scoping. We do not imply that every engagement includes a paid tool subscription.",
      ],
      [
        "How will conversions be tracked?",
        "We define the useful actions, available analytics access and applicable consent requirements, then test the agreed events.",
      ],
    ],
    related: ["web-development", "software-development", "cloud-computing"],
    path: "/services/digital-marketing",
    environment: "growth",
  },
  {
    slug: "cloud-computing",
    title: "Cloud Computing Solutions",
    group: 1,
    scene: 5,
    accent: "cyan",
    headline: "Build, connect, and scale in the cloud.",
    description:
      "Plan and connect the infrastructure behind your business. From Azure and Google Cloud environments to Microsoft 365, email, domains and web hosting, we work through configuration, migration, storage, backup and cost decisions with clear ownership.",
    deliverables: [
      "A workload, account and dependency assessment covering cloud platforms, hosting, collaboration and current costs.",
      "An agreed configuration or migration plan, with domain, email, storage, access and backup decisions made explicit.",
      "Testing and a handover covering account ownership, restore expectations, operational checks and support boundaries.",
    ],
    problems: [
      [
        "Files scattered across devices",
        "We plan shared locations and access rules so people know where authoritative documents belong.",
      ],
      [
        "A confusing collaboration setup",
        "We distinguish conversations, shared files and email, then establish a practical structure for each.",
      ],
      [
        "Account changes create uncertainty",
        "We document onboarding, role changes and offboarding responsibilities around your tenant.",
      ],
    ],
    capabilities: [
      [
        "Azure & Google Cloud planning",
        "Review workload needs, existing accounts and access boundaries before selecting infrastructure and services.",
      ],
      [
        "Cloud migration",
        "Inventory data and dependencies, agree a staged transfer and check recovery and downtime constraints.",
      ],
      [
        "Microsoft 365 & business email",
        "Connect users, collaboration, shared files and domain email with documented tenant responsibilities.",
      ],
      [
        "Domains, DNS & web hosting",
        "Review records, certificates and deployment requirements, then configure a manageable hosting arrangement.",
      ],
      [
        "Storage & backup",
        "Agree retention, access and restore expectations, then document how backup health and recovery are checked.",
      ],
      [
        "Security configuration",
        "Review roles, least-privilege access and relevant configuration with the organisation; no compliance certification is implied.",
      ],
      [
        "Cost optimization",
        "Review the services and usage information available, identify unnecessary spend and agree safe changes.",
      ],
    ],
    processOutputs: [
      "An inventory of users, services, domains and access requirements.",
      "A scoped cloud architecture with licensing, migration and backup responsibilities.",
      "Configured services or a staged migration, checked against the agreed plan.",
      "Access documentation, recovery guidance and a practical administrator handover.",
    ],
    process: [
      [
        "Assess",
        "Review workloads, accounts, domains, current infrastructure and constraints.",
      ],
      [
        "Plan",
        "Agree platform choices, access, migration stages, recovery and costs.",
      ],
      [
        "Connect",
        "Configure or migrate the scoped services and test representative tasks.",
      ],
      [
        "Handover",
        "Document ownership, backup checks, billing responsibilities and ongoing care.",
      ],
    ],
    technologies: ["azure", "gcloud", "microsoft365"],
    examples: [
      [
        "A business cloud workspace",
        "An illustrative team connects Microsoft 365 email and files with a controlled account and permission structure.",
      ],
      [
        "A cloud application migration",
        "An illustrative application moves to an assessed Azure or Google Cloud environment with staged testing and a recovery plan.",
      ],
      [
        "A reliable hosting foundation",
        "An illustrative website needs domain/DNS configuration, hosting, certificates and documented backup responsibilities.",
      ],
    ],
    faqs: [
      [
        "Is this still your Microsoft 365 service?",
        "Yes. Microsoft 365 remains part of the renamed cloud service, alongside assessed infrastructure and hosting needs.",
      ],
      [
        "Can you work with Azure or Google Cloud?",
        "We review workloads, account access and required services before agreeing a feasible configuration or migration scope.",
      ],
      [
        "Who owns the cloud and domain accounts?",
        "Account ownership, billing access and administrator responsibilities are agreed explicitly and documented at handover.",
      ],
      [
        "Can you guarantee savings or uptime?",
        "No blanket savings or uptime promise is made. Recommendations depend on the environment, provider terms and agreed support.",
      ],
      [
        "Are backups enough to guarantee recovery?",
        "Recovery requires an agreed restore process and checks. We discuss retention, access and testing rather than assuming a backup is sufficient.",
      ],
    ],
    related: ["it-support", "erp-integration", "software-development"],
    path: "/services/cloud-computing",
    environment: "cloud",
  },
  {
    slug: "university-project-support",
    title: "University & Final-Year Project Support",
    group: 3,
    scene: 8,
    accent: "violet",
    headline: "From research ideas to practical innovation.",
    description:
      "Legitimate tutoring, mentoring and supervised development for your own research and final-year work. Explore machine learning workflows, web application architecture, dataset choices, testing, documentation and viva preparation within your institution’s rules.",
    deliverables: [
      "A reviewed research/project scope, assessment criteria and a mentoring plan consistent with your institution’s support rules.",
      "Guidance sessions around ML or application workflows, your own code, testing choices and research evidence.",
      "Documentation feedback and viva preparation that strengthen your explanation while preserving your authorship.",
    ],
    problems: [
      [
        "The project is too large for the available time",
        "We help distinguish the core question and minimum useful implementation from optional features.",
      ],
      [
        "Implementation choices lack a clear rationale",
        "We discuss alternatives and help you explain the decisions your project depends on.",
      ],
      [
        "The project works but the evidence is weak",
        "We help plan testing and documentation that connect the result to the original objectives.",
      ],
    ],
    capabilities: [
      [
        "Research methodology",
        "Refine the question, plan an appropriate method and discuss ethical and assessment constraints.",
      ],
      [
        "Dataset selection",
        "Review relevance, provenance, permissions, bias and the split between training and evaluation data.",
      ],
      [
        "Machine learning workflow",
        "Explain preprocessing, baselines and training choices while keeping the learner responsible for their own implementation.",
      ],
      [
        "Model evaluation",
        "Discuss appropriate metrics, leakage risks, error analysis and honest reporting of limitations.",
      ],
      [
        "Web application mentoring",
        "Review frontend/backend responsibilities, database choices and a manageable project architecture.",
      ],
      [
        "Testing & documentation",
        "Connect objectives, implementation, tests and evidence in a clear project and research report.",
      ],
      [
        "Code review & viva preparation",
        "Give actionable feedback and practise explaining decisions, results and limitations without ghostwriting.",
      ],
    ],
    processOutputs: [
      "A research question and learning plan aligned with your institution’s requirements.",
      "A justified technical approach, dataset plan and achievable evaluation criteria.",
      "Your own prototype, with mentoring around implementation, testing and interpretation.",
      "Feedback on your project documentation, limitations and viva preparation.",
    ],
    process: [
      [
        "Scope",
        "Review the proposal, assessment criteria and permitted support.",
      ],
      [
        "Plan",
        "Agree milestones and the technical concepts you need to understand.",
      ],
      [
        "Develop",
        "Review progress, discuss problems and explain implementation choices.",
      ],
      [
        "Demonstrate",
        "Prepare evidence, documentation and a presentation you can defend.",
      ],
    ],
    technologies: ["python", "react", "mysql", "github"],
    examples: [
      [
        "A carefully evaluated ML prototype",
        "An illustrative student needs to justify dataset selection, establish a baseline and discuss model errors rather than chase an unsupported result.",
      ],
      [
        "A final-year web application",
        "An illustrative student needs mentoring on architecture, implementation milestones and evaluation of their own working prototype.",
      ],
      [
        "A clearer research presentation",
        "An illustrative student needs to connect methodology, evidence and limitations into a report and viva they can explain.",
      ],
    ],
    faqs: [
      [
        "Will you write or submit assessed work for me?",
        "No. This service provides legitimate tutoring, mentoring, supervised development and feedback on your own work.",
      ],
      [
        "Can you help select an ML dataset?",
        "Yes. We discuss provenance, permission, suitability and bias, but do not invent data or research results.",
      ],
      [
        "Can you guarantee a high grade or model accuracy?",
        "No. Assessment and results depend on your work, evidence and the institution’s criteria.",
      ],
      [
        "What does viva preparation include?",
        "We review how you explain the question, method, code, tests and limitations, then practise relevant questions.",
      ],
      [
        "Can you review an existing project?",
        "Yes, after checking the scope, technical requirements and permitted form of external assistance.",
      ],
    ],
    related: ["software-development", "web-development", "it-support"],
    path: "/services/university-project-support",
    environment: "research",
  },
  {
    slug: "it-support",
    title: "IT Support & Infrastructure",
    group: 1,
    scene: 2,
    accent: "cyan",
    headline: "Technology that works. Support that delivers.",
    description:
      "Structured L1/L2 troubleshooting for Windows endpoints, connectivity and everyday business tools. We organise ticket triage and escalation, investigate DNS, DHCP, VPN and Wi-Fi issues, and scope patching, endpoint protection and Jenkins pipeline diagnostics.",
    deliverables: [
      "A recorded issue and impact assessment with ticket triage, access needs and an agreed support scope.",
      "Scoped remote diagnosis, configuration or remediation, with testing of the original task and a clear escalation record.",
      "Support notes covering patch/endpoint responsibilities, relevant network checks and follow-up actions.",
    ],
    problems: [
      [
        "Recurring issues interrupt work",
        "We investigate symptoms and likely causes instead of repeatedly applying an unexplained workaround.",
      ],
      [
        "New tools are difficult to adopt",
        "We plan setup and practical guidance around the tasks your team needs to complete.",
      ],
      [
        "Technical knowledge stays with one person",
        "We document settings and common support steps so responsibilities are clearer.",
      ],
    ],
    capabilities: [
      [
        "L1/L2 ticket triage",
        "Record symptoms, impact and reproducible steps, then identify a sensible escalation path and ownership.",
      ],
      [
        "Remote Windows troubleshooting",
        "Investigate endpoint configuration, software issues and permissions through an agreed remote-access arrangement.",
      ],
      [
        "Network connectivity",
        "Work through DNS, DHCP, VPN and Wi-Fi checks in the environment and access available.",
      ],
      [
        "Patch management",
        "Assess update responsibilities, compatibility and maintenance windows before applying agreed changes.",
      ],
      [
        "Endpoint protection",
        "Review configured protection, access and practical remediation steps; no managed security certification is implied.",
      ],
      [
        "Jenkins CI/CD diagnostics",
        "Investigate pipeline failures, agent availability and build logs within the agreed development environment, not as a ticketing platform.",
      ],
      [
        "Escalation & documentation",
        "Record the resolution, remaining limits and the hand-off needed for specialist or vendor investigation.",
      ],
    ],
    processOutputs: [
      "A triaged ticket with symptoms, impact and escalation responsibilities recorded.",
      "A documented diagnosis and agreed remediation or escalation plan.",
      "Checked corrective work, with change and patching records where relevant.",
      "Resolution notes, preventive recommendations and any remaining actions.",
    ],
    process: [
      [
        "Triage",
        "Record symptoms, user impact, urgency and relevant environment information.",
      ],
      [
        "Investigate",
        "Review logs and reproduce the issue through an agreed remote or local access method.",
      ],
      [
        "Resolve or escalate",
        "Apply an approved correction or document the evidence needed for the next support tier.",
      ],
      [
        "Record",
        "Confirm the result and document follow-up, prevention and ownership.",
      ],
    ],
    technologies: ["microsoft365", "windows", "jenkins"],
    examples: [
      [
        "A connectivity investigation",
        "An illustrative office needs structured DNS, DHCP, VPN and Wi-Fi troubleshooting around a reproducible access problem.",
      ],
      [
        "An endpoint maintenance review",
        "An illustrative team needs patch responsibilities, update checks and protection settings made clear.",
      ],
      [
        "A failed Jenkins pipeline",
        "An illustrative development team needs help reading build logs and checking an unavailable agent or configuration change.",
      ],
    ],
    faqs: [
      [
        "Do you offer 24/7 remote support?",
        "24/7 operations have not been confirmed. Availability, response arrangements and support windows must be agreed; this page does not advertise round-the-clock coverage.",
      ],
      [
        "What does L1/L2 support cover?",
        "We scope triage, everyday troubleshooting and escalation around the environment. Specialist/vendor issues may require a separate hand-off.",
      ],
      [
        "Is Jenkins a ticketing system?",
        "No. Jenkins is covered here only for CI/CD and pipeline troubleshooting.",
      ],
      [
        "Will you need remote or administrator access?",
        "Some tasks require it. We agree the minimum access, approval and removal responsibilities before starting.",
      ],
      [
        "Can you guarantee that every incident is resolved?",
        "No. We diagnose and address the agreed work, document limitations and escalate where another provider or specialist is needed.",
      ],
    ],
    related: ["cloud-computing", "erp-integration", "software-development"],
    path: "/services/it-support",
    environment: "operations",
  },
  {
    slug: "erp-integration",
    title: "ERP & CRM Integration",
    group: 1,
    scene: 6,
    accent: "mint",
    headline: "One connected business. Endless possibilities.",
    description:
      "Connect customer relationships with business operations. We assess Salesforce, SAP, Zoho, NetSuite, Odoo and Dynamics 365 interfaces, then plan implementation support, migration, synchronization and reporting around your actual processes.",
    deliverables: [
      "A process and data map identifying source systems, ownership, field mappings and integration boundaries.",
      "Agreed system connections with validation, exception handling and representative end-to-end tests.",
      "Integration documentation, operational guidance and a clear record of dependencies and support responsibilities.",
    ],
    problems: [
      [
        "Different systems tell different stories",
        "We establish which system owns each record and how updates should move between tools.",
      ],
      [
        "Teams repeatedly copy information",
        "We target repeatable data transfers while preserving checks that require human judgement.",
      ],
      [
        "An integration fails silently",
        "We define failure handling and practical review steps so missing information can be investigated.",
      ],
    ],
    capabilities: [
      [
        "Platform assessment",
        "Review Salesforce, SAP, Zoho, NetSuite, Odoo or Dynamics 365 interfaces, licensing and access before committing to a connection.",
      ],
      [
        "Implementation support",
        "Help map requirements and configuration decisions within an agreed platform and vendor-supported scope.",
      ],
      [
        "CRM integration",
        "Connect customer identifiers and relationship data with operational records using explicit ownership rules.",
      ],
      [
        "API connectivity",
        "Review supported authentication, rate limits and error behaviour before moving information between systems.",
      ],
      [
        "Data migration",
        "Plan field mapping, validation, representative imports and reconciliation of transferred records.",
      ],
      [
        "Inventory, sales & finance",
        "Trace the business records each team needs and preserve meaningful approval and reconciliation checkpoints.",
      ],
      [
        "Synchronization & automation",
        "Define direction, conflicts, exceptions and human decisions so updates do not create hidden duplicate work.",
      ],
      [
        "Reporting & handover",
        "Prepare useful data flows and document dependencies, operational checks and support responsibilities.",
      ],
    ],
    processOutputs: [
      "A map of business workflows, data owners and systems to connect.",
      "An integration design covering field mappings, permissions and error handling.",
      "A tested connection or migration increment, with exceptions reviewed.",
      "Reconciliation evidence, operating notes and an administrator handover.",
    ],
    process: [
      [
        "Trace",
        "Follow information through current tools and identify repeated work.",
      ],
      [
        "Specify",
        "Agree source ownership, mapping rules and supported integration interfaces.",
      ],
      [
        "Connect",
        "Implement and test the connection with representative records and failure cases.",
      ],
      [
        "Handover",
        "Document operation, monitoring and the limits of the integration.",
      ],
    ],
    technologies: [
      "salesforce",
      "sap",
      "zoho",
      "netsuite",
      "odoo",
      "dynamics365",
    ],
    examples: [
      [
        "A sales-to-operations hand-off",
        "An illustrative business needs accepted CRM opportunities to become validated operational records without duplicate entry.",
      ],
      [
        "An inventory data connection",
        "An illustrative team needs consistent product identifiers and a supported synchronization flow across existing tools.",
      ],
      [
        "A reconciled finance feed",
        "An illustrative organisation needs defined data mapping and review checkpoints before operational records inform financial reporting.",
      ],
    ],
    faqs: [
      [
        "Are you an official partner of these vendors?",
        "No vendor partnership or certification is claimed. Platform support is assessed against the project and vendor-supported interfaces.",
      ],
      [
        "Can you connect every ERP or CRM?",
        "Feasibility depends on the platform, licensing, access, documentation and supported APIs; we assess those first.",
      ],
      [
        "Does implementation support replace the vendor?",
        "No. We agree the configuration and integration work we can support, along with responsibilities retained by your provider.",
      ],
      [
        "How will migrated data be checked?",
        "We define mappings, validation, sample imports and reconciliation steps before a full transfer.",
      ],
      [
        "Can synchronization be bidirectional?",
        "Only where source ownership, conflict rules and supported interfaces make it appropriate.",
      ],
    ],
    related: ["software-development", "cloud-computing", "it-support"],
    path: "/services/erp-integration",
    environment: "enterprise",
  },
];
export const legacyServiceAliases = {
  "web-design-development": "web-development",
  "custom-software-web-applications": "software-development",
  ecommerce: "web-development",
  "ux-ui-design": "web-development",
  "microsoft-365-cloud": "cloud-computing",
  "erp-business-integration": "erp-integration",
  "it-support-infrastructure": "it-support",
  "workflow-automation": "erp-integration",
  "social-media-marketing": "digital-marketing",
  "seo-digital-marketing": "digital-marketing",
  "content-writing-creative-services": "digital-marketing",
  "digital-marketing-strategy": "digital-marketing",
  "academic-support": "university-project-support",
  "final-year-projects": "university-project-support",
  "research-technical-documentation": "university-project-support",
  "project-development-mentoring": "university-project-support",
};
export const serviceBySlug = Object.fromEntries(
  servicePages.map((service) => [service.slug, service]),
);
for (const [alias, target] of Object.entries(legacyServiceAliases))
  serviceBySlug[alias] = serviceBySlug[target];
export const serviceGroups = [
  "Digital experiences",
  "Connected operations",
  "Brands with momentum",
  "Learning & project guidance",
];
export const serviceGroupSlugs = serviceGroups.map((_, index) =>
  servicePages
    .filter((service) => service.group === index)
    .map((service) => service.slug),
);
export const homeCapabilitySlugs = [
  [
    "web-development",
    "software-development",
    "web-development",
    "web-development",
  ],
  ["cloud-computing", "erp-integration", "it-support", "erp-integration"],
  [
    "digital-marketing",
    "digital-marketing",
    "digital-marketing",
    "digital-marketing",
  ],
  [
    "university-project-support",
    "university-project-support",
    "university-project-support",
    "university-project-support",
  ],
];
export const homeServiceSlugs = [
  "software-development",
  "web-development",
  "it-support",
  "digital-marketing",
  "digital-marketing",
  "cloud-computing",
  "erp-integration",
  "digital-marketing",
  "university-project-support",
];
export { technologyNames } from "./service-technologies.js";
