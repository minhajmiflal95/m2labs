import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { ArrowLeft, ArrowRight, Pause, Play } from "@phosphor-icons/react";
import ServiceScene from "./ServiceScene.jsx";
import { Action, useQuietMotion } from "./UI.jsx";

const slides = [
  {
    title: "Ideas to Impact.",
    accent: "Digital Solutions",
    ending: "That Matter.",
    label: "Ideas & possibilities",
    pill: "Digital solutions for a brighter tomorrow",
    text: "We design, develop and support digital solutions that help businesses grow, brands stand out and ideas turn into real-world impact.",
    scene: 9,
    note: ["Technology.", "People.", "Real impact."],
  },
  {
    title: "Built Around You.",
    accent: "Beautiful by Design.",
    ending: "Ready for Real Life.",
    label: "Design & development",
    pill: "From a first impression to a lasting connection",
    text: "Websites that express your brand. Applications that simplify your day. Thoughtful design and dependable development, shaped around the people who use them.",
    scene: 1,
    note: ["Good thinking.", "Great experiences.", "Made for you."],
  },
  {
    title: "Your Next Chapter.",
    accent: "Connected Systems.",
    ending: "Room to Grow.",
    label: "Systems & growth",
    pill: "Less friction. More possibility.",
    text: "Bring your tools, team and digital presence together. From Microsoft 365 and ERP integration to search and social strategy, we help your business move forward.",
    scene: 6,
    note: ["Connect.", "Simplify.", "Move forward."],
  },
];
const duration = 7000;
export default function HeroSlides({ startProject }) {
  const quiet = useQuietMotion();
  const [index, setIndex] = useState(0),
    [paused, setPaused] = useState(false),
    [hover, setHover] = useState(false),
    [focused, setFocused] = useState(false),
    [visible, setVisible] = useState(!document.hidden),
    [announcement, setAnnouncement] = useState("");
  const ref = useRef(null),
    gesture = useRef(null);
  const inView = useInView(ref, { amount: 0.3 });
  const running = !quiet && !paused && !hover && !focused && visible && inView;
  useEffect(() => {
    const update = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => {
      if (!document.querySelector("dialog[open]"))
        setIndex((i) => (i + 1) % slides.length);
    }, duration);
    return () => clearInterval(timer);
  }, [index, running]);
  const select = (next) => {
    const value = (next + slides.length) % slides.length;
    setIndex(value);
    setPaused(true);
    setAnnouncement(
      `Slide ${value + 1} of ${slides.length}: ${slides[value].label}`,
    );
  };
  const slide = slides[index];
  return (
    <div
      className={`hero-cinema ${running ? "is-playing" : ""}`}
      ref={ref}
      role="region"
      aria-roledescription="carousel"
      aria-label="M² Labs highlights"
      data-slide={index}
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") setHover(true);
      }}
      onPointerLeave={() => setHover(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
      }}
      onKeyDown={(e) => {
        if (
          e.target.closest(".cinema-controls") &&
          (e.key === "ArrowLeft" || e.key === "ArrowRight")
        ) {
          e.preventDefault();
          select(index + (e.key === "ArrowRight" ? 1 : -1));
        }
      }}
    >
      <div
        className="cinema-stage"
        onPointerDown={(e) => {
          if (e.pointerType === "touch" && !e.target.closest("button,a"))
            gesture.current = { x: e.clientX, y: e.clientY };
        }}
        onPointerCancel={() => {
          gesture.current = null;
        }}
        onPointerUp={(e) => {
          const start = gesture.current;
          gesture.current = null;
          if (!start) return;
          const dx = e.clientX - start.x,
            dy = e.clientY - start.y;
          if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.3)
            select(index + (dx < 0 ? 1 : -1));
        }}
      >
        <div className="illustrated-hero-copy">
          <motion.div
            key={index}
            initial={quiet ? false : { opacity: 0, y: 20, filter: "blur(5px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: quiet ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="hero-pill">{slide.pill}</span>
            <h1>
              {slide.title}
              <br />
              <span>{slide.accent}</span>
              <br />
              {slide.ending}
            </h1>
            <p className="cinema-description">{slide.text}</p>
          </motion.div>
          <div className="hero-buttons">
            <Action onClick={startProject}>Let’s build something</Action>
            <Action href="#work" secondary>
              View our work
            </Action>
          </div>
          <div className="hero-facts">
            <div>
              <strong>9</strong>
              <span>Connected services</span>
            </div>
            <div>
              <strong>One team.</strong>
              <span>From idea to launch</span>
            </div>
            <div>
              <strong>Built for you.</strong>
              <span>Support that stays</span>
            </div>
          </div>
        </div>
        <div className="cinema-art" aria-label={slide.label} role="img">
          <span className="cinema-orbit cinema-orbit-one" aria-hidden="true" />
          <span className="cinema-orbit cinema-orbit-two" aria-hidden="true" />
          <AnimatePresence initial={false}>
            <motion.div
              className="cinema-scene"
              key={index}
              initial={
                quiet
                  ? false
                  : {
                      opacity: 0,
                      scale: 1.12,
                      x: 35,
                      clipPath: "ellipse(35% 48% at 85% 50%)",
                    }
              }
              animate={{
                opacity: 1,
                scale: 1,
                x: 0,
                clipPath: "ellipse(90% 90% at 50% 50%)",
              }}
              exit={{ opacity: 0, scale: quiet ? 1 : 0.96 }}
              transition={{
                duration: quiet ? 0 : 1.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <ServiceScene
                className="hero-image"
                kind={slide.scene}
                decorative
              />
            </motion.div>
          </AnimatePresence>
          <motion.span
            key={`note-${index}`}
            className="hero-handnote"
            initial={quiet ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: quiet ? 0 : 0.4, duration: 0.5 }}
          >
            {slide.note.map((line) => (
              <span key={line}>
                {line}
                <br />
              </span>
            ))}
          </motion.span>
          <span className="cinema-scene-number" aria-hidden="true">
            0{index + 1} / 03
          </span>
        </div>
      </div>
      <div className="cinema-controls">
        <div className="cinema-pagination" aria-label="Choose a hero slide">
          {slides.map((item, i) => (
            <button
              type="button"
              key={item.label}
              onClick={() => select(i)}
              aria-label={`Show slide ${i + 1}: ${item.label}`}
              aria-pressed={index === i}
              className={index === i ? "is-current" : ""}
            >
              <span className="cinema-dot" aria-hidden="true" />
              <span>{item.label}</span>
              <span className="cinema-timer" aria-hidden="true">
                {i === index && (
                  <span
                    key={`${index}-${running}`}
                    style={{
                      animationDuration: `${duration}ms`,
                      animationPlayState: running ? "running" : "paused",
                    }}
                  />
                )}
              </span>
            </button>
          ))}
        </div>
        <div className="cinema-transport">
          <button
            type="button"
            aria-label="Previous hero slide"
            onClick={() => select(index - 1)}
          >
            <ArrowLeft size={18} />
          </button>
          <button
            type="button"
            aria-label="Next hero slide"
            onClick={() => select(index + 1)}
          >
            <ArrowRight size={18} />
          </button>
          {!quiet && (
            <button
              type="button"
              aria-label={paused ? "Play hero slides" : "Pause hero slides"}
              onClick={() => setPaused((p) => !p)}
            >
              {paused ? <Play size={16} /> : <Pause size={16} />}
            </button>
          )}
        </div>
      </div>
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </p>
    </div>
  );
}
