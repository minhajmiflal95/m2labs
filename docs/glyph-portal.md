# Glyph Portal integration

The supplied `GlyphPortal` is in `src/components/ui/glyph-portal.tsx`. Its Christian Katzmann copyright and MIT notice are retained. The supplied `SUBLIME` demo is in `src/components/ui/glyph-portal-demo.tsx` as an optional example. It requests the original Jakarta font when mounted, with a timed Arial fallback; the production M² Labs section does not mount that demo or request its font.

The production wrapper, `src/components/LabsPortal.tsx`, appears between the cinematic hero and services. It uses `CREATE`, a local gradient scene, M² Labs copy, letter selection, and an entry link. No new stock image is required for the component's gradient scene. The existing uploaded illustrations remain throughout the site.

The original component measures glyph interiors with a detached 2D canvas. Its scroll callback and animation geometry are updated without React state. Listeners, animation frames and observers are cleaned up on unmount. Its props support words, a preferred letter, scroll travel, fonts, annotations, background/front compositions, content and a progress callback.

Integration adaptations:

- `reducedMotion` also honours the site's existing Pause animation control.
- Reduced motion, unavailable canvas measurement, or stalled rendering leaves content in normal reading flow. Unavailable canvas measurement shows a readable word poster.
- Opening/section colours use the active site theme; the revealed story uses a contrasting blue scene.
- Single-line comments flattened by the pasted text were restored as block comments so the code executes.

## TypeScript, Tailwind and shadcn structure

The project now supports TypeScript alongside its existing JavaScript, with `npm run typecheck`. Vite handles TSX; strict checking applies to TypeScript files, while legacy JavaScript is not newly subjected to strict checks.

Tailwind v4 is configured through `@tailwindcss/vite`, with utilities in `src/tailwind.css`. Its reset is intentionally omitted to preserve the existing site and dialogs. Theme utility tokens map to the site's light/dark colours.

`components.json` configures shadcn for React/Vite, TypeScript and the `@/` alias. `src/components/ui` is the UI component folder: `@/components/ui` resolves there. Keeping generic components here separates them from page-specific sections and gives the shadcn CLI a predictable destination. Base site styles remain in `src/styles.css`; the integration's styles are in `src/glyph-portal.css`.

The standard `cn` helper is in `src/lib/utils.ts`. Lucide provides the portal’s entry arrows and is available for future shadcn components.

```sh
npm ci
npm run typecheck
npm run dev
npm run build
npm test
```

To add another shadcn component with this configuration:

```sh
npx shadcn@latest add button
```

For a new project without a shadcn configuration, use `npx shadcn@latest init` first. This repository already contains the configuration, TypeScript compiler, Tailwind plugin and aliases.
