import { useEffect, useMemo, useReducer, useRef, useState, type Dispatch } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import {
  demoReducer,
  displayProjectName,
  formatDue,
  initialDemoState,
  statusLabel,
  type DemoState,
  type DemoTask,
  type StatusId,
  type ViewMode,
} from './demo'

const STORAGE_KEY = 'notion-2013-demo:v1'

const layers = [
  ['0', 'Web', 'Available anywhere.'],
  ['1', 'Visual Editor', 'Shape ideas directly.'],
  ['2', 'Structured Content', 'Turn information into data.'],
  ['3', 'LEGO for Software', 'Assemble your own workflow.'],
  ['4', 'Marketplace', 'Build once. Serve many.'],
]

const planes = [
  { name: 'Document', detail: 'launch-plan-FINAL.doc', className: 'planeDocument' },
  { name: 'Mail', detail: 'Re: Re: Final changes', className: 'planeMail' },
  { name: 'Design', detail: 'mock-v8-final', className: 'planeDesign' },
  { name: 'Project', detail: 'Waiting for update', className: 'planeProject' },
]

const statusOrder: StatusId[] = ['not-started', 'in-progress', 'done']

function loadState(): DemoState {
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY)
    if (!saved) return initialDemoState
    const value = JSON.parse(saved) as DemoState
    if (typeof value.projectName !== 'string' || !Array.isArray(value.tasks)) return initialDemoState
    return { ...initialDemoState, ...value, inPreview: false }
  } catch {
    return initialDemoState
  }
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function SectionLabel({ number, children }: { number: string; children: string }) {
  return (
    <div className="sectionLabel" aria-hidden="true">
      <span>{number}</span>
      <span>{children}</span>
    </div>
  )
}

function PersonGlyph() {
  return <span className="personGlyph" aria-hidden="true"><i /><b /></span>
}

function App() {
  const reduceMotion = useReducedMotion()
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll()
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.22 })
  const stoneY = useTransform(heroProgress, [0, 1], [0, reduceMotion ? 0 : 92])
  const stoneRotate = useTransform(heroProgress, [0, 1], [0, reduceMotion ? 0 : -4])
  const quoteY = useTransform(heroProgress, [0, 1], [0, reduceMotion ? 0 : 42])
  const [state, dispatch] = useReducer(demoReducer, undefined, loadState)
  const [resetOpen, setResetOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const resetCancelRef = useRef<HTMLButtonElement>(null)
  const name = displayProjectName(state.projectName)

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // The experience remains fully functional without storage.
    }
  }, [state])

  useEffect(() => {
    if (resetOpen) resetCancelRef.current?.focus()
  }, [resetOpen])

  const adaptedConsequences = useMemo(() => {
    if (state.view === 'board') {
      return ['Three states give the work a shared path.', 'Movement makes the next action visible.', 'Everyone sees where work is waiting.']
    }
    return ['Owner makes responsibility visible.', 'Status sets the next step.', 'Due dates give the work a rhythm.']
  }, [state.view])

  function confirmReset() {
    dispatch({ type: 'reset' })
    try { sessionStorage.removeItem(STORAGE_KEY) } catch { /* no-op */ }
    setResetOpen(false)
  }

  return (
    <div className="siteShell" data-shaped={state.previewed}>
      <motion.div className="scrollProgress" style={{ scaleX: smoothProgress }} aria-hidden="true" />
      <a className="skipLink" href="#main">Skip to content</a>
      <header className="siteHeader">
        <a className="wordmark" href="#top" aria-label="Notion, back to top">notion</a>
        <nav className="desktopNav" aria-label="Primary navigation">
          <a href="#idea">Idea</a>
          <a href="#demo">Demo</a>
          <a href="#platform">Platform</a>
        </nav>
        <button className="headerCta" onClick={() => scrollToId('demo')}>
          {state.previewed ? 'Your tool' : 'Try the demo'}
        </button>
        <button className="menuButton" onClick={() => setMenuOpen((value) => !value)} aria-expanded={menuOpen} aria-controls="mobile-nav">
          {menuOpen ? 'Close' : 'Menu'}
        </button>
        <AnimatePresence>
          {menuOpen && (
            <motion.nav id="mobile-nav" className="mobileNav" aria-label="Mobile navigation" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
              <a href="#idea" onClick={() => setMenuOpen(false)}>Idea</a>
              <a href="#demo" onClick={() => setMenuOpen(false)}>Demo</a>
              <a href="#platform" onClick={() => setMenuOpen(false)}>Platform</a>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main id="main">
        <section className="hero" id="top" aria-labelledby="hero-title" ref={heroRef}>
          <div className="heroGrid">
            <motion.p className="heroDate" initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>March 2013</motion.p>
            <motion.div className="heroCopy" initial={reduceMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}>
              <h1 id="hero-title">Democratize<br />Software.</h1>
              <p>A home for your information, your tools, and the software you shape.</p>
              <button className="textCta" onClick={() => scrollToId('demo')}>Begin shaping <span>→</span></button>
            </motion.div>
            <motion.div className="stoneStage" style={{ y: stoneY, rotate: stoneRotate }} initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1, delay: 0.25 }}>
              <span className="stoneGuide stoneGuideOne" />
              <span className="stoneGuide stoneGuideTwo" />
              <img src="/assets/stone-tool.png" alt="A hand-drawn stone tool, representing the beginning of human-made tools." />
              <span className="stoneIndex">01 / TOOL</span>
            </motion.div>
            <motion.blockquote className="heroQuote" style={{ y: quoteY }} initial={reduceMotion ? false : { opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.65 }}>
              We shape<br />our tools,<br />and thereafter<br />our tools will<br />shape us.
            </motion.blockquote>
          </div>
          <div className="scrollMark" aria-hidden="true"><span>Scroll to shape</span><i /></div>
        </section>

        <section className="problem section" id="idea" aria-labelledby="problem-title">
          <div className="pageGrid">
            <SectionLabel number="01">Problem</SectionLabel>
            <div className="sectionStatement problemStatement">
              <h2 id="problem-title">Software became a collection of applications.</h2>
              <p>Ideas live in one place. Conversations in another. The final work somewhere else.</p>
            </div>
            <div className="planes" aria-label="Information scattered across four applications">
              {planes.map((plane, index) => (
                <motion.article className={`appPlane ${plane.className}`} key={plane.name} initial={reduceMotion ? false : { opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-15%' }} transition={{ delay: index * 0.08 }}>
                  <span className="planeNumber">0{index + 1}</span>
                  <h3>{plane.name}</h3>
                  <div className="planeLines" aria-hidden="true"><i /><i /><i /></div>
                  <p>{plane.detail}</p>
                </motion.article>
              ))}
              <motion.svg className="handoffLines" viewBox="0 0 900 240" aria-hidden="true">
                <motion.path d="M115 120 C250 5 310 235 445 120 S690 10 810 120" initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 0.55 }} viewport={{ once: true, margin: '-20%' }} transition={{ duration: 1.4, ease: 'easeInOut' }} />
              </motion.svg>
            </div>
            <blockquote className="marsQuote">We can’t go to Mars by sending Word documents around.</blockquote>
            <p className="turnQuestion">What if the tool adapted to you?</p>
          </div>
        </section>

        <section className="solution section" aria-labelledby="solution-title">
          <div className="pageGrid solutionGrid">
            <div className="solutionIntro">
              <SectionLabel number="02">Solution</SectionLabel>
              <h2 id="solution-title">A centralized home for your <em>information &amp; software.</em></h2>
              <p>Start with a page. Give it structure. Shape it into a tool.</p>
            </div>
            <div className="layerStack">
              {layers.map(([number, label, detail], index) => (
                <motion.div className="layer" key={number} initial={reduceMotion ? false : { opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-10%' }} transition={{ delay: index * 0.08 }}>
                  <span>{number}</span><strong>{label}</strong><p>{detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="narrativeBridge demoBridge" aria-labelledby="demo-bridge-title">
          <motion.div
            className="bridgeGrid"
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-18%' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <p className="bridgeKicker">From idea to tool</p>
            <h2 id="demo-bridge-title">Start with a page.<br /><em>Shape it into software.</em></h2>
            <span className="bridgeRule" aria-hidden="true"><i /></span>
          </motion.div>
        </section>

        <section className="demoSection section" id="demo" aria-labelledby="demo-title">
          <div className="demoIntro pageGrid">
            <SectionLabel number="03">Notion Demo</SectionLabel>
            <div className="sectionStatement">
              <h2 id="demo-title">Start with information.<br />End with software.</h2>
              <p>Shape a project page, give it structure, then see how the structure changes what happens next.</p>
            </div>
          </div>

          <div className="demoFrame" data-stage={state.inPreview ? 'preview' : state.structured ? 'structured' : 'page'}>
            <div className="demoToolbar">
              <span className="demoBrand">notion <em>demo</em></span>
              <div className="demoActions">
                <button onClick={() => setResetOpen(true)}>Reset</button>
                {state.inPreview ? (
                  <button className="primaryButton" onClick={() => dispatch({ type: 'edit' })}>Back to editor</button>
                ) : (
                  <button className="primaryButton" onClick={() => dispatch({ type: 'preview' })}>Preview as software</button>
                )}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {state.inPreview ? (
                <motion.div className="previewSurface" key="preview" initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="previewHeading">
                    <span>Software preview</span>
                    <h3>{name}</h3>
                    {state.note && <p>{state.note}</p>}
                  </div>
                  <ViewToggle view={state.view} onChange={(view) => dispatch({ type: 'set-view', view })} />
                  <TaskView state={state} dispatch={dispatch} readOnly />
                  <div className="shapedMessage">
                    <strong>You shaped {name}.</strong>
                    <span>Now let the tool shape the work.</span>
                  </div>
                </motion.div>
              ) : (
                <motion.div className="editorSurface" key="editor" initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <aside className="blockLibrary" aria-label="Blocks">
                    <span className="utilityLabel">Blocks</span>
                    <button onClick={() => dispatch({ type: 'set-note', note: state.note || 'A note about this work.' })}><b>+</b> Text</button>
                    <button onClick={() => dispatch({ type: 'add-task' })}><b>+</b> Task</button>
                    <p>Shape the page directly. Structure comes next.</p>
                  </aside>
                  <div className="editorCanvas">
                    <input className="projectName" value={state.projectName} onChange={(event) => dispatch({ type: 'rename', name: event.target.value })} aria-label="Project name" maxLength={80} />
                    <textarea className="projectNote" value={state.note} onChange={(event) => dispatch({ type: 'set-note', note: event.target.value })} aria-label="Project note" rows={2} placeholder="Add a thought…" />
                    {!state.structured ? (
                      <div className="loosePage">
                        {state.tasks.map((task) => <LooseTask key={task.id} task={task} onChange={(value) => dispatch({ type: 'update-task', id: task.id, field: 'title', value })} />)}
                        {!state.tasks.length && <p className="emptyHint">Start with an empty page.</p>}
                        <button className="addInline" onClick={() => dispatch({ type: 'add-task' })}>+ Add a task</button>
                        <button className="structureButton" onClick={() => dispatch({ type: 'structure' })}>Give these tasks structure <span>→</span></button>
                      </div>
                    ) : (
                      <div className="structuredArea">
                        <div className="viewRow">
                          <span className="utilityLabel">View</span>
                          <ViewToggle view={state.view} onChange={(view) => dispatch({ type: 'set-view', view })} />
                        </div>
                        <TaskView state={state} dispatch={dispatch} />
                        <button className="addInline" onClick={() => dispatch({ type: 'add-task' })}>+ Add task</button>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="demoProgress" aria-label="Demo progress">
              <span className="complete">Page</span>
              <i />
              <span className={state.structured ? 'complete' : ''}>Structure</span>
              <i />
              <span className={state.previewed ? 'complete' : ''}>Tool</span>
            </div>
          </div>
        </section>

        <section className="narrativeBridge scaleBridge" aria-labelledby="scale-bridge-title" aria-live="polite">
          <motion.div
            className="bridgeGrid"
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-18%' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                className="scaleBridgeCopy"
                key={state.previewed ? `shaped-${name}` : 'unshaped'}
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
              >
                <p className="bridgeKicker">{state.previewed ? `You shaped ${name}.` : 'One tool can become many.'}</p>
                <h2 id="scale-bridge-title">{state.previewed ? 'Now imagine one structure serving many.' : 'Build once. Serve many.'}</h2>
              </motion.div>
            </AnimatePresence>
            <span className="bridgeRule" aria-hidden="true"><i /></span>
          </motion.div>
        </section>

        <section className="platform section" id="platform" aria-labelledby="platform-title">
          <div className="pageGrid platformGrid">
            <SectionLabel number="04">{state.previewed ? 'Your structure, at work' : 'Platform'}</SectionLabel>
            <div className="platformStatement">
              <h2 id="platform-title">{state.previewed ? `${name} is already shaping the work.` : 'One structure. Many ways to work.'}</h2>
              <p>{state.previewed
                ? state.view === 'board' ? 'The workflow you chose now decides how work moves from one state to the next.' : 'The fields you chose now decide what the team can see, sort, and act on.'
                : 'One structure can become a project tracker, a client portal, or a team workspace.'}</p>
            </div>
            <div className={`platformDiagram ${state.view}`}>
              <motion.div className="sourceModule" layout>
                <span>Shared structure</span>
                <strong>{state.previewed ? name : 'Launch Plan'}</strong>
                <div className="moduleFields">
                  {state.view === 'table' ? <><i>Owner</i><i>Status</i><i>Due</i></> : <><i>Not started</i><i>In progress</i><i>Done</i></>}
                </div>
              </motion.div>
              <svg viewBox="0 0 700 170" aria-hidden="true"><path d="M350 0v52M350 52 90 145M350 52v93M350 52l260 93" /></svg>
              <div className="destinations">
                {['Your project', 'Client view', 'Team workflow'].map((label) => <div key={label}><PersonGlyph /><span>{label}</span></div>)}
              </div>
            </div>
            <div className="consequenceList">
              {adaptedConsequences.map((item, index) => <p key={item}><span>0{index + 1}</span>{item}</p>)}
            </div>
          </div>
        </section>

        <section className="finalCta section" aria-labelledby="final-title">
          <div className="pageGrid finalGrid">
            <p className="finalEyebrow">{state.previewed ? `You shaped ${name}` : 'Democratize Software'}</p>
            <h2 id="final-title">{state.previewed ? <>Every structure<br />changes what happens next.</> : <>Shape the tools<br />that will shape you.</>}</h2>
            <p className="finalSupport">{state.previewed
              ? state.view === 'board' ? 'The workflow you created now shapes how the work moves.' : 'The fields you created now shape what the work reveals.'
              : 'Bring the creative power of software to the way you already think and work.'}</p>
            <div className="finalActions">
              <button className="textCta" onClick={() => state.previewed ? setResetOpen(true) : scrollToId('demo')}>{state.previewed ? 'Shape another tool' : 'Start building'} <span>→</span></button>
              {state.previewed && <button className="secondaryText" onClick={() => scrollToId('demo')}>Return to your tool</button>}
            </div>
            <blockquote>We shape our tools, and thereafter our tools will shape us.</blockquote>
            <p className="signature">notion — March 2013</p>
          </div>
        </section>
      </main>

      {resetOpen && (
        <div className="dialogBackdrop" role="presentation" onMouseDown={(event) => { if (event.currentTarget === event.target) setResetOpen(false) }}>
          <div className="resetDialog" role="dialog" aria-modal="true" aria-labelledby="reset-title">
            <span className="utilityLabel">Reset demo</span>
            <h2 id="reset-title">Shape another tool?</h2>
            <p>Your changes will be replaced with the starting page.</p>
            <div>
              <button ref={resetCancelRef} onClick={() => setResetOpen(false)}>Keep editing</button>
              <button className="primaryButton" onClick={confirmReset}>Reset demo</button>
            </div>
          </div>
        </div>
      )}

      <div className="srOnly" aria-live="polite">{state.inPreview ? 'Software preview ready.' : ''}</div>
    </div>
  )
}

function ViewToggle({ view, onChange }: { view: ViewMode; onChange: (view: ViewMode) => void }) {
  return (
    <div className="viewToggle" aria-label="View" role="group">
      <button className={view === 'table' ? 'active' : ''} aria-pressed={view === 'table'} onClick={() => onChange('table')}>Table</button>
      <button className={view === 'board' ? 'active' : ''} aria-pressed={view === 'board'} onClick={() => onChange('board')}>Board</button>
    </div>
  )
}

function LooseTask({ task, onChange }: { task: DemoTask; onChange: (value: string) => void }) {
  return <input className="looseTask" value={task.title} onChange={(event) => onChange(event.target.value)} aria-label="Task title" />
}

function TaskView({ state, dispatch, readOnly = false }: { state: DemoState; dispatch: Dispatch<Parameters<typeof demoReducer>[1]>; readOnly?: boolean }) {
  if (state.view === 'board') {
    return (
      <div className="boardView">
        {statusOrder.map((status) => (
          <section className="boardColumn" key={status} aria-labelledby={`column-${status}`}>
            <header><h4 id={`column-${status}`}>{statusLabel(status)}</h4><span>{state.tasks.filter((task) => task.status === status).length}</span></header>
            <div className="boardTasks">
              {state.tasks.filter((task) => task.status === status).map((task) => (
                <motion.article className="taskCard" layout key={task.id}>
                  <strong>{task.title}</strong>
                  <span>{task.owner}</span>
                  <time>{formatDue(task.due)}</time>
                  {!readOnly && (
                    <select aria-label={`Status for ${task.title}`} value={task.status} onChange={(event) => dispatch({ type: 'update-task', id: task.id, field: 'status', value: event.target.value })}>
                      {statusOrder.map((item) => <option value={item} key={item}>{statusLabel(item)}</option>)}
                    </select>
                  )}
                </motion.article>
              ))}
            </div>
          </section>
        ))}
      </div>
    )
  }

  return (
    <div className="tableView" role="table" aria-label="Project tasks">
      <div className="tableHeader" role="row">
        <span role="columnheader">Task</span><span role="columnheader">Owner</span><span role="columnheader">Status</span><span role="columnheader">Due</span><span aria-hidden="true" />
      </div>
      {state.tasks.map((task) => (
        <motion.div className="tableRow" role="row" layout key={task.id}>
          {readOnly ? <strong role="cell">{task.title}</strong> : <input role="cell" aria-label="Task" value={task.title} onChange={(event) => dispatch({ type: 'update-task', id: task.id, field: 'title', value: event.target.value })} />}
          {readOnly ? <span role="cell">{task.owner}</span> : <input role="cell" aria-label={`Owner for ${task.title}`} value={task.owner} onChange={(event) => dispatch({ type: 'update-task', id: task.id, field: 'owner', value: event.target.value })} />}
          {readOnly ? <span role="cell" className={`status status-${task.status}`}>{statusLabel(task.status)}</span> : (
            <select role="cell" aria-label={`Status for ${task.title}`} value={task.status} onChange={(event) => dispatch({ type: 'update-task', id: task.id, field: 'status', value: event.target.value })}>
              {statusOrder.map((item) => <option value={item} key={item}>{statusLabel(item)}</option>)}
            </select>
          )}
          {readOnly ? <time role="cell">{formatDue(task.due)}</time> : <input role="cell" type="date" aria-label={`Due date for ${task.title}`} value={task.due} onChange={(event) => dispatch({ type: 'update-task', id: task.id, field: 'due', value: event.target.value })} />}
          {!readOnly && <button className="deleteTask" aria-label={`Delete ${task.title}`} onClick={() => dispatch({ type: 'delete-task', id: task.id })}>×</button>}
        </motion.div>
      ))}
    </div>
  )
}

export default App
