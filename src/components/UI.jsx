import { createContext, useContext } from "react";
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
  const Tag = href ? "a" : "button";
  return (
    <Tag
      href={href}
      onClick={onClick}
      className={`button ${secondary ? "button-secondary" : ""} ${className}`}
    >
      <span>{children}</span>
      <ArrowUpRight size={18} weight="regular" />
    </Tag>
  );
}
export function Reveal({ children, className = "", delay = 0 }) {
  const quiet = useQuietMotion();
  return (
    <motion.div
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
    </motion.div>
  );
}
export function Logo() {
  return (
    <a className="logo" href="#home" aria-label="M squared Labs home">
      <img src="/m2-mark.svg" width="38" height="34" alt="" />
      <span>
        labs<span className="logo-period">.</span>
      </span>
    </a>
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
