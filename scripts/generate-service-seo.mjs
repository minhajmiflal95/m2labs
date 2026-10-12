import { readFile, writeFile, mkdir } from "node:fs/promises";
import { servicePages } from "../src/service-pages.js";
const origin = "https://m2lab.netlify.app";
const template = await readFile("dist/index.html", "utf8");
const escape = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
const pages = [
  {
    path: "/",
    title: "Ideas, amplified.",
    description:
      "M² Labs brings design, development and digital strategy together. Websites, applications, IT support, Microsoft 365, ERP integration, marketing and academic project guidance.",
  },
  {
    path: "/services",
    title: "Our services",
    description:
      "Explore all M² Labs services: websites, applications, Microsoft 365, ERP integration, IT support, content, marketing and learning guidance.",
  },
  ...servicePages,
];
for (const page of pages) {
  let html = template.replace(
    /<title>.*?<\/title>/s,
    `<title>${escape(page.title)} — M² Labs</title>`,
  );
  const setMeta = (attribute, key, value) => {
    const node = `<meta ${attribute}="${key}" content="${escape(value)}" />`;
    const pattern = new RegExp(`<meta\\s+${attribute}="${key}"[^>]*>`, "s");
    html = pattern.test(html)
      ? html.replace(pattern, node)
      : html.replace("</head>", `${node}\n</head>`);
  };
  setMeta("name", "description", page.description);
  setMeta("property", "og:title", `${page.title} — M² Labs`);
  setMeta("property", "og:description", page.description);
  setMeta("property", "og:url", origin + page.path);
  setMeta("property", "og:image", origin + "/m2-mark.svg");
  html = html.replace(
    "</head>",
    `<link rel="canonical" href="${origin}${page.path}" />\n</head>`,
  );
  const directory = "dist" + (page.path === "/" ? "" : page.path);
  await mkdir(directory, { recursive: true });
  await writeFile(`${directory}/index.html`, html);
}
await writeFile(
  "dist/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map((page) => `\n  <url><loc>${origin}${page.path}</loc></url>`).join("")}\n</urlset>\n`,
);
console.log(
  `Generated route HTML metadata and sitemap for ${pages.length} URLs.`,
);

await writeFile(
  "dist/_redirects",
  pages
    .filter((page) => page.path !== "/")
    .map((page) => `${page.path} ${page.path}/index.html 200`)
    .join("\n") + "\n",
);
console.log("Generated 17 exact Netlify rewrites for route-specific HTML.");
