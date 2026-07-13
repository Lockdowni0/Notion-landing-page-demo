# Notion 2013 Landing Page — Scope

## 1. Product Definition

Build one English-language, responsive landing page inspired by `Notion_2013.pdf`. The page contains a real embedded product demo and enacts the reciprocal idea:

> We shape our tools, and thereafter our tools will shape us.

This is a concept experience, not a reconstruction of the complete historical Notion product and not an imitation of the current Notion website.

## 2. Primary Outcome

A first-time visitor should be able to:

1. understand the mission in the first viewport;
2. recognise the limitations of rigid, disconnected applications;
3. understand the progression from page to structured content to software;
4. build and preview a small project tool;
5. see their choices affect the rest of the page;
6. complete the experience on desktop, mobile, keyboard, or touch.

## 3. Required Page Sections

The production page includes exactly these narrative sections:

1. Hero
2. Problem
3. Solution
4. Product Demo
5. Platform
6. Final CTA

A compact persistent navigation may link to `Idea`, `Demo`, and `Platform`.

## 4. Must Have — Landing Page

- Full-canvas Hero with Notion wordmark, mission, original quotation, stone-tool visual, and one CTA.
- Problem sequence showing information fragmented across rigid applications.
- Five-layer solution construction: Web, Visual Editor, Structured Content, LEGO for Software, Marketplace.
- Embedded, operable Product Demo.
- Platform sequence showing one reusable module serving multiple tools.
- Final CTA that adapts after Demo completion.
- Smooth anchor navigation with correct sticky-header offsets.
- Responsive layouts at 320px, 390px, 768px, 1024px, 1280px, and 1440px viewport widths.
- Reduced-motion mode that preserves the complete story.
- Semantic headings, keyboard navigation, visible focus, and WCAG AA text/control contrast.

## 5. Must Have — Product Demo

The canonical scenario is a project tool named `Launch Plan`.

Required capabilities:

- edit the project name;
- add and edit a text block;
- add a task;
- edit a task title;
- assign or change an owner;
- assign or change a due date;
- change a task status;
- switch between Table and Board views;
- preview the result as software;
- reset to the canonical starting state;
- use all primary actions with keyboard and touch.

Required reciprocal behaviour after Preview:

- persist the project name for the current session;
- persist the selected view;
- persist selected fields and status labels;
- persist task edits needed by later sections;
- change the navigation CTA from `Try the demo` to `Your tool`;
- adapt the Platform module to the visitor's structure;
- adapt the Final CTA to acknowledge the visitor's tool.

## 6. Canonical Demo Data

The default structured state contains:

| Task | Owner | Status | Due |
|---|---|---|---|
| Define story | Ivan | Done | Mar 12 |
| Build demo | Simon | In progress | Mar 18 |
| Invite testers | Akshay | Not started | Mar 22 |

The canonical statuses are:

- Not started
- In progress
- Done

## 7. Nice to Have

These may be implemented after every Must Have item is complete and verified:

- drag-and-drop task reordering;
- editable custom status labels;
- optional removal or restoration of fields;
- session storage restoration after refresh;
- subtle pointer parallax on the Hero stone;
- a second Demo template such as Client Portal;
- shareable URL state without personal data;
- light haptic feedback where supported.

Nice-to-have work must not delay accessibility, mobile completeness, or the reciprocal Platform/CTA adaptation.

## 8. Out of Scope

- Authentication or user accounts.
- Backend, database, or cloud persistence.
- Multiplayer presence or real-time collaboration.
- Comments, permissions, notifications, or email delivery.
- File uploads or external integrations.
- A complete block editor.
- A complete Notion clone.
- Marketplace purchasing, billing, or revenue distribution.
- AI features.
- A CMS or admin panel.
- Multiple public routes beyond technical error/fallback handling.
- Dark mode.
- Localisation beyond the English production copy.
- Analytics requiring consent or personal data.
- Reproducing all sixteen PDF slides as separate sections.

## 9. Deliverables

The final project must contain:

- a self-contained source repository;
- production application code;
- local assets needed for the experience;
- project documentation in `docs/`;
- automated tests proportionate to risk;
- a README with setup, development, test, build, and deployment instructions;
- a production build that runs without the source PDF;
- Git history with intentional milestones.

The source PDF may be stored under `references/` for design provenance but is not shipped as a runtime dependency.

## 10. Quality Gates

Development is complete only when all of the following are true:

### Narrative

- The first viewport clearly communicates Notion and `Democratize Software.`
- Headings alone communicate the complete six-part story.
- The original quotation is demonstrated before it is repeated at the end.

### Interaction

- The canonical Demo path completes without error.
- Preview is a clear transition from visitor-shaped content to tool-shaped consequences.
- At least three visitor decisions affect Platform or Final CTA content.
- Skip, reset, refresh fallback, and default-data paths remain coherent.

### Visual

- The page is recognisably rooted in the 2013 plan.
- It does not resemble a generic SaaS card template or the current Notion marketing site.
- Every section has one dominant visual idea.
- There is no unintended horizontal overflow.

### Accessibility

- Primary flows work by keyboard.
- Touch targets meet the 44px minimum.
- Focus is visible.
- State is not communicated by colour alone.
- Reduced-motion mode preserves meaning.

### Engineering

- The production build succeeds.
- Automated tests cover Demo state transitions and reciprocal adaptation.
- Browser checks cover current Chromium, Firefox, and WebKit-compatible behaviour where practical.
- No runtime console errors occur during the canonical flow.

## 11. Change Control

Any proposed feature that expands the Out of Scope list requires an explicit scope decision before implementation.

When schedule or complexity creates pressure, preserve work in this order:

1. narrative clarity;
2. functional Demo path;
3. reciprocal adaptation;
4. accessibility and responsive completeness;
5. visual polish and motion;
6. nice-to-have interactions.
