import { createContext, useContext } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react";

export const MotionPreference = createContext(false);
export function useQuietMotion() {
  const reduced = useReducedMotion();
  const paused = useContext(MotionPreference);
  return reduced || paused;
}
export function Action({
  children,
  onClick,
  href,
  secondary = false,
  className = "",
}) {
  const quiet = useQuietMotion();
  const Tag = href ? "a" : "button";
  return (
    <Tag
      href={href}
      onClick={onClick}
      onPointerMove={(event) => {
        if (quiet || event.pointerType !== "mouse") return;
        const box = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty(
          "--magnet-x",
          `${((event.clientX - box.left) / box.width - 0.5) * 6}px`,
        );
        event.currentTarget.style.setProperty(
          "--magnet-y",
          `${((event.clientY - box.top) / box.height - 0.5) * 6}px`,
        );
      }}
      onPointerLeave={(event) => {
        event.currentTarget.style.removeProperty("--magnet-x");
        event.currentTarget.style.removeProperty("--magnet-y");
      }}
      className={`button ${secondary ? "button-secondary" : ""} ${className}`}
    >
      <span>{children}</span>
      <ArrowUpRight size={18} weight="regular" />
    </Tag>
  );
}
export function Reveal({ children, className = "", delay = 0, as = "div" }) {
  const Component = motion[as];
  const quiet = useQuietMotion();
  return (
    <Component
      className={className}
      initial={quiet ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: 0.65,
        delay: quiet ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </Component>
  );
}
export function Logo() {
  return (
    <Link className="logo" to="/#home" aria-label="M squared Labs home">
      <img src="/m2-mark.svg" width="38" height="34" alt="" />
      <span>
        labs<span className="logo-period">.</span>
      </span>
    </Link>
  );
}
export function SectionLabel({ number, children }) {
  return (
    <div className="section-label">
      <span>{number}</span>
      <span>{children}</span>
    </div>
  );
}
