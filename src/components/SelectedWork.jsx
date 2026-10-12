import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react";
import { selectedWork } from "../selected-work";
import { serviceBySlug } from "../service-pages";
import { Reveal, SectionLabel } from "./UI";
import ServiceScene from "./ServiceScene";
import Modal from "./Modal";

export default function SelectedWork({ startProject }) {
  const [project, setProject] = useState(null);
  const service = project && serviceBySlug[project.service];
  return (
    <section
      className="selected-work section-space shell"
      id="work"
      aria-labelledby="selected-work-title"
    >
      <Reveal className="selected-work-heading">
        <div>
          <SectionLabel number="03">Selected work</SectionLabel>
          <h2 id="selected-work-title">
            Practical ideas.
            <br />
            Thoughtfully explored.
          </h2>
        </div>
        <p>
          Illustrative project concepts for Sri Lankan businesses and student
          research. Each explores a practical challenge, a proposed solution and
          the tools that could bring it to life.
        </p>
      </Reveal>
      <div className="selected-work-grid">
        {selectedWork.map((item, i) => (
          <Reveal
            className="selected-work-card"
            key={item.id}
            delay={(i % 2) * 0.05}
            as="article"
          >
            <div className="selected-work-art" data-tone={i % 3}>
              <ServiceScene kind={item.scene} decorative />
              <span>{String(i + 1).padStart(2, "0")}</span>
            </div>
            <div className="selected-work-copy">
              <div className="selected-work-meta">
                <span>{item.category}</span>
                <span>{item.label}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <ul
                className="selected-work-stack"
                aria-label="Proposed technology stack"
              >
                {item.stack.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
              <button
                className="selected-work-open"
                onClick={() => setProject(item)}
                aria-label={`Explore concept: ${item.title}`}
              >
                Explore concept <ArrowUpRight size={18} aria-hidden="true" />
              </button>
            </div>
          </Reveal>
        ))}
      </div>
      {project && (
        <Modal
          title={`${project.title} — project concept`}
          className="work-detail-modal"
          onClose={() => setProject(null)}
        >
          <span className="eyebrow">
            {project.label} / {project.category}
          </span>
          <h2>{project.title}</h2>
          <p className="work-detail-intro">
            An illustrative brief for exploring this solution. Client delivery
            and production results are not claimed.
          </p>
          <ServiceScene
            kind={project.scene}
            decorative
            className="work-detail-art"
          />
          <h3>The challenge</h3>
          <p>{project.challenge}</p>
          <h3>A proposed approach</h3>
          <div className="work-detail-approach">
            {project.approach.map(([title, text], i) => (
              <article key={title}>
                <span className="eyebrow">0{i + 1}</span>
                <h4>{title}</h4>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <h3>Suggested scope</h3>
          <ul className="work-detail-scope">
            {project.scope.map((text) => (
              <li key={text}>{text}</li>
            ))}
          </ul>
          <h3>Proposed stack</h3>
          <ul className="selected-work-stack">
            {project.stack.map((tool) => (
              <li key={tool}>{tool}</li>
            ))}
          </ul>
          <div className="work-detail-actions">
            <Link
              className="detail-secondary"
              to={service.path}
              onClick={() => setProject(null)}
            >
              Explore {service.title}{" "}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <button
              className="button"
              onClick={() => {
                setProject(null);
                startProject(service.title);
              }}
            >
              Discuss a similar idea{" "}
              <ArrowUpRight size={18} aria-hidden="true" />
            </button>
          </div>
        </Modal>
      )}
    </section>
  );
}
