import { useId, useState } from "react";
import { useQuietMotion } from "./UI";
import { technologyCatalog, technologyAsset } from "../service-technologies";

const layouts = {
  design: {
    label: "Floating Design Studio",
    nodes: [
      ["figma", "Design system", 12, 14],
      ["react", "Browser preview", 60, 20],
      ["wordpress", "Publishing", 76, 76],
    ],
    paths: [
      "M145 90 C245 65 245 110 335 120",
      "M335 120 C425 160 340 300 420 340",
    ],
  },
  software: {
    label: "Living Software Architecture",
    nodes: [
      ["react", "Frontend", 10, 20],
      ["nodejs", "Node.js API", 40, 12],
      ["java", "Java services", 40, 56],
      ["mongodb", "Documents", 77, 18],
      ["mysql", "Relations", 77, 67],
      ["android", "Android", 10, 72],
    ],
    paths: [
      "M130 130 H265 L400 115",
      "M130 130 L265 265 H400",
      "M130 330 L265 265",
      "M265 100 V265",
      "M400 115 V300",
    ],
  },
  growth: {
    label: "Growth Intelligence",
    nodes: [
      ["meta", "Campaign creative", 12, 17],
      ["ahrefs", "Search research", 67, 14],
      ["analytics", "Conversion events", 67, 72],
    ],
    paths: [
      "M150 115 Q275 50 400 100",
      "M150 115 Q145 320 385 335",
      "M400 100 V330",
    ],
  },
  cloud: {
    label: "Connected Cloud Universe",
    nodes: [
      ["azure", "Infrastructure", 13, 16],
      ["gcloud", "Cloud network", 73, 16],
      ["microsoft365", "Collaboration", 43, 71],
    ],
    paths: [
      "M145 115 Q270 160 270 210",
      "M405 115 Q300 150 270 210",
      "M270 210 V330",
      "M270 210 L95 280",
      "M270 210 L450 280",
    ],
  },
  research: {
    label: "Research Innovation Lab",
    nodes: [
      ["python", "Training workflow", 12, 14],
      ["react", "Web prototype", 70, 20],
      ["github", "Code review", 66, 76],
    ],
    paths: [
      "M135 90 C230 90 200 200 290 200",
      "M290 200 L395 130",
      "M290 200 L380 340",
    ],
  },
  operations: {
    label: "Digital Operations Center",
    nodes: [
      ["windows", "Endpoints", 12, 18],
      ["microsoft365", "Access & email", 73, 22],
      ["jenkins", "CI/CD diagnostics", 73, 74],
    ],
    paths: [
      "M145 110 L270 220 L410 130",
      "M270 220 L410 335",
      "M270 220 L110 335",
    ],
  },
  enterprise: {
    label: "Connected Enterprise Ecosystem",
    nodes: [
      ["salesforce", "CRM", 9, 13],
      ["sap", "Operations", 72, 12],
      ["zoho", "Customer workflows", 5, 48],
      ["netsuite", "Finance", 78, 48],
      ["odoo", "Business modules", 17, 79],
      ["dynamics365", "Sales & service", 65, 79],
    ],
    paths: [
      "M135 95 L280 210 L410 90",
      "M110 225 H445",
      "M170 355 L280 210 L395 355",
    ],
  },
};
function BrowserPreview() {
  return (
    <div className="env-browser">
      <div className="env-window-bar">
        <i />
        <i />
        <i />
        <span>responsive / preview</span>
      </div>
      <div className="env-browser-grid">
        <div className="env-wireframe-nav" />
        <div className="env-wireframe-title" />
        <div className="env-wireframe-lines" />
        <div className="env-wireframe-cards">
          <i />
          <i />
          <i />
        </div>
      </div>
      <span className="env-cursor" aria-hidden="true">
        ↗
      </span>
    </div>
  );
}
function Graphic({ kind, id }) {
  if (kind === "design")
    return (
      <>
        <BrowserPreview />
        <div className="env-phone">
          <i />
          <div />
          <span>
            Mobile
            <br />
            first.
          </span>
        </div>
        <div className="env-label env-label-bottom">
          UI/UX → Layout → Develop
        </div>
      </>
    );
  if (kind === "software")
    return (
      <>
        <div className="env-code">
          <span>APPLICATION / API</span>
          <code>
            <b>request</b> → validate
            <br />
            <b>service</b> → business rules
            <br />
            <b>data</b> → response
          </code>
        </div>
        <div className="env-label env-label-bottom">
          Frontend · Backend · Database
        </div>
      </>
    );
  if (kind === "growth")
    return (
      <>
        <div className="env-campaign">
          <span>CREATIVE DIRECTION</span>
          <strong>
            Make the
            <br />
            message matter.
          </strong>
          <div className="env-moodboard">
            <i />
            <i />
            <i />
          </div>
        </div>
        <div className="env-chart">
          <span>ILLUSTRATIVE FUNNEL</span>
          <div>
            {[30, 46, 39, 67, 61, 85].map((height, i) => (
              <i key={i} style={{ "--bar-height": `${height}%` }} />
            ))}
          </div>
          <small>Discover → Engage → Convert</small>
        </div>
      </>
    );
  if (kind === "cloud")
    return (
      <>
        <div className="env-cloud">
          <svg viewBox="0 0 180 100" aria-hidden="true">
            <path d="M40 83C0 80 10 34 43 34C55-7 123-4 138 39C180 32 190 83 153 83Z" />
          </svg>
          <span>
            Connected
            <br />
            cloud
          </span>
        </div>
        <div className="env-server server-left">
          Hosting
          <i />
          <i />
          <i />
        </div>
        <div className="env-server server-right">
          Storage
          <i />
          <i />
          <i />
        </div>
        <div className="env-label env-label-bottom">
          Domains / DNS / Backup / Access
        </div>
      </>
    );
  if (kind === "research")
    return (
      <>
        <svg
          className="env-neural"
          role="img"
          viewBox="0 0 180 150"
          aria-label="Illustrative neural network"
        >
          <g>
            {[35, 75, 115].flatMap((y, i) =>
              [25, 75, 125].map((other, j) => (
                <path key={`${i}-${j}`} d={`M20 ${y} L90 ${other} L160 ${y}`} />
              )),
            )}
          </g>
          {[20, 90, 160].flatMap((x, i) =>
            [35, 75, 115].map((y, j) => (
              <circle key={`${i}-${j}`} cx={x} cy={y} r={7} />
            )),
          )}
        </svg>
        <div className="env-research-doc">
          <span>RESEARCH NOTES</span>
          <i />
          <i />
          <i />
          <small>Question → Method → Evidence</small>
        </div>
        <div className="env-dataset">
          <span>Dataset</span>
          <i />
          <i />
          <i />
          <i />
          <small>Train / Validate / Evaluate</small>
        </div>
      </>
    );
  if (kind === "operations")
    return (
      <>
        <div className="env-ticket">
          <span>ILLUSTRATIVE HELP DESK</span>
          <strong>Investigate the cause.</strong>
          <div>
            <i />
            Triage <i />
            Diagnose <i />
            Resolve
          </div>
        </div>
        <div className="env-endpoints">
          {["DNS", "DHCP", "VPN", "Wi-Fi"].map((label) => (
            <span key={label}>
              <i />
              {label}
            </span>
          ))}
        </div>
        <div className="env-label env-label-bottom">
          Patch checks / Endpoint protection
        </div>
      </>
    );
  return (
    <>
      <div className="env-integration-hub">
        <svg viewBox="0 0 80 80" aria-hidden="true">
          <path d="M15 25h50v30H15z M25 15v50 M55 15v50" />
        </svg>
        <span>
          Integration
          <br />
          hub
        </span>
        <small>Inventory · Sales · Finance</small>
      </div>
    </>
  );
}
export default function ServiceEnvironment({ service }) {
  const id = useId().replace(/[^a-z0-9_-]/gi, "");
  const [active, setActive] = useState(null);
  const quiet = useQuietMotion();
  const config = layouts[service.environment];
  if (!config) return null;
  const selected = active === null ? null : config.nodes[active];
  const move = (e) => {
    if (quiet || e.pointerType !== "mouse") return;
    const bounds = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty(
      "--env-x",
      `${((e.clientX - bounds.left) / bounds.width - 0.5) * 7}deg`,
    );
    e.currentTarget.style.setProperty(
      "--env-y",
      `${((e.clientY - bounds.top) / bounds.height - 0.5) * -5}deg`,
    );
  };
  return (
    <div
      className={`service-environment environment-${service.environment} ${quiet ? "environment-quiet" : ""}`}
      data-environment={service.environment}
      onPointerMove={move}
      onPointerLeave={(e) => {
        e.currentTarget.style.setProperty("--env-x", "0deg");
        e.currentTarget.style.setProperty("--env-y", "0deg");
      }}
    >
      <div className="env-topline">
        <span>{config.label}</span>
        <span>
          Concept / 0
          {[
            "design",
            "software",
            "growth",
            "cloud",
            "research",
            "operations",
            "enterprise",
          ].indexOf(service.environment) + 1}
        </span>
      </div>
      <div className="env-world">
        <svg className="env-network" viewBox="0 0 560 440" aria-hidden="true">
          <defs>
            <linearGradient id={`env-line-${id}`}>
              <stop stopColor="var(--env-line)" />
              <stop offset="1" stopColor="var(--env-accent)" />
            </linearGradient>
          </defs>
          {config.paths.map((d, i) => (
            <g key={d}>
              <path
                d={d}
                stroke={`url(#env-line-${id})`}
                className="env-connection"
              />
              <path
                d={d}
                className="env-packet"
                style={{ animationDelay: `${i * -0.8}s` }}
              />
            </g>
          ))}
        </svg>
        <Graphic kind={service.environment} id={id} />
        {config.nodes.map(([key, label, x, y], i) => (
          <button
            key={key}
            className={`env-node ${active === i ? "is-selected" : ""}`}
            style={{ left: `${x}%`, top: `${y}%` }}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
            aria-pressed={active === i}
            aria-describedby={`env-description-${id}`}
          >
            <img src={technologyAsset(key)} alt="" width="24" height="24" />
            <span>{label}</span>
          </button>
        ))}
      </div>
      <div
        className="env-description"
        id={`env-description-${id}`}
        aria-live="polite"
      >
        {selected
          ? `${technologyCatalog[selected[0]].name}: ${technologyCatalog[selected[0]].description}`
          : "Explore the architecture: hover, focus or tap a platform."}
      </div>
    </div>
  );
}
