import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import {
  ArrowUpRight,
  ArrowDown,
  Plus,
  Minus,
  ArrowRight,
} from "@phosphor-icons/react";
import {
  Action,
  Logo,
  Reveal,
  SectionLabel,
  MotionPreference,
  useQuietMotion,
} from "./components/UI.jsx";
import { Enquiry, ProjectDetails } from "./components/Dialogs.jsx";
import Modal from "./components/Modal.jsx";
import ScrollStory from "./components/ScrollStory.jsx";
import {
  services,
  projects,
  contact,
  contactEmail,
  contactMap,
} from "./data.js";
import { serviceDetails, faqs, audiences } from "./editorial.js";

function Hero({ startProject }) {
  const ref = useRef(null);
  const quiet = useQuietMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.025, 1.1]);
  return (
    <section className="hero shell" id="home" ref={ref}>
      <div className="hero-meta">
        <span>Independent digital studio</span>
        <span>Ratmalana, Sri Lanka</span>
      </div>
      <div className="hero-heading">
        <h1>
          Better digital.
          <br />
          <span className="muted">By design.</span>
        </h1>
        <div className="hero-intro">
          <span className="small-marker" />
          <p>
            Thoughtful websites. Connected systems.
            <br />A clearer way forward.
          </p>
          <p className="hero-description">
            We’re M² Labs. We bring design, development and digital strategy
            together to make useful things for people and businesses.
          </p>
          <Action onClick={startProject}>Let’s build something</Action>
        </div>
      </div>
      <div className="hero-image-wrap">
        <motion.img
          className="hero-image"
          src="/images/forma.png"
          width="1200"
          height="1000"
          alt="A series of quiet architectural arches, an original study in structure and space"
          fetchPriority="high"
          style={quiet ? {} : { y: imageY, scale: imageScale }}
        />
        <span className="hero-image-label">SPACE FOR A BETTER IDEA.</span>
        <a
          href="#intro"
          className="hero-scroll"
          aria-label="Scroll to meet M squared Labs"
        >
          <ArrowDown size={20} />
        </a>
      </div>
      <div className="image-caption">
        <span>A study in structure, space & possibility.</span>
        <span>Design with a purpose. Build with care.</span>
      </div>
    </section>
  );
}
function Manifesto() {
  const ref = useRef(null);
  const quiet = useQuietMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start .9", "end .45"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.35, 1]);
  return (
    <section className="intro-section section-space shell" id="intro" ref={ref}>
      <Reveal className="intro-layout">
        <SectionLabel number="00">The way we see it</SectionLabel>
        <div>
          <motion.h2 className="manifesto" style={quiet ? {} : { opacity }}>
            The best digital work
            <br />
            makes life a little simpler.
            <br />
            <span className="muted">That’s where we begin.</span>
          </motion.h2>
          <div className="intro-copy">
            <p>
              A website should make your business easier to understand. An
              application should make a task easier to do. And the systems
              behind both should work together.
            </p>
            <p>
              We look at the whole picture, then focus on what will make a
              meaningful difference. Clear thinking, careful design and
              practical technology. All from one independent studio.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
function Services({ startProject }) {
  const [open, setOpen] = useState(0);
  return (
    <section className="services section-space shell" id="services">
      <Reveal className="split-heading">
        <div>
          <SectionLabel number="01">What we can do together</SectionLabel>
          <p className="section-aside">
            From the first idea to the tools
            <br />
            you use every day.
          </p>
        </div>
        <div>
          <h2>
            A small studio.
            <br />
            <span className="muted">A broad perspective.</span>
          </h2>
          <p className="section-description">
            Pick a starting point. We’ll help you connect it to everything else.
          </p>
        </div>
      </Reveal>
      <div className="service-list">
        {services.map((service, i) => {
          const detail = serviceDetails[i];
          return (
            <Reveal
              key={service.id}
              className={`service-row ${open === i ? "is-open" : ""}`}
            >
              <h3>
                <button
                  className="service-trigger"
                  aria-expanded={open === i}
                  aria-controls={`service-content-${i}`}
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <span className="service-index">0{i + 1}</span>
                  <span>{detail.title}</span>
                  {open === i ? <Minus size={23} /> : <Plus size={23} />}
                </button>
              </h3>
              <div
                id={`service-content-${i}`}
                className="service-content"
                hidden={open !== i}
              >
                <div className="service-overview">
                  <h4>{detail.summary}</h4>
                  <p>{detail.detail}</p>
                  <p className="service-fit">
                    <span>Best for</span>
                    {detail.bestFor}
                  </p>
                  <button
                    className="text-link"
                    onClick={() => startProject(service.name.replace(".", ""))}
                  >
                    Let’s talk about your project <ArrowUpRight size={16} />
                  </button>
                </div>
                <div className="service-capabilities">
                  <span className="eyebrow">Capabilities</span>
                  <ul>
                    {service.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <span className="eyebrow">A typical engagement includes</span>
                  <ul className="deliverables">
                    {detail.outcomes.map((item) => (
                      <li key={item}>
                        <span aria-hidden="true">
                          <ArrowRight size={14} />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
function Explorations({ openProject }) {
  const [filter, setFilter] = useState("All explorations");
  const quiet = useQuietMotion();
  return (
    <section className="work-section section-space shell" id="work">
      <Reveal className="split-heading">
        <div>
          <SectionLabel number="03">Notes from the lab</SectionLabel>
          <p className="section-aside">
            A place to test ideas.
            <br />
            And look a little closer.
          </p>
        </div>
        <div>
          <h2>Thinking, made visible.</h2>
          <p className="section-description">
            Independent studies in digital experiences and connected products.
            <br className="desktop-break" /> These are studio concepts, not
            client commissions.
          </p>
        </div>
      </Reveal>
      <div
        className="work-filters"
        role="group"
        aria-label="Filter explorations"
      >
        {["All explorations", "Web experiences", "Digital systems"].map(
          (item) => (
            <button
              className={filter === item ? "active" : ""}
              key={item}
              aria-pressed={filter === item}
              onClick={() => setFilter(item)}
            >
              {item}
              {filter === item && <ArrowUpRight size={14} aria-hidden="true" />}
            </button>
          ),
        )}
      </div>
      <div className="project-grid">
        {projects
          .filter((p) => filter === "All explorations" || filter === p.category)
          .map((project) => (
            <motion.article
              key={project.id}
              className="project-card"
              initial={quiet ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <button
                className={`project-art ${project.id}`}
                onClick={() => openProject(project)}
              >
                <img
                  src={project.image}
                  alt=""
                  width="1200"
                  height="1000"
                  loading="lazy"
                />
                <span className="project-art-name" aria-hidden="true">
                  {project.id}
                </span>
                <span className="project-read">
                  Explore {project.title} concept <ArrowUpRight size={19} />
                </span>
              </button>
              <div className="project-caption">
                <div>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                </div>
                <span>
                  {project.category}
                  <br />
                  Studio exploration
                </span>
              </div>
            </motion.article>
          ))}
      </div>
    </section>
  );
}
function Studio() {
  return (
    <section className="studio-section section-space shell" id="studio">
      <Reveal className="split-heading">
        <SectionLabel number="04">People before pixels</SectionLabel>
        <div>
          <h2>
            Different starting points.
            <br />
            <span className="muted">The same care.</span>
          </h2>
          <p className="section-description">
            We work with people at different stages, with different challenges.
            <br className="desktop-break" /> What stays the same is a thoughtful
            approach to the work.
          </p>
        </div>
      </Reveal>
      <div className="audience-layout">
        <Reveal className="studio-note">
          <span className="studio-monogram" aria-hidden="true">
            m<sup>2</sup>
          </span>
          <h3>
            Based in Ratmalana.
            <br />
            Open to a conversation.
          </h3>
          <p>
            M² Labs brings creative and technical thinking into the same room.
            You get a connected view of your project, from how it looks and
            reads to how it works behind the scenes.
          </p>
          <p>
            We value clear scopes, honest conversations and work that makes
            sense for the people who use it.
          </p>
          <a className="text-link" href="#contact">
            Meet your next collaborator <ArrowUpRight size={17} />
          </a>
        </Reveal>
        <div className="audience-list">
          {audiences.map(([title, text], i) => (
            <Reveal className="audience-item" delay={i * 0.04} key={title}>
              <span>0{i + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
function Questions() {
  const [open, setOpen] = useState(0);
  return (
    <section className="faq-section section-space shell" id="questions">
      <Reveal className="faq-layout">
        <div>
          <SectionLabel number="05">Before we begin</SectionLabel>
          <h2>
            A few things
            <br />
            <span className="muted">worth knowing.</span>
          </h2>
          <p className="section-description">
            Another question on your mind?
            <br />
            <a className="inline-link" href={`mailto:${contactEmail}`}>
              We’re easy to reach.
            </a>
          </p>
        </div>
        <div className="faq-list">
          {faqs.map(([q, a], i) => (
            <article className="faq-item" key={q}>
              <h3>
                <button
                  aria-expanded={open === i}
                  aria-controls={`answer-${i}`}
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  {q}
                  {open === i ? <Minus size={18} /> : <Plus size={18} />}
                </button>
              </h3>
              <div
                className="faq-answer"
                id={`answer-${i}`}
                hidden={open !== i}
              >
                <p>{a}</p>
              </div>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
function Contact({ startProject }) {
  return (
    <section id="contact" className="contact-section section-space shell">
      <Reveal>
        <div className="contact-intro">
          <SectionLabel number="06">A good place to start</SectionLabel>
          <span className="contact-location">
            Ratmalana, Sri Lanka{" "}
            <span aria-hidden="true">
              <ArrowUpRight size={12} />
            </span>
          </span>
        </div>
        <div className="contact-heading">
          <h2>
            Let’s make
            <br />
            <span className="muted">something useful.</span>
          </h2>
          <button
            className="contact-arrow"
            onClick={startProject}
            aria-label="Start a project"
          >
            <ArrowUpRight size={66} weight="light" />
          </button>
        </div>
        <div className="contact-lead">
          <p>
            A new idea, an existing challenge, or just a question.
            <br />
            Tell us what you’re thinking. We’ll take it from there.
          </p>
          <Action onClick={startProject}>Start a conversation</Action>
        </div>
        <address className="contact-details">
          <div>
            <span className="eyebrow">Write to us</span>
            <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
          </div>
          <div>
            <span className="eyebrow">Call or message</span>
            <a href={`tel:${contact.telephone}`}>{contact.phone}</a>
            <a
              className="contact-small"
              href={contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              Chat on WhatsApp <ArrowUpRight size={13} />
            </a>
          </div>
          <div>
            <span className="eyebrow">Find the studio</span>
            <a href={contactMap} target="_blank" rel="noopener noreferrer">
              {contact.street}
              <br />
              {contact.locality} <ArrowUpRight size={13} />
            </a>
          </div>
        </address>
      </Reveal>
    </section>
  );
}
function Navigation({ close, startProject }) {
  return (
    <Modal title="Navigation" onClose={close} className="navigation-modal">
      <Logo />
      <div className="menu-layout">
        <nav>
          {[
            ["Our services", "services"],
            ["Our approach", "approach"],
            ["Explorations", "work"],
            ["The studio", "studio"],
            ["Contact", "contact"],
          ].map(([title, id], i) => (
            <a href={`#${id}`} onClick={close} key={id}>
              <span>0{i + 1}</span>
              {title}
              <ArrowUpRight weight="light" />
            </a>
          ))}
        </nav>
        <div className="menu-contact">
          <p>Something on your mind?</p>
          <Action onClick={startProject}>Let’s talk</Action>
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
          <a href={`tel:${contact.telephone}`}>{contact.phone}</a>
          <span>{contact.locality}</span>
        </div>
      </div>
    </Modal>
  );
}
export default function App() {
  const [menu, setMenu] = useState(false),
    [enquiry, setEnquiry] = useState(false),
    [service, setService] = useState(""),
    [project, setProject] = useState(null),
    [motionPaused, setMotionPaused] = useState(false);
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
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("m2-theme", theme);
    } catch {
      /* Theme persistence is optional. */
    }
  }, [theme]);
  const startProject = (value = "") => {
    setService(typeof value === "string" ? value : "");
    setMenu(false);
    setProject(null);
    setEnquiry(true);
  };
  return (
    <MotionPreference.Provider value={motionPaused}>
      <div className={`site ${motionPaused ? "motion-paused" : ""}`}>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <header className="header">
          <div className="header-inner shell">
            <Logo />
            <nav className="desktop-nav" aria-label="Main navigation">
              <a href="#services">Services</a>
              <a href="#approach">Approach</a>
              <a href="#work">Explorations</a>
              <a href="#studio">Studio</a>
            </nav>
            <div className="header-actions">
              <button className="header-contact" onClick={() => startProject()}>
                Let’s talk <ArrowUpRight size={15} />
              </button>
              <button
                className="menu-toggle"
                aria-label="Open menu"
                aria-expanded={menu}
                onClick={() => setMenu(true)}
              >
                <span />
                <span />
              </button>
            </div>
          </div>
        </header>
        <main id="main">
          <Hero startProject={() => startProject()} />
          <Manifesto />
          <Services startProject={startProject} />
          <ScrollStory />
          <Explorations openProject={setProject} />
          <Studio />
          <Questions />
          <Contact startProject={() => startProject()} />
        </main>
        <footer className="footer shell">
          <div className="footer-top">
            <Logo />
            <p>Good thinking. Useful things.</p>
            <a href="#home">
              Back to the beginning <ArrowUpRight size={15} />
            </a>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} M² Labs</span>
            <span>Independent by nature. Considered by design.</span>
            <div className="footer-settings">
              <button onClick={() => setMotionPaused(!motionPaused)}>
                {motionPaused ? "Resume animation" : "Pause animation"}
              </button>
              <button
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              >
                {theme === "light" ? "Dark mode" : "Light mode"}
              </button>
            </div>
          </div>
        </footer>
      </div>
      {menu && (
        <Navigation
          close={() => setMenu(false)}
          startProject={() => startProject()}
        />
      )}{" "}
      {enquiry && (
        <Enquiry initialService={service} onClose={() => setEnquiry(false)} />
      )}{" "}
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
    </MotionPreference.Provider>
  );
}
