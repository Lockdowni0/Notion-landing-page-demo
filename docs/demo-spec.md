# Notion 2013 Landing Page — Product Demo Specification

## 1. Purpose

The embedded Demo proves the landing page's central proposition:

> Information can be shaped into software, and the resulting software can shape what happens next.

It must be a genuine, forgiving interaction surface. It is not a complete editor, a video, or an animation that pretends the visitor made choices.

## 2. Canonical User Story

As a first-time visitor, I can shape a small project page into a structured project tool, preview it as software, and then see my structure influence the Platform and Final CTA sections.

The canonical completion path should take approximately 45–90 seconds without requiring instructions outside the Demo.

## 3. Experience Phases

```text
DISCOVER
  Visitor reaches the Demo and understands the invitation.

SHAPE
  Visitor names the tool, adds or edits tasks, and gives content structure.

ORGANISE
  Visitor chooses Table or Board and changes workflow data.

PREVIEW
  The editor settles into a working software view.

BE SHAPED
  The chosen structure changes Platform, navigation, and Final CTA content.
```

`PREVIEW` is the explicit reciprocal turning point.

## 4. State Model

### Demo stage

```ts
type DemoStage =
  | 'page'
  | 'structured'
  | 'preview';
```

### View mode

```ts
type ViewMode = 'table' | 'board';
```

### Field identifiers

```ts
type FieldId = 'task' | 'owner' | 'status' | 'due';
```

`task` is required. Other fields are active in the canonical structured state. Field removal is not required for MVP, but the model should not prevent it later.

### Status model

```ts
type StatusId = 'not-started' | 'in-progress' | 'done';

interface StatusDefinition {
  id: StatusId;
  label: string;
  order: number;
}
```

### Task model

```ts
interface DemoTask {
  id: string;
  title: string;
  owner: string | null;
  status: StatusId;
  due: string | null; // ISO date when stored
  order: number;
}
```

### Text block model

```ts
interface DemoTextBlock {
  id: string;
  text: string;
  order: number;
}
```

### Complete Demo state

```ts
interface DemoState {
  version: 1;
  stage: DemoStage;
  projectName: string;
  view: ViewMode;
  activeFields: FieldId[];
  statuses: StatusDefinition[];
  textBlocks: DemoTextBlock[];
  tasks: DemoTask[];
  hasStructured: boolean;
  hasPreviewed: boolean;
  previewedAt: number | null;
  interactionCount: number;
}
```

### Canonical initial state

```ts
const initialDemoState: DemoState = {
  version: 1,
  stage: 'page',
  projectName: 'Launch Plan',
  view: 'table',
  activeFields: ['task'],
  statuses: [
    { id: 'not-started', label: 'Not started', order: 0 },
    { id: 'in-progress', label: 'In progress', order: 1 },
    { id: 'done', label: 'Done', order: 2 },
  ],
  textBlocks: [],
  tasks: [],
  hasStructured: false,
  hasPreviewed: false,
  previewedAt: null,
  interactionCount: 0,
};
```

## 5. Canonical Data Introduced at Structure

When the visitor chooses `Give these tasks structure`, preserve any tasks already created and supplement the example only when needed to demonstrate all fields.

Canonical example rows:

| Task | Owner | Status | Due |
|---|---|---|---|
| Define story | Ivan | Done | 2013-03-12 |
| Build demo | Simon | In progress | 2013-03-18 |
| Invite testers | Akshay | Not started | 2013-03-22 |

Rules:

- Never discard a visitor-authored task during transformation.
- If there are zero tasks, insert all three examples.
- If there is one visitor task, retain it and add enough examples to expose the field model.
- If there are two or more visitor tasks, do not add examples unless a field cannot otherwise be demonstrated.
- Set `activeFields` to `['task', 'owner', 'status', 'due']`.
- Set `hasStructured` to `true` and `stage` to `structured`.
- Keep the current view as Table on first structure transition.

## 6. State Machine

```text
[page]
  | add/edit content
  | structure
  v
[structured/table] <------> [structured/board]
  | edit fields/tasks             |
  | preview                       | preview
  +-------------------------------+
                  v
              [preview]
                  |
                  | back to editor
                  v
            [structured/current-view]
```

Reset is available from every state and returns to `initialDemoState` after confirmation.

Preview is allowed only when at least one non-empty task exists. If content has not yet been structured, Preview first performs the canonical structure transformation, then enters Preview.

## 7. Events and Reducer Behaviour

The implementation should centralise Demo transitions in a reducer or equivalent deterministic state layer.

### `RENAME_PROJECT`

Payload: `{ name: string }`

- Store plain text only.
- Preserve whitespace while editing; trim for display validation.
- Empty display falls back to `Untitled tool`.
- Increment `interactionCount` after a meaningful change.

### `ADD_TASK`

Payload: optional initial title.

- Add after the current last task.
- Default title is empty while focused.
- Default status is `not-started`.
- Default owner and due are null.
- Focus the task title input.
- Do not count an abandoned empty row as a completed interaction.

### `ADD_TEXT`

Payload: optional initial text.

- Add a loose text block to the page stage.
- Focus its text control.
- Empty text is allowed only while actively editing and is removed on abandoned blur.
- Text blocks remain as descriptive context after structure and in Preview.

### `UPDATE_TEXT`

Payload: text-block ID and text.

- Store plain text only.
- Preserve stable block ID and order.
- Increment `interactionCount` after a meaningful change.

### `UPDATE_TASK`

Payload: task ID plus one changed field.

- Update only the requested task.
- Preserve stable task ID and order.
- Announce status changes when initiated outside a native select.

### `DELETE_TASK`

Payload: task ID.

- Remove immediately when triggered from an explicit task menu or button.
- Return focus to the nearest remaining task or `Add task`.
- If the last task is deleted, show the empty structured state.

### `STRUCTURE_CONTENT`

- Apply rules in Section 5.
- Animate loose blocks into aligned fields when motion is allowed.
- Move focus to the structured view heading or first table cell after transition.
- Announce `Tasks now have Owner, Status, and Due fields.`

### `CHANGE_VIEW`

Payload: `table` or `board`.

- Preserve all data.
- Reorganise tasks using shared spatial continuity.
- Board columns follow status order.
- Table rows follow task order.
- Update an aria-live message using the canonical content string.

### `MOVE_TASK`

Payload depends on current view.

- In Table, update task order.
- In Board, moving between columns also changes status.
- Provide a non-drag keyboard alternative.
- Drag and drop is Nice to Have; explicit move/status controls satisfy MVP.

### `PREVIEW_TOOL`

- Validate that at least one task has a non-empty title.
- If not structured, perform `STRUCTURE_CONTENT` first.
- Set `stage` to `preview`.
- Set `hasPreviewed` to `true`.
- Set `previewedAt` on the first successful Preview.
- Publish the adapted selectors used by Navigation, Platform, and Final CTA.
- Move focus to the preview heading.
- Announce `Software preview ready.`

### `RETURN_TO_EDITOR`

- Restore `stage` to `structured`.
- Preserve all visitor data and current view.
- Move focus to the Demo heading or previously focused edit control when reliable.

### `REQUEST_RESET`

- Open the confirmation dialog.
- Trap focus within the dialog.
- Do not reset yet.

### `CONFIRM_RESET`

- Replace Demo state with `initialDemoState`.
- Clear the project session-storage key.
- Close the dialog.
- Return navigation, Platform, and Final CTA to default states.
- Focus the Demo title field.
- Announce `Demo reset.`

### `CANCEL_RESET`

- Close the dialog without changing state.
- Return focus to the Reset control.

## 8. Desktop Layout

### Page stage

```text
┌────────────────────────────────────────────────────────────┐
│ notion demo                         Reset   Preview         │
├───────────────┬────────────────────────────────────────────┤
│ Blocks        │ Launch Plan                                │
│               │                                            │
│ Text          │ loose content blocks                       │
│ Task          │                                            │
│ Person        │                                            │
│ Date          │                                            │
├───────────────┴────────────────────────────────────────────┤
│ Page ───────────── Structure ───────────── Tool             │
└────────────────────────────────────────────────────────────┘
```

### Structured stage

- Left block library becomes visually quieter.
- Main canvas contains view switcher and Table or Board.
- Field labels remain visible.
- Primary next action is `Preview as software`.

### Preview stage

- Hide authoring chrome that is not needed to understand the tool.
- Preserve a clear `Back to editor` action.
- Show project name, current view, and useful workflow controls.
- Avoid placing the preview inside a fake browser or device frame.

## 9. Mobile Layout

- Replace the persistent left block library with an `Add a block` bottom action.
- Open block choices in an accessible bottom sheet or dialog.
- Use full-width stacked rows in Table mode; labels may sit above values below 390px.
- Board mode may use horizontally scrollable status columns inside the Demo only; the page itself must not overflow.
- Provide a visible alternative to drag gestures.
- Keep Reset and Preview accessible without forcing the visitor to scroll to the Demo header.
- Do not replace the Demo with a static preview.

## 10. Reciprocal Adaptation Contract

The rest of the landing page consumes a derived, read-only representation of Demo state.

```ts
interface ShapedToolSummary {
  isComplete: boolean;
  projectName: string;
  view: ViewMode;
  fieldIds: FieldId[];
  statusLabels: string[];
  taskCount: number;
}
```

### Derivation rules

- `isComplete` is true only after a successful Preview.
- Empty project names derive as `Your tool`.
- Compact project-name output is limited to 32 visible characters.
- Long-form output is limited to 80 visible characters.
- The summary contains no HTML and no inferred personal attributes.

### Navigation adaptation

Default:

`Try the demo`

After Preview:

`Your tool`

The adapted control scrolls back to the Demo Preview or current Demo state.

### Platform adaptation

Default state uses the canonical `Launch Plan` structure.

After Preview:

- headline includes the derived project name;
- shared module label includes the project name;
- supporting copy switches according to Table or Board view;
- consequence statements reflect available fields;
- status consequence uses the actual number of status definitions;
- destination structures reuse the visitor's field/status representation.

### Final CTA adaptation

Default action:

`Start building`

After Preview:

- eyebrow acknowledges the project name;
- support line reflects Table or Board view;
- primary action becomes `Shape another tool`;
- secondary action becomes `Return to your tool`;
- the original quotation appears as the conclusion.

### Reset adaptation

Reset immediately restores all consumers to their default copy and diagrams. Adapted text must not linger after the underlying state is cleared.

## 11. Persistence

MVP may use in-memory application state. Session storage is recommended if implementation remains straightforward.

Recommended key:

`notion-2013-demo:v1`

Rules:

- Store only the `DemoState` object.
- Validate the version and basic shape before restoration.
- Fall back to `initialDemoState` if parsing or validation fails.
- Do not store analytics identifiers or personal information.
- Do not persist an open reset dialog or transient focus state.
- Reset removes the storage key.

## 12. Empty, Error, and Fallback States

### Empty page

- Show `Start with an empty page.`
- Keep `Add a block` as the dominant action.

### Empty structured view

- Keep field headers visible.
- Show `Add a task to continue.`
- Keep Preview disabled or explain why it cannot proceed.

### Empty task submission

- Keep focus in the title control.
- Show `Enter a task name.`
- Do not create a blank persistent task.

### Invalid restored state

- Silently restore the canonical initial state.
- Avoid frightening technical error messages in the landing experience.

### Animation failure or reduced motion

- Complete the state transition immediately.
- Move focus and announce the resulting state.
- Never leave blocks between layout states.

### JavaScript unavailable

- Display the complete static landing-page narrative.
- Show a meaningful static Demo illustration and a short note that interaction requires JavaScript.
- Do not leave an empty Demo frame.

## 13. Accessibility Behaviour

- Use semantic buttons, inputs, selects, tables, and headings before custom roles.
- Every edit control has a persistent or programmatic label.
- View switcher exposes selected state.
- Board columns have headings and task counts.
- Task menus and dialogs support Escape.
- Reset confirmation uses an accessible modal dialog.
- Use one polite aria-live region for concise status updates.
- Do not announce continuous drag coordinates.
- Provide move controls for keyboard users if drag is implemented.
- After major transitions, move focus once to a meaningful destination; do not repeatedly steal focus.
- All information remains available without colour or animation.

## 14. Motion Behaviour

### Shaping motion

- Block insertion: local reveal and space allocation, 150–250ms.
- Direct edits: no theatrical transition.
- Reorder: clear positional continuity, 200–350ms.

### Shaped motion

- Structure transition: loose blocks align into fields, 450–700ms.
- Table/Board transition: shared task elements change layout, 300–500ms.
- Preview transition: authoring controls recede as the tool settles, 450–700ms.
- Platform adaptation: updated module content reveals once when entering view, not on every minor edit.

### Reduced motion

- Replace spatial movement with immediate layout changes and short opacity transitions under 100ms, or no transition.
- Preserve focus, live-region messages, and adapted copy.

## 15. Test Matrix

### State tests

- initial state is deterministic;
- structure preserves visitor-created tasks;
- structure inserts canonical examples only when required;
- Table/Board switching preserves data;
- Board status movement updates task status;
- Preview validates task content;
- Preview publishes a correct `ShapedToolSummary`;
- Return to editor preserves state;
- Reset restores initial state and clears adaptation;
- invalid persisted state falls back safely.

### Integration tests

- navigation CTA changes after Preview;
- Platform copy and diagram use project name, view, and fields;
- Final CTA changes after Preview;
- reset restores default Navigation, Platform, and Final CTA;
- default Platform remains complete when Demo is skipped;
- adapted copy handles empty and long project names.

### Interaction tests

- canonical path works with pointer;
- canonical path works with keyboard;
- mobile controls expose all required actions;
- focus returns correctly after dialogs;
- view switcher and status controls announce state;
- reduced-motion mode completes every transition.

### Visual checks

- no Demo overflow at 320px, 390px, 768px, 1024px, and 1440px;
- Board overflow remains inside the Demo region;
- long task and project names wrap or truncate safely;
- focus indicators remain visible against all Demo surfaces;
- adapted Platform retains one dominant visual idea.

## 16. Definition of Done

The Demo is complete when:

- a first-time visitor can finish the canonical path without external instruction;
- all Must Have actions in `scope.md` work;
- Preview visibly marks the change from shaping a tool to being shaped by it;
- at least three explicit visitor decisions affect later page content;
- default, adapted, reset, reduced-motion, keyboard, touch, and narrow-mobile paths all remain coherent;
- automated tests cover reducer transitions and reciprocal consumers;
- there are no runtime console errors in the canonical flow.
