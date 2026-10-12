import { useEffect, useState, lazy, Suspense } from "react";
import { Link, Routes, Route, useLocation } from "react-router-dom";

import ServiceNavigation, {
  ServiceLinks,
} from "./components/ServiceNavigation.jsx";
import PageTransition from "./components/PageTransition.jsx";
import PageSEO from "./components/PageSEO.jsx";
import { serviceBySlug, homeCapabilitySlugs } from "./service-pages.js";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowUpRight,
  ArrowDown,
  Plus,
  Minus,
  ArrowRight,
  Sun,
  Moon,
} from "@phosphor-icons/react";
import {
  Action,
  Logo,
  Reveal,
  SectionLabel,
  MotionPreference,
  useQuietMotion,
} from "./components/UI.jsx";
import { Enquiry } from "./components/Dialogs.jsx";
import Modal from "./components/Modal.jsx";
import ScrollStory from "./components/ScrollStory.jsx";
import ServiceScene from "./components/ServiceScene.jsx";
import ServiceFlow from "./components/ServiceFlow.jsx";
import HeroSlides from "./components/HeroSlides.jsx";
import SelectedWork from "./components/SelectedWork.jsx";
import "./selected-work.css";
import LabsPortal from "./components/LabsPortal.tsx";
import { BrandCube } from "./components/BrandCube.jsx";
import LogoIntro from "./components/LogoIntro.jsx";

import { services, contact, contactEmail, contactMap } from "./data.js";
import { serviceDetails, faqs, audiences } from "./editorial.js";

const ServicePage = lazy(() => import("./pages/ServicePage.jsx"));
const ServiceDirectory = lazy(() =>
  import("./pages/ServicePage.jsx").then((module) => ({
    default: module.ServiceDirectory,
  })),
);
const NotFound = lazy(() =>
  import("./pages/ServicePage.jsx").then((module) => ({
    default: module.NotFound,
  })),
);

function Hero({ startProject }) {
  return (
    <section className="hero shell" id="home">
      <HeroSlides startProject={startProject} />
      <div className="craft-banner">
        <h2>
          Crafting
          <br />
          what’s next.
        </h2>
        <p>
          Interactive experiences, modern technologies
          <br /> and human-centred design — that’s M² Labs.
        </p>
        <a
          className="brand-orbit"
          href="#service-experience"
          aria-label="Explore M squared Labs services"
        >
          <span className="orbit-ring" />
          <BrandCube />
        </a>
        <a className="craft-scroll" href="#service-experience">
          Scroll
          <br />
          Explore
          <br />
          Experience <ArrowDown size={25} />
        </a>
      </div>
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
                  <ServiceScene
                    kind={[1, 5, 3, 8][i]}
                    className="capability-illustration"
                    decorative
                  />
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
                      <li key={item}>
                        <Link
                          to={
                            serviceBySlug[
                              homeCapabilitySlugs[i][
                                service.items.indexOf(item)
                              ]
                            ].path
                          }
                        >
                          {item}
                        </Link>
                      </li>
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
          <ServiceScene kind={8} className="studio-illustration" decorative />
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
          <ServiceScene kind={4} className="faq-illustration" decorative />
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
      <Reveal className="contact-layout">
        <div className="contact-intro">
          <SectionLabel number="06">A good place to start</SectionLabel>
          <span className="contact-location">
            Ratmalana, Sri Lanka{" "}
            <span aria-hidden="true">
              <ArrowUpRight size={12} />
            </span>
          </span>
        </div>
        <ServiceScene kind={8} className="contact-illustration" decorative />
        <div className="contact-heading">
          <h2>
            Let’s make
            <br />
            <span className="muted">something useful.</span>
          </h2>
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
function ProcessOverview() {
  const steps = [
    [
      "Discover",
      "We understand your goals, your audience and what needs to work better.",
      4,
    ],
    [
      "Plan",
      "We shape the scope, content and a practical roadmap together.",
      7,
    ],
    [
      "Build",
      "We design, develop and refine, with you involved along the way.",
      0,
    ],
    [
      "Launch & grow",
      "We deploy, hand over and support your next step forward.",
      2,
    ],
  ];
  return (
    <section className="process-overview shell">
      <Reveal className="catalog-heading">
        <div>
          <span className="eyebrow">Our process</span>
          <h2>How We Work</h2>
        </div>
        <p>
          A clear path from the first conversation
          <br /> to something that makes a difference.
        </p>
        <a href="#approach">
          Our approach <ArrowRight size={16} />
        </a>
      </Reveal>
      <div className="process-steps">
        {steps.map(([title, text, kind], i) => (
          <Reveal delay={i * 0.06} key={title}>
            <div className="process-art">
              <ServiceScene kind={kind} decorative />
              {i < 3 && <ArrowRight className="process-arrow" />}
            </div>
            <span className="eyebrow">0{i + 1}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
function TechnologyStrip() {
  return (
    <section className="technology-strip shell">
      <Reveal>
        <ServiceScene kind={5} className="technology-illustration" decorative />
        <span className="eyebrow">Technology ecosystem</span>
        <h2>Tools for what comes next.</h2>
        <p>
          We choose technology around your project, your team and the way you
          need to work.
        </p>
        <ul>
          {[
            ["React", "react"],
            ["Node.js", "nodejs"],
            ["TypeScript", "typescript"],
            ["Python", "python"],
            ["PHP", "php"],
            ["MySQL", "mysql"],
            ["WordPress", "wordpress"],
            ["Microsoft 365", "microsoft365"],
            ["Figma", "figma"],
            ["GitHub", "github"],
          ].map(([name, icon]) => (
            <li key={name}>
              <span className="technology-logo" aria-hidden="true">
                <img
                  src={`/images/technologies/${icon}.svg`}
                  width="36"
                  height="36"
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </span>
              {name}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
function Navigation({ close, startProject }) {
  const [scene, setScene] = useState(0);
  const quiet = useQuietMotion();
  return (
    <Modal title="Navigation" onClose={close} className="navigation-modal">
      <Logo />
      <div className="menu-layout">
        <nav>
          {[
            ["Our services", "services"],
            ["Our approach", "approach"],
            ["Selected Work", "work"],
            ["The studio", "studio"],
            ["Contact", "contact"],
          ].map(([title, id], i) => (
            <Link
              to={`/#${id}`}
              onClick={close}
              key={id}
              onMouseEnter={() => setScene(i)}
              onFocus={() => setScene(i)}
              className={scene === i ? "menu-active" : ""}
            >
              <span>0{i + 1}</span>
              {title}
              <ArrowUpRight weight="light" />
            </Link>
          ))}
        </nav>
        <div className="menu-contact">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={scene}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: quiet ? 0 : 0.15 }}
            >
              <ServiceScene
                kind={[0, 6, 1, 9, 3][scene]}
                label={
                  [
                    "Our services: a developer creating software",
                    "Our approach: connected planning and systems",
                    "Selected Work: exploring practical project concepts",
                    "The studio: our creative team",
                    "Contact: making a new connection",
                  ][scene]
                }
              />
            </motion.div>
          </AnimatePresence>
          <p>Something on your mind?</p>
          <Action onClick={startProject}>Let’s talk</Action>
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
          <a href={`tel:${contact.telephone}`}>{contact.phone}</a>
          <span>{contact.locality}</span>
        </div>
      </div>
      <section className="mobile-service-directory" aria-label="All services">
        <h2>Explore our services</h2>
        <ServiceLinks onNavigate={close} />
        <Link to="/services" onClick={close}>
          View the service directory <ArrowRight size={18} />
        </Link>
      </section>
    </Modal>
  );
}
export default function App() {
  const location = useLocation();
  const [menu, setMenu] = useState(false),
    [enquiry, setEnquiry] = useState(false),
    [service, setService] = useState(""),
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
    setEnquiry(true);
  };
  return (
    <MotionPreference.Provider value={motionPaused}>
      <LogoIntro />
      <div className={`site ${motionPaused ? "motion-paused" : ""}`}>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <header className="header">
          <div className="header-inner shell">
            <Logo />
            <nav className="desktop-nav" aria-label="Main navigation">
              <Link
                to="/#home"
                aria-current={location.pathname === "/" ? "page" : undefined}
              >
                Home
              </Link>
              <ServiceNavigation />
              <Link to="/#approach">Process</Link>
              <Link to="/#work">Selected Work</Link>
              <Link to="/#studio">About</Link>
            </nav>
            <div className="header-actions">
              <button
                className="theme-toggle"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
                aria-pressed={theme === "light"}
              >
                {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
              </button>
              <button className="header-contact" onClick={() => startProject()}>
                Get in touch <ArrowUpRight size={15} />
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
          <Suspense
            fallback={
              <div className="shell route-pending" role="status">
                Opening the page…
              </div>
            }
          >
            <PageTransition>
              <Routes location={location}>
                <Route
                  path="/"
                  element={
                    <>
                      <PageSEO
                        title="Ideas, amplified."
                        description="M² Labs brings design, development and digital strategy together. Websites, applications, IT support, Microsoft 365, ERP integration, marketing and academic project guidance."
                      />
                      <Hero startProject={() => startProject()} />
                      <LabsPortal />
                      <ServiceFlow startProject={startProject} />
                      <Services startProject={startProject} />
                      <ProcessOverview />
                      <ScrollStory />
                      <SelectedWork startProject={startProject} />
                      <Studio />
                      <TechnologyStrip />
                      <Questions />
                      <Contact startProject={() => startProject()} />
                    </>
                  }
                />
                <Route
                  path="/services"
                  element={<ServiceDirectory startProject={startProject} />}
                />
                <Route
                  path="/services/:slug"
                  element={<ServicePage startProject={startProject} />}
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </PageTransition>
          </Suspense>
        </main>
        <footer className="footer shell">
          <div className="footer-top">
            <Logo />
            <p>Good thinking. Useful things.</p>
            <Link to="/#home">
              Back to the beginning <ArrowUpRight size={15} />
            </Link>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} M² Labs</span>
            <span>Independent by nature. Considered by design.</span>
            <div className="footer-settings">
              <button onClick={() => setMotionPaused(!motionPaused)}>
                {motionPaused ? "Resume animation" : "Pause animation"}
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
    </MotionPreference.Provider>
  );
}
