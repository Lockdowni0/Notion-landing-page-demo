# Notion 2013 Landing Page — Wireframe

## 1. Purpose

This document fixes the spatial hierarchy, scroll sequence, responsive transformations, and reciprocal turning point before visual implementation. It is intentionally low fidelity. Final colour, typography, illustration finish, and motion timing remain governed by `design.md`.

## 2. Global Page Flow

```text
┌──────────────────────────────────────────────┐
│ 01  HERO — belief                            │
│     The stone and the quotation              │
├──────────────────────────────────────────────┤
│ 02  PROBLEM — recognition                    │
│     Rigid applications shape the user        │
├──────────────────────────────────────────────┤
│ 03  SOLUTION — clarity                       │
│     Five layers build into a system          │
├──────────────────────────────────────────────┤
│ 04  DEMO — agency                            │
│     The visitor shapes a tool                │
│     PREVIEW = reciprocal turning point       │
├──────────────────────────────────────────────┤
│ 05  PLATFORM — consequence                   │
│     The tool shapes work and collaboration   │
├──────────────────────────────────────────────┤
│ 06  FINAL CTA — invitation                   │
│     The quotation becomes understood         │
└──────────────────────────────────────────────┘
```

Target total length is approximately 8–10 desktop viewports and 11–14 mobile viewports, depending on Demo interaction.

## 3. Persistent Navigation

### Desktop

```text
┌──────────────────────────────────────────────────────────────┐
│ notion          Idea      Demo      Platform      Try the demo │
└──────────────────────────────────────────────────────────────┘
```

- Overlay the Hero.
- Wordmark is left aligned to the page grid.
- Links occupy the right side without a boxed navigation bar.
- After Hero, a warm-white surface and fine lower rule may appear.
- After Preview, `Try the demo` becomes `Your tool`.

### Mobile

```text
┌───────────────────────────────┐
│ notion        Demo      Menu │
└───────────────────────────────┘
```

- Keep direct access to Demo.
- Put secondary links in a simple modal or disclosure menu.
- Header remains visually light and does not dominate the first screen.

## 4. Hero Wireframe

### Desktop — 100svh

```text
┌──────────────────────────────────────────────────────────────────┐
│ notion                         Idea  Demo  Platform  Try the demo│
│                                                                  │
│ MARCH 2013                                                      │
│                                                                  │
│ Democratize                                                     │
│ Software.                 [STONE TOOL]       We shape            │
│                                               our tools,         │
│ A home for your information,                  and thereafter     │
│ your tools, and the software                  our tools will     │
│ you shape.                                    shape us.          │
│                                                                  │
│ Begin shaping  →                                                │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

Composition rules:

- Text column occupies roughly 36–42% of the canvas.
- Stone is the dominant image and occupies the calm centre-right field.
- Quotation is visually separate but connected to the stone.
- CTA remains below the supporting copy, never inside a card.
- Essential content fits without requiring scroll at 1280×720 and 1440×900.

### Mobile — 100svh minimum

```text
┌───────────────────────────────┐
│ notion            Demo  Menu │
│                               │
│ MARCH 2013                    │
│ Democratize                   │
│ Software.                     │
│                               │
│ A home for your information,  │
│ your tools, and the software  │
│ you shape.                    │
│                               │
│ Begin shaping  →              │
│                               │
│        [STONE TOOL]           │
│  We shape our tools...        │
└───────────────────────────────┘
```

- Stone sits below the primary CTA.
- Preserve quotation in full; line breaks may change.
- Avoid shrinking the stone into an icon.

## 5. Problem Wireframe

### Desktop — 1.5–2 viewports

Opening frame:

```text
┌──────────────────────────────────────────────────────────────────┐
│ PROBLEM                                                         │
│ Software became a collection of applications.                   │
│                                                                  │
│ Ideas live in one place. Conversations in another.              │
│ The final work somewhere else.                                  │
│                                                                  │
│ [DOCUMENT]      [MAIL]       [DESIGN]       [PROJECT]           │
└──────────────────────────────────────────────────────────────────┘
```

Scroll progression:

```text
Frame A: four separated application planes
Frame B: versioned files travel between planes
Frame C: planes overlap and constrain the working area
Frame D: planes collapse into one empty workspace
```

Closing frame:

```text
┌──────────────────────────────────────────────────────────────────┐
│ We can’t go to Mars by sending Word documents around.           │
│                                                                  │
│                       [EMPTY WORKSPACE]                          │
│                                                                  │
│ What if the tool adapted to you?                                │
└──────────────────────────────────────────────────────────────────┘
```

### Mobile

- Stack application planes vertically with slight controlled overlap.
- Use a shorter scroll sequence; never require precise scroll scrubbing.
- Resolve into one full-width workspace before the Solution heading.

## 6. Solution Wireframe

### Desktop — sticky, approximately 2 viewports

```text
┌───────────────────────────┬──────────────────────────────────────┐
│ SOLUTION                  │                                      │
│                           │  4  Marketplace                      │
│ A centralized home       │  ──────────────────────────────────  │
│ for your information     │  3  LEGO for Software               │
│ & software.              │  ──────────────────────────────────  │
│                           │  2  Structured Content               │
│ [active benefit copy]    │  ──────────────────────────────────  │
│                           │  1  Visual Editor                    │
│                           │  ──────────────────────────────────  │
│                           │  0  Web                              │
└───────────────────────────┴──────────────────────────────────────┘
```

- Left text column remains sticky.
- Right construction grows from Web upward.
- Exactly one active layer is coral.
- Final state shows the complete stack and `Build a tool` action.

### Mobile

```text
SOLUTION
A centralized home...

[0 WEB]
Available anywhere.

[1 VISUAL EDITOR]
Shape ideas directly.

[2 STRUCTURED CONTENT]
Turn information into data.

[3 LEGO FOR SOFTWARE]
Assemble your own workflow.

[4 MARKETPLACE]
Build once. Serve many.

Build a tool  →
```

- The stack grows vertically in normal document flow.
- Do not force a long sticky interaction on mobile.

## 7. Product Demo Section

### Landing introduction

```text
NOTION DEMO
Start with information. End with software.
Shape a project page, give it structure, then see how the
structure changes what happens next.
```

The Demo is the widest page element and visually marks the transition from manifesto to working product.

### Desktop — page stage

```text
┌──────────────────────────────────────────────────────────────────┐
│ notion demo                              Reset  Preview as software│
├────────────────┬─────────────────────────────────────────────────┤
│ BLOCKS         │ Launch Plan                                     │
│                │                                                 │
│ + Text         │ [editable loose text/task blocks]               │
│ + Task         │                                                 │
│                │                                                 │
│                │        Give these tasks structure  →            │
├────────────────┴─────────────────────────────────────────────────┤
│ ● Page                     ○ Structure                  ○ Tool    │
└──────────────────────────────────────────────────────────────────┘
```

### Desktop — structured stage

```text
┌──────────────────────────────────────────────────────────────────┐
│ notion demo                              Reset  Preview as software│
├───────────────┬──────────────────────────────────────────────────┤
│ BLOCKS        │ Launch Plan                       Table | Board   │
│ + Text        │                                                  │
│ + Task        │ Task        Owner    Status       Due            │
│               │ Define...   Ivan     Done         Mar 12         │
│               │ Build...    Simon    In progress  Mar 18         │
│               │ Invite...   Akshay   Not started  Mar 22         │
│               │ + Add task                                      │
├───────────────┴──────────────────────────────────────────────────┤
│ ● Page                     ● Structure                  ○ Tool    │
└──────────────────────────────────────────────────────────────────┘
```

### Desktop — preview stage

```text
┌──────────────────────────────────────────────────────────────────┐
│ SOFTWARE PREVIEW                          Back to editor          │
│                                                                  │
│ Launch Plan                                      Table | Board   │
│                                                                  │
│ [working project tool using the visitor’s data]                  │
│                                                                  │
│ You shaped Launch Plan.                                         │
│ Now let the tool shape the work.                                │
├──────────────────────────────────────────────────────────────────┤
│ ● Page                     ● Structure                  ● Tool    │
└──────────────────────────────────────────────────────────────────┘
```

Preview must not be framed as a browser/device mockup. It is the product surface itself.

### Mobile Demo

```text
┌───────────────────────────────┐
│ notion demo      Reset  Preview│
├───────────────────────────────┤
│ Launch Plan                   │
│                               │
│ [stacked editor / current view]│
│                               │
│ + Add task                    │
├───────────────────────────────┤
│ Page      Structure      Tool │
├───────────────────────────────┤
│ + Add a block                │
└───────────────────────────────┘
```

- `Add a block` opens a bottom sheet.
- Table uses stacked labelled rows below 390px.
- Board can scroll horizontally inside its own bounded region.
- Reset and Preview remain reachable in a sticky Demo toolbar.

## 8. Reciprocal Transition

This is not a separate marketing section. It is a short state transition between Demo Preview and Platform.

```text
You shaped {projectName}.

Now let the tool
shape the work.

             ↓ visitor-created fields settle into a shared module
```

- Before Preview, Platform shows the canonical fallback.
- After Preview, this transition uses the visitor's actual project name and structure.
- With reduced motion, change copy and structure immediately.

## 9. Platform Wireframe

### Default desktop

```text
┌──────────────────────────────────────────────────────────────────┐
│ PLATFORM                                                        │
│ Build once. Serve many.                                         │
│                                                                  │
│                     [PROJECT STRUCTURE]                          │
│                      /        |        \                         │
│                     /         |         \                        │
│          [PROJECT TRACKER] [CLIENT PORTAL] [TEAM WORKSPACE]      │
│                                                                  │
│ Status sets the next step.                                      │
│ Owner makes responsibility visible.                             │
│ Due date gives the work a rhythm.                               │
└──────────────────────────────────────────────────────────────────┘
```

### Adapted desktop

```text
┌──────────────────────────────────────────────────────────────────┐
│ YOUR STRUCTURE, AT WORK                                         │
│ {projectName} is already shaping the work.                      │
│                                                                  │
│                 [{projectName} STRUCTURE]                        │
│                  view + fields + statuses                        │
│                      /        |        \                         │
│             [YOUR PROJECT] [CLIENT VIEW] [TEAM WORKFLOW]         │
│                                                                  │
│ [consequences derived from the visitor’s selected fields]       │
└──────────────────────────────────────────────────────────────────┘
```

- The source module is pale blue.
- Destination structures remain pale grey.
- Use lines and relationships, not three independent cards.

### Mobile

- Place source module first.
- Use one vertical connection line leading to three destinations.
- Show consequences immediately below the relevant destination or field.

## 10. Final CTA Wireframe

### Default state

```text
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│ Shape the tools                                                  │
│ that will shape you.                                            │
│                                                                  │
│ Bring the creative power of software to the way you             │
│ already think and work.                                         │
│                                                                  │
│ Start building  →                                               │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

### Adapted state

```text
┌──────────────────────────────────────────────────────────────────┐
│ YOU SHAPED {PROJECTNAME}                                        │
│                                                                  │
│ Every structure                                                  │
│ changes what happens next.                                      │
│                                                                  │
│ [view-dependent supporting sentence]                            │
│                                                                  │
│ Shape another tool  →       Return to your tool                 │
│                                                                  │
│ We shape our tools, and thereafter our tools will shape us.     │
│ notion — March 2013                                             │
└──────────────────────────────────────────────────────────────────┘
```

- Keep this section spacious.
- Do not reintroduce the stone as another large illustration.
- The visitor-created structure may appear as a faint background trace.

## 11. Responsive Transformation Summary

| Element | Desktop | Tablet | Mobile |
|---|---|---|---|
| Header | Full links | Reduced spacing | Demo + menu |
| Hero | Asymmetrical three-part composition | Two columns | Vertical poster |
| Problem | Scroll-linked horizontal planes | Shorter horizontal sequence | Stacked planes |
| Solution | Sticky text + layered visual | Reduced sticky distance | Normal vertical flow |
| Demo controls | Left library + canvas | Narrow library + canvas | Bottom sheet + canvas |
| Table | True table | True table or compressed | Labelled stacked rows |
| Board | Three columns | Three compressed columns | Bounded horizontal scroll |
| Platform | Source above three destinations | Same, compressed | Vertical relationship |
| Final CTA | Wide quiet field | Wide quiet field | Vertical actions |

## 12. Scroll and Focus Rules

- Anchor links scroll to the visible section heading, not behind the header.
- Sticky sections must release before the following heading enters.
- No scroll hijacking or mandatory wheel precision.
- Focus order follows DOM order even when desktop composition is asymmetrical.
- Programmatic focus moves only after major Demo transitions.
- Returning to the Demo through `Your tool` restores the visitor near the current Demo state.

## 13. Wireframe Acceptance

- Every section has one dominant visual idea.
- Hero content fits common first viewports.
- The Demo is the widest and most operational part of the page.
- Preview is visually identifiable as the reciprocal turning point.
- Platform works with both canonical and visitor-adapted data.
- Mobile preserves every required Demo action.
- No page-level horizontal overflow is required.
- The complete narrative remains understandable with animation disabled.
