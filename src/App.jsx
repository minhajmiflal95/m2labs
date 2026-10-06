import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import {
  ArrowUpRight,
  ArrowDown,
  ArrowRight,
  Asterisk,
  Plus,
  Minus,
  Code,
  SquaresFour,
  GlobeHemisphereWest,
  Stack,
  GraduationCap,
  Check,
  DownloadSimple,
  Copy,
  Moon,
  Sun,
  Play,
  Pause,
} from "@phosphor-icons/react";
import Modal from "./components/Modal.jsx";
import {
  services,
  projects,
  contact,
  contactEmail,
  contactMap,
} from "./data.js";
const Sculpture = lazy(() => import("./components/Sculpture.jsx"));
const ease = [0.22, 1, 0.36, 1];

function Logo({ footer = false }) {
  return (
    <a
      href="#home"
      className={`logo ${footer ? "logo-footer" : ""}`}
      aria-label="M squared Labs home"
    >
      <img src="/m2-mark.svg" alt="" width="49" height="40" />
      <span>
        labs<span className="logo-dot">.</span>
      </span>
    </a>
  );
}
function Action({
  children,
  onClick,
  href,
  secondary = false,
  className = "",
}) {
  const Tag = href ? "a" : "button";
  return (
    <Tag
      href={href}
      onClick={onClick}
      className={`button ${secondary ? "button-secondary" : ""} ${className}`}
    >
      <span>{children}</span>
      <span className="button-icon">
        <ArrowUpRight size={19} weight="regular" />
      </span>
    </Tag>
  );
}
function Reveal({ children, className = "", delay = 0 }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.13 }}
      transition={{ duration: 0.85, ease, delay }}
    >
      {children}
    </motion.div>
  );
}
function Intro({ onDone, reduced }) {
  const [ready, setReady] = useState(false);
  const done = useRef(onDone);
  useEffect(() => {
    done.current = onDone;
  }, [onDone]);
  useEffect(() => {
    const timeout = setTimeout(() => done.current(), reduced ? 50 : 4200);
    return () => clearTimeout(timeout);
  }, [reduced]);
  useEffect(() => {
    if (ready) {
      const timeout = setTimeout(() => done.current(), 1150);
      return () => clearTimeout(timeout);
    }
  }, [ready]);
  return (
    <motion.div
      className="intro"
      initial={{ opacity: 1 }}
      exit={{ clipPath: "ellipse(80% 0% at 50% 0%)", opacity: 0.9 }}
      transition={{ duration: reduced ? 0 : 0.9, ease }}
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to M squared Labs"
    >
      <div className="intro-top">
        <Logo />
        <span className="eyebrow">IDEAS, AMPLIFIED.</span>
      </div>
      <div className="intro-art">
        <Suspense fallback={<span className="intro-initial">M²</span>}>
          <Sculpture small reduced={reduced} onReady={() => setReady(true)} />
        </Suspense>
      </div>
      <div className="intro-bottom">
        <p>
          A new dimension
          <br />
          of digital.
        </p>
        <button onClick={onDone} className="text-button">
          Enter the studio <ArrowUpRight size={18} />
        </button>
      </div>
      <span className="intro-status" role="status">
        {ready ? "Ready when you are" : "Preparing the studio"}
      </span>
    </motion.div>
  );
}
function FlowMenu({ close, startProject }) {
  return (
    <Modal title="Navigation" onClose={close} className="flow-menu">
      <Logo />
      <div className="menu-layout">
        <div>
          <p className="eyebrow">A LITTLE EXPLORATION GOES A LONG WAY</p>
          <nav>
            {[
              ["Home", "home"],
              ["Our services", "services"],
              ["Selected explorations", "work"],
              ["The studio", "studio"],
            ].map(([label, anchor], index) => (
              <a
                href={`#${anchor}`}
                onClick={close}
                key={anchor}
                style={{ "--i": index }}
              >
                <span className="menu-number">0{index + 1}</span>
                <span>{label}</span>
                <ArrowUpRight weight="light" />
              </a>
            ))}
          </nav>
        </div>
        <div className="menu-aside">
          <span className="status-dot" />
          <p>
            Good things start
            <br />
            with a conversation.
          </p>
          <Action onClick={startProject}>Let’s make something</Action>
          <div className="menu-aside-note menu-contact">
            <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
            <a href={`tel:${contact.telephone}`}>{contact.phone}</a>
            <span>{contact.locality}</span>
          </div>
        </div>
      </div>
      <div className="menu-bottom">
        <span>M² LABS · CREATIVE TECHNOLOGY STUDIO</span>
        <span>DESIGN × TECHNOLOGY × POSSIBILITIES</span>
      </div>
    </Modal>
  );
}
function ServiceVisual({ kind }) {
  if (kind === "digital")
    return (
      <div className="service-art art-digital" aria-hidden="true">
        <div className="art-browser">
          <div className="art-browser-top">
            <span />
            <span />
            <span />
          </div>
          <div className="art-browser-center">
            <Code weight="thin" />
          </div>
          <span className="art-cursor">
            <ArrowUpRight weight="fill" />
          </span>
        </div>
        <span className="art-caption">THOUGHTFUL BY DESIGN.</span>
      </div>
    );
  if (kind === "operations")
    return (
      <div className="service-art art-operations" aria-hidden="true">
        <div className="orbit-path" />
        <div className="integration-center">m²</div>
        <div className="integration-node node-one">
          <SquaresFour weight="fill" />
        </div>
        <div className="integration-node node-two">
          <Stack weight="light" />
        </div>
        <div className="integration-node node-three">
          <GlobeHemisphereWest weight="light" />
        </div>
        <span className="art-caption">BETTER, TOGETHER.</span>
      </div>
    );
  if (kind === "growth")
    return (
      <div className="service-art art-growth" aria-hidden="true">
        <div className="growth-ring ring-1" />
        <div className="growth-ring ring-2" />
        <div className="growth-ring ring-3" />
        <ArrowUpRight className="growth-arrow" weight="thin" />
        <span className="art-caption">A LITTLE MORE REACH.</span>
      </div>
    );
  return (
    <div className="service-art art-learning" aria-hidden="true">
      <div className="learning-square square-back" />
      <div className="learning-square square-front">
        <GraduationCap weight="thin" />
      </div>
      <Asterisk className="learning-star" weight="light" />
      <span className="art-caption">POSSIBILITY STARTS WITH YOU.</span>
    </div>
  );
}
function ServiceCard({ service, index, onEnquire }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  return (
    <div className="stack-slot" ref={ref} style={{ "--stack-index": index }}>
      <motion.article
        className={`service-card ${service.className}`}
        style={reduced ? {} : { scale }}
      >
        <div className="service-copy">
          <div className="service-top">
            <span className="eyebrow">{service.caption}</span>
            <span className="service-number">/{service.id}</span>
          </div>
          <h3>{service.name}</h3>
          <p>{service.description}</p>
          <ul>
            {service.items.map((item) => (
              <li key={item}>
                <Plus size={13} />
                {item}
              </li>
            ))}
          </ul>
          <button
            className="service-link"
            onClick={() => onEnquire(service.name.replace(".", ""))}
          >
            Explore the possibilities <ArrowUpRight size={22} />
          </button>
        </div>
        <ServiceVisual kind={service.className} />
      </motion.article>
    </div>
  );
}
function Enquiry({ onClose, initialService }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    service: initialService || "",
    budget: "",
    message: "",
  });
  const [brief, setBrief] = useState("");
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const update = (event) =>
    setForm({ ...form, [event.target.name]: event.target.value });
  const submit = (event) => {
    event.preventDefault();
    const text = `M² LABS — PROJECT ENQUIRY\n\nName: ${form.name}\nEmail: ${form.email}\nService: ${form.service}\nBudget: ${form.budget || "Let’s discuss"}\n\nProject details:\n${form.message}\n`;
    setBrief(text);
  };
  const download = () => {
    const url = URL.createObjectURL(
      new Blob([brief], { type: "text/plain;charset=utf-8" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "m2-labs-project-brief.txt";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(brief);
      setCopied(true);
    } catch {
      setCopyError(true);
    }
  };
  return (
    <Modal title="Start a project" onClose={onClose} className="enquiry-modal">
      <span className="eyebrow">THE NEXT CHAPTER STARTS HERE</span>
      <h2>
        Let’s make
        <br />
        <span>something matter.</span>
      </h2>
      {brief ? (
        <div className="brief-result">
          <div className="success-mark">
            <Check size={28} />
          </div>
          <h3>Your brief is ready.</h3>
          <p>
            {contactEmail
              ? "Open your email app to send it to our studio, or keep a copy for yourself."
              : "Download or copy your brief to share with M² Labs. Your details have not been sent or stored."}
          </p>
          <pre>{brief}</pre>
          <div className="brief-actions">
            {contactEmail && (
              <Action
                href={`mailto:${contactEmail}?subject=${encodeURIComponent(`Project enquiry: ${form.service}`)}&body=${encodeURIComponent(brief)}`}
              >
                Open email to send
              </Action>
            )}
            <button className="button button-secondary" onClick={download}>
              <DownloadSimple size={19} />
              Download brief
            </button>
            <button className="button button-secondary" onClick={copy}>
              <Copy size={19} />
              {copied ? "Copied" : "Copy brief"}
            </button>
          </div>
          <p role="status">
            {copied
              ? "Project brief copied to your clipboard."
              : copyError
                ? "Clipboard unavailable. You can select the brief above or download it."
                : ""}
          </p>
          <button className="text-button" onClick={() => setBrief("")}>
            Edit your details <ArrowRight size={17} />
          </button>
        </div>
      ) : (
        <form onSubmit={submit}>
          <div className="form-row">
            <label>
              Your name
              <input
                name="name"
                value={form.name}
                onChange={update}
                autoComplete="name"
                placeholder="How should we call you?"
                required
                maxLength={120}
              />
            </label>
            <label>
              Email address
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={update}
                autoComplete="email"
                placeholder="you@company.com"
                required
                maxLength={160}
              />
            </label>
          </div>
          <div className="form-row">
            <label>
              What do you have in mind?
              <select
                name="service"
                value={form.service}
                onChange={update}
                required
              >
                <option value="">Choose a service</option>
                <option>Digital experiences</option>
                <option>Connected operations</option>
                <option>Brands with momentum</option>
                <option>Your next breakthrough</option>
                <option>A bit of everything</option>
              </select>
            </label>
            <label>
              Project budget <span className="optional">(optional)</span>
              <select name="budget" value={form.budget} onChange={update}>
                <option value="">Let’s discuss</option>
                <option>Under $1,000 USD</option>
                <option>$1,000 – $5,000 USD</option>
                <option>$5,000 – $15,000 USD</option>
                <option>$15,000+ USD</option>
              </select>
            </label>
          </div>
          <label>
            A little about your idea
            <textarea
              name="message"
              value={form.message}
              onChange={update}
              placeholder="The idea, the challenge, the wild ambition. We’re all ears."
              required
              minLength={10}
              maxLength={5000}
              rows={4}
            />
          </label>
          <div className="form-bottom">
            <p>
              {contactEmail
                ? "We’ll prepare an email for you to review and send."
                : "Build a brief you can save and share with our studio."}
            </p>
            <Action>Prepare my brief</Action>
          </div>
        </form>
      )}
    </Modal>
  );
}
function ProjectDetails({ project, onClose, startProject }) {
  return (
    <Modal
      title={`${project.title} concept`}
      onClose={onClose}
      className="project-modal"
    >
      <div className={`project-modal-image ${project.id}`}>
        <img
          src={project.image}
          alt={
            project.id === "forma"
              ? "Sculptural architectural study in warm stone"
              : "A blue sculptural study of connected forms"
          }
        />
        <span>{project.id === "forma" ? "forma®" : "orbit®"}</span>
      </div>
      <div className="project-modal-copy">
        <span className="eyebrow">STUDIO EXPLORATION · CONCEPT ONLY</span>
        <h2>{project.title}</h2>
        <p className="project-summary">{project.summary}</p>
        <div className="project-detail-columns">
          <div>
            <h3>The idea</h3>
            <p>{project.brief}</p>
          </div>
          <div>
            <h3>The approach</h3>
            <p>{project.approach}</p>
          </div>
        </div>
        <div className="tag-row">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <Action onClick={startProject}>Create something like this</Action>
      </div>
    </Modal>
  );
}
function App() {
  const reduced = useReducedMotion();
  const [motionPaused, setMotionPaused] = useState(false);
  const [intro, setIntro] = useState(() => {
    try {
      return !sessionStorage.getItem("m2-intro-seen");
    } catch {
      return true;
    }
  });
  const [menu, setMenu] = useState(false);
  const [enquiry, setEnquiry] = useState(false);
  const [service, setService] = useState("");
  const [filter, setFilter] = useState("All explorations");
  const [project, setProject] = useState(null);
  const [faq, setFaq] = useState(0);
  const [theme, setTheme] = useState(() => {
    try {
      return (
        localStorage.getItem("m2-theme") ||
        (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
      );
    } catch {
      return "light";
    }
  });
  const endIntro = useCallback(() => {
    setIntro(false);
    try {
      sessionStorage.setItem("m2-intro-seen", "true");
    } catch {
      /* Storage is optional. */
    }
  }, []);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("m2-theme", theme);
    } catch {
      /* Storage is optional. */
    }
  }, [theme]);
  useEffect(() => {
    if (!intro) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [intro]);
  const startProject = (value = "") => {
    setService(typeof value === "string" ? value : "");
    setMenu(false);
    setProject(null);
    setEnquiry(true);
  };
  const faqs = [
    [
      "Can you help with more than a website?",
      "Absolutely. We can connect your website to business tools, support your IT, and help your brand reach the right people through search, social media and content. We shape the scope around what you actually need.",
    ],
    [
      "How does a project get started?",
      "Tell us what you have in mind using the project brief. We’ll discuss your goals, agree the deliverables and timeline, and put together a clear proposal before any work starts.",
    ],
    [
      "Do you work with students?",
      "Yes. We offer assignment writing support, research guidance, technical mentoring and final-year project development. Our approach helps you understand your work and follow your institution’s academic requirements.",
    ],
    [
      "Can you support an existing website or system?",
      "Yes. We can review an existing website, application or business system, identify what needs attention, and agree a plan for improvements or ongoing support.",
    ],
  ];
  return (
    <>
      <AnimatePresence>
        {intro && <Intro onDone={endIntro} reduced={reduced} />}
      </AnimatePresence>
      <div
        className={motionPaused ? "site motion-paused" : "site"}
        inert={intro ? true : undefined}
      >
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <header className="header">
          <div className="header-inner">
            <Logo />
            <nav className="desktop-nav" aria-label="Main navigation">
              <a href="#work">Explorations</a>
              <a href="#services">Services</a>
              <a href="#studio">Studio</a>
            </nav>
            <div className="header-actions">
              <button className="header-contact" onClick={() => startProject()}>
                Let’s talk <ArrowUpRight size={16} />
              </button>
              <button
                className="menu-toggle"
                onClick={() => setMenu(true)}
                aria-label="Open menu"
                aria-expanded={menu}
              >
                <span />
                <span />
              </button>
            </div>
          </div>
        </header>
        <main id="main">
          <section className="hero section-shell" id="home">
            <div className="hero-topline">
              <span className="eyebrow">
                <span className="status-dot" /> INDEPENDENT MINDS. EXPONENTIAL
                POSSIBILITIES.
              </span>
              <span className="hero-edition eyebrow">
                DESIGN + TECHNOLOGY, SQUARED.
              </span>
            </div>
            <div className="hero-main">
              <div className="hero-copy">
                <motion.h1
                  initial={reduced ? false : { opacity: 0, y: 35 }}
                  animate={intro ? {} : { opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease, delay: 0.1 }}
                >
                  Good ideas.
                  <br />
                  Exponentially
                  <br />
                  <span className="hero-better">
                    better<span className="period">.</span>
                    <span className="tiny-star">
                      <Asterisk weight="light" />
                    </span>
                  </span>
                </motion.h1>
                <motion.div
                  initial={reduced ? false : { opacity: 0, y: 20 }}
                  animate={intro ? {} : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease, delay: 0.3 }}
                >
                  <p className="hero-description">
                    We bring design, development and digital
                    <br className="desktop-break" /> thinking together. To take
                    your next idea further.
                  </p>
                  <div className="hero-ctas">
                    <Action onClick={() => startProject()}>
                      Let’s build something
                    </Action>
                    <a className="text-button" href="#work">
                      Explore our thinking <ArrowDown size={17} />
                    </a>
                  </div>
                </motion.div>
              </div>
              <div className="hero-visual">
                <div className="visual-cross cross-one">+</div>
                <div className="visual-cross cross-two">+</div>
                <div className="sculpture-frame">
                  <Suspense
                    fallback={<div className="sculpture-placeholder">m²</div>}
                  >
                    {!intro && (
                      <Sculpture reduced={!!reduced || motionPaused} />
                    )}
                  </Suspense>
                </div>
                <div className="sculpture-shadow" />
                <div className="sculpture-label">
                  <span className="sculpture-label-line" />
                  <span>EVERYTHING CONNECTS.</span>
                  <span className="mono">FIG. 01</span>
                </div>
                <div className="interact-hint">
                  <span className="hint-dot" />
                  {reduced || motionPaused
                    ? "A NEW PERSPECTIVE"
                    : "MOVE YOUR CURSOR. SHIFT YOUR PERSPECTIVE."}
                </div>
              </div>
            </div>
            <div className="hero-bottom">
              <div>
                <span className="hero-bottom-index">01 /</span>
                <p>
                  A creative technology studio.
                  <br />
                  <span>Built for what’s next.</span>
                </p>
              </div>
              <a href="#services" className="scroll-prompt">
                <span>SCROLL TO DISCOVER</span>
                <span className="scroll-circle">
                  <ArrowDown size={20} />
                </span>
              </a>
            </div>
          </section>
          <div
            className="capability-strip"
            aria-label="Design, development, strategy, integration"
          >
            <div className="capability-track">
              {[0, 1].map((repeat) => (
                <div key={repeat} aria-hidden={repeat === 1 ? true : undefined}>
                  {[
                    "DESIGN",
                    "DEVELOPMENT",
                    "STRATEGY",
                    "INTEGRATION",
                    "POSSIBILITY",
                  ].map((word) => (
                    <span key={word}>
                      {word}
                      <Asterisk size={20} weight="light" />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <section
            className="services-section section-shell section-padding"
            id="services"
          >
            <Reveal className="section-heading">
              <div className="section-label">
                <span className="small-square" /> WHAT WE DO
              </div>
              <div>
                <h2>
                  A little vision.
                  <br />A whole lot of{" "}
                  <span className="muted">possibility.</span>
                </h2>
                <p>
                  One connected studio. The right mix of creativity,
                  <br className="desktop-break" /> technology and strategy for
                  your next chapter.
                </p>
              </div>
              <span className="section-count">01 — 04</span>
            </Reveal>
            <div className="service-stack">
              {services.map((item, i) => (
                <ServiceCard
                  key={item.id}
                  service={item}
                  index={i}
                  onEnquire={startProject}
                />
              ))}
            </div>
          </section>
          <section
            className="work-section section-shell section-padding"
            id="work"
          >
            <Reveal className="section-heading">
              <div className="section-label">
                <span className="small-square" /> IN THE LAB
              </div>
              <div>
                <h2>
                  A glimpse of
                  <br />
                  <span className="muted">what could be.</span>
                </h2>
                <p>
                  Independent explorations in form, function and the digital
                  <br className="desktop-break" /> in between. A window into how
                  we think.
                </p>
              </div>
              <Asterisk className="section-asterisk" weight="thin" />
            </Reveal>
            <div className="work-toolbar">
              <div
                className="filters"
                role="group"
                aria-label="Filter explorations"
              >
                {["All explorations", "Web experiences", "Digital systems"].map(
                  (item) => (
                    <button
                      key={item}
                      aria-pressed={filter === item}
                      className={filter === item ? "active" : ""}
                      onClick={() => setFilter(item)}
                    >
                      {item}
                      {item === "All explorations" && <span>02</span>}
                    </button>
                  ),
                )}
              </div>
              <span className="eyebrow concept-note">
                STUDIO CONCEPTS, NOT CLIENT COMMISSIONS
              </span>
            </div>
            <motion.div layout={!reduced} className="project-grid">
              <AnimatePresence mode="popLayout">
                {projects
                  .filter(
                    (p) =>
                      filter === "All explorations" || p.category === filter,
                  )
                  .map((item, i) => (
                    <motion.article
                      layout={!reduced}
                      key={item.id}
                      className={`project-card project-${item.id}`}
                      initial={{ opacity: 0, y: reduced ? 0 : 25 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: reduced ? 1 : 0.96 }}
                      transition={{ duration: reduced ? 0 : 0.5, ease }}
                    >
                      <button
                        className={`project-art ${item.id}`}
                        onClick={() => setProject(item)}
                      >
                        <span className="sr-only">
                          Explore {item.title} concept
                        </span>
                        <img
                          src={item.image}
                          alt={
                            item.id === "forma"
                              ? "Architectural arches in a sunlit sculptural setting"
                              : "Silver and blue interconnected sculptural forms"
                          }
                          loading="lazy"
                          width="1200"
                          height="1000"
                        />
                        <span className="project-art-top">
                          <span>STUDIO EXPLORATION</span>
                          <span>0{i + 1}</span>
                        </span>
                        <div className="project-art-title">
                          {item.id === "forma" ? (
                            <>
                              forma<span>®</span>
                              <small>SPACES FOR A SLOWER LIFE.</small>
                            </>
                          ) : (
                            <>
                              orbit<span>®</span>
                              <small>WORK, IN A BETTER ORBIT.</small>
                            </>
                          )}
                        </div>
                        <span className="project-open">
                          <ArrowUpRight size={26} weight="light" />
                        </span>
                        <span className="project-liquid" aria-hidden="true" />
                      </button>
                      <div className="project-caption">
                        <div>
                          <h3>
                            <button onClick={() => setProject(item)}>
                              {item.title}
                            </button>
                          </h3>
                          <span>{item.discipline}</span>
                        </div>
                        <span className="project-year">CONCEPT / 2026</span>
                      </div>
                    </motion.article>
                  ))}
              </AnimatePresence>
            </motion.div>
          </section>
          <section
            id="studio"
            className="studio-section section-shell section-padding"
          >
            <Reveal className="studio-grid">
              <div className="section-label">
                <span className="small-square" /> THE M² MINDSET
              </div>
              <div className="studio-statement">
                <h2>
                  Small studio.
                  <br />
                  Connected minds.
                  <br />
                  <span className="muted">Bigger possibilities.</span>
                </h2>
                <div className="studio-bottom">
                  <span className="studio-symbol" aria-hidden="true">
                    m<sup>2</sup>
                  </span>
                  <div>
                    <p>
                      Good work happens when different ways of thinking come
                      together. That’s the idea behind M² Labs.
                    </p>
                    <p>
                      We connect design with development, and ambition with a
                      practical plan. Every project gets a considered approach,
                      clear communication, and people who care about getting it
                      right.
                    </p>
                    <a href="#process" className="text-button">
                      A little more about our approach <ArrowDown size={17} />
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </section>
          <section
            id="process"
            className="process-section section-shell section-padding"
          >
            <Reveal className="process-header">
              <div className="section-label">
                <span className="small-square" /> HOW WE GET THERE
              </div>
              <h2>
                Good chemistry.
                <br />
                <span className="muted">Great outcomes.</span>
              </h2>
            </Reveal>
            <div className="process-grid">
              {[
                {
                  n: "01",
                  title: "Find the right question.",
                  text: "We listen first. Your business, your challenges and what success really looks like. A shared understanding before a single pixel.",
                },
                {
                  n: "02",
                  title: "Make the idea real.",
                  text: "Strategy becomes sketches. Sketches become experiences. We design, build and refine with you in the loop at every step.",
                },
                {
                  n: "03",
                  title: "Launch. Learn. Evolve.",
                  text: "Test the details. Make the launch count. Then keep improving, with the support and insight to help your next chapter grow.",
                },
              ].map((step, i) => (
                <Reveal className="process-step" key={step.n} delay={i * 0.08}>
                  <div className="process-step-top">
                    <span>{step.n}</span>
                    <ArrowUpRight size={26} weight="light" />
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </Reveal>
              ))}
            </div>
          </section>
          <section className="faq-section section-shell section-padding">
            <Reveal className="faq-grid">
              <div>
                <div className="section-label">
                  <span className="small-square" /> A FEW GOOD QUESTIONS
                </div>
                <h2>
                  Curiosity
                  <br />
                  <span className="muted">looks good on you.</span>
                </h2>
              </div>
              <div className="faq-list">
                {faqs.map(([question, answer], i) => (
                  <div
                    className={`faq-item ${faq === i ? "expanded" : ""}`}
                    key={question}
                  >
                    <h3>
                      <button
                        onClick={() => setFaq(faq === i ? null : i)}
                        aria-expanded={faq === i}
                        aria-controls={`answer-${i}`}
                      >
                        {question}
                        {faq === i ? <Minus size={20} /> : <Plus size={20} />}
                      </button>
                    </h3>
                    <div
                      id={`answer-${i}`}
                      className="faq-answer"
                      hidden={faq !== i}
                    >
                      <p>{answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </section>
          <section className="contact-section section-shell" id="contact">
            <Reveal>
              <div className="contact-top">
                <span className="eyebrow">
                  <span className="status-dot" /> YOUR NEXT BIG THING STARTS
                  SMALL.
                </span>
                <Asterisk weight="thin" />
              </div>
              <div className="contact-main">
                <h2>
                  Have a spark?
                  <br />
                  <span>Let’s make waves.</span>
                </h2>
                <button
                  className="contact-arrow"
                  aria-label="Start a project"
                  onClick={() => startProject()}
                >
                  <ArrowUpRight weight="thin" />
                </button>
              </div>
              <div className="contact-bottom">
                <p>
                  A new idea. A stubborn challenge. A fresh start.
                  <br />
                  We’d love to hear what you’re thinking.
                </p>
                <button className="text-button" onClick={() => startProject()}>
                  Start a conversation <ArrowUpRight size={18} />
                </button>
              </div>
              <address className="contact-details">
                <div>
                  <span className="eyebrow">WRITE TO US</span>
                  <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
                  <span className="contact-detail-note">
                    Good conversations start here.
                  </span>
                </div>
                <div>
                  <span className="eyebrow">GIVE US A CALL</span>
                  <a href={`tel:${contact.telephone}`}>{contact.phone}</a>
                  <a
                    className="contact-detail-note contact-whatsapp"
                    href={contact.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Chat on WhatsApp <ArrowUpRight size={14} />
                  </a>
                </div>
                <div>
                  <span className="eyebrow">FIND THE STUDIO</span>
                  <a
                    className="contact-address"
                    href={contactMap}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {contact.street}
                    <br />
                    {contact.locality} <ArrowUpRight size={14} />
                  </a>
                </div>
              </address>
            </Reveal>
          </section>
        </main>
        <footer className="footer section-shell">
          <div className="footer-main">
            <Logo footer />
            <p>Ideas, amplified.</p>
            <nav aria-label="Footer navigation">
              <a href="#services">Services</a>
              <a href="#work">Explorations</a>
              <a href="#studio">Studio</a>
              <button onClick={() => startProject()}>
                Contact <ArrowUpRight size={14} />
              </button>
            </nav>
          </div>
          <div className="footer-bottom">
            <span>
              © {new Date().getFullYear()} M² Labs. Made with intention.
            </span>
            <div className="footer-settings">
              <button
                onClick={() => setMotionPaused(!motionPaused)}
                aria-label={
                  motionPaused ? "Resume animation" : "Pause animation"
                }
              >
                {motionPaused ? <Play size={14} /> : <Pause size={14} />}
                <span>
                  {motionPaused ? "Resume animation" : "Pause animation"}
                </span>
              </button>
              <button
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              >
                {theme === "light" ? <Moon size={15} /> : <Sun size={15} />}
                <span>{theme === "light" ? "Dark mode" : "Light mode"}</span>
              </button>
              <a href="#home">
                BACK TO TOP <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </footer>
      </div>
      {menu && (
        <FlowMenu
          close={() => setMenu(false)}
          startProject={() => startProject()}
        />
      )}
      {enquiry && (
        <Enquiry initialService={service} onClose={() => setEnquiry(false)} />
      )}
      {project && (
        <ProjectDetails
          project={project}
          onClose={() => setProject(null)}
          startProject={() =>
            startProject(
              project.category === "Digital systems"
                ? "Connected operations"
                : "Digital experiences",
            )
          }
        />
      )}
    </>
  );
}
export default App;
