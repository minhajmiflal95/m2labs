// Logos identify platforms; capabilities such as PPC and branding are never given fake product logos.
export const technologyCatalog = {
  figma: {
    name: "Figma",
    category: "Design",
    description: "Interface design, wireframes and reviewable prototypes.",
  },
  html5: {
    name: "HTML5",
    category: "Web foundations",
    description: "Semantic document structure and accessible web content.",
  },
  css3: {
    name: "CSS3",
    category: "Web foundations",
    description: "Responsive layout, typography and interface presentation.",
  },
  javascript: {
    name: "JavaScript",
    category: "Web foundations",
    description: "Purposeful browser interactions and application behaviour.",
  },
  react: {
    name: "React.js",
    category: "Interfaces",
    description: "Reusable frontend components for websites and applications.",
  },
  wordpress: {
    name: "WordPress",
    category: "Web platforms",
    description: "Managed content publishing and agreed storefront workflows.",
  },
  nodejs: {
    name: "Node.js",
    category: "Backend",
    description: "JavaScript services, APIs and scoped business logic.",
  },
  java: {
    name: "Java",
    category: "Backend",
    description: "Backend services selected around the existing environment.",
  },
  mongodb: {
    name: "MongoDB",
    category: "Databases",
    description: "Document-oriented data models where the workload fits.",
  },
  mysql: {
    name: "MySQL",
    category: "Databases",
    description: "Relational data architecture and validated business records.",
  },
  github: {
    name: "GitHub",
    category: "Development",
    description: "Version control, code review and traceable releases.",
  },
  android: {
    name: "Android",
    category: "Mobile",
    description: "Mobile application interfaces and device-specific workflows.",
  },
  meta: {
    name: "Meta",
    category: "Advertising",
    description: "Facebook and Instagram campaign accounts and creative.",
  },
  ahrefs: {
    name: "Ahrefs",
    category: "Search research",
    description:
      "Licensed search, keyword and competitor research; access is scoped.",
  },
  analytics: {
    name: "Google Analytics",
    category: "Measurement",
    description: "Consent-aware events, conversion definitions and reporting.",
  },
  azure: {
    name: "Microsoft Azure",
    category: "Cloud platforms",
    description: "Assessed cloud infrastructure, configuration and migration.",
  },
  gcloud: {
    name: "Google Cloud",
    category: "Cloud platforms",
    description: "Workload-specific infrastructure and cloud service planning.",
  },
  microsoft365: {
    name: "Microsoft 365",
    category: "Collaboration",
    description:
      "Business email, files, users and collaboration configuration.",
  },
  windows: {
    name: "Windows",
    category: "Endpoints",
    description: "Endpoint configuration, updates and remote troubleshooting.",
  },
  jenkins: {
    name: "Jenkins",
    category: "CI/CD diagnostics",
    description:
      "Build pipelines, agents and logs; Jenkins is not a ticketing tool.",
  },
  salesforce: {
    name: "Salesforce",
    category: "ERP & CRM",
    description: "Supported CRM interfaces and customer-record integration.",
  },
  sap: {
    name: "SAP",
    category: "ERP & CRM",
    description:
      "Vendor-supported operational interfaces and implementation support.",
  },
  zoho: {
    name: "Zoho",
    category: "ERP & CRM",
    description: "Supported business-tool and CRM connections.",
  },
  netsuite: {
    asset: "netsuite.png",
    name: "Oracle NetSuite",
    category: "ERP & CRM",
    description:
      "Assessed ERP interfaces, records and integration requirements.",
  },
  odoo: {
    name: "Odoo",
    category: "ERP & CRM",
    description:
      "Business modules, configuration and supported data connections.",
  },
  dynamics365: {
    name: "Microsoft Dynamics 365",
    category: "ERP & CRM",
    description:
      "Assessed business and CRM interfaces with explicit ownership rules.",
  },
  python: {
    name: "Python",
    category: "Research & development",
    description:
      "Learner-owned data preparation, ML experimentation and technical projects.",
  },
  php: {
    name: "PHP",
    category: "Web platforms",
    description: "Existing PHP and WordPress environments where relevant.",
  },
};
export const technologyNames = Object.fromEntries(
  Object.entries(technologyCatalog).map(([key, value]) => [key, value.name]),
);

export const technologyAsset = (key) =>
  `/images/technologies/${technologyCatalog[key]?.asset || key + ".svg"}`;
