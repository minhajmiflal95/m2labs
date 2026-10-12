import { Link, useParams } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight, CheckCircle } from "@phosphor-icons/react";
import ServiceScene from "../components/ServiceScene";
import PageSEO from "../components/PageSEO";
import { Action, Reveal, useQuietMotion } from "../components/UI";
import {
  serviceBySlug,
  servicePages,
  serviceGroups,
  technologyNames,
} from "../service-pages";

export function ServiceHero({ service, onEnquire }) {
  const quiet = useQuietMotion();
  const childReveal = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: quiet ? 0 : 0.3 } },
  };
  return (
    <section className="detail-hero shell">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link to="/services">Services</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{service.title}</span>
      </nav>
      <div className="detail-hero-layout">
        <motion.div
          className="detail-hero-copy"
          initial={quiet ? false : "hidden"}
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: quiet ? 0 : 0.045 } },
          }}
        >
          <motion.span variants={childReveal} className="eyebrow">
            {serviceGroups[service.group]} / {service.title}
          </motion.span>
          <motion.h1 variants={childReveal} tabIndex={-1}>
            {service.headline}
          </motion.h1>
          <motion.p variants={childReveal}>{service.description}</motion.p>
          <motion.div variants={childReveal} className="detail-actions">
            <Action onClick={onEnquire}>
              Discuss{" "}
              {service.group === 3 ? "your learning goals" : "your project"}
            </Action>
            <a href="#deliverables" className="detail-secondary">
              Explore the details <ArrowRight size={18} />
            </a>
          </motion.div>
        </motion.div>
        <motion.div
          className="detail-hero-art"
          initial={
            quiet
              ? false
              : { opacity: 0, scale: 0.93, clipPath: "inset(0 0 12% 0)" }
          }
          animate={{ opacity: 1, scale: 1, clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 0.5, delay: quiet ? 0 : 0.08 }}
        >
          <div className="detail-art-orbit" />
          <ServiceScene
            kind={service.scene}
            label={`${service.title}: ${service.group === 3 ? "guided learning and project collaboration" : service.group === 1 ? "connected technology and collaboration" : service.group === 2 ? "content, strategy and digital growth" : "design and development collaboration"}`}
            priority
          />
          <div className="detail-art-note">
            <span>Thoughtfully connected.</span>
            <span>Built around you.</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
export function ServiceOverview({ service }) {
  return (
    <section id="deliverables" className="detail-section shell">
      <Reveal className="detail-section-heading">
        <span className="eyebrow">From the brief to the handover</span>
        <h2>What we deliver.</h2>
        <p>
          The exact scope is agreed together. These are the foundations we work
          through for {service.title.toLowerCase()}.
        </p>
      </Reveal>
      <div className="detail-deliverables">
        {service.deliverables.map((text, i) => (
          <Reveal className="detail-deliverable" key={text} delay={i * 0.05}>
            <span className="detail-number">0{i + 1}</span>
            <p>{text}</p>
            <CheckCircle size={22} aria-hidden="true" />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
export function CapabilityGrid({ service }) {
  return (
    <section className="detail-section shell">
      <Reveal className="detail-section-heading">
        <span className="eyebrow">The work behind the outcome</span>
        <h2>Core capabilities.</h2>
      </Reveal>
      <div className="detail-capabilities">
        {service.capabilities.map(([title, text], i) => (
          <Reveal
            className="detail-capability"
            key={title}
            delay={(i % 3) * 0.04}
          >
            <span className="detail-number">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3>{title}</h3>
            <p>{text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
export function ProcessTimeline({ service }) {
  return (
    <section className="detail-section detail-process-section">
      <div className="shell">
        <Reveal className="detail-section-heading">
          <span className="eyebrow">A clear way forward</span>
          <h2>How we work together.</h2>
        </Reveal>
        <ol className="detail-process">
          {service.process.map(([title, text], i) => (
            <Reveal as="li" key={title}>
              <span className="process-step">0{i + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
export function TechnologyStack({ service }) {
  return (
    <section className="detail-section shell">
      <Reveal className="detail-tools">
        <div>
          <span className="eyebrow">Tools around the work</span>
          <h2>Chosen for the task.</h2>
          <p>
            We assess the project before selecting a tool. These technologies
            are relevant to the service; the agreed scope determines what we
            use.
          </p>
        </div>
        <ul>
          {service.technologies.map((icon) => (
            <li key={icon}>
              <img
                src={`/images/technologies/${icon}.svg`}
                width={40}
                height={40}
                alt=""
                loading="lazy"
              />
              <span>{technologyNames[icon]}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
export function UseCaseSection({ service }) {
  return (
    <section className="detail-section shell">
      <Reveal className="detail-section-heading">
        <span className="eyebrow">Possibilities, made practical</span>
        <h2>What this could look like.</h2>
        <p>
          Illustrative scenarios only — these are examples, not client case
          studies.
        </p>
      </Reveal>
      <div className="detail-use-cases">
        {service.examples.map(([title, text], i) => (
          <Reveal className="detail-use-case" key={title}>
            <span className="eyebrow">Example 0{i + 1}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
export function ServiceFAQ({ service }) {
  return (
    <section className="detail-section shell detail-faq">
      <Reveal>
        <span className="eyebrow">Before we begin</span>
        <h2>Your questions, answered.</h2>
        <p>
          Need to discuss something specific? Bring it to the first
          conversation.
        </p>
      </Reveal>
      <div>
        {service.faqs.map(([question, answer]) => (
          <details key={question}>
            <summary>
              {question}
              <span aria-hidden="true">+</span>
            </summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
export function RelatedServices({ service }) {
  return (
    <section className="detail-section shell">
      <Reveal className="detail-section-heading">
        <span className="eyebrow">Better, together</span>
        <h2>Connect the next piece.</h2>
      </Reveal>
      <div className="detail-related">
        {service.related.map((slug) => {
          const related = serviceBySlug[slug];
          return (
            <Link className="related-card" to={related.path} key={slug}>
              <ServiceScene kind={related.scene} decorative />
              <span>{related.title}</span>
              <ArrowUpRight size={20} />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
export function ServiceCTA({ service, onEnquire }) {
  return (
    <section className="detail-section shell" id="contact">
      <Reveal className="detail-closing">
        <span className="eyebrow">The next step</span>
        <h2>
          {service.group === 3
            ? "Let’s build your understanding."
            : `Let’s talk about ${service.title.toLowerCase()}.`}
        </h2>
        <p>
          {service.group === 3
            ? "Bring your brief, your questions and the support rules that apply to your work."
            : "Bring your goals, your current setup and the questions you want to resolve. We’ll define a practical scope together."}
        </p>
        <Action onClick={onEnquire}>
          {service.group === 3
            ? "Plan your guidance"
            : "Start the conversation"}
        </Action>
        <Link to="/services">
          Explore all services <ArrowRight size={16} />
        </Link>
      </Reveal>
    </section>
  );
}
export default function ServicePage({ startProject }) {
  const { slug } = useParams();
  const service = serviceBySlug[slug];
  if (!service) return <NotFound />;
  const onEnquire = () => startProject(service.title);
  return (
    <div
      className={`service-detail detail-layout-${service.group % 3}`}
      data-service={service.slug}
      data-accent={service.accent}
    >
      <PageSEO
        title={service.title}
        description={service.description}
        path={service.path}
      />
      <ServiceHero service={service} onEnquire={onEnquire} />
      <ServiceOverview service={service} />
      <section className="detail-section shell">
        <Reveal className="detail-section-heading">
          <span className="eyebrow">Start with the problem</span>
          <h2>Less friction. More possibility.</h2>
        </Reveal>
        <div className="detail-problems">
          {service.problems.map(([title, text]) => (
            <Reveal className="detail-problem" key={title}>
              <h3>{title}</h3>
              <ArrowRight size={20} aria-hidden="true" />
              <p>{text}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <CapabilityGrid service={service} />
      <ProcessTimeline service={service} />
      <TechnologyStack service={service} />
      <UseCaseSection service={service} />
      <ServiceFAQ service={service} />
      <RelatedServices service={service} />
      <ServiceCTA service={service} onEnquire={onEnquire} />
    </div>
  );
}
export function ServiceDirectory({ startProject }) {
  return (
    <div className="service-detail">
      <PageSEO
        title="Our services"
        description="Explore all M² Labs services: websites, applications, Microsoft 365, ERP integration, IT support, content, marketing and learning guidance."
        path="/services"
      />
      <section className="shell detail-directory">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span aria-current="page">Services</span>
        </nav>
        <span className="eyebrow">Sixteen ways to move forward</span>
        <h1 tabIndex={-1}>
          Good thinking.
          <br />
          Connected solutions.
        </h1>
        <p>
          From a clearer website to a better working day. Find the service that
          fits your next step, then connect it to everything else.
        </p>
        <div className="directory-jump" aria-label="Service categories">
          {serviceGroups.map((group, i) => (
            <a key={group} href={`#category-${i}`}>
              {group}
            </a>
          ))}
        </div>
        {serviceGroups.map((group, i) => (
          <section className="directory-group" id={`category-${i}`} key={group}>
            <Reveal className="detail-section-heading">
              <span className="eyebrow">0{i + 1}</span>
              <h2>{group}.</h2>
            </Reveal>
            <div className="directory-grid">
              {servicePages
                .filter((service) => service.group === i)
                .map((service) => (
                  <Link
                    to={service.path}
                    className="directory-card"
                    key={service.slug}
                    data-accent={service.accent}
                  >
                    <ServiceScene kind={service.scene} decorative />
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <span>
                      Explore the service <ArrowUpRight size={18} />
                    </span>
                  </Link>
                ))}
            </div>
          </section>
        ))}
        <div className="detail-closing">
          <h2>Not sure where to begin?</h2>
          <p>
            Tell us what needs to work better. We’ll help you identify a useful
            starting point.
          </p>
          <Action onClick={() => startProject()}>Discuss your idea</Action>
        </div>
      </section>
    </div>
  );
}
export function NotFound() {
  return (
    <section className="shell detail-directory">
      <PageSEO
        title="Page not found"
        description="This page could not be found. Explore M² Labs services or return to the homepage."
        noIndex
      />
      <span className="eyebrow">404 / A different direction</span>
      <h1 tabIndex={-1}>Let’s find your way.</h1>
      <p>The page you requested isn’t available.</p>
      <Link className="button" to="/services">
        Explore our services <ArrowRight />
      </Link>
      <Link className="detail-secondary" to="/">
        Return home
      </Link>
    </section>
  );
}
