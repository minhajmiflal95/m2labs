// Illustrative briefs only: these are not verified completed client engagements.
export const selectedWork = [
  {
    id: "retail-pos",
    category: "Business software",
    label: "Concept project",
    title: "Retail Inventory & POS",
    scene: 0,
    service: "software-development",
    description:
      "A stock and sales platform concept for Sri Lankan retailers, connecting the counter, purchasing and everyday reporting.",
    stack: [
      "Java",
      "Spring Boot",
      "React",
      "Node.js",
      "MySQL",
      "Apache Tomcat",
      "WebSockets",
      "Azure",
      "Maven",
    ],
    challenge:
      "Small retailers often reconcile sales, supplier purchases and stock across separate records. This concept brings those workflows into a shared, permission-based system with LKR pricing and clear audit trails.",
    approach: [
      [
        "At the counter",
        "A React cashier interface supports product search, sales, returns and shift reconciliation.",
      ],
      [
        "Behind the scenes",
        "Java and Spring Boot own stock and sales rules, with MySQL transactions and WebSocket updates between the counter and administration screens.",
      ],
      [
        "A practical deployment plan",
        "Maven packages the Java service for an Apache Tomcat deployment profile on Azure. Node.js integration workers can connect agreed peripheral or notification workflows.",
      ],
    ],
    scope: [
      "Stock, sales and purchasing workflow map",
      "Cashier and administrator interface prototypes",
      "API, audit and data model specification",
      "Testing, recovery and deployment checklist",
    ],
  },
  {
    id: "tourism-booking",
    category: "Web experiences",
    label: "Concept project",
    title: "Tourism Booking Experience",
    scene: 1,
    service: "web-development",
    description:
      "A mobile-first booking and enquiry journey for Sri Lankan guesthouses, boutique stays and hospitality businesses.",
    stack: ["Laravel", "PHP", "MySQL", "Responsive UI/UX"],
    challenge:
      "Visitors need clear room or experience information, date enquiries and an easy way to contact the operator from a phone. The concept keeps availability, booking requests and confirmed reservations clearly distinguished.",
    approach: [
      [
        "A considered first visit",
        "Responsive page layouts introduce the stay, location, inclusions and booking terms without overwhelming the mobile experience.",
      ],
      [
        "From enquiry to confirmation",
        "Laravel and PHP manage date requests and operator review, with MySQL recording enquiries and agreed reservation statuses.",
      ],
      [
        "Built for the operator",
        "A scoped administration workflow keeps content and availability manageable. Payment and third-party booking connections would be agreed separately.",
      ],
    ],
    scope: [
      "Mobile guest journey and page prototypes",
      "Availability and enquiry workflow",
      "Operator content and reservation views",
      "Accessibility and launch checklist",
    ],
  },
  {
    id: "sme-cloud",
    category: "Cloud & infrastructure",
    label: "Reference architecture",
    title: "SME Cloud & IT Infrastructure",
    scene: 5,
    service: "cloud-computing",
    description:
      "A reference architecture for a growing Sri Lankan team, connecting productivity, identity, endpoints and recovery planning.",
    stack: [
      "Microsoft 365",
      "Azure",
      "Microsoft Entra ID",
      "Microsoft Intune",
      "Azure Backup",
    ],
    challenge:
      "As a team grows, shared credentials, unmanaged devices and unclear recovery responsibilities become difficult to maintain. This reference outlines a consistent operating model with scoped access and ownership.",
    approach: [
      [
        "Identity comes first",
        "Microsoft Entra ID and Microsoft 365 define users, access groups and an agreed sign-in policy, subject to the available licensing.",
      ],
      [
        "Manage the everyday estate",
        "Microsoft Intune supports an agreed Windows endpoint configuration, patching and device management plan.",
      ],
      [
        "Prepare for recovery",
        "Azure Backup covers scoped server or file workloads. Microsoft 365 mailbox retention and recovery require their own agreed configuration and backup assessment.",
      ],
    ],
    scope: [
      "User, device and domain inventory",
      "Identity and endpoint policy blueprint",
      "Backup scope and recovery runbook",
      "Licensing and administrator handover plan",
    ],
  },
  {
    id: "gem-digital-growth",
    category: "Digital strategy",
    label: "Campaign concept",
    title: "Local Business Digital Growth",
    scene: 4,
    service: "digital-marketing",
    description:
      "An illustrative growth strategy for a Sri Lankan gem business, combining credible storytelling, search discovery and qualified enquiries.",
    stack: [
      "SEO",
      "Meta Ads",
      "Google Analytics",
      "Branding",
      "Content strategy",
      "Lead generation",
    ],
    challenge:
      "A gem business needs useful product information, a consistent identity and a clear enquiry journey. This concept builds a campaign around audience questions, product provenance fields and an agreed content review process.",
    approach: [
      [
        "Give the brand a clear voice",
        "An editorial direction connects product photography, provenance information and useful educational content.",
      ],
      [
        "Connect discovery to enquiry",
        "SEO page planning and Meta campaign concepts guide visitors to relevant collections and a simple enquiry form.",
      ],
      [
        "Make measurement useful",
        "A consent-aware Google Analytics plan identifies enquiry events and campaign attribution. Budget, account access and reporting would be scoped before implementation.",
      ],
    ],
    scope: [
      "Audience and brand messaging brief",
      "SEO content and landing-page plan",
      "Meta creative and campaign outline",
      "Enquiry tracking and reporting specification",
    ],
  },
  {
    id: "erp-inventory",
    category: "Connected operations",
    label: "Integration concept",
    title: "ERP Sales & Inventory Integration",
    scene: 6,
    service: "erp-integration",
    description:
      "A sample workflow connecting sales orders, stock movements and reporting across a storefront and an ERP platform.",
    stack: ["Odoo", "PostgreSQL", "REST APIs", "Webhooks", "Data mapping"],
    challenge:
      "Repeated entry across a sales channel and an ERP can leave teams unsure which record is current. This concept defines data ownership and a traceable order-to-stock workflow using Odoo as the reference ERP.",
    approach: [
      [
        "Agree the source of truth",
        "Map products, customers, orders and stock locations, with a clear owner for each field.",
      ],
      [
        "Keep updates traceable",
        "REST connections and webhooks pass agreed events, with duplicate handling, retry policies and an exception queue. Odoo uses its PostgreSQL data layer.",
      ],
      [
        "Make reconciliation part of the design",
        "Proposed reports compare orders, stock movements and integration exceptions before an administrator handover.",
      ],
    ],
    scope: [
      "System and data ownership map",
      "Order and inventory integration sequence",
      "Error-handling and reconciliation plan",
      "Test cases and operating documentation",
    ],
  },
  {
    id: "research-ml",
    category: "Research & learning",
    label: "Research concept",
    title: "University Research & ML Application",
    scene: 8,
    service: "university-project-support",
    description:
      "A student-led final-year research concept pairing a machine-learning workflow, web dashboard and structured project documentation.",
    stack: ["Python", "scikit-learn", "FastAPI", "React", "Jupyter"],
    challenge:
      "A final-year project needs an achievable research question and a demonstrable application. This concept explores a licensed public weather dataset and documents each experimental decision and limitation.",
    approach: [
      [
        "Start with a research plan",
        "Define a question, review the dataset licence and agree baseline comparisons and evaluation criteria.",
      ],
      [
        "Connect research to an application",
        "A Python and scikit-learn pipeline informs a FastAPI service and React dashboard for presenting predictions and evaluation outputs.",
      ],
      [
        "Explain the work clearly",
        "Jupyter notebooks, reproducibility notes and structured documentation support the student’s own analysis and viva preparation. No model accuracy or completed study is claimed.",
      ],
    ],
    scope: [
      "Research question and dataset plan",
      "Prototype architecture and experiment outline",
      "Dashboard interface concept",
      "Documentation and evaluation structure",
    ],
  },
];
