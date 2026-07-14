import { Fragment, useEffect, useMemo, useReducer, useRef, useState, type CSSProperties, type Dispatch } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
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
  ['0', 'Content', ['Text', 'Task', 'Asset']],
  ['1', 'Properties', ['Owner', 'Status', 'Due']],
  ['2', 'Views', ['Table', 'Board', 'Portal']],
  ['3', 'Behavior', ['Filter', 'Permission', 'Workflow']],
  ['4', 'Publish', ['Template', 'Adapt', 'Reuse']],
] as const

const planes = [
  { name: 'Document', detail: 'launch-plan-FINAL.doc', primitive: 'Brief', className: 'planeDocument' },
  { name: 'Mail', detail: 'Re: Re: Final changes', primitive: 'Decision', className: 'planeMail' },
  { name: 'Design', detail: 'mock-v8-final', primitive: 'Asset', className: 'planeDesign' },
  { name: 'Project', detail: 'Waiting for update', primitive: 'Task', className: 'planeProject' },
]

type SurfaceId = 'project' | 'client' | 'team'

const surfaces: Record<SurfaceId, { label: string; eyebrow: string; detail: string; fields: string[] }> = {
  project: { label: 'Project tracker', eyebrow: 'Operational view', detail: 'The team sees ownership, status, and the next deadline.', fields: ['Owner', 'Status', 'Due'] },
  client: { label: 'Client portal', eyebrow: 'External view', detail: 'The same work becomes a calm surface for progress and delivery.', fields: ['Progress', 'Delivery', 'Updates'] },
  team: { label: 'Team workflow', eyebrow: 'Flow view', detail: 'The same structure becomes a shared path from start to done.', fields: ['Stage', 'Owner', 'Next step'] },
}

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

type HeadingPart = { text: string; emphasis?: boolean; breakAfter?: boolean }

function AssembledHeading({ as: Tag, id, parts, reduceMotion, intro = false }: { as: 'h1' | 'h2'; id: string; parts: HeadingPart[]; reduceMotion: boolean | null; intro?: boolean }) {
  const ref = useRef<HTMLHeadingElement>(null)
  const label = parts.map((part) => part.text).join(' ')
  const totalCharacters = Array.from(label.replace(/\s/g, '')).length
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 88%', 'start 44%'] })
  const [visibleCharacters, setVisibleCharacters] = useState(reduceMotion || intro ? totalCharacters : 0)

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (intro) return
    setVisibleCharacters(reduceMotion ? totalCharacters : Math.ceil(latest * totalCharacters))
  })

  useEffect(() => {
    if (intro || reduceMotion) {
      setVisibleCharacters(totalCharacters)
      return
    }
    setVisibleCharacters(Math.ceil(scrollYProgress.get() * totalCharacters))
  }, [intro, label, reduceMotion, scrollYProgress, totalCharacters])

  let characterIndex = 0
  const renderPart = (part: HeadingPart, partIndex: number) => {
    const words = part.text.split(' ')
    const content = words.map((word, wordIndex) => (
      <Fragment key={`${partIndex}-${wordIndex}`}>
        <span className="assembledWord">
          {Array.from(word).map((character) => {
            const index = characterIndex++
            return (
              <span
                aria-hidden="true"
                className="assembledChar"
                data-visible={intro || reduceMotion || index < visibleCharacters ? 'true' : 'false'}
                key={`${character}-${index}`}
                style={{ '--char-index': index, '--char-delay': `${index * 18}ms` } as CSSProperties}
              >
                {character}
              </span>
            )
          })}
        </span>
        {wordIndex < words.length - 1 ? ' ' : null}
      </Fragment>
    ))

    return part.emphasis ? <em>{content}</em> : <span className="assembledPart">{content}</span>
  }

  return (
    <Tag ref={ref} id={id} aria-label={label} className={`assembledHeading${intro ? ' assembledHeadingIntro' : ''}`}>
      {parts.map((part, index) => (
        <Fragment key={`${part.text}-${index}`}>
          {renderPart(part, index)}
          {part.breakAfter ? <br /> : index < parts.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </Tag>
  )
}

function StructureLayer({ number, label, tokens, reduceMotion }: { number: string; label: string; tokens: readonly string[]; reduceMotion: boolean | null }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 94%', 'start 60%'] })
  const y = useTransform(scrollYProgress, [0, 0.48], [reduceMotion ? 0 : 24, 0])
  const scale = useTransform(scrollYProgress, [0, 0.48], [reduceMotion ? 1 : 0.988, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.28], [reduceMotion ? 1 : 0.54, 1])
  const tokenOneRawX = useTransform(scrollYProgress, [0.02, 0.46], [reduceMotion ? 0 : 240, 0])
  const tokenTwoRawX = useTransform(scrollYProgress, [0.10, 0.56], [reduceMotion ? 0 : 320, 0])
  const tokenThreeRawX = useTransform(scrollYProgress, [0.18, 0.66], [reduceMotion ? 0 : 400, 0])
  const tokenOneOpacity = useTransform(scrollYProgress, [0.02, 0.32], [reduceMotion ? 1 : 0, 1])
  const tokenTwoOpacity = useTransform(scrollYProgress, [0.10, 0.42], [reduceMotion ? 1 : 0, 1])
  const tokenThreeOpacity = useTransform(scrollYProgress, [0.18, 0.52], [reduceMotion ? 1 : 0, 1])
  const tokenMotion = [
    { x: tokenOneRawX, opacity: tokenOneOpacity },
    { x: tokenTwoRawX, opacity: tokenTwoOpacity },
    { x: tokenThreeRawX, opacity: tokenThreeOpacity },
  ]

  return (
    <motion.div ref={ref} className="layer" data-layer={label.toLowerCase()} style={{ y, scale, opacity }}>
      <div className="layerLead">
        <span>{number}</span>
        <strong>{label}</strong>
      </div>
      <div className="layerModules" aria-label={`${label} primitives`}>
        {tokens.map((token, index) => <motion.i key={token} style={tokenMotion[index]}>{token}</motion.i>)}
      </div>
    </motion.div>
  )
}

function App() {
  const reduceMotion = useReducedMotion()
  const heroRef = useRef<HTMLElement>(null)
  const problemRef = useRef<HTMLElement>(null)
  const solutionRef = useRef<HTMLElement>(null)
  const platformRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll()
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const { scrollYProgress: problemProgress } = useScroll({ target: problemRef, offset: ['start 78%', 'end 24%'] })
  const { scrollYProgress: solutionProgress } = useScroll({ target: solutionRef, offset: ['start 76%', 'end 20%'] })
  const { scrollYProgress: platformProgress } = useScroll({ target: platformRef, offset: ['start 82%', 'end 30%'] })
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.22 })
  const stoneY = useTransform(heroProgress, [0, 1], [0, reduceMotion ? 0 : 92])
  const stoneRotate = useTransform(heroProgress, [0, 1], [0, reduceMotion ? 0 : -4])
  const quoteY = useTransform(heroProgress, [0, 1], [0, reduceMotion ? 0 : 42])
  const problemPathLength = useTransform(problemProgress, [0.08, 0.58], [0, 1])
  const problemPathOpacity = useTransform(problemProgress, [0.05, 0.25, 0.78], [0, 0.58, 0.18])
  const problemSpineScale = useTransform(problemProgress, [0.62, 0.94], [0, 1])
  const solutionSpineScale = useTransform(solutionProgress, [0, 0.18], [0, 1])
  const pageFrameScaleX = useTransform(solutionProgress, [0.56, 0.75], [0.12, 1])
  const pageFrameScaleY = useTransform(solutionProgress, [0.64, 0.84], [0.08, 1])
  const pageFrameOpacity = useTransform(solutionProgress, [0.53, 0.66, 0.94], [0, 0.72, 0.26])
  const platformBranchLength = useTransform(platformProgress, [0.18, 0.58], [0, 1])
  const platformBranchOpacity = useTransform(platformProgress, [0.12, 0.34], [0.18, 1])
  const planeMotion = [
    { x: useTransform(problemProgress, [0.12, 0.82], [0, reduceMotion ? 0 : -42]), y: useTransform(problemProgress, [0.12, 0.82], [0, reduceMotion ? 0 : 28]), rotate: -1.4 },
    { x: useTransform(problemProgress, [0.12, 0.82], [0, reduceMotion ? 0 : -14]), y: useTransform(problemProgress, [0.12, 0.82], [0, reduceMotion ? 0 : -24]), rotate: 0.7 },
    { x: useTransform(problemProgress, [0.12, 0.82], [0, reduceMotion ? 0 : 18]), y: useTransform(problemProgress, [0.12, 0.82], [0, reduceMotion ? 0 : 32]), rotate: -0.5 },
    { x: useTransform(problemProgress, [0.12, 0.82], [0, reduceMotion ? 0 : 44]), y: useTransform(problemProgress, [0.12, 0.82], [0, reduceMotion ? 0 : -18]), rotate: 1.2 },
  ]
  const [state, dispatch] = useReducer(demoReducer, undefined, loadState)
  const [resetOpen, setResetOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [surface, setSurface] = useState<SurfaceId>('project')
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
    if (surface === 'client') return ['Internal detail becomes a clear progress signal.', 'The underlying work stays connected.', 'One structure serves a different audience.']
    if (surface === 'team') return ['Stages create a shared path.', 'Movement makes the next action visible.', 'The same data now behaves like a workflow.']
    return state.view === 'board'
      ? ['Three states give the work a shared path.', 'Movement makes the next action visible.', 'Everyone sees where work is waiting.']
      : ['Owner makes responsibility visible.', 'Status sets the next step.', 'Due dates give the work a rhythm.']
  }, [state.view, surface])

  function confirmReset() {
    dispatch({ type: 'reset' })
    setSurface('project')
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
            <motion.p className="heroDate" initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>March 2013 <span>Reimagined for the AI web</span></motion.p>
            <motion.div className="heroCopy" initial={reduceMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}>
              <AssembledHeading as="h1" id="hero-title" parts={[{ text: 'Democratize', breakAfter: true }, { text: 'Software.' }]} reduceMotion={reduceMotion} intro />
              <p>A living page that adapts to you—and becomes part of the software you shape.</p>
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

        <section className="problem section" id="idea" aria-labelledby="problem-title" ref={problemRef}>
          <div className="pageGrid">
            <SectionLabel number="01">Problem</SectionLabel>
            <div className="sectionStatement problemStatement">
              <AssembledHeading as="h2" id="problem-title" parts={[{ text: 'Software became a collection of applications.' }]} reduceMotion={reduceMotion} />
              <p>Ideas live in one place. Conversations in another. The final work somewhere else.</p>
            </div>
            <div className="planes" aria-label="Information scattered across four applications">
              {planes.map((plane, index) => (
                <motion.article className={`appPlane ${plane.className}`} key={plane.name} style={planeMotion[index]} initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: false, margin: '-15%' }} transition={{ duration: 0.55, delay: index * 0.08 }}>
                  <span className="planeNumber">0{index + 1}</span>
                  <h3>{plane.name}</h3>
                  <div className="planeLines" aria-hidden="true"><i /><i /><i /></div>
                  <p>{plane.detail}</p>
                  <span className="planePrimitive">Keep: {plane.primitive}</span>
                </motion.article>
              ))}
              <motion.svg className="handoffLines" viewBox="0 0 900 240" aria-hidden="true">
                <motion.path d="M115 120 C250 5 310 235 445 120 S690 10 810 120" style={reduceMotion ? undefined : { pathLength: problemPathLength, opacity: problemPathOpacity }} initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }} animate={reduceMotion ? { pathLength: 1, opacity: 0.55 } : undefined} />
              </motion.svg>
            </div>
            <motion.div className="primitiveRelease" initial={reduceMotion ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, margin: '-14%' }}>
              <div><span>What survives the applications</span><strong>Keep the primitives. Lose the silos.</strong></div>
              <div className="primitiveRail">
                {planes.map((plane, index) => <motion.i key={plane.primitive} initial={reduceMotion ? false : { opacity: 0, x: (index - 1.5) * 18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, margin: '-12%' }} transition={{ delay: index * 0.06 }}>{plane.primitive}</motion.i>)}
              </div>
            </motion.div>
            <blockquote className="marsQuote">We can’t go to Mars by sending Word documents around.</blockquote>
            <p className="turnQuestion">What if the tool adapted to you?</p>
            <motion.div className="problemSpine" style={{ scaleY: reduceMotion ? 1 : problemSpineScale }} aria-hidden="true"><i /></motion.div>
          </div>
        </section>

        <section className="solution section" aria-labelledby="solution-title" ref={solutionRef}>
          <motion.div className="solutionEntryLine" style={{ scaleY: reduceMotion ? 1 : solutionSpineScale }} aria-hidden="true" />
          <div className="pageGrid solutionGrid">
            <div className="solutionBody">
              <div className="solutionIntro">
                <SectionLabel number="02">Solution</SectionLabel>
                <span className="solutionThesis">LEGO for Software</span>
                <AssembledHeading as="h2" id="solution-title" parts={[{ text: 'A centralized home for your' }, { text: 'information & software.', emphasis: true }]} reduceMotion={reduceMotion} />
                <p>Start with information. Add structure, views, and behavior. Keep composing until the page becomes the tool.</p>
              </div>
              <div className="layerStack">
                {layers.map(([number, label, tokens]) => (
                  <StructureLayer key={number} number={number} label={label} tokens={tokens} reduceMotion={reduceMotion} />
                ))}
              </div>
            </div>
            <motion.div
              className="solutionHandoff"
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-12%' }}
              transition={{ duration: 0.65 }}
            >
              <motion.div className="pageAssembly" style={reduceMotion ? undefined : { scaleX: pageFrameScaleX, scaleY: pageFrameScaleY, opacity: pageFrameOpacity }} aria-hidden="true"><i /><b /><b /></motion.div>
              <span>The page becomes the product surface.</span>
              <strong>One set of primitives. Many possible tools.</strong>
              <i aria-hidden="true" />
            </motion.div>
          </div>
        </section>

        <section className="demoSection section" id="demo" aria-labelledby="demo-title">
          <div className="demoIntro pageGrid">
            <SectionLabel number="03">Notion Demo</SectionLabel>
            <div className="sectionStatement">
              <span className="demoThesis">The page is part of the product</span>
              <AssembledHeading as="h2" id="demo-title" parts={[{ text: 'Start with information.', breakAfter: true }, { text: 'End with software.' }]} reduceMotion={reduceMotion} />
              <p>Describe the work. The page proposes a structure. You decide how the software should behave.</p>
            </div>
          </div>

          <motion.div className="demoFrame" data-stage={state.inPreview ? 'preview' : state.structured ? 'structured' : 'page'} initial={reduceMotion ? false : { opacity: 0.56, scale: 0.975, y: 28 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: false, margin: '-8%' }} transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}>
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
                    <p>Add information primitives. The page will help compose them.</p>
                  </aside>
                  <div className="editorCanvas">
                    <input className="projectName" value={state.projectName} onChange={(event) => dispatch({ type: 'rename', name: event.target.value })} aria-label="Project name" maxLength={80} />
                    <textarea className="projectNote" value={state.note} onChange={(event) => dispatch({ type: 'set-note', note: event.target.value })} aria-label="Project note" rows={2} placeholder="Add a thought…" />
                    {!state.structured ? (
                      <div className="loosePage">
                        {state.tasks.map((task) => <LooseTask key={task.id} task={task} onChange={(value) => dispatch({ type: 'update-task', id: task.id, field: 'title', value })} />)}
                        {!state.tasks.length && <p className="emptyHint">Start with an empty page.</p>}
                        <button className="addInline" onClick={() => dispatch({ type: 'add-task' })}>+ Add a task</button>
                        <div className="structureSuggestion" aria-live="polite">
                          <span>Suggested from this page</span>
                          <p>{state.tasks.length
                            ? `I found ${state.tasks.length} task${state.tasks.length === 1 ? '' : 's'}. Add Owner, Status, Due date, and a view?`
                            : 'This looks like a launch workflow. Start with tasks, Owner, Status, Due date, and a view?'}</p>
                          <button className="structureButton" onClick={() => dispatch({ type: 'structure' })}>Apply this composition <span>→</span></button>
                        </div>
                      </div>
                    ) : (
                      <div className="structuredArea">
                        <div className="activeRecipe">
                          <span>Active composition</span>
                          <div><i>Tasks</i><i>Owner</i><i>Status</i><i>Due</i><i>{state.view === 'table' ? 'Table' : 'Board'}</i></div>
                        </div>
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
              <i><motion.b initial={false} animate={{ scaleX: state.structured ? 1 : 0 }} /></i>
              <span className={state.structured ? 'complete' : ''}>Structure</span>
              <i><motion.b initial={false} animate={{ scaleX: state.previewed ? 1 : 0 }} /></i>
              <span className={state.previewed ? 'complete' : ''}>Tool</span>
            </div>
          </motion.div>

          <motion.div
            className="demoHandoff"
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-15%' }}
            transition={{ duration: 0.65 }}
            aria-live="polite"
          >
            <AnimatePresence mode="wait">
              <motion.div
                className="demoHandoffCopy"
                key={state.previewed ? `continued-${name}` : 'invitation'}
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <span>{state.previewed ? `You shaped ${name}.` : 'The page is the first product surface.'}</span>
                <strong>{state.previewed ? 'The page remembers. The product continues.' : 'Shape one tool. Carry its structure forward.'}</strong>
              </motion.div>
            </AnimatePresence>
            <motion.div className="handoffSeed" layout initial={reduceMotion ? false : { y: 8, opacity: 0.6 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: false, margin: '-8%' }} transition={{ duration: 0.55 }}>
              <span>Live structure</span>
              <strong>{state.previewed ? name : 'Your tool'}</strong>
              <div>{state.view === 'table' ? <><i>Owner</i><i>Status</i><i>Due</i></> : <><i>Not started</i><i>In progress</i><i>Done</i></>}</div>
            </motion.div>
          </motion.div>
        </section>

        <section className="platform section" id="platform" aria-labelledby="platform-title" ref={platformRef}>
          <div className="pageGrid platformGrid">
            <SectionLabel number="04">{state.previewed ? 'Your structure, at work' : 'Platform'}</SectionLabel>
            <div className="platformStatement">
              <AssembledHeading as="h2" id="platform-title" parts={[{ text: state.previewed ? `${name} is already shaping the work.` : 'One structure. Many products.' }]} reduceMotion={reduceMotion} />
              <p>{state.previewed
                ? state.view === 'board' ? 'The workflow you chose now decides how work moves from one state to the next.' : 'The fields you chose now decide what the team can see, sort, and act on.'
                : 'Change the audience or behavior. The underlying information stays connected.'}</p>
            </div>
            <div className={`platformDiagram ${state.view}`}>
              <motion.div className="sourceModule" layout initial={reduceMotion ? false : { opacity: 0.35, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: false, margin: '-16%' }} transition={{ duration: 0.65 }}>
                <span>Shared structure</span>
                <strong>{state.previewed ? name : 'Launch Plan'}</strong>
                <div className="moduleFields">
                  {state.view === 'table' ? <><i>Owner</i><i>Status</i><i>Due</i></> : <><i>Not started</i><i>In progress</i><i>Done</i></>}
                </div>
              </motion.div>
              <motion.svg viewBox="0 0 700 170" aria-hidden="true"><motion.path d="M350 0v52M350 52 90 145M350 52v93M350 52l260 93" style={reduceMotion ? undefined : { pathLength: platformBranchLength, opacity: platformBranchOpacity }} initial={reduceMotion ? false : { pathLength: 0 }} animate={reduceMotion ? { pathLength: 1, opacity: 1 } : undefined} /></motion.svg>
              <div className="destinations">
                {(Object.entries(surfaces) as [SurfaceId, (typeof surfaces)[SurfaceId]][]).map(([id, item], index) => <motion.button type="button" className={surface === id ? 'active' : ''} aria-pressed={surface === id} onClick={() => setSurface(id)} key={id} initial={reduceMotion ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, margin: '-10%' }} transition={{ duration: 0.45, delay: index * 0.12 }}><span>{item.label}</span><i>Compose →</i></motion.button>)}
              </div>
              <AnimatePresence mode="wait">
                <motion.div className="surfacePreview" key={surface} initial={reduceMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0, y: -10 }} transition={{ duration: 0.35 }}>
                  <div><span>{surfaces[surface].eyebrow}</span><strong>{state.previewed ? name : 'Launch Plan'}</strong><p>{surfaces[surface].detail}</p></div>
                  <div>{surfaces[surface].fields.map((field) => <i key={field}>{field}</i>)}</div>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="consequenceList">
              {adaptedConsequences.map((item, index) => <p key={item}><span>0{index + 1}</span>{item}</p>)}
            </div>
            <motion.div
              className="marketplacePath"
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-12%' }}
              transition={{ duration: 0.65 }}
            >
              <span className="marketplaceLine" aria-hidden="true"><motion.i initial={reduceMotion ? false : { scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: false }} transition={{ duration: 0.8, ease: 'easeOut' }} /></span>
              <div className="marketplaceCopy">
                <span>Marketplace / Publish</span>
                <h3>Publish the composition.</h3>
                <p>The content stays yours. The structure becomes reusable.</p>
              </div>
              <div className="templateTrace">
                <strong>Reusable recipe</strong>
                <span>Tasks + Owner + Status + Due</span>
                <span>{state.view === 'table' ? 'Table view' : 'Board view'} + {surfaces[surface].label}</span>
                <span>Adapt to another page →</span>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="finalCta section" aria-labelledby="final-title">
          <div className="pageGrid finalGrid">
            <p className="finalEyebrow">{state.previewed ? 'The page changed with you' : 'A view of the AI web'}</p>
            <AssembledHeading as="h2" id="final-title" parts={state.previewed
              ? [{ text: 'The website is already', breakAfter: true }, { text: 'part of the product.' }]
              : [{ text: 'The website is where', breakAfter: true }, { text: 'the product begins.' }]}
              reduceMotion={reduceMotion}
            />
            <p className="finalSupport">{state.previewed
              ? `It understood your choices, adapted the experience, and carried ${name} forward.`
              : 'Future AI pages should understand intent, adapt in real time, and let people begin before they sign up.'}</p>
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
