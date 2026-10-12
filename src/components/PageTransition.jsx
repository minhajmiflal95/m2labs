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
  const positions = useRef(new Map());
  useEffect(() => {
    const save = () => positions.current.set(location.key, scrollY);
    window.addEventListener("scroll", save, { passive: true });
    return () => window.removeEventListener("scroll", save);
  }, [location.key]);
  useEffect(() => {
    const savedPosition = positions.current.get(location.key) || 0;
    const timeout = setTimeout(
      () => {
        if (location.hash) {
          document
            .getElementById(decodeURIComponent(location.hash.slice(1)))
            ?.scrollIntoView({ behavior: "instant" });
          return;
        }
        window.scrollTo({
          top: type === "POP" ? savedPosition : 0,
          behavior: "instant",
        });
        if (type !== "POP")
          document.querySelector("#main h1")?.focus({ preventScroll: true });
      },
      quiet ? 0 : 220,
    );
    return () => clearTimeout(timeout);
  }, [location.key, location.hash, type, quiet]);
  return (
    <AnimatePresence initial={false} mode="wait">
      <motion.div
        className="route-content"
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
