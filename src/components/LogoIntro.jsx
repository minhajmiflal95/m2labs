import { useCallback, useEffect, useRef, useState } from "react";
import Modal from "./Modal.jsx";
import { useQuietMotion } from "./UI.jsx";

const tagline = "Ideas. Technology. Real Impact.";

export default function LogoIntro() {
  const quiet = useQuietMotion();
  const stage = useRef(null);
  const logo = useRef(null);
  const [open, setOpen] = useState(() => {
    try {
      return (
        !matchMedia("(prefers-reduced-motion: reduce)").matches &&
        !sessionStorage.getItem("m2-welcomed")
      );
    } catch {
      return false;
    }
  });
  const close = useCallback(() => {
    try {
      sessionStorage.setItem("m2-welcomed", "1");
    } catch {
      /* Optional session memory. */
    }
    setOpen(false);
  }, []);
  useEffect(() => {
    if (quiet && open) close();
  }, [quiet, open, close]);
  useEffect(() => {
    if (!open || quiet) return;
    let cancelled = false,
      context;
    let resolvePage;
    const pageReady = new Promise((resolve) => {
      resolvePage = resolve;
      if (document.readyState === "complete") resolve();
      else window.addEventListener("load", resolve, { once: true });
    });
    const imageReady = logo.current.decode();
    Promise.all([imageReady, document.fonts.ready, pageReady, import("gsap")])
      .then(([, , , { gsap }]) => {
        if (cancelled) return;
        const root = stage.current;
        root.dataset.introState = "playing";
        try {
          sessionStorage.setItem("m2-welcomed", "1");
        } catch {
          /* Optional session memory. */
        }
        context = gsap.context(() => {
          const timeline = gsap.timeline({ onComplete: close });
          const phase = (name) => {
            root.dataset.introPhase = name;
          };
          timeline.call(() => phase("first-light"), [], 0);
          timeline.fromTo(
            ".ident-beam",
            { xPercent: -150, opacity: 0 },
            { xPercent: 160, opacity: 1, duration: 0.6, ease: "power2.inOut" },
            0,
          );
          timeline.to(".ident-rim", { opacity: 0.65, duration: 0.38 }, 0.15);
          timeline.fromTo(
            ".ident-camera",
            { scale: 0.88, rotationY: -5, rotationX: 2 },
            {
              scale: 1,
              rotationY: 3,
              rotationX: -1,
              duration: 1.4,
              ease: "power2.inOut",
            },
            0,
          );
          timeline.call(() => phase("sculpted-identity"), [], 0.6);
          timeline.to(
            ".ident-atmosphere",
            { opacity: 0.55, duration: 0.7 },
            0.6,
          );
          timeline.to(".ident-metal", { opacity: 0.75, duration: 0.6 }, 0.6);
          timeline.fromTo(
            ".ident-reflection",
            { xPercent: -100 },
            { xPercent: 100, duration: 0.8, ease: "sine.inOut" },
            0.6,
          );
          timeline.to(".ident-original", { opacity: 1, duration: 0.55 }, 0.85);
          timeline.to(".ident-metal", { opacity: 0.12, duration: 0.3 }, 1.1);
          timeline.to(".ident-rim", { opacity: 0.18, duration: 0.3 }, 1.1);
          timeline.call(() => phase("signature-impact"), [], 1.4);
          timeline.fromTo(
            ".ident-specular",
            { xPercent: -120, opacity: 0 },
            {
              xPercent: 130,
              opacity: 0.7,
              duration: 0.38,
              ease: "power2.inOut",
            },
            1.4,
          );
          timeline.to(".ident-specular", { opacity: 0, duration: 0.18 }, 1.72);
          timeline.to(
            ".ident-camera",
            {
              filter: "brightness(1.2)",
              duration: 0.08,
              repeat: 1,
              yoyo: true,
            },
            1.6,
          );
          timeline.fromTo(
            ".ident-character",
            { y: 0, yPercent: 110, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              stagger: 0.008,
              duration: 0.15,
              ease: "power2.out",
            },
            1.55,
          );
          timeline.call(() => phase("portal-transition"), [], 2.1);
          timeline.to(
            ".ident-camera",
            {
              scale: 1.32,
              rotationY: 0,
              rotationX: 0,
              filter: "brightness(3) saturate(0)",
              duration: 0.55,
              ease: "power3.in",
            },
            2.1,
          );
          timeline.to(".ident-tagline", { opacity: 0, duration: 0.2 }, 2.15);
          timeline.to(".ident-silhouette", { opacity: 1, duration: 0.2 }, 2.3);
          timeline.to(
            ".ident-curtain",
            { "--portal-radius": "150%", duration: 0.4, ease: "power3.in" },
            2.4,
          );
          timeline.to(".ident-skip", { opacity: 0, duration: 0.15 }, 2.65);
          timeline.to({}, { duration: 0.15 }, 2.65);
        }, root);
      })
      .catch(() => {
        if (!cancelled) close();
      });
    return () => {
      cancelled = true;
      window.removeEventListener("load", resolvePage);
      context?.revert();
    };
  }, [open, quiet, close]);
  if (!open || quiet) return null;
  return (
    <Modal title="Welcome to M² Labs" onClose={close} className="logo-intro">
      <div
        className="ident-stage"
        ref={stage}
        data-intro-state="waiting"
        data-intro-phase="first-light"
        data-intro-duration="2.8"
      >
        <div className="ident-curtain" aria-hidden="true">
          <div className="ident-atmosphere" />
          <div className="ident-composition">
            <div className="ident-camera">
              <div className="ident-logo">
                <div className="ident-rim ident-logo-mask" />
                <div className="ident-metal ident-logo-mask" />
                <img
                  className="ident-original"
                  ref={logo}
                  src="/m2-mark.svg"
                  alt=""
                  width="400"
                  height="310"
                  fetchPriority="high"
                />
                <div className="ident-light-mask ident-logo-mask">
                  <div className="ident-beam" />
                  <div className="ident-reflection" />
                  <div className="ident-specular" />
                </div>
                <div className="ident-silhouette ident-logo-mask" />
              </div>
            </div>
            <p className="ident-tagline" aria-label={tagline}>
              {[...tagline].map((letter, i) => (
                <span className="ident-character-mask" key={i}>
                  <span className="ident-character" aria-hidden="true">
                    {letter === " " ? "\u00a0" : letter}
                  </span>
                </span>
              ))}
            </p>
          </div>
        </div>
        <button className="ident-skip" onClick={close}>
          Skip intro
        </button>
        <span className="sr-only">
          M² Labs brand introduction. The homepage is loading underneath.
        </span>
      </div>
    </Modal>
  );
}
