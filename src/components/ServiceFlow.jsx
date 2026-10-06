import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react";
import ServiceScene from "./ServiceScene.jsx";
import { Action, Reveal, useQuietMotion } from "./UI.jsx";

export const offerings = [
  [
    "Web Application",
    "Web Application Development",
    "Scalable, secure applications designed around the way your business works. From the first workflow to a reliable launch, we turn complex ideas into useful software.",
    [
      "Custom web applications",
      "Modern, scalable architecture",
      "Secure and reliable solutions",
      "Ongoing support & maintenance",
    ],
    0,
  ],
  [
    "Web Design & Dev",
    "Web Design & Development",
    "A website should feel like your business at its best. We blend purposeful design, thoughtful content and responsive development to make every visit count.",
    [
      "Responsive website design",
      "Clear user journeys",
      "E-commerce experiences",
      "Accessible, thoughtful interfaces",
    ],
    0,
  ],
  [
    "IT Support",
    "Technology that keeps you moving",
    "Practical help for the tools your team depends on. We diagnose problems, improve everyday systems and help you work with confidence.",
    [
      "Technical troubleshooting",
      "Device and software setup",
      "Systems health checks",
      "Practical team guidance",
    ],
    1,
  ],
  [
    "Social Media Marketing",
    "Make meaningful connections",
    "Bring a consistent voice to your social channels. We shape content and campaigns around your audience, your goals and what makes your business different.",
    [
      "Social content strategy",
      "Campaign planning",
      "Creative content production",
      "Reporting and refinement",
    ],
    2,
  ],
  [
    "SEO",
    "Be found by the right people",
    "Build a stronger foundation for organic discovery. We connect technical improvements with useful content and a clear understanding of search intent.",
    [
      "Technical website reviews",
      "Keyword and content research",
      "On-page optimisation",
      "Search performance monitoring",
    ],
    2,
  ],
  [
    "Microsoft 365",
    "A more connected working day",
    "Bring your people, files and conversations together. We help configure and connect Microsoft 365 around the needs of your team.",
    [
      "Microsoft 365 setup",
      "Email and collaboration tools",
      "Workflow integration",
      "Documentation and handover",
    ],
    1,
  ],
  [
    "ERP Integration",
    "Your business, working together",
    "Connect information across your operations. We map your processes and integrate the right systems to reduce duplicate work and make decisions easier.",
    [
      "Business process discovery",
      "System and data connections",
      "Workflow automation",
      "Testing and team handover",
    ],
    1,
  ],
  [
    "Content Writing",
    "Words that do more",
    "Turn complex ideas into clear, useful content. From website copy to articles and technical documentation, we help your voice reach the right audience.",
    [
      "Website and brand copy",
      "Articles and editorial content",
      "Technical documentation",
      "Editing and content planning",
    ],
    2,
  ],
  [
    "University Support",
    "Build knowledge. Bring ideas to life.",
    "Support for assignments, research and final-year projects. Develop work you understand through mentoring, writing feedback and practical technical guidance.",
    [
      "Assignment writing guidance",
      "Final-year project mentoring",
      "Research and documentation",
      "Development support",
    ],
    3,
  ],
];
const groups = [
  "Digital experiences",
  "Connected operations",
  "Brands with momentum",
  "Your next breakthrough",
];
export default function ServiceFlow({ startProject }) {
  const [active, setActive] = useState(0),
    [preview, setPreview] = useState(null);
  const quiet = useQuietMotion();
  const [horizontal, setHorizontal] = useState(
    () => matchMedia("(max-width: 800px)").matches,
  );
  useEffect(() => {
    const query = matchMedia("(max-width: 800px)");
    const update = () => setHorizontal(query.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  const shown = preview ?? active;
  const item = offerings[shown];
  const choose = (i) => {
    setActive(i);
    setPreview(null);
  };
  const onKey = (event, i) => {
    let next;
    if (event.key === "ArrowDown" || event.key === "ArrowRight")
      next = (i + 1) % 9;
    if (event.key === "ArrowUp" || event.key === "ArrowLeft")
      next = (i + 8) % 9;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = 8;
    if (next !== undefined) {
      event.preventDefault();
      choose(next);
      document.getElementById(`flow-tab-${next}`)?.focus();
    }
  };
  return (
    <section
      className="service-experience shell"
      id="service-experience"
      aria-label="Explore our services"
    >
      <div className="flow-layout" onMouseLeave={() => setPreview(null)}>
        <div
          className="flow-tabs"
          role="tablist"
          aria-label="Service flow menu"
          aria-orientation={horizontal ? "horizontal" : "vertical"}
        >
          {offerings.map(([name], i) => (
            <button
              key={name}
              type="button"
              id={`flow-tab-${i}`}
              role="tab"
              aria-controls="flow-panel"
              aria-selected={active === i}
              tabIndex={active === i ? 0 : -1}
              className={`flow-tab ${active === i ? "is-active" : ""} ${shown === i ? "is-preview" : ""}`}
              onPointerEnter={(e) => {
                if (e.pointerType === "mouse") setPreview(i);
              }}
              onFocus={() => choose(i)}
              onClick={() => choose(i)}
              onKeyDown={(e) => onKey(e, i)}
            >
              <span className="flow-number">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{name}</span>
              <ArrowRight size={15} />
            </button>
          ))}
        </div>
        <div
          className="flow-panel"
          id="flow-panel"
          role="tabpanel"
          tabIndex={0}
          aria-labelledby={`flow-tab-${active}`}
          data-scene={shown}
        >
          <AnimatePresence initial={false} mode="sync">
            <motion.div
              className="flow-content"
              key={shown}
              initial={{ opacity: quiet ? 1 : 0, y: quiet ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: quiet ? 0 : -8 }}
              transition={{ duration: quiet ? 0 : 0.24 }}
            >
              <div className="flow-copy">
                <span className="eyebrow">
                  Our services / {String(shown + 1).padStart(2, "0")}
                </span>
                <h2>{item[1]}</h2>
                <p>{item[2]}</p>
                <ul>
                  {item[3].map((text) => (
                    <li key={text}>
                      <CheckCircle size={18} />
                      {text}
                    </li>
                  ))}
                </ul>
                <Action onClick={() => startProject(groups[item[4]])}>
                  Explore this service
                </Action>
              </div>
              <div className="flow-art">
                <ServiceScene kind={shown} />
                <span className="art-note">
                  Good ideas.
                  <br />
                  Thoughtfully built.
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <Reveal className="catalog-heading">
        <div>
          <span className="eyebrow">What we do</span>
          <h2>Our Services</h2>
        </div>
        <p>
          End-to-end digital services to help you build, grow
          <br className="desktop-break" /> and succeed in the digital world.
        </p>
        <a href="#services">
          View capabilities <ArrowRight />
        </a>
      </Reveal>
      <div className="illustrated-services">
        {offerings.map(([name, , , , group], i) => (
          <Reveal key={name} delay={(i % 3) * 0.04}>
            <button
              className="illustrated-card"
              onClick={() => {
                choose(i);
                document
                  .getElementById("service-experience")
                  .scrollIntoView({ behavior: quiet ? "instant" : "smooth" });
                document
                  .getElementById(`flow-tab-${i}`)
                  ?.focus({ preventScroll: true });
              }}
            >
              <div>
                <span className="eyebrow">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3>
                  {name === "Web Design & Dev"
                    ? "Web Design & Development"
                    : name}
                </h3>
                <p>
                  {
                    [
                      "Custom applications, built around your business.",
                      "Modern, responsive websites that make an impact.",
                      "Reliable support to keep your business running.",
                      "Grow your brand with considered social content.",
                      "Improve visibility and organic discovery.",
                      "Streamline collaboration with Microsoft 365.",
                      "Connect and automate your business systems.",
                      "Clear content that informs and connects.",
                      "Assignment and final-year project guidance.",
                    ][i]
                  }
                </p>
              </div>
              <ServiceScene kind={i} decorative />
              <span className="card-arrow">
                <ArrowRight size={17} />
              </span>
            </button>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
