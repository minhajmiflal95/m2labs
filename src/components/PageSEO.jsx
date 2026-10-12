import { useEffect } from "react";
const origin = "https://m2lab.netlify.app";
export default function PageSEO({
  title,
  description,
  path = "/",
  noIndex = false,
}) {
  useEffect(() => {
    document.title = `${title} — M² Labs`;
    const meta = (key, value, property = false) => {
      let node = document.head.querySelector(
        `meta[${property ? "property" : "name"}="${key}"]`,
      );
      if (!node) {
        node = document.createElement("meta");
        node.setAttribute(property ? "property" : "name", key);
        document.head.append(node);
      }
      node.content = value;
    };
    meta("description", description);
    meta("robots", noIndex ? "noindex, follow" : "index, follow");
    meta("og:title", document.title, true);
    meta("og:description", description, true);
    meta("og:type", "website", true);
    meta("og:url", origin + path, true);
    meta("og:image", origin + "/m2-mark.svg", true);
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.append(canonical);
    }
    canonical.href = origin + path;
  }, [title, description, path, noIndex]);
  return null;
}
