export type ViewMode = 'table' | 'board'
export type StatusId = 'not-started' | 'in-progress' | 'done'

export interface DemoTask {
  id: string
  title: string
  owner: string
  status: StatusId
  due: string
}

export interface DemoState {
  projectName: string
  note: string
  tasks: DemoTask[]
  structured: boolean
  previewed: boolean
  inPreview: boolean
  view: ViewMode
}

export type DemoAction =
  | { type: 'rename'; name: string }
  | { type: 'set-note'; note: string }
  | { type: 'add-task'; task?: DemoTask }
  | { type: 'update-task'; id: string; field: keyof Omit<DemoTask, 'id'>; value: string }
  | { type: 'delete-task'; id: string }
  | { type: 'structure' }
  | { type: 'set-view'; view: ViewMode }
  | { type: 'preview' }
  | { type: 'edit' }
  | { type: 'reset' }

export const canonicalTasks: DemoTask[] = [
  { id: 'story', title: 'Define story', owner: 'Ivan', status: 'done', due: '2013-03-12' },
  { id: 'demo', title: 'Build demo', owner: 'Simon', status: 'in-progress', due: '2013-03-18' },
  { id: 'testers', title: 'Invite testers', owner: 'Akshay', status: 'not-started', due: '2013-03-22' },
]

export const initialDemoState: DemoState = {
  projectName: 'Launch Plan',
  note: 'A small plan for a big idea.',
  tasks: [],
  structured: false,
  previewed: false,
  inPreview: false,
  view: 'table',
}

function makeTask(): DemoTask {
  return {
    id: `task-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    title: 'New task',
    owner: 'Unassigned',
    status: 'not-started',
    due: '2013-03-25',
  }
}

export function demoReducer(state: DemoState, action: DemoAction): DemoState {
  switch (action.type) {
    case 'rename':
      return { ...state, projectName: action.name }
    case 'set-note':
      return { ...state, note: action.note }
    case 'add-task':
      return { ...state, tasks: [...state.tasks, action.task ?? makeTask()] }
    case 'update-task':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.id ? { ...task, [action.field]: action.value } : task,
        ),
      }
    case 'delete-task':
      return { ...state, tasks: state.tasks.filter((task) => task.id !== action.id) }
    case 'structure':
      return {
        ...state,
        structured: true,
        tasks: state.tasks.length ? state.tasks : canonicalTasks.map((task) => ({ ...task })),
      }
    case 'set-view':
      return { ...state, view: action.view }
    case 'preview': {
      const tasks = state.tasks.length ? state.tasks : canonicalTasks.map((task) => ({ ...task }))
      return { ...state, structured: true, previewed: true, inPreview: true, tasks }
    }
    case 'edit':
      return { ...state, inPreview: false }
    case 'reset':
      return { ...initialDemoState }
    default:
      return state
  }
}

export function displayProjectName(name: string): string {
  return name.trim() || 'Your tool'
}

export function statusLabel(status: StatusId): string {
  return {
    'not-started': 'Not started',
    'in-progress': 'In progress',
    done: 'Done',
  }[status]
}

export function formatDue(value: string): string {
  if (!value) return 'No date'
  const date = new Date(`${value}T00:00:00`)
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(date)
}
