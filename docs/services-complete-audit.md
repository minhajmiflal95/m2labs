# Complete Services and Glyph Portal repair

## Active application and routes

`src/main.jsx` mounts BrowserRouter and `src/App.jsx`. The shared header uses `ServiceNavigation`, the homepage uses `ServiceFlow` and `LabsPortal`, and lazy service routes use `src/pages/ServicePage.jsx`. The Services directory is `/services`. All seven canonical pages were audited:

| Route                                  | Service                                 | Relevant work/platforms retained                                                                             |
| -------------------------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `/services/web-development`            | Web Design & Development                | UI/UX, Figma, HTML/CSS/JavaScript, React, WordPress, accessibility and editing handover                      |
| `/services/software-development`       | Custom Software & Web Applications      | React, Java, Node.js, MongoDB, MySQL, GitHub, Android, Figma and interface planning                          |
| `/services/digital-marketing`          | Digital Marketing & SEO                 | SEO, Meta campaigns, PPC, content writing, Ahrefs, Google Analytics and branding                             |
| `/services/cloud-computing`            | Cloud Computing Solutions               | Azure, GCP, Microsoft 365, hosting, migration, backups and administrator handover                            |
| `/services/university-project-support` | University & Final-Year Project Support | ML projects, web applications, research, project documentation and mentoring                                 |
| `/services/it-support`                 | IT Support & Infrastructure             | L1/L2 ticket triage, remote troubleshooting, networking, patching, security and relevant Jenkins diagnostics |
| `/services/erp-integration`            | ERP & CRM Integration                   | Salesforce, SAP, Zoho, Oracle NetSuite, Odoo and Microsoft Dynamics 365                                      |

The homepage keeps nine illustrated preview offerings mapped to these seven pages, including separate social, SEO and content-writing entry points. Existing sixteen legacy URL redirects remain intact. Each page already has a service-specific hero, deliverables, benefits/problem framing, capabilities, workflow, explained technology choices, illustrative use cases, FAQs, related services and an enquiry CTA. No fabricated customers, results, certifications or promises were added.

## Confirmed defects and corrections

- **Workflow disclosures occupied the number column.** The original row had three grid columns and four direct children. Its fourth child, `details`, flowed into a new row in the first column: only48px wide on320px mobile and64px on1440px desktop. Description and disclosure now share a `process-body` container in the description column. Browser assertions verify usable body width and consistent section-container alignment at all ten sizes.
- **Workflow details repeated unrelated copy.** All four steps on every page rendered `service.deliverables[0]`. New `processOutputs` provide four distinct, service-specific outcomes per page:28 concise additions. The existing workflow descriptions and deliverable sections remain. The disclosure now reads “Step outcome”.
- **Excessive, inconsistent hero offsets.** Separate130/115/95px top-padding rules and48px breadcrumb margins created unnecessary initial blank space. Shared fluid service spacing/gap tokens now govern hero, breadcrumb and section rhythm. Mobile heading sizes scale with width; existing grid variants, professional environments, icons, typography and color themes remain.
- **Mobile selector concealed its actual selection.** At390×844, the scene was already focused on T while the native select value remained empty and displayed “Choose a letter”. Its display depended on coarse-pointer media queries. The active Glyph Portal now exposes one accessible button/listbox chooser with a visible selected letter/index on all input devices. Existing direct letter radios remain available.
- **Implicit hover could overwrite an explicit selection.** Closing a chooser above the letter art exposed another letter beneath a stationary pointer. Touch pointer-over also used the mouse hover handler. Explicit choices now stay selected until actual mouse movement; hover is restricted to mouse input. Tap and keyboard selection remain independent.
- **Rapid keyboard operations raced deferred focus.** Opening visibility transitions could prevent the initial focus move, and scheduling every arrow/Home/End move allowed Home immediately followed by Enter to activate the previous option. Opening makes visibility immediately available and moves focus after the opening frame; navigation inside an open list moves focus synchronously. Pending focus frames are cancelled on cleanup. The final chooser and option names derive from their visible text, preserving speech-input and screen-reader consistency.
- **Chooser placement needed short-screen coordination.** The previous bottom-percentage positions did not follow measured letter geometry. The new control follows the measured word bottom, with coordinated short-height support text and selector placement. Landscape eyebrow position accounts for the measured sticky header.

The header and service-list repairs from `ce5e949` were retained and re-tested: centered viewport-aware menu, stable hover/click, keyboard and touch dismissal, native wrapping mobile service list, measured anchor offset, lazy-route readiness, Back/Forward restoration and pause/resume position preservation. No new wheel interception, body scroll lock or nested scroll controller was introduced.

## gp-r5-content behavior

`gp-r5-content` is the current generated ID for the content of `src/components/ui/glyph-portal.tsx`, rendered by `src/components/LabsPortal.jsx`; it is not a separate component. IDs remain generated by React useId.

The chooser supports tap/click to open, six selectable CREATE letters, selected state, smooth open/close, outside pointer dismissal, Escape with focus restoration, arrow keys, Home/End and Enter. Options have48px targets. Choosing a letter updates the measured ink target and a restrained light preview. Native scrolling or the existing entry link then drives the original SVG camera into the mounted story. Every letter uses that same existing story destination and its own measured entry geometry. Scrolling back permits another selection and another complete reveal.

The component retains its existing measured SVG/clip camera and passive scroll/resize lifecycle. The resize observer recalculates travel and positioning. The preview uses the browser Web Animations API and cancels on replacement/unmount. New listeners and focus frames clean up. Reduced motion keeps readable content and functional selection, with the camera/preview disabled. Canvas failure retains the existing readable fallback. No new animation library or prototype was added; the original MIT attribution remains.

## Exact modified files

1. `src/components/ui/glyph-portal.tsx` — shared accessible chooser and input/animation lifecycle.
2. `src/glyph-portal.css` — measured chooser positioning and landscape coordination.
3. `src/pages/ServicePage.jsx` — corrected shared workflow DOM structure.
4. `src/service-pages.js` —28 accurate workflow outcomes across seven pages.
5. `src/service-pages.css` — shared spacing and responsive hero typography.
6. `src/service-environments.css` — workflow description/disclosure alignment.
7. `tests/services-complete.spec.js` — complete responsive/content audit and desktop/touch/reduced-motion portal regression tests.
8. `docs/services-complete-audit.md` — this report.

No dependency, lockfile, logo asset, loading ident, unrelated homepage section or service route was removed or replaced.

## Browser and build evidence

- Chromium (`/usr/bin/chromium`) exercised320,360,375,390,430,768,1024,1280,1440,1920px widths. Every service page was checked at all ten sizes.
- Before/after full-page captures cover all seven services at320 and1440px. Hero and workflow captures were visually compared across all pages. Mobile chooser screenshots cover390px portrait and844×390 landscape.
- The new portal tests run two rounds of all six letters on both desktop and touch mobile, checking selected state, changing camera transforms and final story reveal. They also exercise outside taps, Escape, keyboard selection, all ten widths, landscape and reduced motion. Physical mouse/touch coordinates avoid automation-induced scroll-into-view during animation.
- Existing regressions cover header/directory/detail/related-service journeys, direct loads and refresh, wheel and touch scrolling, history, enquiries, scroll-lock cleanup, scene motion, light/dark accessibility, the intro and cinematic homepage.
- Production-preview browser probes verify all seven routes, all workflow outcomes, correctly selected enquiry services, scroll-lock cleanup and all six touch-selected camera reveals. Actual touch-start/move/end gestures also scroll through and back out of the portal, dismissing an open chooser without a retained lock.
- `npm run typecheck`: passed.
- `npm run build`: passed; nine metadata/sitemap URLs, eight exact service HTML rewrites and sixteen legacy redirects retained.
- Broad Playwright suite:51 passed and1 failed accessible-name assertion. The new chooser originally supplied a static aria-label that omitted its visible selected value. It now takes its accessible name from its visible content, including the selected value.
- Final focused suite after that correction:7 passed in48.5seconds, covering desktop/touch/reduced-motion chooser behavior, open chooser accessibility in both themes, landing/form/dark-theme accessibility, the original direct-letter camera interaction and canvas/reduced-motion fallback. All53 current test cases are covered across the broad and focused runs; a single full53-case run is not claimed.
- `git diff --check`: passed. No lint script is provided by this repository.

Screenshots and ad-hoc browser probes are under `/tmp/m2-before-*`, `/tmp/m2-after-*`, `/tmp/m2-services-production.mjs` and `/tmp/m2-portal-production-mobile.png`; they are validation artifacts, not application prototypes.

## Deployment and limits

Netlify remains configured for `npm run build` and publish directory `dist`. Source is pushed to main after checks under the existing user authorization. This environment's proxy returns CONNECT403 for the public Netlify URL, so live comparison and deployment equivalence cannot be verified. Confirm the main-branch deploy, or trigger it when automatic deployment is disabled. Tests use Chromium device emulation and generated mouse/touch input; physical trackpads and iOS Safari/Firefox were not exercised.
