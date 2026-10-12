import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLocation, useNavigationType } from "react-router-dom";
import { useQuietMotion } from "./UI";

// Never transform the route parent: the homepage's ScrollTrigger pin needs a normal containing block.
export default function PageTransition({ children }) {
  useEffect(() => {
    const previous = history.scrollRestoration;
    history.scrollRestoration = "manual";
    return () => {
      history.scrollRestoration = previous;
    };
  }, []);
  const location = useLocation();
  const type = useNavigationType();
  const quiet = useQuietMotion();
  const quietAtNavigation = useRef(quiet);
  quietAtNavigation.current = quiet;
  const positions = useRef(new Map());
  useEffect(() => {
    const save = () => positions.current.set(location.key, scrollY);
    window.addEventListener("scroll", save, { passive: true });
    return () => window.removeEventListener("scroll", save);
  }, [location.key]);
  useEffect(() => {
    const header = document.querySelector(".header");
    if (!header) return;
    const update = () =>
      document.documentElement.style.setProperty(
        "--site-header-height",
        `${header.getBoundingClientRect().height}px`,
      );
    const observer = new ResizeObserver(update);
    observer.observe(header);
    update();
    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty("--site-header-height");
    };
  }, []);
  useEffect(() => {
    const hasSavedPosition = positions.current.has(location.key);
    const savedPosition = positions.current.get(location.key) || 0;
    let ready = false;
    let hash;
    try {
      hash = decodeURIComponent(location.hash.slice(1));
    } catch {
      hash = location.hash.slice(1);
    }
    const restore = () => {
      const route = document.querySelector(".route-content");
      // Lazy routes and the outgoing animation must finish before restoring scroll.
      if (
        !ready ||
        route?.dataset.routePath !== location.pathname ||
        !route.querySelector("h1")
      )
        return;
      const target = hash && document.getElementById(hash);
      if (hash && !target) return;
      observer.disconnect();
      clearTimeout(expiry);
      if (target && !(type === "POP" && hasSavedPosition))
        target.scrollIntoView({ behavior: "instant" });
      else {
        window.scrollTo({
          top: type === "POP" ? savedPosition : 0,
          behavior: "instant",
        });
        if (type !== "POP")
          route.querySelector("h1")?.focus({ preventScroll: true });
      }
    };
    const observer = new MutationObserver(restore);
    observer.observe(document.getElementById("main"), {
      childList: true,
      subtree: true,
    });
    const expiry = setTimeout(() => observer.disconnect(), 10000);
    const timeout = setTimeout(
      () => {
        ready = true;
        restore();
      },
      quietAtNavigation.current ? 0 : 220,
    );
    // A user's new scroll gesture takes precedence over a pending restoration.
    const cancel = () => {
      observer.disconnect();
      clearTimeout(timeout);
      clearTimeout(expiry);
    };
    window.addEventListener("wheel", cancel, { passive: true, once: true });
    window.addEventListener("touchstart", cancel, {
      passive: true,
      once: true,
    });
    return () => {
      cancel();
      window.removeEventListener("wheel", cancel);
      window.removeEventListener("touchstart", cancel);
    };
    // Motion preference changes must not replay route scroll restoration.
  }, [location.key, location.hash, location.pathname, type]);
  return (
    <AnimatePresence initial={false} mode="wait">
      <motion.div
        className="route-content"
        data-route-path={location.pathname}
        key={location.pathname}
        initial={{ opacity: quiet ? 1 : 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: quiet ? 1 : 0 }}
        transition={{ duration: quiet ? 0 : 0.18 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
