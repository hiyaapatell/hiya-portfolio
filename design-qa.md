# Design QA

final result: passed

## Evidence

Source: https://www.harpreetjaggi.in/ and browser captures in `/workspace/scratch/05ed785f276d/evidence/`.
Implementation: cloud browser preview, plus browser-rendered Playwright captures of the same application.

Desktop: 1348 × 926 CSS pixels and image pixels, device scale factor 1.
Mobile: 390 × 844 CSS pixels and image pixels, device scale factor 1.
No density normalization was necessary. Pairs use the same viewport and corresponding semantic state, with intentional differences in Hiya’s text and career length.

For each viewport, inspected states: closed box, revealed work, packing slip, career receipt, reader/about, footer.
Source paths: `../evidence/qa-{1348|390}-{top|work|slip|till|inside|siteFooter}-source.png`.
Implementation paths: `../evidence/qa-{1348|390}-{top|work|slip|till|inside|siteFooter}-final.png`.
Combined comparison inputs: `../evidence/qa-pair-{1348|390}-{state}.png`.
Focused navigation comparison: `../evidence/qa-focused-nav.png`.
Reader, card typography, source illustration quality, and footer controls were also reviewed at full capture resolution.

## Comparison history and fixes

1. P1: exported box layers were malformed. Rebuilt SVG layers from the source asset’s XML structure and embedded its cardboard texture. Subsequent screenshots show the complete closed and open box.
2. P2: final card reveal was vertically displaced. Recomputed group geometry from the actual heading height and the captured card dimensions. Final pairs show the title, cards, pills, and box in the same composition.
3. P2: mobile closed box allowed cards to protrude above the lid. Clipped the contents during opening; the final mobile top comparison shows a closed box without protruding cards.
4. P2: decorative stickers were initially drawn from the wrong subset of source assets. Replaced them with the actual six source decorations, including their embedded fonts.
5. P2: the exported gift-machine asset displayed its sold-out layer prematurely. Added explicit layer states and knob/capsule animations. Final footer capture shows the initial machine; interaction checks verify three gifts and the sold-out state.
6. P2: reader covers were exported with a non-SVG wrapper. Extracted the actual SVG roots. Final asset checks report zero invalid images.

Each correction was followed by fresh browser captures and combined source/implementation comparison. No actionable P0/P1/P2 issue remains.

## Fidelity surfaces

- Fonts and typography: local Bricolage Grotesque, Fraunces, DM Mono, Literata, and Caveat match the reference families. Source decoration fonts are embedded where needed. Hiya’s shorter name and project text intentionally wrap differently.
- Spacing and layout: same sticky navigation, 360vh box sequence, two-by-two card reveal, slip rows, two-column career layout, reader/postcard arrangement, footer grid, and responsive mobile structure. Career receipt height reflects Hiya’s actual seven roles and education.
- Colours and tokens: paper, grids, blue display text, yellow controls, green/slate/red/blue project cards, and cardboard imagery follow captured source evidence.
- Image quality: source decorative assets and fonts are local; actual Behance project covers are local. No placeholder imagery, invented logos, or newly drawn replacement illustrations are used. Some project covers are the available Behance cover resolution, rather than full case-study images.
- Copy: name, contact, career, education, skills, and project descriptions are Hiya’s. Metrics come from the supplied résumé. The reader contains verified design notes instead of claiming the reference designer’s personal reading list.

## Verification

61 desktop/mobile interaction checks pass, including opening, ten removable objects, work navigation, all four project routes and cover images, Behance links, project tours, all companion options, companion visibility, slip panels, reader flip/pages/detail, three gifts, Escape dismissal, sound, résumé, mobile menu, mobile navigation, viewport-contained settings, and no horizontal overflow.

Console checked: no application JavaScript errors in the final Playwright test session. Earlier cloud-preview module-export errors were corrected before verification. Browser-extension metadata messages were excluded from application findings.

Production build passes. Four Sites runtime/packaging tests pass. GitHub Pages workflow is included; it is ready for a repository but has not been published to GitHub.

## Follow-up polish

P3: box-opening imagery uses sampled source illustration frames with original scroll logic, so micro-timing is not identical to the reference. Companion movement and settings work, but the captured artwork does not reproduce every procedural blink. The local project pages are verified summaries with links to the full Behance projects, not copies of the reference designer’s unrelated case-study content.

## Implementation checklist

- [x] Capture desktop and mobile source.
- [x] Compare rendered implementation at both viewports.
- [x] Resolve P0/P1/P2 findings.
- [x] Verify primary interaction flow, assets, and console.
- [x] Build and verify hosting output.
- [x] Include GitHub Pages workflow and editing instructions.
