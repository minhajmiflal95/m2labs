// Responsive derivatives of the eight illustrations supplied in vecotrs.rar.
// The originals are transparent PNGs; WebP preserves alpha and avoids upscaling.
const scenes = [
  ["web-development", "A development team building web applications together"],
  ["web-design", "Designers creating responsive layouts across devices"],
  ["connected-systems", "IT specialists supporting secure cloud systems"],
  [
    "digital-marketing",
    "A marketing team planning social campaigns and measuring growth",
  ],
  [
    "strategy-team",
    "A team researching audiences and planning a growth strategy",
  ],
  [
    "connected-systems",
    "A team connecting Microsoft productivity and collaboration tools",
  ],
  [
    "app-development",
    "Developers connecting business workflows through applications",
  ],
  [
    "digital-team",
    "A creative team developing digital content and visual stories",
  ],
  ["collaboration", "Students and mentors collaborating on a project"],
  ["digital-team", "A creative team turning ideas into digital experiences"],
];
export default function ServiceScene({
  kind = 0,
  className = "",
  label,
  decorative = false,
  priority = false,
}) {
  const [name, description] = scenes[kind] || scenes[0];
  return (
    <img
      className={`service-scene ${className}`}
      src={`/images/illustrations/${name}-960.webp`}
      srcSet={[480, 960, 1448]
        .map((width) => `/images/illustrations/${name}-${width}.webp ${width}w`)
        .join(", ")}
      sizes={
        priority
          ? "(max-width: 560px) 90vw, (max-width: 1000px) 45vw, 650px"
          : "(max-width: 560px) 88vw, (max-width: 1000px) 45vw, 600px"
      }
      width="1448"
      height="1086"
      alt={decorative ? "" : label || description}
      aria-label={decorative ? undefined : label || description}
      aria-hidden={decorative || undefined}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
    />
  );
}
