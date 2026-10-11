import { useLayoutEffect, useRef, useState } from "react";
import { useQuietMotion } from "./UI.jsx";

const scenes = [
  {
    name: "Spark",
    title: "Every big idea starts with a spark.",
    text: "One question. One possibility. A new direction waiting to happen.",
  },
  {
    name: "Imagination",
    title: "Imagination becomes possibility.",
    text: "We connect curiosity with strategy, giving your idea room to become something extraordinary.",
  },
  {
    name: "Creation",
    title: "We turn ideas into digital experiences.",
    text: "Purposeful websites. Powerful applications. Connected systems. Built around the people who use them.",
  },
  {
    name: "Reveal",
    title: "Your vision. Our universe.",
    text: "Design, technology and ongoing support — brought together by M² Labs.",
  },
];

function Energy({ ribbon = false }) {
  return (
    <svg
      className={`odyssey-energy ${ribbon ? "is-ribbon" : ""}`}
      viewBox="0 0 1000 600"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={ribbon ? "ribbon-spectrum" : "spark-spectrum"}>
          <stop stopColor="#a58aff" />
          <stop offset=".35" stopColor="#57e5ff" />
          <stop offset=".65" stopColor="#ff8cb1" />
          <stop offset="1" stopColor="#ffc674" />
        </linearGradient>
      </defs>
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          className="energy-path"
          d={
            ribbon
              ? `M-100 ${390 + i * 15} C160 -160 310 760 510 260 S780 40 1100 300`
              : `M180 ${300 + i * 12} C300 80 700 80 820 300 C700 520 300 520 180 ${300 + i * 12}`
          }
          fill="none"
          stroke={`url(#${ribbon ? "ribbon-spectrum" : "spark-spectrum"})`}
          strokeWidth={ribbon ? 18 - i * 5 : 1.5}
        />
      ))}
    </svg>
  );
}
function Interfaces() {
  return (
    <div className="odyssey-interfaces" aria-hidden="true">
      <svg className="odyssey-connections" viewBox="0 0 800 500">
        <path d="M100 100 Q400 20 640 150 M100 100 Q200 440 400 330 M640 150 Q700 420 400 330" />
      </svg>
      <div className="interface-panel interface-web">
        <div className="interface-bar">
          <i />
          <i />
          <i />
          <span>WEB EXPERIENCE</span>
        </div>
        <div className="interface-web-body">
          <span>
            Ideas,
            <br />
            amplified.
          </span>
          <div className="interface-orb" />
          <b>Explore the possibilities</b>
        </div>
      </div>
      <div className="interface-panel interface-app">
        <div className="interface-bar">
          <i />
          <i />
          <i />
          <span>SOFTWARE / ERP</span>
        </div>
        <div className="interface-dashboard">
          <div className="interface-sidebar" />
          <div>
            <small>Connected workspace</small>
            <div className="interface-metrics">
              <i />
              <i />
              <i />
            </div>
            <div className="interface-chart">
              {[35, 60, 45, 80, 65, 95].map((h, i) => (
                <span key={i} style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="interface-node node-cloud">
        Cloud + Microsoft 365<span>Connected. Wherever you work.</span>
      </div>
      <div className="interface-node node-growth">
        SEO + digital marketing<span>Reach the right people.</span>
      </div>
    </div>
  );
}
export default function ScrollStory() {
  const track = useRef(null);
  const quiet = useQuietMotion();
  const [fallback, setFallback] = useState(false);
  const staticMode = quiet || fallback;
  useLayoutEffect(() => {
    if (staticMode) return;
    let cancelled = false,
      context,
      media;
    const root = track.current;
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")])
      .then(([animation, plugin]) => {
        if (cancelled) return;
        const gsap = animation.gsap;
        const { ScrollTrigger } = plugin;
        gsap.registerPlugin(ScrollTrigger);
        context = gsap.context(() => {
          media = gsap.matchMedia();
          media.add(
            { desktop: "(min-width: 801px)", mobile: "(max-width: 800px)" },
            ({ conditions }) => {
              const frames = gsap.utils.toArray(".odyssey-scene", root);
              gsap.set(frames, { autoAlpha: 0 });
              gsap.set(frames[0], { autoAlpha: 1 });
              const timeline = gsap.timeline({
                scrollTrigger: {
                  id: "m2-cinematic-story",
                  trigger: root,
                  start: "top 64px",
                  end: conditions.desktop ? "+=260%" : "bottom bottom",
                  pin: conditions.desktop,
                  scrub: 0.45,
                  invalidateOnRefresh: true,
                  onRefresh: (self) => {
                    root.dataset.scrollStart = self.start;
                    root.dataset.scrollEnd = self.end;
                    root.dataset.scrollPinned = String(Boolean(self.pin));
                  },
                  onUpdate: (self) => {
                    root.dataset.storyProgress = self.progress.toFixed(3);
                  },
                },
                onUpdate: function () {
                  root.dataset.storyPhase = Math.min(
                    3,
                    Math.floor(this.progress() * 4),
                  );
                },
              });
              frames.forEach((frame, i) => {
                const camera = frame.querySelector(".odyssey-camera");
                const words = frame.querySelectorAll(".odyssey-word");
                if (i) {
                  timeline.to(
                    frames[i - 1],
                    { autoAlpha: 0, duration: 0.24 },
                    i - 0.18,
                  );
                  timeline.to(
                    frame,
                    { autoAlpha: 1, duration: 0.32 },
                    i - 0.18,
                  );
                }
                timeline.fromTo(
                  camera,
                  {
                    scale: i === 3 ? 1.3 : 0.82,
                    rotationY: -12,
                    rotationX: 8,
                    xPercent: -3,
                  },
                  {
                    scale: i === 3 ? 0.95 : 1.1,
                    rotationY: 9,
                    rotationX: -4,
                    xPercent: 3,
                    duration: 1.15,
                    ease: "none",
                  },
                  i,
                );
                timeline.fromTo(
                  words,
                  { yPercent: 105, opacity: 0 },
                  { yPercent: 0, opacity: 1, stagger: 0.025, duration: 0.22 },
                  i + 0.05,
                );
              });
              timeline.fromTo(
                ".spark-core",
                { scale: 0.4 },
                { scale: 1.5, duration: 1, ease: "power2.inOut" },
                0,
              );
              timeline.fromTo(
                ".energy-path",
                { strokeDasharray: 1800, strokeDashoffset: 1800 },
                { strokeDashoffset: 0, duration: 2, ease: "none" },
                0.25,
              );
              timeline.to(
                ".odyssey-return",
                { opacity: 1, duration: 0.65 },
                2.95,
              );
              timeline.to({}, { duration: 0.25 }, 3.75);
              root.dataset.scrollTrigger = "attached";
              document.fonts?.ready.then(() => {
                if (!cancelled) ScrollTrigger.refresh();
              });
              return () => {
                delete root.dataset.scrollTrigger;
              };
            },
          );
        }, root);
      })
      .catch(() => {
        if (!cancelled) setFallback(true);
      });
    return () => {
      cancelled = true;
      media?.revert();
      context?.revert();
    };
  }, [staticMode]);
  function moveCamera(event) {
    if (staticMode || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--cursor-x",
      `${((event.clientX - bounds.left) / bounds.width - 0.5) * 5}deg`,
    );
    event.currentTarget.style.setProperty(
      "--cursor-y",
      `${((event.clientY - bounds.top) / bounds.height - 0.5) * -4}deg`,
    );
  }
  return (
    <section
      id="approach"
      className={`cinematic-story ${staticMode ? "odyssey-static" : ""}`}
      aria-label="From spark to digital experience"
    >
      <div
        ref={track}
        className="story-track odyssey-track"
        data-story-phase="0"
        data-story-version="cinematic-v1"
      >
        <div
          className="story-stage odyssey-stage"
          onPointerMove={moveCamera}
          onPointerLeave={(event) => {
            event.currentTarget.style.setProperty("--cursor-x", "0deg");
            event.currentTarget.style.setProperty("--cursor-y", "0deg");
          }}
        >
          <div className="odyssey-return" aria-hidden="true" />
          <div className="odyssey-topline">
            <span>M² LABS / A DIGITAL ODYSSEY</span>
            <span>IDEA → IMPACT</span>
          </div>
          {scenes.map((scene, i) => (
            <article
              className={`odyssey-scene odyssey-scene-${i}`}
              key={scene.name}
              aria-label={scene.name}
            >
              <div className="odyssey-parallax">
                <div className="odyssey-camera">
                  {i === 0 && (
                    <div className="spark-world" aria-hidden="true">
                      <div className="spark-core" />
                      <div className="spark-wave wave-one" />
                      <div className="spark-wave wave-two" />
                      <Energy />
                      {Array.from({ length: 16 }, (_, n) => (
                        <i
                          className="spark-particle"
                          key={n}
                          style={{
                            "--particle-angle": `${n * 22.5}deg`,
                            "--particle-radius": `${90 + (n % 4) * 35}px`,
                            "--particle-color": [
                              "#78ecff",
                              "#b99aff",
                              "#ffbb80",
                            ][n % 3],
                          }}
                        />
                      ))}
                    </div>
                  )}
                  {i === 1 && (
                    <div className="ribbon-world">
                      <Energy ribbon />
                      <div className="glass-shard shard-one" />
                      <div className="glass-shard shard-two" />
                    </div>
                  )}
                  {i === 2 && <Interfaces />}
                  {i === 3 && (
                    <div className="odyssey-brand">
                      <div className="brand-halo" />
                      <img src="/m2-mark.svg" alt="" width="160" height="160" />
                      <span>M² Labs</span>
                      <small>IDEAS. TECHNOLOGY. REAL IMPACT.</small>
                    </div>
                  )}
                </div>
              </div>
              <div className="odyssey-copy">
                <span className="odyssey-chapter">
                  0{i + 1} / {scene.name}
                </span>
                <h2 aria-label={scene.title}>
                  {scene.title.split(" ").map((word, n) => (
                    <span className="odyssey-word-mask" key={n}>
                      <span className="odyssey-word" aria-hidden="true">
                        {word}&nbsp;
                      </span>
                    </span>
                  ))}
                </h2>
                <p>{scene.text}</p>
                {i === 3 && (
                  <a className="odyssey-cta" href="#contact">
                    Let’s Build Something Extraordinary{" "}
                    <span aria-hidden="true">→</span>
                  </a>
                )}
              </div>
            </article>
          ))}
          <div className="odyssey-bottomline" aria-hidden="true">
            <span>SCROLL TO SHAPE THE STORY</span>
            <div className="odyssey-scene-markers">
              {scenes.map((scene, i) => (
                <span key={scene.name}>
                  {`0${i + 1}`} {scene.name}
                </span>
              ))}
            </div>
            <span>↓</span>
          </div>
        </div>
      </div>
    </section>
  );
}
