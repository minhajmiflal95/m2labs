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
            .map((line) => {
              const [path, target, status] = line.split(/\s+/);
              return [path, { target, status: Number(status) }];
            }),
        );
        server.middlewares.use((request, response, next) => {
          const [path, query] = (request.url || "/").split("?");
          const target = rules.get(path.replace(/\/$/, ""));
          if (target?.status === 301) {
            response.statusCode = 301;
            response.setHeader(
              "Location",
              target.target + (query ? `?${query}` : ""),
            );
            response.end();
            return;
          }
          if (target) request.url = target.target + (query ? `?${query}` : "");
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
