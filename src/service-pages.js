// Every item maps to a capability already advertised in data.js or ServiceFlow.
const define = (
  slug,
  title,
  group,
  scene,
  accent,
  headline,
  description,
  deliverables,
  problems,
  capabilities,
  process,
  technologies,
  examples,
  faqs,
  related,
) => ({
  slug,
  title,
  group,
  scene,
  accent,
  headline,
  description,
  deliverables,
  problems,
  capabilities,
  process,
  technologies,
  examples,
  faqs,
  related,
  path: `/services/${slug}`,
});
export const servicePages = [
  define(
    "web-design-development",
    "Web Design & Development",
    0,
    1,
    "cyan",
    "A digital home that feels like you.",
    "Clear structure, purposeful design and responsive development. We create websites that explain your business, help people find what matters and make the next step easy.",
    [
      "An agreed sitemap, page layouts and content direction, shaped around the questions your visitors bring.",
      "Responsive development with reusable components, accessible interactions and considered image performance.",
      "A tested launch, practical editing guidance and a handover covering hosting, content and maintenance responsibilities.",
    ],
    [
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
    [
      [
        "Information architecture",
        "Turn a long list of pages into a navigable structure, with clear labels and a useful hierarchy.",
      ],
      [
        "Responsive interface design",
        "Create adaptable layouts, legible typography and consistent components across phones, tablets and laptops.",
      ],
      [
        "Front-end development",
        "Build purposeful interfaces with reusable components rather than treating every page as an isolated screen.",
      ],
      [
        "Content integration",
        "Place your copy and media in context, including headings, image descriptions and enquiry prompts.",
      ],
      [
        "Accessibility and performance",
        "Review keyboard paths, contrast, image sizing and loading behaviour as part of development.",
      ],
      [
        "Launch preparation",
        "Check links, forms and deployment settings, then document the changes needed to keep the website healthy.",
      ],
    ],
    [
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
    ["figma", "react", "typescript", "wordpress", "github"],
    [
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
    [
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
    [
      "ux-ui-design",
      "content-writing-creative-services",
      "seo-digital-marketing",
    ],
  ),
  define(
    "custom-software-web-applications",
    "Custom Software & Web Applications",
    0,
    0,
    "violet",
    "Software shaped around the way you work.",
    "When spreadsheets and disconnected tools slow people down, a focused web application can create a clearer working day. We turn your actual workflows into interfaces, data structures and working software.",
    [
      "A documented feature scope, user journeys and data model that make the first useful release concrete.",
      "A working application with agreed roles, forms, validation and integrations, developed in reviewable stages.",
      "Testing, deployment notes and a handover covering access, backups, known limitations and ongoing support options.",
    ],
    [
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
    [
      [
        "Workflow discovery",
        "Map real tasks and exception cases with the people responsible for completing them.",
      ],
      [
        "Application interfaces",
        "Design understandable dashboards, forms and states that make everyday decisions easier.",
      ],
      [
        "Data modelling",
        "Define the records, relationships and validation rules required for consistent information.",
      ],
      [
        "Roles and permissions",
        "Agree who can view, change or approve information, and test the resulting access paths.",
      ],
      [
        "API integration",
        "Connect supported systems after reviewing their documentation, access requirements and failure modes.",
      ],
      [
        "Testing and handover",
        "Exercise key workflows, document deployment decisions and identify what needs ongoing monitoring.",
      ],
    ],
    [
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
    ["react", "nodejs", "typescript", "python", "mysql", "github"],
    [
      [
        "An enquiry tracking tool",
        "An example team needs shared enquiry status, ownership and follow-up notes instead of scattered spreadsheets.",
      ],
      [
        "An internal request portal",
        "An example organisation needs employees to submit requests and managers to track decisions in one place.",
      ],
      [
        "A scheduling workspace",
        "An example service business needs a web interface for availability, assignments and exception handling.",
      ],
    ],
    [
      [
        "How do we decide which features come first?",
        "We compare their practical value, dependencies and implementation effort, then agree the smallest release that solves a real problem.",
      ],
      [
        "Can the application connect to our current tools?",
        "We assess the tools’ supported APIs, permissions and data formats before promising an integration.",
      ],
      [
        "Who owns the application data?",
        "Data ownership, hosting accounts and access responsibilities are agreed before deployment and documented at handover.",
      ],
      [
        "Can you improve an existing application?",
        "Yes, subject to reviewing the codebase, dependencies, infrastructure and available test coverage.",
      ],
      [
        "Is maintenance automatic after launch?",
        "No. Monitoring, fixes and feature development are scoped separately so you know what support is available.",
      ],
    ],
    ["ux-ui-design", "erp-business-integration", "workflow-automation"],
  ),
  define(
    "microsoft-365-cloud",
    "Microsoft 365 & Cloud Solutions",
    1,
    5,
    "cyan",
    "Your team. Connected wherever work happens.",
    "Bring email, files and collaboration into a considered Microsoft 365 setup. We review the way your team works, configure the agreed tools and help people use them with confidence.",
    [
      "A review of the tenant, users, licenses, collaboration needs and existing email or file setup.",
      "Agreed Microsoft 365 configuration and integration work, with access decisions and migration tasks documented.",
      "Team guidance and an administrator handover covering everyday use, account responsibilities and support needs.",
    ],
    [
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
    [
      [
        "Tenant review",
        "Understand current subscriptions, administrative access and configuration before making changes.",
      ],
      [
        "Email setup",
        "Review domains and mailbox requirements, then configure agreed email settings and migration steps.",
      ],
      [
        "Teams collaboration",
        "Organise teams and channels around actual work rather than creating unnecessary spaces.",
      ],
      [
        "File organisation",
        "Plan SharePoint or OneDrive locations, permissions and conventions for shared information.",
      ],
      [
        "Workflow connections",
        "Assess supported integrations with existing business tools and identify the right access model.",
      ],
      [
        "User guidance",
        "Explain practical tasks and give administrators a record of configuration decisions.",
      ],
    ],
    [
      [
        "Assess",
        "Review existing accounts, subscriptions, devices and collaboration requirements.",
      ],
      [
        "Plan",
        "Agree the tenant structure, access boundaries and any migration sequence.",
      ],
      [
        "Configure",
        "Set up and test the selected services with representative users.",
      ],
      [
        "Enable",
        "Share team guidance and document administration and support responsibilities.",
      ],
    ],
    ["microsoft365"],
    [
      [
        "A team moving to shared files",
        "An example business needs common project folders and clear permissions instead of emailing multiple document versions.",
      ],
      [
        "A new collaboration workspace",
        "An example distributed team needs a considered Teams structure and a practical introduction to its daily tools.",
      ],
      [
        "An account lifecycle review",
        "An example organisation needs repeatable steps for joining, changing roles and leaving the company.",
      ],
    ],
    [
      [
        "Do you provide Microsoft licenses?",
        "Licensing requirements and purchasing arrangements are discussed during scoping; no license resale or partner status is assumed.",
      ],
      [
        "Can you migrate existing email?",
        "We assess the source provider, mailbox sizes, access and downtime constraints before agreeing a migration plan.",
      ],
      [
        "Will all staff have access to all files?",
        "No. Access should reflect roles and collaboration needs; permission decisions are agreed with the organisation.",
      ],
      [
        "Can Microsoft 365 connect to another system?",
        "Possibly, depending on supported interfaces, tenant permissions and the other system’s licensing or API limits.",
      ],
      [
        "Is this a general cloud infrastructure service?",
        "This page focuses on Microsoft 365 and related collaboration integrations. Other infrastructure needs require a separate assessment.",
      ],
    ],
    [
      "it-support-infrastructure",
      "workflow-automation",
      "erp-business-integration",
    ],
  ),
  define(
    "erp-business-integration",
    "ERP & Business Integration",
    1,
    6,
    "mint",
    "One connected picture of your business.",
    "Reduce duplicate work between business systems. We map the information your operations depend on, assess supported integration options and build connections that are understandable and maintainable.",
    [
      "A process and data map identifying source systems, ownership, field mappings and integration boundaries.",
      "Agreed system connections with validation, exception handling and representative end-to-end tests.",
      "Integration documentation, operational guidance and a clear record of dependencies and support responsibilities.",
    ],
    [
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
    [
      [
        "Process mapping",
        "Document the operational steps an integration must support, including approvals and exceptions.",
      ],
      [
        "Data mapping",
        "Align identifiers, formats and required fields before information is transferred.",
      ],
      [
        "Supported APIs",
        "Review vendor documentation, permissions, rate limits and available interfaces.",
      ],
      [
        "Validation rules",
        "Check data quality and describe what happens when required information is missing.",
      ],
      [
        "Exception handling",
        "Plan retry or review paths that avoid duplicate records and hidden failures.",
      ],
      [
        "Operational handover",
        "Document dependencies, access ownership and troubleshooting steps for the people maintaining the connection.",
      ],
    ],
    [
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
    ["nodejs", "python", "mysql", "github"],
    [
      [
        "Orders moving into operations",
        "An example business needs accepted online orders to reach its operational system without repeated entry.",
      ],
      [
        "A shared customer record",
        "An example team needs consistent customer identifiers between its enquiry tool and business system.",
      ],
      [
        "A reconciled reporting feed",
        "An example manager needs scheduled, validated exports from existing tools for a consolidated view.",
      ],
    ],
    [
      [
        "Can you integrate any ERP platform?",
        "We assess each platform individually. Availability of supported APIs, vendor access and licensing determines what is feasible.",
      ],
      [
        "Will the integration replace our ERP?",
        "Usually the aim is to connect existing tools. Replacement is a separate project requiring its own business case.",
      ],
      [
        "Can data synchronise in both directions?",
        "Only when ownership and conflict rules are clear and the systems support it. Two-way sync is not automatically the right approach.",
      ],
      [
        "How are incorrect records handled?",
        "We agree validation and exception paths so invalid or incomplete records can be reviewed instead of silently accepted.",
      ],
      [
        "Can existing integrations be repaired?",
        "Yes, after reviewing their implementation, access credentials, logs and expected behaviour.",
      ],
    ],
    [
      "workflow-automation",
      "custom-software-web-applications",
      "microsoft-365-cloud",
    ],
  ),
  define(
    "seo-digital-marketing",
    "SEO & Digital Marketing",
    2,
    4,
    "amber",
    "Be useful. Be discoverable. Be chosen.",
    "Build organic visibility through clear content and a healthier website. We connect technical search foundations with audience intent and a practical digital marketing plan.",
    [
      "A website and search review with prioritised technical, content and navigation improvements.",
      "An agreed keyword and page-content direction, with scoped on-page updates and publishing recommendations.",
      "A measurement plan and review notes that separate observed results from assumptions about growth.",
    ],
    [
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
    [
      [
        "Search intent research",
        "Understand the questions people ask and which pages should answer them.",
      ],
      [
        "Technical website review",
        "Inspect crawlability, metadata, page organisation and avoidable performance problems.",
      ],
      [
        "On-page optimisation",
        "Improve titles, headings, descriptions and content structure without artificial keyword stuffing.",
      ],
      [
        "Internal linking",
        "Connect related information so visitors and crawlers can follow a coherent path.",
      ],
      [
        "Content priorities",
        "Plan useful updates and new material around realistic publishing capacity.",
      ],
      [
        "Performance review",
        "Use agreed metrics to understand patterns and decide the next improvement.",
      ],
    ],
    [
      [
        "Audit",
        "Review the site, audience and current visibility with the access available.",
      ],
      [
        "Prioritise",
        "Agree the pages and issues that deserve attention first.",
      ],
      [
        "Improve",
        "Apply scoped technical and content changes, checking their quality.",
      ],
      [
        "Review",
        "Monitor agreed indicators and refine the next set of actions.",
      ],
    ],
    ["wordpress", "github"],
    [
      [
        "A service-led search structure",
        "An example company needs individual service pages that answer specific customer questions and link to an enquiry.",
      ],
      [
        "A content refresh",
        "An example website has outdated information that needs clearer headings, accurate descriptions and useful internal links.",
      ],
      [
        "A launch search checklist",
        "An example redesign needs redirects, metadata and sitemap checks before replacing the previous website.",
      ],
    ],
    [
      [
        "Can you guarantee first-page rankings?",
        "No. Search outcomes depend on competition, site history, content quality and search engine decisions. We focus on transparent improvements.",
      ],
      [
        "How soon should we expect results?",
        "Timing varies. We agree a review period and track indicators without promising a fixed ranking deadline.",
      ],
      [
        "Do you write the website content?",
        "Content writing can be included as a defined deliverable or handled by your team with our guidance.",
      ],
      [
        "Does SEO require a new website?",
        "Not necessarily. Many improvements can be made to the current site after reviewing its platform and constraints.",
      ],
      [
        "Are paid ads included?",
        "Paid media is not automatically included. This engagement focuses on the agreed organic and marketing scope.",
      ],
    ],
    [
      "content-writing-creative-services",
      "web-design-development",
      "digital-marketing-strategy",
    ],
  ),
  define(
    "it-support-infrastructure",
    "IT Support & Infrastructure",
    1,
    2,
    "cyan",
    "Less interruption. A more dependable working day.",
    "Practical diagnosis and support for the devices, software and everyday systems your team relies on. We assess the issue first, explain the options and document what changes.",
    [
      "A review of the reported issue, affected equipment and available diagnostic information.",
      "Agreed troubleshooting, configuration or setup work with checks that the original problem is addressed.",
      "Clear support notes, next actions and guidance on responsibilities, access and ongoing care.",
    ],
    [
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
    [
      [
        "Issue diagnosis",
        "Gather symptoms, reproduce the problem where possible and identify the next useful check.",
      ],
      [
        "Device setup",
        "Help configure agreed equipment and software with attention to users and access requirements.",
      ],
      [
        "Software troubleshooting",
        "Review settings, compatibility and recent changes before recommending a correction.",
      ],
      [
        "Connectivity assessment",
        "Check practical network and access issues within the agreed environment and available permissions.",
      ],
      [
        "System health reviews",
        "Identify maintenance concerns and prioritise actions that reduce everyday interruption.",
      ],
      [
        "Team guidance",
        "Explain common tasks and document how to raise or investigate future issues.",
      ],
    ],
    [
      [
        "Understand",
        "Gather symptoms, urgency, affected users and relevant environment details.",
      ],
      [
        "Diagnose",
        "Check likely causes and discuss changes that require access or downtime.",
      ],
      ["Resolve", "Apply the agreed correction and test the original task."],
      [
        "Document",
        "Record the result, follow-up actions and support boundaries.",
      ],
    ],
    ["microsoft365"],
    [
      [
        "A new employee setup",
        "An example business needs a device, software and account checklist for a new team member.",
      ],
      [
        "An everyday access problem",
        "An example team cannot reliably access a shared tool and needs structured troubleshooting.",
      ],
      [
        "A recurring software issue",
        "An example office needs a reproducible error investigated and the correction documented.",
      ],
    ],
    [
      [
        "Is support available around the clock?",
        "No response-time or 24/7 commitment is implied. Availability and urgency arrangements are agreed for each engagement.",
      ],
      [
        "Can you help remotely?",
        "Where access and the issue allow it. Some equipment or connectivity problems may require a separately arranged on-site assessment.",
      ],
      [
        "Will you need administrator access?",
        "Some work requires it. We identify the access needed and agree how it will be provided and removed.",
      ],
      [
        "Do you supply hardware?",
        "Hardware procurement is not assumed. We can discuss requirements and clarify any separate purchasing responsibility.",
      ],
      [
        "Can you maintain our whole infrastructure?",
        "We first assess the environment and required skills. The support scope must be agreed before making an ongoing commitment.",
      ],
    ],
    ["microsoft-365-cloud", "erp-business-integration", "workflow-automation"],
  ),
  define(
    "content-writing-creative-services",
    "Content Writing & Creative Services",
    2,
    7,
    "coral",
    "Clear words. A voice people recognise.",
    "Website copy, articles and editorial content that help people understand your business. We shape the message around your audience, your evidence and the action the content should support.",
    [
      "A content brief defining audience, tone, key messages, sources and the intended use of each piece.",
      "Original drafts for the agreed formats, with a structured feedback and revision process.",
      "Publication-ready copy and guidance on headings, placement and ongoing consistency.",
    ],
    [
      [
        "Complex ideas are hard to explain",
        "We structure the message around what readers need to know, using precise language and concrete detail.",
      ],
      [
        "Pages sound like different businesses",
        "We establish tone and terminology so the whole content experience feels consistent.",
      ],
      [
        "Writing keeps delaying launch",
        "We break the content scope into clear drafts, review responsibilities and approval milestones.",
      ],
    ],
    [
      [
        "Website copy",
        "Write page content that explains services and supports a useful next step.",
      ],
      [
        "Editorial articles",
        "Develop structured articles from a defined topic, audience and source material.",
      ],
      [
        "Brand voice",
        "Agree language choices and tone that reflect your business without unsupported claims.",
      ],
      [
        "Content planning",
        "Organise topics and formats around real publishing capacity and customer questions.",
      ],
      [
        "Editing and refinement",
        "Improve clarity, structure and consistency while preserving the intended meaning.",
      ],
      [
        "Technical explanation",
        "Translate supplied technical information into readable content, with subject-matter review where needed.",
      ],
    ],
    [
      [
        "Brief",
        "Agree audience, format, source material and what the content needs to accomplish.",
      ],
      [
        "Structure",
        "Develop the message hierarchy and outline before detailed drafting.",
      ],
      [
        "Write",
        "Create original drafts and work through agreed feedback rounds.",
      ],
      [
        "Prepare",
        "Deliver approved copy in the required format with publication notes.",
      ],
    ],
    ["microsoft365", "wordpress", "figma"],
    [
      [
        "A clearer services website",
        "An example company needs concise service descriptions and practical explanations of its delivery process.",
      ],
      [
        "An editorial series",
        "An example business needs a small set of useful articles based on its team’s subject expertise.",
      ],
      [
        "A product explanation",
        "An example software team needs readable feature descriptions, onboarding text and help content.",
      ],
    ],
    [
      [
        "Can you write from interviews or rough notes?",
        "Yes. We agree how information will be gathered and who will verify factual or technical statements.",
      ],
      [
        "Is research included?",
        "The research depth and source requirements are defined in the brief; specialist claims still need appropriate review.",
      ],
      [
        "How many revision rounds are included?",
        "The number and scope of rounds are agreed before drafting, along with who consolidates feedback.",
      ],
      [
        "Can content support SEO?",
        "Yes, when search intent and page goals are included in the brief. Useful writing takes priority over keyword repetition.",
      ],
      [
        "Will you publish the content for us?",
        "Writing and publishing are separate responsibilities unless platform access and publication work are explicitly included.",
      ],
    ],
    [
      "seo-digital-marketing",
      "social-media-marketing",
      "research-technical-documentation",
    ],
  ),
  define(
    "social-media-marketing",
    "Social Media Marketing",
    2,
    3,
    "coral",
    "Show up with something worth saying.",
    "Build a considered social presence with a clear voice, useful content and a publishing rhythm you can sustain. We plan around your audience and your business, not a generic calendar.",
    [
      "A channel and audience review, with agreed content themes and a practical publishing schedule.",
      "The scoped social copy and creative briefs or assets, organised for review and approval.",
      "A reporting approach and refinement notes tied to meaningful audience or enquiry goals.",
    ],
    [
      [
        "Posting feels inconsistent",
        "We establish useful themes, ownership and a manageable approval process.",
      ],
      [
        "Content gets attention but no connection",
        "We align each post with the audience’s interests and a relevant next step.",
      ],
      [
        "Every channel asks for more work",
        "We prioritise the platforms and formats your team can support well.",
      ],
    ],
    [
      [
        "Channel priorities",
        "Choose channels around audience behaviour and available capacity rather than trying to publish everywhere.",
      ],
      [
        "Content themes",
        "Build a repeatable mix of educational, explanatory and business-relevant material.",
      ],
      [
        "Social copy",
        "Write platform-appropriate captions and prompts in a consistent voice.",
      ],
      [
        "Creative coordination",
        "Develop clear visual briefs and adapt agreed materials to the required formats.",
      ],
      [
        "Campaign planning",
        "Connect a focused sequence of posts to a launch, announcement or defined objective.",
      ],
      [
        "Reporting and refinement",
        "Review the agreed indicators and use what is learned to improve the next content cycle.",
      ],
    ],
    [
      [
        "Listen",
        "Review current channels, audience needs and existing brand material.",
      ],
      [
        "Plan",
        "Agree content themes, formats, ownership and the publishing cadence.",
      ],
      [
        "Create",
        "Prepare the scoped content and consolidate feedback before publication.",
      ],
      [
        "Learn",
        "Review engagement and relevant business signals to refine the plan.",
      ],
    ],
    ["figma", "microsoft365"],
    [
      [
        "A service introduction series",
        "An example studio needs a concise sequence explaining its services and how to start a conversation.",
      ],
      [
        "A launch content calendar",
        "An example business needs coordinated posts and approval steps for a new offering.",
      ],
      [
        "A sustainable publishing rhythm",
        "An example small team needs fewer, stronger posts that fit its time and resources.",
      ],
    ],
    [
      [
        "Do you manage every social platform?",
        "We select the platforms relevant to the audience and scope. A channel is included only when it has a clear purpose and delivery plan.",
      ],
      [
        "Are paid campaigns included?",
        "Not automatically. Any paid-media scope, budget and account responsibilities must be agreed separately.",
      ],
      [
        "Can you work with our existing designer?",
        "Yes. We can supply content direction and creative briefs while your designer produces approved visual assets.",
      ],
      [
        "Who approves posts?",
        "Your nominated reviewer approves the agreed content before publication; responsibilities and review deadlines are documented.",
      ],
      [
        "Can you guarantee follower growth?",
        "No. We plan useful content and review performance without promising a fixed audience size or engagement rate.",
      ],
    ],
    [
      "digital-marketing-strategy",
      "content-writing-creative-services",
      "seo-digital-marketing",
    ],
  ),
  define(
    "ecommerce",
    "E-commerce Experiences",
    0,
    0,
    "mint",
    "Make buying feel considered, from first look to checkout.",
    "Design a clear product journey and a manageable online store. We work through catalogue structure, product information and the practical decisions behind payments, fulfilment and content updates.",
    [
      "A mapped storefront journey covering product discovery, product detail and the agreed checkout approach.",
      "Responsive store pages and catalogue setup with scoped product, payment and shipping configuration.",
      "A tested purchase path and editing handover, with provider costs and operational responsibilities documented.",
    ],
    [
      [
        "Products are hard to compare",
        "We organise categories and product information so shoppers can make informed choices.",
      ],
      [
        "Checkout creates uncertainty",
        "We clarify the steps, available payment options and purchase confirmation behaviour.",
      ],
      [
        "Store administration takes too much effort",
        "We agree a platform and catalogue workflow around the people maintaining the store.",
      ],
    ],
    [
      [
        "Catalogue structure",
        "Plan categories, filters and product attributes that fit the actual range.",
      ],
      [
        "Product presentation",
        "Create layouts for descriptions, images, options and important buying information.",
      ],
      [
        "Responsive storefronts",
        "Develop a consistent browsing and purchase journey across smaller and larger screens.",
      ],
      [
        "Checkout integration",
        "Configure supported payment and checkout services after reviewing provider requirements.",
      ],
      [
        "Operational configuration",
        "Agree shipping, order notifications and fulfilment responsibilities rather than assuming a process.",
      ],
      [
        "Store handover",
        "Explain editing, product updates and how to check the configured purchase flow.",
      ],
    ],
    [
      [
        "Scope",
        "Review the product range, selling locations and operational requirements.",
      ],
      ["Design", "Agree navigation, product pages and the purchase journey."],
      [
        "Configure",
        "Build the storefront and connect the selected supported services.",
      ],
      [
        "Test",
        "Exercise representative orders and hand over day-to-day store management.",
      ],
    ],
    ["wordpress", "react", "php", "mysql"],
    [
      [
        "A focused product catalogue",
        "An example local brand needs a small online range with clear variations and delivery information.",
      ],
      [
        "A store usability refresh",
        "An example retailer needs better product descriptions and mobile navigation on an existing platform.",
      ],
      [
        "A first online sales channel",
        "An example business needs to agree payment, shipping and order handling before launching a store.",
      ],
    ],
    [
      [
        "Which store platform should we choose?",
        "We compare catalogue size, editing needs, integrations and operating costs before choosing an appropriate approach.",
      ],
      [
        "Can you configure online payments?",
        "We can assess supported providers; merchant eligibility, account approval and transaction terms remain with the provider and business.",
      ],
      [
        "Will you upload every product?",
        "The number of products, variations and available materials are defined in the agreed content scope.",
      ],
      [
        "Are shipping and tax decisions included?",
        "We can configure agreed rules, but your business must provide appropriate operational and tax guidance.",
      ],
      [
        "Can you improve an existing store?",
        "Yes, after reviewing the platform, checkout, catalogue and extensions to identify safe changes.",
      ],
    ],
    ["web-design-development", "ux-ui-design", "erp-business-integration"],
  ),
  define(
    "ux-ui-design",
    "UX / UI Design",
    0,
    1,
    "violet",
    "Make the next step feel obvious.",
    "Design interfaces around the people using them. We clarify journeys, test the important decisions and create a coherent visual system before or alongside development.",
    [
      "A map of key user tasks, friction points and design priorities, grounded in the information available.",
      "Wireframes and interactive prototypes for the agreed journeys, with review decisions recorded.",
      "Responsive interface designs and component guidance that developers can implement consistently.",
    ],
    [
      [
        "People struggle to find the next action",
        "We simplify the hierarchy and make important states, labels and decisions clearer.",
      ],
      [
        "Features accumulate without a coherent journey",
        "We map the task from start to finish and remove unnecessary interruption.",
      ],
      [
        "Design and development drift apart",
        "We document component behaviour and collaborate around real implementation constraints.",
      ],
    ],
    [
      [
        "Journey mapping",
        "Describe users’ goals and the steps needed to complete them in context.",
      ],
      [
        "Interface reviews",
        "Identify friction in existing screens and prioritise changes with a clear rationale.",
      ],
      [
        "Wireframing",
        "Explore structure and interaction before investing in detailed visual treatment.",
      ],
      [
        "Interactive prototypes",
        "Make key journeys reviewable so stakeholders can discuss actual behaviour.",
      ],
      [
        "Visual systems",
        "Define reusable typography, spacing, colour and component patterns.",
      ],
      [
        "Developer handover",
        "Specify important states, responsive behaviour and decisions that affect implementation.",
      ],
    ],
    [
      [
        "Understand",
        "Review user goals, context, current interfaces and available evidence.",
      ],
      [
        "Explore",
        "Develop alternative structures and wireframes for the important tasks.",
      ],
      [
        "Refine",
        "Create a focused prototype and use feedback to resolve design decisions.",
      ],
      [
        "Handover",
        "Prepare responsive designs and component notes for development.",
      ],
    ],
    ["figma"],
    [
      [
        "A simpler onboarding flow",
        "An example application needs a clearer sequence for account setup and the first useful task.",
      ],
      [
        "A dashboard review",
        "An example internal tool needs a hierarchy that separates urgent actions from reference information.",
      ],
      [
        "A reusable interface kit",
        "An example growing product needs consistent forms, navigation and feedback states across features.",
      ],
    ],
    [
      [
        "Can you work without building the software?",
        "Yes. Design can be a standalone engagement, with a defined handover to your development team.",
      ],
      [
        "Is user research included?",
        "Research activities, participant access and the available evidence are agreed during scoping; research findings are not invented.",
      ],
      [
        "How many screens will you design?",
        "The scope identifies journeys, screens, states and responsive variations rather than only a headline screen count.",
      ],
      [
        "Can you use our existing brand?",
        "Yes. We review the supplied brand assets and adapt them into a practical interface system.",
      ],
      [
        "Will the prototype function as a real app?",
        "A prototype demonstrates interaction and structure; production data, business rules and integration require development.",
      ],
    ],
    ["custom-software-web-applications", "web-design-development", "ecommerce"],
  ),
  define(
    "workflow-automation",
    "Business Workflow Automation",
    1,
    6,
    "amber",
    "Give repetitive work a better route.",
    "Connect everyday tasks with clear rules and sensible human checkpoints. We identify repeatable work, assess the tools you already use and automate only the parts that are ready for it.",
    [
      "A workflow map documenting triggers, actions, approval points and exception conditions.",
      "A scoped automation using supported tools or integrations, with representative success and failure tests.",
      "Operating notes covering ownership, required access, recovery steps and changes that need review.",
    ],
    [
      [
        "Requests disappear between teams",
        "We define ownership, status and the hand-off that should follow each action.",
      ],
      [
        "Routine tasks require repeated copying",
        "We connect supported tools where the information and rules are reliable enough.",
      ],
      [
        "Automations are hard to troubleshoot",
        "We document the logic and design exceptions that people can understand and resolve.",
      ],
    ],
    [
      [
        "Workflow discovery",
        "Identify the actual sequence of tasks and where delays or repeated work occur.",
      ],
      [
        "Trigger design",
        "Agree precisely what starts the automation and which information must be present.",
      ],
      [
        "Approval checkpoints",
        "Preserve human decisions where judgement or accountability is required.",
      ],
      [
        "Tool connections",
        "Assess supported APIs or platform automation options before implementing a connection.",
      ],
      [
        "Exception paths",
        "Define what happens when data is missing, a service is unavailable or an action fails.",
      ],
      [
        "Ownership and review",
        "Document who checks the automation and what changes might invalidate its rules.",
      ],
    ],
    [
      [
        "Observe",
        "Map the current task and identify which steps are repeatable.",
      ],
      ["Specify", "Agree triggers, actions, approvals and exception paths."],
      ["Automate", "Build the scoped workflow and test realistic situations."],
      [
        "Maintain",
        "Explain operation, ownership and periodic checks for changed requirements.",
      ],
    ],
    ["microsoft365", "nodejs", "python", "github"],
    [
      [
        "An approval hand-off",
        "An example team needs a submitted request routed to the correct reviewer with a visible status.",
      ],
      [
        "A scheduled information transfer",
        "An example business needs a repeatable export checked and moved into a supported destination.",
      ],
      [
        "A new-record notification",
        "An example service team needs an alert and follow-up task when a relevant record is created.",
      ],
    ],
    [
      [
        "Should every step be automated?",
        "No. We retain manual review where inputs are uncertain or decisions require judgement.",
      ],
      [
        "Can this use our existing Microsoft 365 tools?",
        "We assess the available features, licenses and supported connections before deciding on the implementation.",
      ],
      [
        "What happens if another system is offline?",
        "The design includes an agreed exception or recovery path rather than assuming every action will succeed.",
      ],
      [
        "Will automation remove all manual checking?",
        "No. Ownership and periodic review remain necessary, especially when source tools or business rules change.",
      ],
      [
        "Can an existing automation be simplified?",
        "Yes. We can review its triggers, dependencies and failure paths before proposing a focused improvement.",
      ],
    ],
    [
      "erp-business-integration",
      "microsoft-365-cloud",
      "custom-software-web-applications",
    ],
  ),
  define(
    "digital-marketing-strategy",
    "Digital Marketing Strategy",
    2,
    4,
    "violet",
    "A clearer direction for your digital presence.",
    "Connect your audience, channels and content with a practical plan. We help you decide where to focus, what to communicate and how to review progress without spreading your team too thin.",
    [
      "An audience and channel review grounded in existing materials, available data and business goals.",
      "A prioritised marketing roadmap with messages, content themes and responsibilities for the agreed channels.",
      "A measurement framework and review cadence that makes the next decisions easier.",
    ],
    [
      [
        "Every channel feels urgent",
        "We compare the purpose and effort of each channel and establish a realistic order of priorities.",
      ],
      [
        "Messages change from campaign to campaign",
        "We develop a coherent message structure based on your actual offering and evidence.",
      ],
      [
        "Reporting does not inform decisions",
        "We select useful indicators and define how they will influence the next action.",
      ],
    ],
    [
      [
        "Audience definition",
        "Clarify who the business serves, what those people need and where assumptions require evidence.",
      ],
      [
        "Channel assessment",
        "Review the current website, search and social presence for gaps and opportunities.",
      ],
      [
        "Message planning",
        "Agree the central ideas and supporting information that each audience should encounter.",
      ],
      [
        "Content roadmaps",
        "Turn priorities into a workable sequence of topics, formats and publishing responsibilities.",
      ],
      [
        "Campaign coordination",
        "Connect a defined launch or initiative across the selected channels.",
      ],
      [
        "Measurement planning",
        "Choose indicators that fit the objective and the tracking available.",
      ],
    ],
    [
      [
        "Review",
        "Discuss objectives and examine the current digital presence and evidence.",
      ],
      [
        "Focus",
        "Choose audience priorities and the channels that can serve them well.",
      ],
      ["Plan", "Develop the messaging, content roadmap and ownership model."],
      [
        "Revisit",
        "Review agreed indicators and adjust priorities as evidence develops.",
      ],
    ],
    ["figma", "microsoft365"],
    [
      [
        "A first coordinated marketing plan",
        "An example business needs a focused website, search and social roadmap instead of disconnected activity.",
      ],
      [
        "A clearer launch strategy",
        "An example new service needs a defined audience, message and sequence of communications.",
      ],
      [
        "A capacity-aware content plan",
        "An example small team needs to choose which channels to maintain well within its available time.",
      ],
    ],
    [
      [
        "Is strategy separate from content production?",
        "Yes. A strategy engagement defines direction; writing, design, publishing and implementation are explicitly scoped deliverables.",
      ],
      [
        "What information should we bring?",
        "Current brand material, channel access or reports, customer questions, business goals and relevant constraints are useful starting points.",
      ],
      [
        "Will you recommend every channel?",
        "No. Recommendations reflect audience needs and the capacity to deliver useful work consistently.",
      ],
      [
        "Can you work with our internal team?",
        "Yes. The roadmap can identify actions your team owns and areas where external support is appropriate.",
      ],
      [
        "Can you guarantee enquiries or sales?",
        "No. We help clarify the plan and review evidence, without promising outcomes beyond our control.",
      ],
    ],
    [
      "social-media-marketing",
      "seo-digital-marketing",
      "content-writing-creative-services",
    ],
  ),
  define(
    "academic-support",
    "University Assignment Guidance",
    3,
    8,
    "mint",
    "Stronger work starts with stronger understanding.",
    "Practical tutoring, research guidance and writing feedback for your own university work. We help you interpret the brief, organise your argument and improve a draft you can understand and defend.",
    [
      "A discussion of the assignment requirements, assessment criteria and the assistance your institution permits.",
      "Structured guidance on research, planning, argument development or an existing draft, within the agreed scope.",
      "Feedback notes and next steps that help you revise your own work and explain the choices you make.",
    ],
    [
      [
        "The brief is difficult to interpret",
        "We break down the required task, deliverables and marking criteria into a practical plan.",
      ],
      [
        "Research does not form an argument",
        "We help you evaluate sources and connect evidence to the question you are answering.",
      ],
      [
        "A draft needs clearer structure",
        "We provide feedback on organisation and expression while preserving your authorship.",
      ],
    ],
    [
      [
        "Brief interpretation",
        "Discuss the task, constraints and assessment criteria before planning the work.",
      ],
      [
        "Topic scoping",
        "Refine a manageable direction that fits the assignment and available time.",
      ],
      [
        "Research guidance",
        "Help plan searches, evaluate sources and distinguish evidence from unsupported claims.",
      ],
      [
        "Outline feedback",
        "Review the argument structure and how each section contributes to the question.",
      ],
      [
        "Draft review",
        "Give specific feedback on clarity, reasoning and areas that need your revision.",
      ],
      [
        "Citation guidance",
        "Explain source attribution and help you check the required referencing approach.",
      ],
    ],
    [
      [
        "Clarify",
        "Review the brief and agree the permitted form of external support.",
      ],
      [
        "Plan",
        "Break the work into research, structure and writing milestones.",
      ],
      ["Review", "Discuss your own notes or draft and explain improvements."],
      [
        "Reflect",
        "Help you apply the feedback and prepare to explain your work.",
      ],
    ],
    ["microsoft365"],
    [
      [
        "Understanding an unfamiliar brief",
        "An example student needs tutoring to identify the question and plan a suitable research approach.",
      ],
      [
        "Improving an argument",
        "An example student has a draft that needs feedback on evidence, structure and reasoning.",
      ],
      [
        "Reviewing source use",
        "An example student needs guidance on citation choices and distinguishing quoted material from their own analysis.",
      ],
    ],
    [
      [
        "Will you write a submission for me?",
        "This service provides tutoring, planning and feedback on your work. You remain the author and follow your institution’s rules.",
      ],
      [
        "Can you help with an assignment already in progress?",
        "Yes. Bring the brief, your draft and the areas you find difficult so the support can be targeted.",
      ],
      [
        "Can you guarantee a grade?",
        "No. Assessment is the institution’s responsibility and depends on your work and the marking criteria.",
      ],
      [
        "How do you handle institution-specific rules?",
        "We ask you to provide the relevant guidance and agree support that fits those requirements.",
      ],
      [
        "Is proofreading the same as tutoring?",
        "No. The allowed extent of editing varies; we agree whether the engagement is explanation, feedback or permitted language review.",
      ],
    ],
    [
      "research-technical-documentation",
      "final-year-projects",
      "project-development-mentoring",
    ],
  ),
  define(
    "final-year-projects",
    "Final-Year Project Guidance",
    3,
    8,
    "violet",
    "An ambitious project you can explain.",
    "Turn an idea into a workable final-year project plan, then build your understanding alongside the implementation. We provide mentoring, technical review and documentation guidance within your institution’s requirements.",
    [
      "A reviewed proposal covering the question, scope, milestones and a feasible technical approach.",
      "Mentoring or review sessions around your implementation, testing and evidence of progress.",
      "Feedback on project documentation and presentation preparation, with ownership of the work remaining yours.",
    ],
    [
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
    [
      [
        "Proposal feedback",
        "Review the project question, objectives and practical constraints.",
      ],
      [
        "Architecture discussion",
        "Compare an appropriate structure and technology choices with the student’s experience.",
      ],
      [
        "Implementation mentoring",
        "Explain difficult concepts and support your own problem-solving process.",
      ],
      [
        "Code review",
        "Give actionable feedback on readability, behaviour and areas that need further work.",
      ],
      [
        "Testing guidance",
        "Help define evidence that shows whether the project meets its stated objectives.",
      ],
      [
        "Presentation preparation",
        "Review the explanation of the problem, approach, findings and limitations.",
      ],
    ],
    [
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
    ["react", "python", "mysql", "github"],
    [
      [
        "A manageable application project",
        "An example student needs to narrow a web application idea into a feasible assessed prototype.",
      ],
      [
        "A technical review milestone",
        "An example student needs feedback on their own code before testing a key workflow.",
      ],
      [
        "A stronger project explanation",
        "An example student needs help connecting implementation decisions to evaluation results and limitations.",
      ],
    ],
    [
      [
        "Do you build the whole project for me?",
        "This is guidance and mentoring for your own assessed work, not a substitute for your authorship or understanding.",
      ],
      [
        "Can you review a project in any language?",
        "We assess the requirements and our ability to give useful support before accepting the technical scope.",
      ],
      [
        "Can you join supervisor discussions?",
        "Any involvement must be agreed with you and fit your institution’s rules on external support.",
      ],
      [
        "Will you help prepare for a demonstration?",
        "Yes. We can review your explanation and suggest questions that test your understanding of the work.",
      ],
      [
        "Can you guarantee project approval?",
        "No. Topic approval and assessment decisions belong to your institution and supervisor.",
      ],
    ],
    [
      "project-development-mentoring",
      "research-technical-documentation",
      "academic-support",
    ],
  ),
  define(
    "research-technical-documentation",
    "Research & Technical Documentation",
    3,
    7,
    "amber",
    "Make the reasoning as clear as the result.",
    "Structure research notes and technical explanations into documents people can follow. We support source evaluation, project reporting and practical documentation, with evidence and authorship kept clear.",
    [
      "An agreed document outline, audience definition and source or evidence requirements.",
      "Guidance or scoped drafting/editing for the permitted document type, with factual review responsibilities identified.",
      "A reviewed document structure and recommendations for maintaining accuracy as the project or system changes.",
    ],
    [
      [
        "Information is scattered across notes",
        "We help organise the material into a sequence that supports a clear explanation.",
      ],
      [
        "Technical choices are not documented",
        "We identify the decisions, dependencies and limitations that a reader needs to understand.",
      ],
      [
        "Sources are difficult to evaluate",
        "We discuss relevance, evidence quality and how claims should be attributed.",
      ],
    ],
    [
      [
        "Research organisation",
        "Plan a useful structure for notes, source records and questions that remain open.",
      ],
      [
        "Source evaluation",
        "Review whether the available material supports the intended argument or technical claim.",
      ],
      [
        "Technical outlines",
        "Define the audience and organise a document around tasks, decisions or system behaviour.",
      ],
      [
        "Project reporting",
        "Help connect objectives, implementation, tests and limitations in a coherent account.",
      ],
      [
        "Usage documentation",
        "Explain agreed workflows and common tasks using accurate steps and terminology.",
      ],
      [
        "Review and editing",
        "Improve structure and readability while requiring appropriate factual and authorship review.",
      ],
    ],
    [
      [
        "Define",
        "Agree the document’s audience, purpose and any academic assistance rules.",
      ],
      [
        "Gather",
        "Organise the supplied sources, system details and available evidence.",
      ],
      [
        "Structure",
        "Develop or review the outline and the explanation of key decisions.",
      ],
      [
        "Validate",
        "Check the content with its owner and record any unresolved limitations.",
      ],
    ],
    ["microsoft365", "github"],
    [
      [
        "A project report review",
        "An example student needs feedback on how objectives, tests and findings connect in their own report.",
      ],
      [
        "A software handover document",
        "An example team needs installation notes, operating steps and known limitations organised for a new maintainer.",
      ],
      [
        "A research planning document",
        "An example learner needs a source-evaluation framework and a clear outline before writing.",
      ],
    ],
    [
      [
        "Can you verify technical facts without access to the system?",
        "Only to the extent the supplied evidence allows. The system owner must review statements that require direct operational knowledge.",
      ],
      [
        "Is this suitable for university reports?",
        "Yes, as guidance or permitted review. The institution’s rules determine what assistance is acceptable.",
      ],
      [
        "Will you invent findings or references?",
        "No. Claims and sources must be supported by real material supplied or properly researched.",
      ],
      [
        "Can you document an existing application?",
        "Yes, after agreeing access, the intended audience and the parts of the system to be documented.",
      ],
      [
        "Who keeps documentation current?",
        "Ownership and future updates are discussed at handover; a document cannot remain accurate without ongoing review.",
      ],
    ],
    [
      "content-writing-creative-services",
      "final-year-projects",
      "custom-software-web-applications",
    ],
  ),
  define(
    "project-development-mentoring",
    "Project Development & Mentoring",
    3,
    0,
    "cyan",
    "Build the skill behind the solution.",
    "Practical technical mentoring for learners developing their own projects. We work through concepts, review progress and help you diagnose problems so the next step becomes something you understand.",
    [
      "A learning and project review identifying the concepts, tasks and constraints that matter most.",
      "Agreed mentoring sessions, explanations or code reviews tied to your own implementation.",
      "Actionable feedback and practice steps that support continued development between sessions.",
    ],
    [
      [
        "A tutorial does not explain the problem",
        "We relate the concept to your actual task and work through the reasoning behind it.",
      ],
      [
        "Debugging becomes repeated guesswork",
        "We help you form a hypothesis, inspect evidence and test one change at a time.",
      ],
      [
        "Progress depends on outside help",
        "We focus on explanation and practice so you can make the next decision independently.",
      ],
    ],
    [
      [
        "Learning assessment",
        "Discuss your current understanding and choose a practical next learning goal.",
      ],
      [
        "Concept explanation",
        "Connect programming or system concepts to examples relevant to your own project.",
      ],
      [
        "Debugging guidance",
        "Use reproducible steps and evidence to investigate unexpected behaviour.",
      ],
      [
        "Code feedback",
        "Review readability, structure and correctness without replacing the learning process.",
      ],
      [
        "Development practices",
        "Introduce version control, task breakdown and useful testing habits.",
      ],
      [
        "Progress planning",
        "Set manageable practice tasks and review what has changed in your understanding.",
      ],
    ],
    [
      [
        "Discuss",
        "Review your project, current skills and the form of support you need.",
      ],
      [
        "Explain",
        "Work through the concepts behind a specific task or problem.",
      ],
      [
        "Practise",
        "Apply the ideas to your own implementation with targeted feedback.",
      ],
      ["Reflect", "Review the result and decide what to practise next."],
    ],
    ["react", "python", "typescript", "github"],
    [
      [
        "A first application workflow",
        "An example learner needs guidance on how inputs, state and data connect in their own small application.",
      ],
      [
        "A debugging session",
        "An example student has a reproducible error and wants to learn how to investigate it systematically.",
      ],
      [
        "A code review conversation",
        "An example developer wants feedback on the structure and maintainability of a personal project.",
      ],
    ],
    [
      [
        "Is mentoring limited to assessed projects?",
        "No. It can support personal learning projects as well; assessed work must follow the relevant institution’s rules.",
      ],
      [
        "Will you complete tasks instead of teaching me?",
        "The aim is explanation, review and guided practice so you can understand and develop your own solution.",
      ],
      [
        "Which technologies can we discuss?",
        "We assess your project and the requested topics before agreeing a mentoring scope.",
      ],
      [
        "What should I prepare for a session?",
        "Bring the code or problem, the steps to reproduce it, your current understanding and the questions you want to resolve.",
      ],
      [
        "How is progress measured?",
        "We review what you can explain and complete independently, rather than promising a certificate or guaranteed academic result.",
      ],
    ],
    [
      "final-year-projects",
      "academic-support",
      "research-technical-documentation",
    ],
  ),
];
export const serviceBySlug = Object.fromEntries(
  servicePages.map((service) => [service.slug, service]),
);
export const serviceGroups = [
  "Digital experiences",
  "Connected operations",
  "Brands with momentum",
  "Learning & project guidance",
];
export const homeServiceSlugs = [
  "custom-software-web-applications",
  "web-design-development",
  "it-support-infrastructure",
  "social-media-marketing",
  "seo-digital-marketing",
  "microsoft-365-cloud",
  "erp-business-integration",
  "content-writing-creative-services",
  "academic-support",
];
export const technologyNames = {
  react: "React",
  nodejs: "Node.js",
  typescript: "TypeScript",
  python: "Python",
  mysql: "MySQL",
  php: "PHP",
  wordpress: "WordPress",
  github: "GitHub",
  figma: "Figma",
  microsoft365: "Microsoft 365",
};
export const serviceGroupSlugs = [
  [
    "web-design-development",
    "custom-software-web-applications",
    "ecommerce",
    "ux-ui-design",
  ],
  [
    "microsoft-365-cloud",
    "erp-business-integration",
    "it-support-infrastructure",
    "workflow-automation",
  ],
  [
    "social-media-marketing",
    "seo-digital-marketing",
    "content-writing-creative-services",
    "digital-marketing-strategy",
  ],
  [
    "academic-support",
    "final-year-projects",
    "research-technical-documentation",
    "project-development-mentoring",
  ],
];
