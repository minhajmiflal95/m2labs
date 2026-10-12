import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, CaretDown } from "@phosphor-icons/react";
import {
  serviceBySlug,
  serviceGroupSlugs,
  serviceGroups,
} from "../service-pages";
import { useQuietMotion } from "./UI";
export function ServiceLinks({ onNavigate }) {
  const { pathname } = useLocation();
  return (
    <div className="service-menu-groups">
      {serviceGroupSlugs.map((slugs, i) => (
        <div key={serviceGroups[i]}>
          <p>{serviceGroups[i]}</p>
          {slugs.map((slug) => (
            <Link
              key={slug}
              to={serviceBySlug[slug].path}
              onClick={onNavigate}
              aria-current={
                pathname === serviceBySlug[slug].path ? "page" : undefined
              }
            >
              {serviceBySlug[slug].title}
              <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}
export default function ServiceNavigation() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const button = useRef(null);
  const location = useLocation();
  const quiet = useQuietMotion();
  useEffect(() => setOpen(false), [location.pathname]);
  useEffect(() => {
    if (!open) return;
    const outside = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [open]);
  return (
    <div
      className="service-nav"
      ref={ref}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setOpen(false);
          button.current.focus();
        }
        if (e.key === "ArrowDown" && e.target === button.current) {
          e.preventDefault();
          setOpen(true);
          requestAnimationFrame(() =>
            ref.current.querySelector(".service-menu-groups a")?.focus(),
          );
        }
      }}
    >
      <button
        ref={button}
        aria-expanded={open}
        aria-controls="service-mega-menu"
        aria-current={
          location.pathname.startsWith("/services") ? "page" : undefined
        }
        onClick={() => setOpen(!open)}
      >
        Services <CaretDown size={12} aria-hidden="true" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            id="service-mega-menu"
            className="service-mega-menu"
            initial={{ opacity: 0, y: quiet ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: quiet ? 0 : 0.2 }}
          >
            <div className="service-menu-intro">
              <span className="eyebrow">Find your starting point</span>
              <Link to="/services" onClick={() => setOpen(false)}>
                Explore all services <ArrowUpRight size={16} />
              </Link>
            </div>
            <ServiceLinks onNavigate={() => setOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
