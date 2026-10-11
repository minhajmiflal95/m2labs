import { useRef } from "react";
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
