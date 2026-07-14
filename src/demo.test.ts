// @vitest-environment node

import { describe, expect, it } from 'vitest'
import { canonicalTasks, demoReducer, displayProjectName, initialDemoState } from './demo'

describe('demo reducer', () => {
  it('turns an empty page into canonical structured content', () => {
    const state = demoReducer(initialDemoState, { type: 'structure' })
    expect(state.structured).toBe(true)
    expect(state.tasks).toEqual(canonicalTasks)
  })

  it('preserves visitor tasks when structure is added', () => {
    const task = { ...canonicalTasks[0], id: 'visitor', title: 'Visitor task' }
    const withTask = demoReducer(initialDemoState, { type: 'add-task', task })
    const structured = demoReducer(withTask, { type: 'structure' })
    expect(structured.tasks).toHaveLength(1)
    expect(structured.tasks[0].title).toBe('Visitor task')
  })

  it('previews and resets reciprocally', () => {
    const previewed = demoReducer(initialDemoState, { type: 'preview' })
    expect(previewed.previewed).toBe(true)
    expect(previewed.inPreview).toBe(true)
    expect(previewed.structured).toBe(true)
    expect(demoReducer(previewed, { type: 'reset' })).toEqual(initialDemoState)
  })

  it('provides a safe project-name fallback', () => {
    expect(displayProjectName('   ')).toBe('Your tool')
  })
})
