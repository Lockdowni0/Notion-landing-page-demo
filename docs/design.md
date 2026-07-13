# Notion 2013 Landing Page — Design Rules

## 1. Status and Authority

This file is the implementation-level source of truth for the landing page. `soul.md` defines the brand's intent and emotional boundaries; this file defines how those principles are expressed in layout, type, colour, motion, interaction, and responsive behaviour.

When implementation conflicts with these rules, either change the implementation or document a deliberate exception.

## 2. Page Architecture

The product is one English-language, single-page landing experience with an embedded interactive demo.

The canonical sequence is:

1. `Hero` — brand, mission, quotation, stone-tool visual, primary CTA.
2. `Problem` — disconnected applications and inefficient handoffs.
3. `Solution` — the five-layer Notion system.
4. `Demo` — content becomes structured data and then software.
5. `Platform` — a module is built once and reused in many tools.
6. `Final CTA` — return to the mission and invite the visitor to build.

Every section must have:

- one job;
- one dominant visual idea;
- one primary takeaway;
- no more than one primary action.

Do not translate the sixteen PDF pages into sixteen website sections.

### Reciprocal experience model

The page has two connected phases:

```text
Phase A — We shape our tools
Hero -> Problem -> Solution -> Demo construction

Phase B — Our tools shape us
Demo preview -> adapted Platform section -> adapted Final CTA
```

Phase A gives the visitor direct control. Phase B uses the resulting structure to change later content in a bounded, understandable way.

The following visitor decisions must persist for the current session:

- project name;
- selected Table or Board view;
- chosen fields;
- workflow status labels;
- task data created or edited during the demo.

Persistence may use application state or session storage. It must not require an account, backend, cookie banner, or personal data collection.

Adaptation is structural, not thematic. Do not change the colour palette, typography, overall navigation, or accessibility behaviour based on visitor choices.

## 3. Layout System

### Canvas

- Page background: warm off-white, not stark digital white.
- Hero and major visual sequences run edge-to-edge.
- Constrain only the inner content, never the hero canvas itself.
- Desktop content maximum width: `1180px` to `1240px`.
- Reading-column maximum width: `560px`.
- Demo maximum width: `1320px`, with safe viewport gutters.

### Gutters

- Desktop, `>= 1200px`: `64px` minimum.
- Tablet, `768px–1199px`: `40px`.
- Mobile, `< 768px`: `20px` to `24px`.

### Vertical rhythm

- Hero: `100svh`, with a practical minimum height of `680px` on desktop.
- Major section padding: `160px–220px` desktop, `104px–144px` tablet, `80px–112px` mobile.
- Related text spacing uses an 8px base rhythm.
- Avoid stacking many equal-height sections; allow the story to breathe.

### Composition

- Prefer asymmetrical balance and generous negative space.
- Align section labels, headings, and diagrams to a stable underlying grid.
- Use large quiet fields before adding containers or decoration.
- Do not centre every section.
- Avoid generic alternating left-text/right-image patterns.
- Do not place the Hero inside a rounded or boxed container.

## 4. Swiss Internationalist Grid System

### Grid philosophy

The grid is the spatial expression of the product idea. It is not a decorative background and not a neutral implementation convenience.

> The grid begins as a possibility, becomes a tool through interaction, and ends as a structure that shapes what the visitor sees next.

The system draws from Swiss International Style through:

- objective hierarchy;
- asymmetric but rigorous composition;
- modular columns;
- consistent alignment axes;
- disciplined typographic rhythm;
- information relationships expressed through position rather than decoration;
- generous negative space;
- controlled exceptions with explicit meaning.

The page must not become a generic Swiss-poster imitation. Its typography may remain warm and humanist; its spatial logic must remain rational.

### Macro grid

Use a responsive page grid:

| Breakpoint | Columns | Outer margin | Gutter | Content maximum |
|---|---:|---:|---:|---:|
| Desktop `>= 1200px` | 12 | `64px` minimum | `24px` | `1240px` |
| Tablet `768px–1199px` | 8 | `40px` | `20px` | Fluid |
| Mobile `< 768px` | 4 | `20px–24px` | `16px` | Fluid |

Rules:

- Grid tracks live inside the full-bleed section canvas.
- Inner content aligns to the grid; the section background does not inherit a boxed maximum width.
- Use column spans deliberately, not as automatic equal divisions.
- Preferred desktop relationships include `3/9`, `4/8`, `5/7`, `3/6/3`, and selective `6/6`.
- Avoid repeating the same split in every section.
- Do not centre content merely because a balanced column split is available.

### Information axes

Maintain three recurring alignment roles across the page:

1. **Identity axis** — section number, label, year, or progress marker; usually desktop columns 1–2.
2. **Statement axis** — headline, argument, and CTA; usually begins on desktop column 3 or 4.
3. **System axis** — illustration, diagram, editor, or evidence; usually occupies desktop columns 7–12.

Not every section must display all three axes, but visible elements should inherit one of these relationships. A new alignment must be justified by a section-specific interaction or visual anchor.

### Hero mapping

Default desktop placement:

- wordmark and date: columns 1–2;
- mission, support copy, and CTA: columns 2–6;
- stone visual: columns 7–10;
- quotation: columns 10–12.

The stone may cross a column boundary because it represents the irregular, human-shaped tool. Text must remain precisely aligned. The Hero must not resolve into a generic equal two-column split.

### Problem mapping

Application planes begin in controlled grid positions, then deviate under workflow pressure:

- Document: columns 2–4;
- Mail: columns 5–7;
- Design: columns 8–10;
- Project: columns 10–12.

All displacement still uses the spacing scale. Do not generate random positions. The sequence ends with one workspace aligned approximately to columns 3–11.

### Solution mapping

- Statement and active-layer explanation: columns 1–4.
- Five-layer construction: columns 5–12.
- Within each layer, align number, name, and benefit to stable sub-columns.
- Use rules, spacing, numbering, and alignment instead of feature cards or repeated icons.

### Demo subgrid

The Product Demo uses a denser local grid while remaining aligned to the page grid:

| Context | Columns | Inner gutter | Inner inset |
|---|---:|---:|---:|
| Desktop Demo | 16 | `12px–16px` | `24px` |
| Tablet Demo | 12 | `12px` | `20px` |
| Mobile Demo | 4 | `12px` | `16px` |

Default desktop allocation:

- block library: 3 of 16 columns;
- primary workspace: 13 of 16 columns.

If a future inspector is added, use `3 / 10 / 3`; do not add it merely to fill the grid.

Structured Table allocation:

- Task: 6 of 16 columns;
- Owner: 3 of 16 columns;
- Status: 4 of 16 columns;
- Due: 3 of 16 columns.

Board columns divide the available workspace into equal status tracks while retaining the task card's internal field alignment. On mobile, Board may scroll inside a bounded region; the page itself must not overflow.

### Baseline and spacing grid

Use an `8px` baseline and a `4px` micro-unit.

Canonical spacing values:

```text
4, 8, 16, 24, 32, 40, 48, 64, 80, 96, 128, 160, 192
```

Rules:

- Component geometry and displacement should use the scale unless optical correction is required.
- Body line heights should return to the baseline, such as `16/24`, `18/32`, or `20/32`.
- Large display type may break a single baseline, but the complete text block and following spacing must return to the rhythm.
- Optical corrections should be documented in component styles and remain within the 4px micro-unit where practical.
- Do not use arbitrary margins to repair an unclear composition.

### Reciprocal grid states

The grid has three narrative states:

1. **Hidden grid** — Hero. Alignment makes the grid perceptible without drawing it.
2. **Revealed grid** — Solution and Demo shaping actions. Coral guides, field rules, and numbered modules briefly expose structure.
3. **Embodied grid** — Platform and Final CTA. Guide lines recede, but the visitor's structure determines alignment and information flow.

The grid also supports the two reciprocal phases:

- **We shape our tools** — content may begin loose; visitor actions create alignments, fields, and relationships.
- **Our tools shape us** — after Preview, the selected view and fields determine how later content is organised.

Table selection should emphasise field columns, comparison, and vertical alignment. Board selection should emphasise status tracks, horizontal movement, and workflow progression. Both remain expressions of the same grid and design language.

### Controlled violations

Only these elements may intentionally cross or temporarily leave grid tracks:

- the stone-tool illustration;
- a block currently under direct manipulation;
- a module transitioning between systems or views.

Violation rules:

- The departure must communicate shaping, movement, or transformation.
- The element's starting and ending states must return to legible grid relationships.
- Displacement uses the spacing scale rather than random values.
- Headings, body copy, navigation, and CTAs do not float outside the grid.
- Decorative elements may not violate the grid merely to create energy.

In this system, crossing the grid represents shaping; alignment represents the tool creating order.

### Grid visibility

- Do not place a permanent graph-paper overlay behind the page.
- Reveal guides only when they explain an interaction, field relationship, or construction step.
- Guide lines use coral or pale grey at restrained opacity and disappear once the structure is understood.
- Development-only grid overlays must never ship enabled in production.

### Responsive transformation

- Preserve relationships and narrative order rather than literal desktop coordinates.
- Desktop 12-column structures remap to 8 columns on tablet and 4 columns on mobile.
- The identity axis may become a full-width label row on mobile.
- System visuals may follow statements vertically when side-by-side composition becomes too narrow.
- Convert horizontal diagrams to vertical relationship flows before shrinking text or controls.
- Sticky desktop constructions become shorter sticky sequences or normal flow on mobile.
- Product Demo actions and state relationships must remain complete at every breakpoint.

### Implementation tokens

Define the grid through CSS custom properties and shared layout primitives:

```css
:root {
  --grid-columns: 4;
  --grid-gutter: 16px;
  --page-margin: clamp(20px, 5vw, 64px);
  --content-max: 1240px;
  --space-unit: 8px;
  --micro-unit: 4px;
}

@media (min-width: 768px) {
  :root {
    --grid-columns: 8;
    --grid-gutter: 20px;
    --page-margin: 40px;
  }
}

@media (min-width: 1200px) {
  :root {
    --grid-columns: 12;
    --grid-gutter: 24px;
    --page-margin: 64px;
  }
}
```

Use one shared page-grid primitive based on CSS Grid. Feature sections may define subgrids or local grids, but they must inherit the page margin, gutter rhythm, and section alignment map.

### Grid acceptance checks

- Every visible element has an identifiable alignment relationship.
- Each section uses asymmetric balance without feeling arbitrary.
- The Hero is a full-canvas composition, not a boxed two-column template.
- Problem deviation remains controlled and resolves back into structure.
- The five solution layers read as one system, not five cards.
- Demo field proportions remain legible at required viewports.
- Table and Board produce different organisational behaviour without changing the visual identity.
- Only approved elements cross grid tracks, and only for narrative reasons.
- No permanent decorative grid overlay is visible.
- Mobile preserves the grid logic and does not collapse into indiscriminate centred stacking.

## 5. Colour System

Use CSS custom properties and treat these as starting values subject to accessibility tuning.

```css
:root {
  --paper: #fcfcfa;
  --white: #ffffff;
  --ink: #171717;
  --ink-soft: #6f6f6a;
  --mist: #b8b8b3;
  --line: #e8e8e3;
  --coral: #ff5f57;
  --coral-pale: #fff0ee;
  --module-blue: #62bde4;
  --module-blue-pale: #e9f8fd;
  --success: #67b63b;
}
```

### Rules

- Coral is the persistent brand accent and primary action colour.
- Black and warm greys carry information hierarchy.
- Pale pink is a structural field, never a decorative gradient.
- Blue appears only when explaining reusable software modules.
- Green appears only for a clear positive state or milestone.
- Do not introduce additional accent colours without revising this document.
- Do not use decorative gradients, neon colour, glassmorphism, or dark-mode sections.
- Text and interactive controls must meet WCAG AA contrast.

### Reciprocal visual states

Use two related visual conditions to express the quotation:

**Human / shaping state**

- coral action traces;
- hand-drawn or irregular line work;
- loosely positioned blocks before structure is assigned;
- visible direct-manipulation handles and connection cues.

**System / shaped state**

- aligned grids and fields;
- black and warm-grey information hierarchy;
- stable relationships, arrows, statuses, and next actions;
- the visitor's earlier coral traces retained as evidence of authorship.

The page should transition gradually between these states. Do not switch to a separate visual theme or make the system state look sterile and machine-generated.

## 6. Typography

Use no more than two type families.

### Sans-serif

Use a humanist or geometric sans with warm proportions. Preferred direction:

```css
font-family: "Avenir Next", Avenir, "Nunito Sans", Inter, sans-serif;
```

Use it for brand copy, headings, body text, navigation, labels, data, and product UI.

### Serif italic

Use an editorial serif italic for philosophy and conceptual emphasis:

```css
font-family: Georgia, "Times New Roman", serif;
font-style: italic;
```

Use it only for quotations or one or two words inside a heading. Never use it for controls, long body copy, or data.

### Scale

- Brand wordmark: visually unmistakable, but not oversized campaign typography.
- Hero heading: `clamp(3.2rem, 7vw, 7rem)` with controlled line breaks.
- Section heading: `clamp(2.25rem, 4.5vw, 4.75rem)`.
- Supporting headline: `clamp(1.5rem, 2.5vw, 2.5rem)`.
- Body: `17px–20px`, line-height `1.5–1.65`.
- Product UI: `13px–16px`, line-height `1.35–1.5`.
- Section labels: uppercase, `12px–14px`, letter-spacing `0.12em–0.18em`.

### Rules

- Keep hero headings to approximately two or three lines.
- Use sentence case except for section labels.
- Avoid heavy bold weights; hierarchy should come from size, spacing, colour, and placement.
- Do not justify body copy.
- Do not repeat the same marketing claim in multiple sections.

## 7. Image and Illustration Direction

The Hero requires one dominant visual anchor: a black-and-white etched or hand-drawn stone tool derived from the source document's visual language.

### Illustration rules

- Use monochrome line work with visible irregularity.
- Preserve a paper/editorial feeling rather than a glossy 3D render.
- Keep embedded text out of illustrations.
- Diagrams use square blocks, fine arrows, thin rules, and simple human silhouettes.
- Crop deliberately and leave a calm text area.
- Imagery must carry narrative meaning; texture alone is insufficient.

### Prohibited imagery

- stock office photography;
- generic 3D floating objects;
- blob gradients;
- device mockups used as decoration;
- collages of unrelated product screens;
- illustrations with built-in UI panels or promotional typography.

## 8. Navigation

- The header overlays the Hero and does not consume additional viewport height.
- The Notion wordmark remains the strongest navigation element.
- Desktop navigation: `Idea`, `Demo`, `Platform`, and `Try the demo`.
- The primary navigation CTA is text-led with a fine underline or minimal border; avoid a bulky pill.
- After leaving the Hero, the header may gain a restrained warm-white surface and a one-pixel divider.
- Mobile navigation retains the wordmark and direct Demo access; secondary links may move into a simple menu.
- Anchor navigation must account for the sticky header offset.

## 9. Section-Specific Rules

### Hero

- Treat the first viewport as a poster.
- Required elements: brand, mission, short support line, primary CTA, stone visual, original quotation.
- Use one composition only; do not add feature cards, statistics, logo clouds, badges, or dashboard thumbnails.
- Ensure the header and all essential Hero content fit in a common desktop and mobile viewport.

### Problem

- Show fragmentation through four restrained application planes: document, mail, design, and project.
- The planes may overlap or exchange versioned documents during scroll.
- Their disorder should remain legible, not become visual noise.
- End the sequence by resolving the planes into one blank workspace.

### Solution

- Present the five layers as one construction, not five cards.
- Layer order is fixed: `Web`, `Visual Editor`, `Structured Content`, `LEGO for Software`, `Marketplace`.
- Highlight only the active layer in coral; keep inactive layers pale.
- Each layer receives one short benefit statement.

### Product Demo

- The demo is a real interaction surface, not a video or static screenshot.
- The canonical scenario is a project tool named `Launch Plan`.
- The canonical transformation is:

```text
empty page -> content blocks -> structured table -> alternate view -> software preview
```

- Required content controls: Text and Task.
- Required structured fields: Task, Owner, Status, and Due.
- Required interactions: add content, edit content, change task status, add a task, switch Table/Board view, preview, reset.
- Drag reordering is desirable but may not block the first complete version.
- State may be local only; authentication and backend persistence are out of scope.
- Use utility copy inside the demo. Labels must explain state or action, not make marketing claims.
- Cards are allowed only where the card is the actual interactive unit, such as a task in Board view.
- Desktop layout may use a block library, main canvas, and compact context controls.
- On mobile, replace the permanent block library with a bottom action bar or sheet.
- Provide keyboard focus, clear hover/pressed states, and touch targets of at least `44px`.
- Treat the first successful Preview as the reciprocal turning point of the page.
- On Preview, preserve the visitor's project name, view, fields, statuses, and task edits in shared page state.
- Change the navigation CTA from `Try the demo` to `Your tool` after a successful Preview.
- Display a concise acknowledgement such as `You shaped Launch Plan.` using the actual project name.
- Do not simulate visitor authorship with a scripted cursor or fixed fake choices.

### Platform

- Demonstrate one highlighted module reused across multiple software structures.
- Use pale blue only for the reusable module.
- Do not turn the destinations into a generic three-card feature row.
- The relationship between source module and destinations must remain visible.
- Reuse the visitor's actual fields or workflow states from the Demo in the shared module.
- Demonstrate behavioural consequences: statuses organise handoffs, owners clarify responsibility, and due dates change the next action.
- If the visitor has not completed the Demo, use a well-designed canonical `Launch Plan` fallback so the narrative remains complete.

### Final CTA

- Return to the philosophical tone of the Hero.
- Use one primary action: `Start building`.
- Keep the ending spacious and conclusive.
- A small `notion — March 2013` signature may close the page.
- If the Demo was completed, acknowledge the created tool by name and offer `Shape another tool` or `Start again`.
- If the Demo was not completed, use the default `Start building` action.
- Reintroduce the original quotation only after the page has demonstrated both halves of it.

## 10. Component Shape Language

- Default corner radius: `0px` for structural blocks and diagrams.
- Product controls may use `4px–8px` radius when it improves usability.
- Avoid pervasive rounded containers.
- Default border: `1px solid var(--line)`.
- Avoid heavy shadows. If elevation is functionally necessary, use a low-opacity, wide, soft shadow.
- Icons use simple strokes or solid silhouettes with consistent geometry.
- Do not use ornamental icons that do not improve scanning or action recognition.
- Buttons should look precise and editorial, not inflated.

## 11. Motion and Interaction

Motion communicates construction, transformation, hierarchy, or feedback.

Motion belongs to one of two classes:

- **Shaping motion** follows direct visitor input: add, drag, edit, connect, arrange.
- **Shaped motion** shows the system reorganising information and behaviour: align, structure, transform view, advance workflow, update later content.

The transition between these classes must be visible at Demo Preview. Direct manipulation settles into an ordered tool, and that tool then alters the Platform and Final CTA sections.

### Required motion moments

1. **Hero entrance** — stone line work and key copy reveal in a restrained sequence.
2. **Scroll transformation** — disconnected application planes resolve into one workspace or the five-layer system builds upward.
3. **Demo transformation** — blocks reorganise into structured data and alternate views using shared spatial continuity.

### Timing

- Direct UI feedback: `150–300ms`.
- Layout transitions: `300–500ms`.
- Section narrative transitions: `600–900ms`.
- Hero sequence: approximately `1200–1600ms` total.

### Easing

- Prefer restrained ease-out curves for entrances.
- Use spring motion only for direct manipulation, with low bounce.
- Avoid perpetual motion, floating loops, excessive parallax, and scroll hijacking.
- Motion must remain noticeable in a short screen recording but comfortable during normal reading.
- Honour `prefers-reduced-motion`; preserve meaning without animation.
- Never hide a state change inside motion alone; the resulting structure and copy must remain explicit.

## 12. Responsive Behaviour

### Desktop

- Use asymmetrical editorial composition and generous empty space.
- Sticky sequences may pair a fixed text column with a changing visual field.
- Keep the complete Demo visible at common laptop widths without horizontal scrolling.

### Tablet

- Reduce gutters and long sticky distances.
- Preserve the five-layer sequence and Demo transformation.
- Stack text above complex diagrams when necessary.

### Mobile

- Preserve narrative order rather than desktop geometry.
- Use `100svh` carefully and test browser chrome behaviour.
- Keep headlines within one glance and avoid orphaned single words.
- Convert horizontal diagrams into vertical constructions.
- Reduce decorative parallax and simultaneous animation.
- Maintain all primary Demo actions; do not replace the Demo with a screenshot.
- No horizontal page overflow at `320px` width.

## 13. Accessibility and Usability

- Meet WCAG AA colour contrast for text and controls.
- Every interactive element must be keyboard reachable.
- Use visible, brand-consistent focus indicators.
- Supply semantic headings in document order.
- Provide alt text for meaningful illustrations and empty alt text for purely decorative marks.
- Do not communicate state through colour alone.
- Ensure touch targets are at least `44px`.
- Announce important Demo state changes when appropriate.
- The core story and Demo remain understandable when motion is disabled.

## 14. Performance

- Optimise the stone illustration as SVG or a compressed transparent raster when appropriate.
- Avoid large autoplay video backgrounds.
- Lazy-load below-the-fold non-critical imagery.
- Keep animation on transform and opacity where possible.
- Avoid layout thrashing in scroll-linked sequences.
- Target a smooth experience on a mid-range mobile device, not only a desktop development machine.

## 15. Explicitly Prohibited Patterns

- Generic SaaS feature-card grids.
- Hero dashboard cards or floating UI mosaics.
- Logo clouds, stat strips, badge clusters, or pill soup.
- Decorative gradients, glassmorphism, or neon glows.
- More than two type families.
- More than one persistent accent colour.
- Rounded containers around every section.
- Copying the current Notion black-and-white marketing site.
- Treating the original PDF as sixteen sections to reproduce literally.
- A Product Demo that is only an image, video, or scripted fake cursor.
- Motion whose only purpose is to make the page feel busy.

## 16. Acceptance Checklist

Before considering the page complete, verify:

- The brand and mission are unmistakable in the first viewport.
- The Hero has one strong visual anchor and one primary CTA.
- The page can be understood by scanning headings alone.
- Each section has one job and one dominant visual idea.
- The visual language clearly derives from `Notion_2013.pdf`.
- The page does not resemble a generic modern SaaS template.
- The Demo is operable and clearly transforms information into software.
- At least three Demo decisions persist into the Platform or Final CTA experience.
- The visitor can clearly identify the moment the tool begins shaping later content.
- The adapted experience remains understandable when the Demo is skipped or reset.
- The primary Demo path works with keyboard and touch.
- The mobile version preserves the Demo rather than removing it.
- Motion reinforces construction, transformation, hierarchy, or feedback.
- Reduced-motion mode preserves all meaning.
- Text and controls meet accessibility contrast requirements.
- No horizontal overflow occurs at `320px`, `768px`, `1024px`, or `1440px` viewport widths.
- The experience remains coherent after decorative shadows are removed.
