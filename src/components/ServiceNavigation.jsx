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
  const closeTimer = useRef(null);
  const hoverOpened = useRef(false);
  const focusFrame = useRef(null);
  const cancelClose = () => clearTimeout(closeTimer.current);
  const close = () => {
    cancelClose();
    setOpen(false);
  };
  useEffect(() => {
    cancelClose();
    setOpen(false);
  }, [location.key]);
  useEffect(() => {
    if (!open) hoverOpened.current = false;
  }, [open]);
  useEffect(() => {
    const query = matchMedia("(max-width: 1100px)");
    const resize = () => {
      if (query.matches) setOpen(false);
    };
    query.addEventListener("change", resize);
    return () => {
      query.removeEventListener("change", resize);
      cancelClose();
      cancelAnimationFrame(focusFrame.current);
    };
  }, []);
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
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") {
          cancelClose();
          if (!open) hoverOpened.current = true;
          setOpen(true);
        }
      }}
      onPointerLeave={(e) => {
        if (
          e.pointerType === "mouse" &&
          !ref.current.contains(document.activeElement)
        )
          closeTimer.current = setTimeout(() => setOpen(false), 160);
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) close();
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          e.preventDefault();
          e.stopPropagation();
          close();
          button.current.focus();
        }
        if (e.key === "ArrowDown" && e.target === button.current) {
          e.preventDefault();
          setOpen(true);
          focusFrame.current = requestAnimationFrame(() =>
            ref.current?.querySelector(".service-menu-groups a")?.focus(),
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
        onClick={(e) => {
          cancelClose();
          // Confirm the initial hover opening; subsequent clicks toggle normally.
          if (e.nativeEvent.pointerType === "mouse" && hoverOpened.current)
            setOpen(true);
          else setOpen((value) => !value);
          hoverOpened.current = false;
        }}
      >
        Services <CaretDown size={12} aria-hidden="true" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            id="service-mega-menu"
            className="service-mega-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
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
