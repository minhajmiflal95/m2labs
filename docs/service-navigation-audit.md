# Services navigation and scrolling repair

The active application is `src/main.jsx` → `src/App.jsx`, wrapped in BrowserRouter. The shared header renders `ServiceNavigation`; the homepage renders `ServiceFlow`; lazy service routes render `src/pages/ServicePage.jsx`. This repair changes those existing systems, without adding a replacement page or changing service content, imagery, logo, intro, or cinematic story.

## Confirmed causes and fixes

1. **Dropdown off-screen:** At 1280×800, the original menu had bounds x=640, width=1100, ending at1740. Motion's y animation generated its own transform and replaced the stylesheet's `translateX(-50%)`; computed transform was `none` after settling. The menu now animates opacity only, preserving CSS centering. The header inner shell provides an explicit containing block. Corrected bounds are x=90–1190. Width follows the viewport, and a measured-header-based maximum height allows native menu scrolling on short desktop screens.
2. **Missing hover interaction:** Hovering the original Services trigger mounted no menu. Pointer handlers now open for a mouse, bridge movement into the popup, and delay closing160ms. The initial mouse click confirms the hover opening; subsequent clicks toggle. Keyboard/touch clicks toggle normally. Escape restores trigger focus, ArrowDown enters links, Tab follows normal link order, outside click dismisses, and leaving focus dismisses. Route changes and crossing the mobile breakpoint close it. Timers, the focus animation frame, and listeners clean up.
3. **Inconsistent header alignment:** Direct links had12px vertical padding while the trigger had a44px minimum height, with no shared cross-axis alignment. Navigation now centers its children; links and trigger share a44px target height. Desktop-only link underline styling is suppressed inside the popup.
4. **Mobile list required horizontal input:** At375px the list viewport was338px wide with1423px of content. A vertical mouse wheel naturally scrolled the page rather than exposing hidden horizontal items. The existing selector now uses a native, wrapping grid below800px (two columns below560px). All nine items are available through vertical page scrolling; there is no wheel interception or scroll snapping. Roving keyboard focus and arrows/Home/End remain available.
5. **Preview state disagreed with semantics:** Hover preview changed the visible panel while its accessible label and selected styling still described the previously clicked service. Label, aria-selected, and visual highlight now follow the displayed scene. Leaving the preview restores the selected service.
6. **Route/anchor readiness race and excessive anchor offsets:** Route scrolling previously ran after a fixed0/220ms even if the lazy page had not mounted. Static scroll-padding and section scroll-margins also accumulated, with offsets differing from the actual header. Restoration now waits for the current route's heading/target using a scoped MutationObserver. A ResizeObserver measures the actual header. One root scroll-padding offset replaces overlapping section margins. POP restoration takes precedence over a hash when that history entry has a saved position. Wheel/touch input cancels pending restoration, and all observers/listeners/timers clean up; missing targets expire after10seconds.

No global wheel preventDefault listener, custom Services scroll pin, or Services scroll spy existed. This homepage interface is a selectable preview, not one vertically stacked section per tab; selection tracks the displayed panel. The separate cinematic scroll timeline remains unchanged. Native page scrolling, short-popup overflow, and the existing native dialog remain the only relevant scrolling mechanisms. Dialog close/navigation tests confirm that body overflow is restored.

7. **Animation pause reset page scroll:** After client-side navigation to IT Support, clicking the footer pause control changed scrollY from6039 to0. The route restoration effect depended on the global quiet-motion value. Motion preferences are now read when a route changes without triggering restoration themselves. A normal-motion browser test verifies pause and resume retain the footer position.

## Exact modified files

- `src/components/ServiceNavigation.jsx`: existing dropdown interactions and lifecycle.
- `src/components/ServiceFlow.jsx`: wrapping-list semantics and preview synchronization.
- `src/components/PageTransition.jsx`: destination readiness, measured header, saved scroll restoration.
- `src/service-pages.css`: explicit popup positioning, alignment, native overflow, responsive selector, anchor offsets.
- `tests/service-navigation.spec.js`: seven regression tests.
- `docs/service-navigation-audit.md`: this report.

No dependencies or lockfiles changed. No lint command exists in package.json.

## Verification

Real Playwright Chromium execution uses `/usr/bin/chromium` in the cloud environment. Requested widths320,375,390,768,1024,1280,1440,1920 were exercised. Service pages were checked at all eight widths across the existing and added tests. Desktop hover, repeated click, outside click, short-viewport overflow, resize while open, Tab/Enter/Space/Escape/ArrowDown, service-selector arrows/Home/End, direct service reload, every service section's wheel scrolling in both directions, Back/Forward, and reduced motion are covered. A delayed lazy module tests hash readiness in normal motion. CDP touch-start/move/end events exercise actual touch scrolling and momentum,390px mobile,768/1024px tablet taps, and844×390 landscape rotation. Input.synthesizeScrollGesture did not move this Chromium instance, so it was replaced with actual touch events. Taps wait for kinetic scrolling to settle, as an in-progress gesture consumes a stopping tap in the browser.

Desktop and320px mobile screenshots were visually inspected. The production preview separately checks all seven routes, popup bounds, wheel scrolling, hash offset and hash-route Back restoration, and captures the built menu. These are browser-emulated interactions; physical trackpad devices, iOS Safari and Firefox have not been tested.

- `npm run typecheck`: passed.
- `npm run build`: passed; generated metadata/sitemap for nine URLs and retained16 legacy redirects.
- Playwright broad run:46 passed,1 failed test fixture. The mouse remained over a service item after a viewport resize and triggered a legitimate hover preview during the keyboard assertion. The fixture now parks the pointer outside the list before keyboard checks. All41 existing checks passed in that run.
- Final affected run after the pause/scroll fix:9 passed in2.3minutes (all seven new regressions plus existing history and motion-control tests). This covers all48 current test cases across runs; a single full48-case run is not claimed.
- Production-preview browser probe: passed for all seven routes, menu bounds, wheel scrolling, contact offset, and hash-route history restoration and fast repeated wheel events; zero page errors. A separate normal-motion production probe confirms pause/resume retain scrollY6039.
- `git diff --check`: passed.

## Deployment

The configured Netlify build is `npm run build`, publishing `dist`, with SPA fallback plus generated exact service rewrites/legacy redirects. Changes are pushed to main after verification under the user's existing authorization. Public Netlify comparison is blocked by this environment's CONNECT403 proxy response, so deployment and equivalence with the live site are not claimed. Confirm the Netlify main-branch deployment or trigger one if automatic builds are disabled.
