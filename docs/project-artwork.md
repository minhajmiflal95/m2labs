# Selected Work: supplied portfolio artwork

The six files in the supplied Downloads.zip were inspected by visible project titles and subject matter before mapping. No assets were missing. The Local Business Digital Growth image is the edited city-background version; it contains no temple.

| Existing project | Supplied PNG | Published WebP basename |
| --- | --- | --- |
| Retail Inventory & POS | retail_inventory_pos_showcase.png | retail-inventory-pos |
| Tourism Booking Experience | sri_lankan_tourism_booking_showcase.png | tourism-booking |
| SME Cloud & IT Infrastructure | sme_cloud_infrastructure_portfolio.png | sme-cloud-infrastructure |
| Local Business Digital Growth | sri_lankan_gems_digital_growth.png | local-business-digital-growth |
| ERP Sales & Inventory Integration | erp_integration_dashboard_showcase.png | erp-inventory-integration |
| University Research & ML Application | university_research_dashboard_mockup.png | university-research-ml |

## Files and assets

- `src/selected-work.js`: single existing project records now hold image paths and meaningful alternative text; unused illustration scene indices removed.
- `src/components/SelectedWork.jsx`: one shared responsive artwork component used by all six cards and all six existing project-detail dialogs.
- `src/selected-work.css`: uncropped 4:3 artwork, readable integrity captions, subtle hover image scaling and card shadow, reduced-motion fallback.
- `public/images/projects/`: 18 WebP assets, with 480px, 800px and original 1448px widths for each basename above.
- `assets/project-sources/`: six unmodified supplied PNGs, retained outside `public` and not copied into the published output.
- `scripts/optimize-project-images.py`: optional reproducible Python/Pillow conversion.
- `tests/project-artwork.spec.js`: six matching card/detail images tested at 375, 768, 1024, 1440 and 1920px, image decode, 4:3 containment, disclosure, overflow and runtime checks.
- `tests/site.spec.js`: existing section-artwork regression now checks portfolio imagery and its responsive variants in Selected Work, retaining service-artwork checks elsewhere.
- `tests/services-complete.spec.js`: await the existing portal scroll reset before comparing camera transforms at a new viewport; original assertions retained.
- This report, `docs/project-artwork.md`.

Original sources are 1448 × 1086 (4:3), 11,830,632 bytes combined. Pillow WebP quality 86, method 6, Lanczos resizing preserves the entire composition. Full-resolution WebPs total 1,119,804 bytes (90.5% smaller). All 18 variants together total 1,881,398 bytes. Browser srcset selects one appropriate variant; it does not request every variant. Card images lazy-load with asynchronous decoding; dialog imagery loads eagerly on opening. Explicit dimensions reserve the image layout. Stable captions are outside the image and baked-in text is not stretched.

Reproduce with `python3 scripts/optimize-project-images.py` after installing Pillow. Normal npm build requires no new Python dependency because generated assets are committed.

## Navigation and integrity

This application has six project-detail **dialogs**, not six independent project-detail routes. The existing `/#work` entry, all detail controls and relevant service/enquiry navigation are preserved. No new routes or duplicate project records were created. Related service pages retain their existing imagery because they describe services, not these particular project concepts.

Concept/reference/campaign/research classifications remain intact. Every image and its detail view visibly says: “AI-generated concept artwork. Names, dashboards and metrics are illustrative.” Dashboard values and fictional names within the supplied artwork are not presented as verified M² Labs delivery, clients, certifications or measured results.

## Verification

- TypeScript check and production build passed; route metadata generation retained nine documents, eight canonical rewrites and sixteen legacy redirects.
- Five focused Playwright tests passed: all six projects at all five requested widths, existing ten-width card/dialog keyboard checks, complete briefs and enquiries, both-theme Axe checks and favicon regression.
- Actual Chromium screenshots inspected for desktop gallery and mobile card; original supplied artwork also visually inspected.
- Built production application: all six cards and detail dialogs decoded the expected images, all eighteen optimized assets returned image/webp successfully, zero browser runtime errors.
- No lint command exists in this repository.
- Full regression run: 58 tests executed, 56 passed and two failed (7.1 minutes). Both were diagnosed and their assertions corrected as described below; final parallel rerun of those two tests passed (8.7 seconds). The whole suite was not rerun after these test-only corrections. No application failures remain from the executed checks.
- The existing desktop portal comparison initially raced its requestAnimationFrame scroll reset. Its helper now waits for zero progress before capturing the initial transform; all original animation assertions remain. Three consecutive desktop reruns passed.
- The older section-artwork test initially timed out waiting for the intentionally replaced `#work img.service-scene`; it now verifies the new portfolio image and responsive srcset at that section. Targeted rerun passed.
- Public Netlify request was blocked by the environment proxy (CONNECT 403). A local build or Git push does not verify public deployment; check the latest main build in Netlify.
