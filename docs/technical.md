# Notion 2013 Landing Page — Technical Plan

## 1. Technical Goal

Build a static-deployable, accessible, responsive React application with one embedded stateful Demo. The architecture must support the reciprocal contract defined in `demo-spec.md` without introducing a backend, router, global-state framework, or CMS.

Technical decisions should optimise for:

1. deterministic Demo state;
2. strong visual and motion control;
3. accessibility and reduced-motion support;
4. fast iteration and reliable production builds;
5. proportionate automated testing;
6. simple static deployment.

## 2. Selected Stack

### Runtime and application

- React
- TypeScript with strict checking
- Vite using the React TypeScript template
- npm with a committed lockfile

### Styling

- Global CSS for reset, tokens, typography, layout primitives, and accessibility utilities
- CSS Modules for feature/component styles
- CSS custom properties for design tokens and live visual states
- No Tailwind dependency for the initial implementation

### Motion

- Motion for React, imported from `motion/react`
- Native CSS transitions for simple hover, focus, colour, and opacity feedback
- Motion layout animation for Table/Board and block-to-structure transformations
- Motion reduced-motion hook or equivalent media-query handling

### Testing

- Vitest for reducer, selector, persistence, and component tests
- React Testing Library for interaction-oriented component tests
- `@testing-library/user-event` for keyboard and pointer behaviour
- Playwright for complete browser flows and responsive checks
- Automated accessibility checks may use axe in addition to manual keyboard review

### Quality tooling

- ESLint with React and TypeScript support
- Prettier or an equivalent single formatter
- TypeScript compiler in no-emit mode for explicit type checking

## 3. Version Policy

- Use current stable compatible releases when the project is scaffolded.
- Record exact resolved versions in `package-lock.json`.
- Do not hard-code volatile library versions in design documentation.
- Declare a Node engine compatible with the selected Vite/Vitest releases.
- At the time of planning, current Vitest guidance requires Node `>=22.12.0`; verify again during scaffolding.
- Update dependencies intentionally, one coherent group at a time.
- Re-run unit, build, and browser tests after dependency updates.
- Playwright browser binaries must be reinstalled when required by a Playwright update.

## 4. Why This Stack

### React + TypeScript

The page contains several coordinated views of the same Demo state. Typed React components and a reducer make the reciprocal adaptation explicit and testable without requiring a larger application framework.

### Vite

The project is a single client-rendered experience with static deployment. Vite provides an official React TypeScript template, fast development, and a straightforward production build without unnecessary server architecture.

### Motion for React

The design requires layout continuity, SVG/stone reveals, scroll-aware narrative transitions, and reduced-motion handling. Motion is reserved for these meaningful transitions; routine UI feedback remains CSS.

### Vitest + Playwright

Vitest aligns with the Vite toolchain and covers deterministic logic quickly. Playwright covers the complete Demo path, browser behaviour, mobile layouts, keyboard interaction, and reduced-motion scenarios.

## 5. Explicitly Rejected or Deferred

- Next.js or another server framework: no SSR, server data, routing, or backend is required.
- Global state libraries: the Demo state is small and local enough for reducer/context.
- Tailwind: the page depends on art-directed composition and a small custom token system rather than utility-heavy component assembly.
- Component suites: generic visual systems would fight the historic design language.
- Large icon libraries: fewer than ten simple marks are required.
- Drag-and-drop library: drag is Nice to Have and should be evaluated only after accessible move controls work.
- Canvas/WebGL/Three.js: the visual concept does not require a heavyweight rendering layer.
- Runtime PDF parsing: the PDF is a design reference, not application data.

## 6. Proposed Repository Structure

```text
notion-2013-landing/
  .git/
  .github/
    workflows/
      quality.yml
  docs/
    soul.md
    design.md
    scope.md
    content.md
    demo-spec.md
    wireframe.md
    assets-plan.md
    technical.md
  public/
    favicon.svg
    favicon-32.png
    social-preview.png
  references/
    README.md
    Notion_2013.pdf           # optional, reference only
  src/
    app/
      App.tsx
      App.module.css
      providers.tsx
    assets/
      illustrations/
      icons/
      textures/
    components/
      navigation/
      section-label/
      ui/
    features/
      hero/
      problem/
      solution/
      demo/
        components/
        demo.types.ts
        demo.constants.ts
        demo.reducer.ts
        demo.selectors.ts
        demo.persistence.ts
        Demo.tsx
      platform/
      final-cta/
    hooks/
    styles/
      reset.css
      tokens.css
      typography.css
      utilities.css
    test/
      setup.ts
    main.tsx
  tests/
    e2e/
      canonical-flow.spec.ts
      responsive.spec.ts
      accessibility.spec.ts
  tools/
    asset-prep/
  .editorconfig
  .gitignore
  eslint.config.js
  index.html
  package.json
  package-lock.json
  playwright.config.ts
  README.md
  tsconfig.json
  vite.config.ts
  vitest.config.ts
```

Keep feature-specific visual components beside their feature. Put only genuinely reusable controls under `components/ui`.

## 7. Application Composition

```text
App
├── DemoProvider
├── Navigation
├── main
│   ├── HeroSection
│   ├── ProblemSection
│   ├── SolutionSection
│   ├── DemoSection
│   ├── PlatformSection
│   └── FinalCtaSection
└── LiveRegion
```

The DOM order must follow narrative order even when CSS creates asymmetrical desktop composition.

No client router is required. Navigation uses fragment anchors and controlled focus/offset behaviour.

## 8. State Architecture

### Source of truth

Use one typed reducer implementing the events in `demo-spec.md`.

```text
DemoProvider
├── state: DemoState
├── dispatch: DemoDispatch
└── summary: ShapedToolSummary
```

### Context split

Prefer two contexts if render behaviour warrants it:

- state/summary context for readers;
- dispatch context for actions.

Do not store scroll position, hover state, open menus, focus, or animation progress in persistent Demo state.

### Selectors

Pure selectors derive:

- display project name;
- compact project name;
- current field consequences;
- status count;
- `ShapedToolSummary`;
- default versus adapted content state;
- whether Preview is available.

Navigation, Platform, and Final CTA consume selectors or `ShapedToolSummary`, never mutate Demo state.

### Reducer rules

- Reducer is pure and deterministic.
- IDs are created outside or passed in event payloads when deterministic tests require it.
- All user strings remain plain text.
- Unknown events fail loudly during development.
- State transformations preserve stable IDs.

## 9. Persistence

Session storage is the preferred implementation if it does not complicate the first complete version.

```text
key: notion-2013-demo:v1
```

Implementation rules:

- Restore only after validating version and basic shape.
- Use a narrow persistence adapter with `load`, `save`, and `clear` functions.
- Catch storage and JSON failures.
- Throttle or debounce writes caused by text editing.
- Do not persist transient UI state.
- Reset clears both reducer state and storage.
- The application works fully when storage is unavailable.

No cookie, analytics identity, account, or backend is required.

## 10. Content Architecture

- Treat `content.md` as the canonical authoring source.
- Production strings may be collected into typed constants by section.
- Dynamic templates must interpolate plain text only.
- Avoid a runtime Markdown parser for these fixed strings.
- Keep product utility strings near Demo code only when state logic benefits from co-location; values must still match `content.md`.
- Create tests for important dynamic fallbacks and long-name behaviour.

## 11. Styling Architecture

### Global layers

```text
reset.css        browser normalisation and box sizing
tokens.css       colour, type, spacing, sizing, motion values
typography.css   font stacks and text primitives
utilities.css    visually-hidden, focus helpers, reduced motion
```

### Component styling

- Use CSS Modules for component-local layout and states.
- Use semantic `data-*` attributes for stage, view, completion, and active-layer styling.
- Avoid inline styles except values genuinely driven by runtime geometry or Motion.
- Use container queries only where they simplify self-contained Demo responsiveness; maintain viewport fallbacks.
- Use logical properties where practical.
- Prevent page-level overflow rather than hiding it globally.

### Tokens

Implement the colour tokens from `design.md` as CSS custom properties. Add spacing, type, radius, border, z-index, and motion tokens before component implementation.

## 12. Motion Architecture

### CSS responsibilities

- focus, hover, pressed, selected, and disabled feedback;
- simple opacity and colour changes;
- non-layout micro-interactions.

### Motion responsibilities

- Hero stone and copy sequence;
- Problem application-plane resolution;
- Solution-layer build sequence;
- loose-block to structured-field transformation;
- Table/Board shared layout transition;
- Preview transition;
- one-time Platform adaptation reveal.

### Reduced motion

- Centralise reduced-motion preference in a hook/provider.
- Disable scroll-linked transforms and parallax.
- Complete layout/state transitions immediately or with sub-100ms opacity.
- Do not remove content or interaction.

### Performance

- Prefer transform and opacity.
- Avoid animating large blur/filter regions during scroll.
- Avoid high-frequency React state updates for scroll progress.
- Use Motion values or CSS where continuous values are unavoidable.
- Do not animate hundreds of independent SVG stone paths.

## 13. Accessibility Architecture

- Use landmark elements: `header`, `nav`, `main`, `section`, `footer`.
- Preserve heading order.
- Use native form controls wherever their semantics fit.
- Implement one polite live region for concise Demo status changes.
- Use a tested accessible dialog pattern for reset confirmation and mobile block sheet.
- Restore focus after dialog close and major Demo transitions.
- Provide keyboard alternatives to any pointer gesture.
- Use visible focus tokens that work on paper, coral-pale, and blue-pale surfaces.
- Test with motion disabled and at 200% zoom.
- Do not make the Stone transformation the only carrier of narrative meaning.

## 14. Browser and Responsive Policy

Target modern browsers supported by the selected Vite release. Validate the final application in:

- Chromium desktop;
- Firefox desktop;
- WebKit desktop where available;
- Chromium mobile emulation;
- WebKit mobile emulation where available.

Required viewport checks:

- 320×568
- 390×844
- 768×1024
- 1024×768
- 1280×800
- 1440×900

Do not add legacy-browser polyfills unless submission requirements explicitly demand them.

## 15. Testing Strategy

### Unit tests — Vitest

Highest priority:

- reducer event transitions;
- structure transformation preservation rules;
- Preview validation;
- derived `ShapedToolSummary`;
- long/empty project-name selectors;
- reset behaviour;
- persistence validation and failure fallback.

### Component tests — Testing Library

- keyboard editing and task creation;
- Table/Board switcher semantics;
- reset dialog focus and cancellation;
- empty-state validation;
- live-region messages;
- reduced-motion branch where practical.

### End-to-end tests — Playwright

- default narrative without Demo completion;
- canonical pointer flow;
- canonical keyboard flow;
- reciprocal Navigation/Platform/CTA adaptation;
- reset returns all consumers to default;
- mobile Demo flow;
- reduced-motion flow;
- no page-level overflow at required widths;
- screenshot checkpoints for Hero, Demo structured state, adapted Platform, and Final CTA.

### Manual review

- visual fidelity to PDF;
- motion quality and restraint;
- screen-reader spot check;
- keyboard-only traversal;
- 200% browser zoom;
- real mobile touch check when available.

## 16. Scripts

Recommended `package.json` scripts:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "typecheck": "tsc -b --pretty false",
    "lint": "eslint .",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "check": "npm run typecheck && npm run lint && npm run test && npm run build"
  }
}
```

Run browser tests separately from the fast `check` script unless CI capacity and setup make inclusion practical.

## 17. Performance Budgets

Initial targets, subject to measurement:

- Initial compressed JavaScript: under 180KB where practical.
- Initial critical visual assets: under 300KB.
- No autoplay video payload.
- No large third-party font payload.
- Avoid cumulative layout shift by declaring media dimensions.
- Hero visual should appear promptly and not wait for below-the-fold code.
- Lazy-load non-critical raster assets and optional sections where it does not harm scroll continuity.

Measure before optimising. Do not sacrifice narrative continuity for tiny theoretical bundle savings.

## 18. Security and Privacy

- Render visitor strings through React text interpolation only.
- Do not use `dangerouslySetInnerHTML` for Demo content.
- Do not collect or transmit Demo data.
- Do not load third-party analytics by default.
- Avoid third-party asset hotlinks.
- Add a restrictive Content Security Policy at deployment when the hosting environment supports it.
- Keep dependencies minimal and review audit findings proportionately.

## 19. Static Deployment

The production output is the Vite `dist/` directory and can be hosted on any static host.

- Use relative-safe asset handling through Vite.
- Configure the correct `base` only when deploying below a subpath.
- No server rewrite is required because the product has one route.
- Verify direct loading, anchor navigation, refresh after session restoration, and social metadata.
- Do not include working reference renders in `dist/`.

## 20. Git Strategy

Initialise Git inside the new project directory, not the current preparation workspace root.

### Recommended milestones

1. `chore: scaffold React TypeScript project`
2. `docs: add product and design specifications`
3. `feat: build page structure and design tokens`
4. `feat: add hero and narrative sections`
5. `feat: implement demo state and editor`
6. `feat: connect reciprocal platform experience`
7. `test: cover demo and responsive flows`
8. `chore: optimise assets and production build`

### Rules

- Commit intentionally at working milestones.
- Keep generated build output and browser-test artefacts ignored.
- Commit `package-lock.json`.
- Do not commit secrets, temporary PDF renders, clipboard images, or local absolute paths.
- Use a feature branch only if remote collaboration or review requires it; a clean linear local history is sufficient for a solo submission.
- Tag the final submission version, for example `v1.0.0`, after all quality gates pass.

## 21. CI Plan

A single quality workflow should:

1. check out the repository;
2. use the repository's declared Node version;
3. run `npm ci`;
4. run type checking, lint, unit tests, and production build;
5. install required Playwright browsers;
6. run selected end-to-end tests;
7. upload Playwright traces/reports only on failure or as short-lived artefacts.

Prefer deterministic CI over maximum parallelism. Browser tests may use one worker in CI when stability requires it.

## 22. Technical Definition of Done

- `npm ci` succeeds from a clean checkout.
- Type checking, linting, formatting check, unit tests, and production build pass.
- The canonical pointer and keyboard Demo flows pass in Playwright.
- Navigation, Platform, and Final CTA adapt from shared Demo state.
- Reset clears state, persistence, and all adapted consumers.
- The page works without session storage.
- Required viewports have no page-level horizontal overflow.
- Reduced-motion mode preserves every state transition and narrative outcome.
- No runtime console errors occur in the canonical flow.
- Runtime output contains no PDF, temporary render, absolute local path, or unlicensed asset.

## 23. Official References Checked

These official sources informed the tool choices. Recheck them during scaffolding for current compatibility requirements:

- React TypeScript guide: `https://react.dev/learn/typescript`
- Vite getting started: `https://vite.dev/guide/`
- Motion for React: `https://motion.dev/docs/react`
- Vitest getting started: `https://main.vitest.dev/guide/`
- Playwright running tests: `https://playwright.dev/docs/running-tests`
- Playwright browsers: `https://playwright.dev/docs/browsers`
- Playwright CI: `https://playwright.dev/docs/ci`
