export const services = [
  {
    id: "01",
    name: "Digital experiences.",
    caption: "DESIGNED TO CONNECT",
    description:
      "From the first impression to the last interaction. Thoughtful websites and applications that turn visitors into your next customers.",
    items: [
      "Web design & development",
      "Custom web applications",
      "E-commerce experiences",
      "UX / UI design",
    ],
    className: "digital",
    visual: "Create something worth clicking.",
  },
  {
    id: "02",
    name: "Connected operations.",
    caption: "BUILT TO WORK TOGETHER",
    description:
      "Less friction. More possibility. Connect your tools, simplify your day-to-day, and give your team the support to do their best work.",
    items: [
      "Microsoft 365 integration",
      "ERP integration",
      "IT support & troubleshooting",
      "Business workflow automation",
    ],
    className: "operations",
    visual: "Your tools. In sync.",
  },
  {
    id: "03",
    name: "Brands with momentum.",
    caption: "MADE TO BE DISCOVERED",
    description:
      "Find your voice, reach the right people, and turn attention into connection. A considered approach to your digital presence.",
    items: [
      "Social media marketing",
      "Search engine optimization",
      "Content writing",
      "Digital marketing strategy",
    ],
    className: "growth",
    visual: "Make a little more noise.",
  },
  {
    id: "04",
    name: "Your next breakthrough.",
    caption: "LEARN. BUILD. GO FURTHER.",
    description:
      "Practical guidance for ambitious students. Develop your ideas, strengthen your writing, and build a final-year project you understand.",
    items: [
      "University assignment writing support",
      "Final-year project guidance",
      "Research & technical documentation",
      "Project development & mentoring",
    ],
    className: "learning",
    visual: "Big ideas start here.",
  },
];
export const projects = [
  {
    id: "forma",
    title: "Forma living",
    category: "Web experiences",
    discipline: "Art direction · Web design",
    image: "/images/forma.png",
    summary:
      "A quieter kind of online experience for spaces with a point of view.",
    brief:
      "An independent studio exploration of how a design-led interiors brand could translate physical spaces into a considered digital experience.",
    approach:
      "Generous typography, an image-first collection, and a simplified path from inspiration to enquiry. The concept explores responsive layouts and accessible, restrained interaction.",
    tags: ["Brand experience", "Responsive design", "Creative direction"],
  },
  {
    id: "orbit",
    title: "Orbit workspace",
    category: "Digital systems",
    discipline: "Product strategy · UI / UX",
    image: "/images/orbit.png",
    summary: "A clearer view of everything that moves your business.",
    brief:
      "A studio concept for bringing scattered business tools into one coherent workspace. Created to explore our approach to connected digital systems.",
    approach:
      "A focused information architecture, clear task hierarchy, and an integration-first product strategy. Designed around the people who use business software every day.",
    tags: ["Digital product", "Systems thinking", "Interface design"],
  },
];
export const contact = {
  email: "minhajmiflal95@gmail.com",
  phone: "+94 72 942 2261",
  telephone: "+94729422261",
  whatsapp: "https://wa.me/94729422261",
  street: "441/10K, Delgahawatte Road",
  locality: "Ratmalana, Sri Lanka",
};
export const contactEmail =
  import.meta.env.VITE_CONTACT_EMAIL?.trim() || contact.email;
export const contactMap = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${contact.street}, ${contact.locality}`)}`;
