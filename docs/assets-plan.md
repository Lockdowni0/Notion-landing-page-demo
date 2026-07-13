# Notion 2013 Landing Page — Asset Plan

## 1. Asset Strategy

Use the fewest assets necessary to carry the narrative. The page should derive its identity from one strong stone-tool illustration, typography, whitespace, structural diagrams, and the live Product Demo.

Priority order:

1. reuse or carefully derive from the user-provided `Notion_2013.pdf`;
2. draw with semantic HTML and CSS;
3. create purpose-built local SVG;
4. generate or edit a raster image only when vector/code construction is unsuitable;
5. avoid third-party stock assets.

Every committed asset must have a known purpose, source, format, and optimisation status.

## 2. Source and Provenance

### Primary source

- File: `Notion_2013.pdf`
- Provided by the user for this project.
- Use: visual reference, copy reference, stone-tool source, diagram grammar.
- Runtime: reference only; the production page must not load the PDF.

### Source handling

- Store a project copy under `references/Notion_2013.pdf` only if repository size and submission rules permit it.
- Otherwise document its original local source in `references/README.md` without committing the PDF.
- Never hotlink temporary clipboard or local absolute paths from production code.
- Any derived asset must be stored in the project with a provenance note.

### Third-party assets

- Do not use third-party photographs, icons, illustrations, or fonts without recording licence and source.
- Prefer system fonts to avoid font redistribution uncertainty.
- Do not use current Notion brand assets unless they are present in the supplied 2013 document and necessary to this historical concept.

## 3. Required Asset Inventory

| ID | Asset | Purpose | Source | Target format | Priority |
|---|---|---|---|---|---|
| A01 | Stone-tool master | Hero visual and transformation origin | Derive from PDF page 1 | SVG preferred, PNG fallback | Must |
| A02 | Stone-tool reduced-motion image | Static Hero fallback | Derived from A01 | WebP/PNG | Must |
| A03 | Person silhouette | Historical diagram language | Redraw from PDF grammar | SVG symbol | Must |
| A04 | Application-plane icons | Document, Mail, Design, Project labels | Purpose-built | Inline SVG or CSS | Must |
| A05 | Structural arrows | Problem, Solution, Platform relations | Purpose-built | Inline SVG | Must |
| A06 | Software-block module | Reusable Platform module | HTML/CSS, optional SVG mark | Code first | Must |
| A07 | Social preview image | Link sharing | Compose from final Hero | WebP/PNG | Must before release |
| A08 | Favicon | Browser identity | Derived wordmark/stone mark | SVG + PNG fallback | Must before release |
| A09 | Wordmark treatment | Navigation and Hero | Typeset locally | Text/CSS preferred | Must |
| A10 | Paper texture | Optional subtle material cue | Generate procedurally | Tiny WebP or CSS | Nice to have |

## 4. Stone-Tool Asset

The stone is the only major illustration and must receive the most care.

### Preferred production path

1. Render PDF page 1 at high resolution.
2. Isolate the black line illustration without the quotation.
3. Clean the background while preserving irregular engraving marks.
4. Trace manually or semi-manually into a restrained SVG where practical.
5. Simplify excessive path detail without making the stone look geometric.
6. Define a stable viewBox and test at desktop and mobile sizes.
7. Produce a static compressed raster fallback.

### Animation preparation

If SVG tracing is successful, group paths by broad visual region rather than individual scratch mark:

```text
stone-outline
stone-left-plane
stone-centre-plane
stone-right-plane
stone-detail-marks
```

This permits restrained reveal and transformation without hundreds of animated nodes.

### Quality rules

- Retain an etched, printed character.
- Do not smooth the outline into a logo-like shape.
- Do not colourise the stone.
- Do not make it glossy, 3D, or photorealistic.
- Do not animate every line independently.
- Keep the visual recognisable when motion is disabled.

### Fallback decision

If vector tracing harms the original character or creates excessive weight, use a transparent high-resolution raster and animate masks/overlays around it instead.

## 5. Wordmark

- Render `notion` as live text whenever a suitable local/system serif treatment can match the source closely.
- If live text cannot reproduce the historic wordmark sufficiently, create a local SVG wordmark derived from the PDF.
- Provide accessible text independently if an SVG is used.
- Use coral as defined in `design.md`.
- Do not substitute the current cube-style Notion logo.

## 6. Diagram Assets

### Person silhouette

- Create one simple SVG symbol with consistent proportions.
- Reuse via `<use>` or a React icon component.
- Support ink, coral, mist, and success colour variants through `currentColor`.
- Treat repeated person symbols as decorative when adjacent text already communicates the meaning.

### Arrows and connectors

- Prefer inline SVG so line length, path, and active state can respond to layout.
- Use `currentColor` and CSS variables.
- Arrowheads remain small and technical.
- Avoid hand-drawing lines with large SVG path payloads when CSS borders are sufficient.

### Application planes

- Build windows as HTML/CSS surfaces, not screenshots.
- Use abstract document rows, mail lines, canvas marks, and project statuses.
- Do not reproduce third-party application brands or logos.
- Keep each plane legible at a glance with one identifying label.

### Five-layer solution

- Build entirely with semantic HTML and CSS.
- No raster asset required.
- Use text and structural blocks so the content remains accessible and responsive.

### Platform module

- Build with HTML/CSS and inline SVG connectors.
- The pale-blue module is a live representation of visitor state.
- Do not bake field names or project names into an image.

## 7. Product Demo Assets

The Demo uses native components rather than product screenshots.

Required reusable UI marks:

- add;
- reset;
- preview;
- table view;
- board view;
- edit;
- delete;
- move;
- menu/close.

Rules:

- Prefer text labels plus minimal icons.
- Use inline SVG icons with a consistent 1.5px–2px stroke.
- Avoid importing a large icon library for fewer than ten simple marks.
- Icons never replace accessible names.
- Board task cards are code components, not images.

## 8. Typography Assets

### Default plan

Use local/system stacks:

```css
--font-sans: "Avenir Next", Avenir, "Nunito Sans", Inter, sans-serif;
--font-serif: Georgia, "Times New Roman", serif;
```

### Font decision rules

- Do not download or commit commercial font files without an explicit licence.
- Do not depend on a third-party font CDN for the primary experience.
- If a bundled open-source font is later selected, record:
  - family and version;
  - source URL;
  - licence file;
  - used weights/styles;
  - subset strategy.
- Limit shipped font files to the styles actually used.
- Always retain the documented fallback stack.

## 9. Texture

Paper texture is optional and must remain nearly imperceptible.

Preferred approaches:

1. CSS background colour only;
2. subtle CSS noise if inexpensive and deterministic;
3. one tiny, seamless, locally stored WebP tile.

Do not:

- place visible grain behind product UI;
- animate the texture;
- reduce text contrast;
- use large full-screen texture files.

If texture is not clearly improving the material feeling at normal viewing distance, omit it.

## 10. Social and Browser Assets

### Social preview

- Size: 1200×630.
- Include the historic wordmark, `Democratize Software.`, and the stone.
- Maintain the warm paper background and coral accent.
- Do not include tiny UI screenshots.
- Export WebP or optimised PNG based on platform compatibility.

### Favicon

- Prefer a simplified stone/letter mark that remains legible at 16px.
- Provide SVG favicon plus PNG fallback where needed.
- Verify on light browser chrome.

## 11. Proposed Project Locations

```text
public/
  favicon.svg
  favicon-32.png
  social-preview.png

src/assets/
  illustrations/
    stone-tool.svg
    stone-tool-fallback.webp
  icons/
    person.svg
  textures/
    paper.webp              # only if approved

references/
  README.md
  Notion_2013.pdf           # optional; reference only
  source-pages/             # ignored working renders

tools/
  asset-prep/               # repeatable optimisation scripts if needed
```

Inline SVG components that depend on live state should live near their feature code rather than under static assets.

## 12. Working Files and Git

- Do not commit temporary PDF page renders, tracing scratch files, or oversized exports.
- Add working directories such as `references/source-pages/` to `.gitignore` unless a specific render is required for provenance.
- Commit final assets and their licence/provenance records together.
- Keep master editable source only when it is reasonably sized and useful for future changes.
- Do not commit clipboard images from temporary system locations.

## 13. Optimisation Requirements

- Run SVG optimisation while preserving required IDs and groups.
- Remove editor metadata and invisible geometry.
- Set explicit width/height or aspect ratio to prevent layout shift.
- Use responsive raster dimensions; do not ship a single oversized image to mobile.
- Prefer WebP for opaque/transparent raster artwork when quality is acceptable.
- Keep the total initial Hero visual payload proportionate; target under 250KB where practical.
- Lazy-load all non-critical below-the-fold raster assets.
- Do not lazy-load the primary stone if it would delay the first visual anchor.

## 14. Accessibility Requirements

- The stone receives meaningful alt text when used as content.
- Decorative fragments used only during transformation use empty alt text or are hidden from the accessibility tree.
- Diagram meaning must also exist in text/HTML; do not rely on SVG alone.
- Inline icons use `aria-hidden` when a visible label supplies the name.
- Avoid embedding important text in raster images.
- Reduced-motion fallback must use the same meaningful asset, not an empty placeholder.

## 15. Asset Approval Checklist

Before an asset enters production:

- Its narrative or functional purpose is explicit.
- Its provenance and licence are known.
- It matches the 2013 visual grammar.
- It does not duplicate something simpler in HTML/CSS.
- It works on warm-white and pale structural surfaces.
- It has an accessible treatment.
- It is optimised and has stable dimensions.
- It works at mobile and desktop sizes.
- It remains coherent in reduced-motion mode.
- It does not contain baked-in dynamic copy.
