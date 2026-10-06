import { useEffect, useRef, useState } from "react";
import Modal from "./Modal.jsx";
import { useQuietMotion } from "./UI.jsx";

export function BrandCube() {
  const quiet = useQuietMotion();
  const ref = useRef(null);
  const move = (event) => {
    if (quiet || event.pointerType === "touch") return;
    const box = event.currentTarget.getBoundingClientRect();
    ref.current?.style.setProperty(
      "--cube-x",
      `${-18 - ((event.clientY - box.top) / box.height) * 20}deg`,
    );
    ref.current?.style.setProperty(
      "--cube-y",
      `${-28 + ((event.clientX - box.left) / box.width) * 60}deg`,
    );
  };
  const reset = () => {
    ref.current?.style.removeProperty("--cube-x");
    ref.current?.style.removeProperty("--cube-y");
  };
  return (
    <span
      className="cube-perspective"
      onPointerMove={move}
      onPointerLeave={reset}
      ref={ref}
      aria-hidden="true"
    >
      <span className="cube-object">
        {["front", "back", "left", "right", "top", "bottom"].map((face) => (
          <span key={face} className={`cube-face cube-${face}`}>
            {["front", "right", "left"].includes(face) && (
              <img src="/m2-mark.svg" width="48" height="48" alt="" />
            )}
          </span>
        ))}
      </span>
    </span>
  );
}
export function WelcomeSplash() {
  const quiet = useQuietMotion();
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
  const close = () => {
    setOpen(false);
    try {
      sessionStorage.setItem("m2-welcomed", "1");
    } catch {
      /* Optional visit memory. */
    }
  };
  useEffect(() => {
    if (!open) return;
    const timeout = setTimeout(close, 1200);
    return () => clearTimeout(timeout);
  }, [open]);
  if (!open || quiet) return null;
  return (
    <Modal
      title="Welcome to M² Labs"
      onClose={close}
      className="welcome-splash"
    >
      <BrandCube />
      <p>Ideas taking shape.</p>
      <button className="text-link" onClick={close}>
        Skip intro
      </button>
    </Modal>
  );
}
