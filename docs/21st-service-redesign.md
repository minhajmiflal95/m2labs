# Service redesign — 12 October 2026

## Active routes

| Page                                    | URL                                    | Environment                    |
| --------------------------------------- | -------------------------------------- | ------------------------------ |
| Web Design & Development                | `/services/web-development`            | Floating Design Studio         |
| Custom Software & Web Applications      | `/services/software-development`       | Living Software Architecture   |
| Digital Marketing & SEO                 | `/services/digital-marketing`          | Growth Intelligence            |
| Cloud Computing Solutions               | `/services/cloud-computing`            | Connected Cloud Universe       |
| University & Final-Year Project Support | `/services/university-project-support` | Research Innovation Lab        |
| IT Support & Infrastructure             | `/services/it-support`                 | Digital Operations Center      |
| ERP & CRM Integration                   | `/services/erp-integration`            | Connected Enterprise Ecosystem |

All sixteen previous service URLs are intentionally consolidated into these pages. The canonical mapping is `legacyServiceAliases` in `src/service-pages.js`. React performs replace navigation for old URLs, preserving queries and anchors; production emits HTTP 301 rules before canonical HTML rewrites. Directory, mega-menu, enquiries, related links and homepage capabilities use the current names and destinations. Microsoft 365 remains a platform within the renamed cloud service. Marketing combines search, paid campaigns, writing, social content and branding; academic pages combine legitimate mentoring and research/project guidance.

## Actual changes

`ServiceEnvironment` renders seven distinct original compositions, not seven recoloured copies. They contain responsive browser/phone previews, frontend/backend/database connections, advertising/research/analytics cards, cloud/hosting/storage architecture, ML/research layers, support/endpoint/pipeline diagnostics and a six-vendor integration hub. SVG packets, chart/cursor motion and restrained pointer tilt stop for reduced motion or the global pause. Interactive platform buttons expose descriptions on hover, focus and tap.

Service content now covers the requested technologies and workflows. `src/service-technologies.js` centralizes product names, asset paths, categories and descriptions. PPC, UI/UX, writing and branding are presented as capabilities, not invented products. Jenkins is described as CI/CD diagnostics, never ticketing. 24/7 availability is not operationally confirmed and is not advertised. Vendor marks identify platforms and imply no official partnership.

The existing logo and splash/story component files are unchanged. Shared layouts and the typography/theme system remain. The pages add bento emphasis, expandable scope details, word-staggered headlines, an SVG vertical process rail and grouped technology descriptions. Existing native FAQs, page transitions, browser history and enquiry/download logic are reused.

## 21st usage and limitations

The plugin installation was restored in this cloud instance. The installed skills read were [21st-ui-build](https://github.com/21st-dev/codex-plugin/blob/main/skills/21st-ui-build/SKILL.md) and [21st-cli-use](https://github.com/21st-dev/codex-plugin/blob/main/skills/21st-cli-use/SKILL.md). `21st init --design-context` succeeded. The required component search was attempted, but the CLI reported “Not signed in. Run 21st login or set TWENTYFIRST_TOKEN.” API_KEY_21ST was absent. No 21st MCP methods were exposed in this chat, and `https://21st.dev/api/mcp` returned `CONNECT tunnel failed, response 403` from the environment's proxy.

No catalog components were retrieved or represented as integrated. No hosted AI generation was called without verified AI access. The brief explicitly permits original components using the current stack under this limitation. The durable fallback decision is recorded in `.21st/design.json` and `.21st/DESIGN.md`.

Local `21st review` completed on three changed UI files: 36 informational colour-literal notices, zero automatic fixes. Requested illustration palettes and shadows were retained; actual contrast is checked in the browser rather than treating the generic notices as rendering errors.

## Logo provenance

All images are hosted locally under `public/images/technologies`. Existing Figma, React, WordPress, Node.js, MySQL, GitHub, Python and Microsoft 365 assets are retained.

- SVGL (`pheralb/svgl`, `static/library`): HTML5, CSS3, JavaScript, Java, MongoDB, Android, Meta, Ahrefs, Google Analytics, Azure, Google Cloud and Salesforce. Existing SVGL license retained.
- `gilbarbara/logos`: SAP, Zoho and Jenkins; CC0 license included.
- Simple Icons: Odoo and Dynamics 365 (Dynamics asset from npm `simple-icons@9.21.0`); CC0 license included. Monochrome marks use their identifying brand colours.
- Devicon: Windows 11; existing Devicon license retained.
- Oracle `netsuite-suitecloud-sdk`: the actual `packages/ai-plugins/common/openai/assets/netsuite-logo.png`, inspected before use; the Oracle UPL license is included. No generic Oracle mark is substituted for NetSuite.

Logos are contained within consistent boxes, without stretching or cropping; dark mode provides a light backing where needed. The NetSuite image is a vendor-sourced 342px bitmap, displayed much smaller, not a generated approximation.

## Verification

The full 40-test browser suite passed. It covers all seven canonical pages, all sixteen legacy routes, metadata, enquiries, FAQs, seven unique environments, technology mappings/assets, keyboard/touch interactions, animation and pause, page history, layout widths 375/768/1024/1440, and the existing homepage/intro/story regressions.

A broader theme audit found a low-contrast software code highlight. It was corrected using the service's stronger text accent. Three affected checks passed afterward, including responsive layouts and WCAG scans of every service in both themes, all legacy routes, and a new campaign-query/contact-anchor compatibility case. No failing or disabled checks are concealed.

The production build and TypeScript checks passed. Desktop/mobile screenshots of every environment were inspected; no runtime errors, horizontal overflow or broken scene logos were found. The build emits nine canonical HTML documents (home, directory, seven services), eight canonical rewrites and sixteen legacy redirects; the sitemap contains nine URLs.

Public access to `https://m2lab.netlify.app/` remains blocked by the environment proxy (CONNECT 403). This does not establish a public-site error or successful deployment. Netlify continues to build `main` with `npm run build` and publish `dist`; confirm the deploy for the correction commit and test a direct service URL plus an old cloud bookmark on the public site.

## Files

Created:

- `src/components/ServiceEnvironment.jsx`
- `src/service-environments.css`
- `src/service-technologies.js`
- `.21st/design.json` and `.21st/DESIGN.md`
- `docs/21st-service-redesign.md`
- Eighteen SVG platform assets, one NetSuite PNG, and three attribution licenses under `public/images/technologies`.

Modified:

- `src/service-pages.js` — seven canonical services, substantial content and compatibility aliases.
- `src/pages/ServicePage.jsx` — environments, headline masks, bento details, process rail, technology grouping and redirects.
- `src/App.jsx`, `src/data.js`, `src/editorial.js`, `src/components/ServiceFlow.jsx`, `src/components/ServiceNavigation.jsx` — current service names and navigation.
- `src/main.jsx` — environment stylesheet.
- `scripts/generate-service-seo.mjs`, `vite.config.js` — canonical metadata and HTTP redirect preview.
- `tests/services.spec.js` — canonical inventory, aliases, environments, assets, motion and expanded theme checks.
- `README.md` and `docs/service-pages.md` — current inventory and historical-route context.

No application dependencies were added. The 21st CLI ran through npx; the application reuses React, Motion, SVG/CSS and existing fonts/assets.

## Complete changed-file manifest

- `.21st/DESIGN.md`
- `.21st/design.json`
- `README.md`
- `docs/21st-service-redesign.md`
- `docs/service-pages.md`
- `public/images/technologies/GILBARBARA-LICENSE.txt`
- `public/images/technologies/NETSUITE-SDK-LICENSE.txt`
- `public/images/technologies/SIMPLE-ICONS-LICENSE.txt`
- `public/images/technologies/ahrefs.svg`
- `public/images/technologies/analytics.svg`
- `public/images/technologies/android.svg`
- `public/images/technologies/azure.svg`
- `public/images/technologies/css3.svg`
- `public/images/technologies/dynamics365.svg`
- `public/images/technologies/gcloud.svg`
- `public/images/technologies/html5.svg`
- `public/images/technologies/java.svg`
- `public/images/technologies/javascript.svg`
- `public/images/technologies/jenkins.svg`
- `public/images/technologies/meta.svg`
- `public/images/technologies/mongodb.svg`
- `public/images/technologies/netsuite.png`
- `public/images/technologies/odoo.svg`
- `public/images/technologies/salesforce.svg`
- `public/images/technologies/sap.svg`
- `public/images/technologies/windows.svg`
- `public/images/technologies/zoho.svg`
- `scripts/generate-service-seo.mjs`
- `src/App.jsx`
- `src/components/ServiceEnvironment.jsx`
- `src/components/ServiceFlow.jsx`
- `src/components/ServiceNavigation.jsx`
- `src/data.js`
- `src/editorial.js`
- `src/main.jsx`
- `src/pages/ServicePage.jsx`
- `src/service-environments.css`
- `src/service-pages.js`
- `src/service-technologies.js`
- `tests/services.spec.js`
- `vite.config.js`

Final local production checks passed for all seven canonical HTML documents, all referenced technology assets, sixteen HTTP 301 aliases with query preservation, nine sitemap URLs, and browser refreshes of every service environment. Public Netlify parity remains unverified.
