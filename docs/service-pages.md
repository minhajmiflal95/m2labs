# Multi-page services — 12 October 2026

This report records the initial sixteen-page implementation. The later [seven-service redesign](21st-service-redesign.md) supersedes its active route inventory; all old URLs remain as compatibility redirects.

## Delivered routes

The existing service inventory has sixteen items across `src/data.js` and the nine-service homepage flow. Each genuine item now has a dedicated React route, with tutoring and mentoring language for academic support. `/services` is the directory; `/` retains the original homepage and cinematic sections.

| Service                             | Route                                         |
| ----------------------------------- | --------------------------------------------- |
| Web Design & Development            | `/services/web-design-development`            |
| Custom Software & Web Applications  | `/services/custom-software-web-applications`  |
| Microsoft 365 & Cloud Solutions     | `/services/microsoft-365-cloud`               |
| ERP & Business Integration          | `/services/erp-business-integration`          |
| SEO & Digital Marketing             | `/services/seo-digital-marketing`             |
| IT Support & Infrastructure         | `/services/it-support-infrastructure`         |
| Content Writing & Creative Services | `/services/content-writing-creative-services` |
| Social Media Marketing              | `/services/social-media-marketing`            |
| E-commerce Experiences              | `/services/ecommerce`                         |
| UX / UI Design                      | `/services/ux-ui-design`                      |
| Business Workflow Automation        | `/services/workflow-automation`               |
| Digital Marketing Strategy          | `/services/digital-marketing-strategy`        |
| University Assignment Guidance      | `/services/academic-support`                  |
| Final-Year Project Guidance         | `/services/final-year-projects`               |
| Research & Technical Documentation  | `/services/research-technical-documentation`  |
| Project Development & Mentoring     | `/services/project-development-mentoring`     |

## Content and design

`src/service-pages.js` centralizes original service content, navigation metadata, relevant existing technology icons and relationships. Each page includes a benefit-led hero, three deliverables, three problem/solution pairs, six capabilities, four workflow steps, three explicitly hypothetical scenarios, five specific FAQs and three complementary service links. No client experience, testimonials, certifications, prices or results have been invented. Microsoft cloud content is bounded by the existing Microsoft 365 offer. Academic services describe legitimate guidance on the learner’s own work.

The shared page components are in `src/pages/ServicePage.jsx`: ServiceHero, ServiceOverview, CapabilityGrid, ProcessTimeline, TechnologyStack, UseCaseSection, ServiceFAQ, RelatedServices and ServiceCTA. They share layout primitives while varying hero placement, grids, accents and illustration treatment by service group. All illustrations and technology logos are existing local assets. The M² Labs logo is unchanged.

Typography uses locally hosted Space Grotesk for headings, Manrope for body text and IBM Plex Mono for technical captions. The existing light/dark and neumorphic design remain. Pointer CTAs have restrained magnetic movement, service sections reveal on scroll, FAQs use native details, and process lists remain semantic.

## Routing and interactions

React Router runs in the real application entry point. Header/footer, enquiry dialogs and LogoIntro live outside the changing route content. Full refresh still replays the logo intro; internal navigation does not remount it. Homepage flow actions and illustrated cards link to relevant pages, while the existing group enquiry action remains available as “Discuss this service.” All sixteen capabilities link from the homepage’s expanded service groups.

The desktop Services dropdown supports click, Arrow Down, Escape, focus leaving the panel and outside clicks. The mobile navigation contains every service and a directory link. Active states and breadcrumbs identify the current service. Each service CTA opens the existing brief builder with that specific service selected; messages are still prepared for the visitor to send, never sent automatically.

PageTransition fades outgoing/incoming content, with staggered hero text and masked illustration entry. It leaves the route parent untransformed so the homepage’s ScrollTrigger pin keeps a normal containing block. Browser Back/Forward restores remembered scroll positions; new routes start at the top, hash links target homepage sections, and reduced motion removes transition delays. Service UI is lazy-loaded and the router is a separate bundle.

## SEO and deployment configuration

`npm run build` runs Vite and then `scripts/generate-service-seo.mjs`. The post-build step writes eighteen application-shell HTML documents with unique titles, descriptions, canonical URLs and Open Graph metadata, plus `dist/sitemap.xml`. The page bodies remain React-rendered; this is metadata generation, not server rendering of the content. `public/robots.txt` points to the sitemap.

Seventeen exact routes in generated `dist/_redirects` serve each service/directory HTML document before React starts. The fallback in `netlify.toml` serves `/index.html` for other SPA URLs. Build command remains `npm run build`; publish directory remains `dist`. Vite’s preview plugin reads those exact rewrites so local production checks exercise the same URL-to-file mapping. Unknown routes show a recovery page with client-side noindex metadata.

Added dependencies: `react-router-dom`, `@fontsource/space-grotesk` and `@fontsource/ibm-plex-mono`. Motion, GSAP, existing fonts, icons and illustrations are reused. No database, API keys or external image service are required. The build reports a size warning for the main chunk (approximately 502 kB, 158 kB gzip); it succeeds, with routing and service UI split into separate bundles.

## Verification and publication

Production build and TypeScript checks passed. All 46 browser tests passed, covering every dedicated route’s content, metadata, FAQ, enquiry selection and refresh; directory/desktop/mobile navigation; browser history and scroll; 375/768/1024/1440px layouts; accessibility in both themes; and the existing homepage, splash, four-scene story, flow interactions and enquiry/download behavior.

Desktop/mobile screenshots of the actual service pages were inspected. The visual probe found no runtime errors, horizontal overflow or broken images in the reviewed design, systems, marketing and academic pages.

Public access to `https://m2lab.netlify.app/` is blocked by this environment’s network proxy (`CONNECT tunnel failed, response 403`). This is not evidence that the public site itself returns 403. A Git push does not confirm a Netlify deployment. Confirm the latest main commit succeeds in the linked Netlify site, then check a direct service URL and refresh it. Public deploy parity remains unverified from this environment.

## Created files

- `src/service-pages.js`
- `src/service-pages.css`
- `src/pages/ServicePage.jsx`
- `src/components/ServiceNavigation.jsx`
- `src/components/PageTransition.jsx`
- `src/components/PageSEO.jsx`
- `scripts/generate-service-seo.mjs`
- `tests/services.spec.js`
- `docs/service-pages.md`

## Modified files

- `src/App.jsx` and `src/main.jsx` — active routes, shared shell, typography and stylesheet imports.
- `src/components/UI.jsx` — router-aware logo, semantic reveal elements and pointer CTA feedback.
- `src/components/ServiceFlow.jsx` — dedicated-page links and retained group enquiries.
- `src/components/Dialogs.jsx` — individual services in the brief selector.
- `src/components/HeroSlides.jsx` — focusable main heading for route navigation.
- `vite.config.js` — router chunk and Netlify-aware production preview.
- `netlify.toml` — SPA fallback.
- `public/robots.txt` — sitemap declaration.
- `package.json` and `package-lock.json` — router/fonts and metadata build step.
- `tests/site.spec.js` — existing enquiry check uses the renamed discussion action.
- `README.md` — workflow and architecture documentation.

Final production checks also passed: all sixteen extensionless service URLs returned HTTP 200 with their own title, canonical and Open Graph URL before React execution; sitemap contained eighteen URLs and robots pointed to it. Chromium verified the built ERP page, direct refresh, related-service navigation without document reload, and rapid navigation settling on the latest selected page without JavaScript errors. After the rewrite/preview correction, three affected navigation/homepage checks passed again. The public Netlify deployment remains unverified.
