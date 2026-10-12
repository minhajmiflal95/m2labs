import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";
import { readFileSync } from "node:fs";
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "netlify-route-html-preview",
      configurePreviewServer(server) {
        const rules = new Map(
          readFileSync(new URL("./dist/_redirects", import.meta.url), "utf8")
            .trim()
            .split("\n")
            .map((line) => line.split(/\s+/).slice(0, 2)),
        );
        server.middlewares.use((request, response, next) => {
          const [path, query] = (request.url || "/").split("?");
          const target = rules.get(path.replace(/\/$/, ""));
          if (target) request.url = target + (query ? `?${query}` : "");
          next();
        });
      },
    },
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("/node_modules/react-router")) return "routing";
        },
      },
    },
  },
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
});
