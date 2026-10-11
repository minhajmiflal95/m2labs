import { ArrowRight } from "lucide-react";
import GlyphPortal from "@/components/ui/glyph-portal";
import { useQuietMotion } from "./UI.jsx";

export default function LabsPortal() {
  const quiet = useQuietMotion();
  return (
    <GlyphPortal
      word="CREATE"
      className="labs-portal"
      reducedMotion={Boolean(quiet)}
      scrollLength={1.6}
      enterLabel="Explore what we can build"
      fontFamily='"Arial Black", Arial, sans-serif'
      style={{
        "--gp-paper": "var(--paper)",
        "--gp-ink": "var(--ink)",
        "--gp-field": "#102b50",
        "--gp-foreground": "#f4f8ff",
      }}
      front={
        <>
          <span className="portal-eyebrow">
            M² LABS / A DIFFERENT PERSPECTIVE
          </span>
          <p className="portal-support">A good idea is just the beginning.</p>
        </>
      }
      background={<div className="portal-world" />}
    >
      <div className="portal-story">
        <span className="eyebrow">Ideas become experiences</span>
        <h2>Step into what’s possible.</h2>
        <p>
          Bring us the challenge. Together, we’ll shape the right experience,
          connect the right tools and build something your people can use.
        </p>
        <div className="portal-pillars">
          {[
            [
              "01",
              "Design with purpose",
              "Clear journeys, thoughtful interfaces and a voice that feels like you.",
            ],
            [
              "02",
              "Build with care",
              "Dependable websites and applications, shaped around real needs.",
            ],
            [
              "03",
              "Keep moving",
              "Connected systems and practical support for your next chapter.",
            ],
          ].map(([number, title, text]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <a className="portal-next" href="#service-experience">
          Find your starting point <ArrowRight size={17} aria-hidden="true" />
        </a>
      </div>
    </GlyphPortal>
  );
}
