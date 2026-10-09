import { useRef, useState } from "react";
import ServiceScene from "./ServiceScene.jsx";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "motion/react";
import { Reveal, SectionLabel, useQuietMotion } from "./UI.jsx";

const chapters = [
  {
    title: "First, find the focus.",
    label: "Understand",
    text: "Before a screen, a line of code, or a campaign, there is a question: what needs to work better?",
    detail:
      "We get to know your audience, your day-to-day work and the problem behind the brief. Together, we decide what matters now and what can wait.",
    outputs: [
      "A shared understanding of the challenge",
      "A clear scope, priorities and project plan",
      "The right tools for the job",
    ],
  },
  {
    title: "Then, give it form.",
    label: "Create",
    text: "Make the complex feel simple. Build something people can understand, use and enjoy.",
    detail:
      "Strategy becomes structure, content and working software. We design in context, develop in stages and share progress so your feedback shapes the result.",
    outputs: [
      "Purposeful design and useful content",
      "Responsive development and integrations",
      "Testing, refinement and a considered launch",
    ],
  },
  {
    title: "Keep the good going.",
    label: "Evolve",
    text: "A launch is a beginning. Your digital tools should keep moving with your business.",
    detail:
      "From technical support and connected systems to search and social content, we help you look after what you have built and decide what comes next.",
    outputs: [
      "A practical handover and documentation",
      "Ongoing support, scoped around your needs",
      "A direction for the next improvement",
    ],
  },
];
const scattered = [
  [-4, 28],
  [203, -8],
  [356, 53],
  [100, 131],
  [272, 160],
  [-11, 212],
  [368, 243],
  [172, 273],
  [294, 337],
];
function Tile({ index, progress, quiet }) {
  const col = index % 3,
    row = Math.floor(index / 3);
  const x = useTransform(
    progress,
    [0, 0.48, 1],
    [scattered[index][0], 112 + col * 77, 124 + col * 70],
  );
  const y = useTransform(
    progress,
    [0, 0.48, 1],
    [scattered[index][1], 90 + row * 77, 109 + row * 70],
  );
  const rotate = useTransform(
    progress,
    [0, 0.48, 1],
    [(index % 2 ? 1 : -1) * (9 + index), 0, 0],
  );
  const fill = useTransform(
    progress,
    [0, 0.55, 1],
    [
      "var(--paper)",
      "var(--paper)",
      index === 4 ? "var(--accent)" : "var(--tile)",
    ],
  );
  return (
    <motion.g
      className="story-tile"
      style={
        quiet ? { x: 124 + col * 70, y: 109 + row * 70 } : { x, y, rotate }
      }
    >
      <motion.rect
        width="62"
        height="62"
        rx="1"
        fill={quiet ? (index === 4 ? "var(--accent)" : "var(--tile)") : fill}
        stroke="var(--diagram-line)"
        strokeWidth="1"
      />
      <text
        x="10"
        y="18"
        fill={quiet && index === 4 ? "white" : "var(--ink)"}
        fontSize="8"
        fontFamily="monospace"
      >
        0{index + 1}
      </text>
      {index === 4 && (
        <text
          x="19"
          y="44"
          fill="var(--paper)"
          fontFamily="sans-serif"
          fontSize="24"
        >
          m²
        </text>
      )}
    </motion.g>
  );
}
export default function ScrollStory() {
  const ref = useRef(null);
  const quiet = useQuietMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const [phase, setPhase] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = value < 0.29 ? 0 : value < 0.67 ? 1 : 2;
    setPhase((previous) => (previous === next ? previous : next));
  });
  const frameOpacity = useTransform(scrollYProgress, [0.35, 0.7], [0, 1]);
  const lineDraw = useTransform(scrollYProgress, [0.6, 0.95], [0, 1]);
  return (
    <section id="approach" className="approach section-space shell">
      <Reveal className="split-heading">
        <SectionLabel number="02">A considered approach</SectionLabel>
        <h2>
          Good work.
          <br />
          <span className="muted">From the inside out.</span>
        </h2>
      </Reveal>
      <div
        className={`story-track ${quiet ? "story-quiet" : ""}`}
        ref={ref}
        data-story-phase={phase}
      >
        <div className="story-stage">
          <div className="diagram-top">
            <span>THE ANATOMY OF AN IDEA</span>
            <span>FIG. 0{phase + 1}</span>
          </div>
          <svg
            className="story-diagram"
            viewBox="-40 -30 540 480"
            role="img"
            aria-label="A scattered set of elements comes together into a connected system as you scroll"
          >
            <defs>
              <pattern
                id="dot-grid"
                width="22"
                height="22"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="1" cy="1" r=".65" fill="var(--diagram-line)" />
              </pattern>
            </defs>
            <rect
              x="-40"
              y="-30"
              width="540"
              height="480"
              fill="url(#dot-grid)"
            />
            <motion.rect
              x="99"
              y="84"
              width="240"
              height="240"
              rx="1"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1"
              strokeDasharray="3 5"
              style={{ opacity: quiet ? 1 : frameOpacity }}
            />
            <motion.path
              d="M-5 214H95 M344 214H446 M219 8V80 M219 328V400"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1"
              style={{ pathLength: quiet ? 1 : lineDraw }}
            />
            {Array.from({ length: 9 }, (_, i) => (
              <Tile
                key={i}
                index={i}
                progress={scrollYProgress}
                quiet={quiet}
              />
            ))}
          </svg>
          <div className="diagram-caption">
            <span className="diagram-phase">
              0{phase + 1} / {chapters[phase].label}
            </span>
            <span>Less noise. More direction.</span>
          </div>
          <div className="story-progress" aria-hidden="true">
            <motion.span style={{ scaleX: quiet ? 1 : scrollYProgress }} />
          </div>
        </div>
        <div className="story-chapters">
          {chapters.map((chapter, i) => (
            <article
              className="story-chapter"
              id={`chapter-${i + 1}`}
              key={chapter.label}
            >
              <Reveal>
                <span className="chapter-number">
                  0{i + 1} / {chapter.label}
                </span>
                <h3>{chapter.title}</h3>
                <ServiceScene
                  kind={[4, 0, 5][i]}
                  className="chapter-illustration"
                  decorative
                />
                <p className="chapter-lead">{chapter.text}</p>
                <p>{chapter.detail}</p>
                <ul>
                  {chapter.outputs.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Reveal>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
