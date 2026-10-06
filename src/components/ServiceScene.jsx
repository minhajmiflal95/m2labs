import { useId } from "react";

// Original, resolution-independent editorial illustrations. Each scene uses
// its own composition, props, palette and people; IDs stay unique across instances.
export default function ServiceScene({
  kind = 0,
  className = "",
  label,
  decorative = false,
}) {
  const id = useId().replace(/:/g, "");
  const g = (name) => `url(#${id}-${name})`;
  const color = [
    "#078bff",
    "#7758ef",
    "#0879e6",
    "#ed599b",
    "#1084f7",
    "#2676e5",
    "#6955e7",
    "#16a5b1",
    "#4e67d5",
  ][kind % 9];
  const screen = (x, y, w, h, type = "code") => (
    <g transform={`translate(${x} ${y})`}>
      <rect
        x="5"
        y="8"
        width={w}
        height={h}
        rx="13"
        fill="#c7dfff"
        opacity=".6"
      />
      <rect
        width={w}
        height={h}
        rx="13"
        fill={type === "code" ? g("screen") : "#fff"}
        stroke="#a5ceff"
        strokeWidth="2"
      />
      <path
        d={`M13 0H${w - 13}Q${w} 0 ${w} 13V24H0V13Q0 0 13 0`}
        fill={color}
      />
      {[12, 22, 32].map((cx) => (
        <circle key={cx} cx={cx} cy="12" r="2.4" fill="white" opacity=".8" />
      ))}
      {type === "code" ? (
        Array.from({ length: 6 }, (_, i) => (
          <g key={i}>
            <rect
              x="14"
              y={37 + i * 13}
              width="4"
              height="4"
              rx="2"
              fill="#5cdfff"
            />
            <rect
              x={26 + (i % 3) * 8}
              y={37 + i * 13}
              width={Math.max(20, w - 65 - (i % 3) * 17)}
              height="4"
              rx="2"
              fill={["#66e4ff", "#a9a0ff", "#ffd193"][i % 3]}
            />
          </g>
        ))
      ) : type === "chart" ? (
        <g>
          {[0.4, 0.65, 0.5, 0.9].map((v, i) => (
            <rect
              key={i}
              x={18 + (i * (w - 30)) / 4}
              y={h - 18 - v * (h - 50)}
              width={(w - 45) / 5}
              height={v * (h - 50)}
              rx="4"
              fill={i % 2 ? color : "#90d3ff"}
            />
          ))}
        </g>
      ) : (
        <g>
          <rect
            x="14"
            y="36"
            width={w - 28}
            height="13"
            rx="4"
            fill="#e3efff"
          />
          <rect
            x="14"
            y="58"
            width={(w - 35) / 2}
            height={h - 72}
            rx="5"
            fill="#b7ddff"
          />
          <path d={`M20 ${h - 20}l18 -25 18 15 16 -31 14 41`} fill="#72b7fa" />
          {[0, 1, 2].map((i) => (
            <rect
              key={i}
              x={w / 2 + 7}
              y={62 + i * 15}
              width={w / 2 - 22}
              height="5"
              rx="2"
              fill="#c9dfff"
            />
          ))}
        </g>
      )}
    </g>
  );
  const plant = (x, y, s = 1) => (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path
        d="M0 0Q-65 -37 -46 -105Q-1 -99 0 -15Q-8 -103 26 -133Q65 -87 8 -5Q34 -77 63 -66Q71 -26 12 5"
        fill={g("leaf")}
      />
      <path
        d="M4 15L-32 -79M4 15L27 -104M4 15L48 -49"
        stroke="#b3f0e3"
        strokeWidth="2"
        fill="none"
      />
      <path d="M-28 0H34L25 53H-18Z" fill={g("pot")} />
      <ellipse cy="1" cx="3" rx="31" ry="7" fill="#a7d9f3" />
    </g>
  );
  const person = (x, y, s = 1, female = false, shirt = color) => (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {female && (
        <path
          d="M-38 -96Q-64 -151 -30 -167Q13 -191 37 -148L51 -45H-55Z"
          fill={g("hair")}
        />
      )}
      <path
        d="M-67 36L-62 -42Q-55 -80 -24 -85H23Q63 -72 68 -27L82 42Z"
        fill={shirt}
      />
      <path
        d="M-54 -54Q-45 -31 -47 27M47 -58Q36 -22 53 31"
        fill="none"
        stroke="#fff"
        opacity=".22"
        strokeWidth="4"
      />
      <path d="M-17 -99L-17 -78Q0 -59 18 -79V-104" fill={g("skin")} />
      <ellipse cy="-122" rx="32" ry="41" fill={g("skin")} />
      <ellipse cx="33" cy="-117" rx="6" ry="9" fill="#eeac83" />
      <path
        d={
          female
            ? "M-34 -110Q-48 -157 -18 -161Q22 -181 36 -137Q15 -151 4 -149Q-4 -129 -34 -110"
            : "M-34 -116Q-50 -135 -37 -157Q-17 -178 4 -164Q26 -180 39 -153L34 -127L22 -143Q-7 -127 -31 -141Z"
        }
        fill={g("hair")}
      />
      {!female && (
        <path
          d="M-25 -111Q-18 -80 9 -85Q29 -91 30 -112L18 -105Q2 -99 -13 -107Z"
          fill="#223458"
        />
      )}
      <path d="M4 -124L8 -112H2" fill="none" stroke="#c98565" strokeWidth="2" />
      <path
        d="M0 -100Q9 -96 17 -101"
        fill="none"
        stroke={female ? "#bd555f" : "#efb38d"}
        strokeWidth="2"
      />
      <path
        d="M-23 -134L-10 -136M12 -135L23 -131"
        stroke="#243149"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <ellipse cx="-16" cy="-125" rx="2.4" ry="3.2" fill="#192447" />
      <ellipse cx="18" cy="-123" rx="2.4" ry="3.2" fill="#192447" />
      {!female && (
        <g fill="none" stroke="#17294a" strokeWidth="4">
          <rect x="-31" y="-133" width="28" height="20" rx="6" />
          <rect x="8" y="-131" width="27" height="20" rx="6" />
          <path d="M-3 -123H8" />
        </g>
      )}
      <path d="M-54 -26Q-71 11 -40 27L21 34L27 18L-29 3L-22 -13" fill={shirt} />
      <path d="M20 18Q39 12 50 26L43 35H20Z" fill={g("skin")} />
      <path
        d="M56 -22L66 17L30 25"
        fill="none"
        stroke={shirt}
        strokeWidth="22"
        strokeLinecap="round"
      />
    </g>
  );
  const laptop = (x, y, s = 1) => (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path
        d="M0 0H155L132 100H-21Z"
        fill={g("laptop")}
        stroke="#85b9f2"
        strokeWidth="2"
      />
      <path d="M-21 100H132L149 108H-46Z" fill="#92cafa" />
      <text
        x="52"
        y="64"
        fill="#54caff"
        fontFamily="sans-serif"
        fontWeight="800"
        fontSize="32"
      >
        M²
      </text>
    </g>
  );
  const bubble = (x, y, text, c = color) => (
    <g transform={`translate(${x} ${y})`}>
      <rect width="58" height="52" rx="13" fill={c} />
      <path d="M13 48V61L27 48" fill={c} />
      <text
        x="29"
        y="34"
        textAnchor="middle"
        fill="white"
        fontFamily="sans-serif"
        fontWeight="700"
        fontSize="23"
      >
        {text}
      </text>
    </g>
  );
  return (
    <svg
      className={`service-scene ${className}`}
      viewBox="0 0 620 450"
      role={decorative ? undefined : "img"}
      aria-hidden={decorative || undefined}
      aria-label={
        decorative
          ? undefined
          : label ||
            [
              "Developer building a web application at a laptop",
              "Designer arranging website layouts",
              "IT specialist monitoring connected servers",
              "Social strategist planning a campaign",
              "Search specialist analysing organic growth",
              "Team connecting Microsoft productivity tools",
              "Analyst connecting business workflows",
              "Writer developing a content story",
              "Student working on a research project",
              "Creative team building digital experiences",
            ][kind]
      }
    >
      <defs>
        <linearGradient id={`${id}-screen`} x2="1" y2="1">
          <stop stopColor="#1454c4" />
          <stop offset="1" stopColor="#25377a" />
        </linearGradient>
        <linearGradient id={`${id}-leaf`} x2="1" y2="1">
          <stop stopColor="#68e3c8" />
          <stop offset="1" stopColor="#137c99" />
        </linearGradient>
        <linearGradient id={`${id}-pot`}>
          <stop stopColor="#b0e4ff" />
          <stop offset=".5" stopColor="#edf9ff" />
          <stop offset="1" stopColor="#5c9de3" />
        </linearGradient>
        <linearGradient id={`${id}-skin`} x2="1" y2=".6">
          <stop stopColor="#ffe2bd" />
          <stop offset="1" stopColor="#e79b72" />
        </linearGradient>
        <linearGradient id={`${id}-hair`} x2=".8" y2="1">
          <stop stopColor="#344563" />
          <stop offset=".5" stopColor="#131d36" />
          <stop offset="1" stopColor="#334b76" />
        </linearGradient>
        <linearGradient id={`${id}-laptop`} x2="1" y2="1">
          <stop stopColor="#345d9d" />
          <stop offset="1" stopColor="#152945" />
        </linearGradient>
        <radialGradient id={`${id}-orb`} cx=".3" cy=".25">
          <stop stopColor="#bdffff" />
          <stop offset=".35" stopColor="#51cfff" />
          <stop offset="1" stopColor="#7760ea" />
        </radialGradient>
      </defs>
      <path
        d="M40 295C-10 162 129 38 280 51S615 18 597 220S393 436 234 409S74 384 40 295"
        fill="#eef7ff"
      />
      <ellipse cx="322" cy="394" rx="255" ry="26" fill="#dcecff" />
      <ellipse cx="322" cy="385" rx="241" ry="23" fill="#f5faff" />
      <g className="scene-backdrop">
        {kind === 9 ? (
          <>
            {screen(88, 65, 160, 127)}
            {screen(398, 116, 160, 137, "chart")}
            <circle cx="396" cy="70" r="54" fill={g("orb")} />
            <g fill="none" stroke="white" opacity=".6">
              <ellipse cx="396" cy="70" rx="24" ry="54" />
              <ellipse cx="396" cy="70" rx="54" ry="19" />
              <path d="M342 70H450M396 16V124" />
            </g>
          </>
        ) : kind === 0 ? (
          <>
            {screen(148, 70, 210, 146)}
            {screen(405, 154, 145, 152)}
            {bubble(365, 47, "</>")}
          </>
        ) : kind === 1 ? (
          <>
            {screen(265, 59, 247, 199, "layout")}
            {screen(100, 145, 130, 170, "layout")}
            {bubble(183, 66, "Aa")}
          </>
        ) : kind === 2 ? (
          <>
            {screen(107, 75, 203, 143, "chart")}
            {[0, 1, 2].map((i) => (
              <g key={i} transform={`translate(404 ${189 + i * 50})`}>
                <rect width="122" height="42" rx="7" fill={g("laptop")} />
                <circle cx="103" cy="21" r="5" fill="#4ceccc" />
                <path d="M15 15H61M15 25H48" stroke="#80b5ed" strokeWidth="3" />
              </g>
            ))}
            {bubble(374, 71, "✓")}
          </>
        ) : kind === 3 ? (
          <>
            {screen(333, 126, 183, 195, "chart")}
            {bubble(109, 84, "♥", "#f163a5")}
            {bubble(228, 52, "@", "#207df3")}
            {bubble(413, 49, "♪", "#5554cd")}
            <path
              d="M115 201Q176 106 248 143"
              fill="none"
              stroke="#f8ba54"
              strokeWidth="9"
            />
          </>
        ) : kind === 4 ? (
          <>
            {screen(264, 106, 270, 202, "chart")}
            <circle
              cx="165"
              cy="134"
              r="55"
              fill="white"
              stroke="#298afe"
              strokeWidth="12"
            />
            <path
              d="M198 175L242 223"
              stroke="#2555a5"
              strokeWidth="17"
              strokeLinecap="round"
            />
            <path
              d="M315 93L408 49L452 61L530 20"
              fill="none"
              stroke="#1684fa"
              strokeWidth="9"
            />
          </>
        ) : kind === 5 ? (
          <>
            {screen(231, 145, 216, 135, "layout")}
            {[
              ["W", 105, 87, "#1a74d1"],
              ["X", 275, 44, "#16a079"],
              ["P", 432, 78, "#ec7651"],
              ["T", 462, 213, "#7978d6"],
            ].map(([t, x, y, c]) => (
              <g key={t}>{bubble(x, y, t, c)}</g>
            ))}
            <path
              d="M164 109L275 75L432 104M304 104V145M462 240H448"
              fill="none"
              stroke="#96bce9"
              strokeWidth="3"
              strokeDasharray="5 5"
            />
          </>
        ) : kind === 6 ? (
          <>
            {screen(179, 61, 260, 190, "layout")}
            <g fill="white" stroke="#8ea4f1" strokeWidth="3">
              <path d="M140 138H90V274H170M440 139H511V287H455" fill="none" />
              <rect x="63" y="110" width="55" height="55" rx="12" />
              <rect x="485" y="259" width="55" height="55" rx="12" />
            </g>
            {bubble(420, 39, "ERP", "#7567dd")}
          </>
        ) : kind === 7 ? (
          <>
            {screen(314, 67, 203, 231, "layout")}
            <g transform="rotate(-9 177 164)">
              <rect
                x="91"
                y="86"
                width="153"
                height="179"
                rx="9"
                fill="white"
                stroke="#a5d9e9"
                strokeWidth="2"
              />
              <text
                x="111"
                y="139"
                fontSize="32"
                fill="#2788c7"
                fontFamily="serif"
              >
                Aa
              </text>
              {[0, 1, 2, 3].map((i) => (
                <path
                  key={i}
                  d={`M111 ${161 + i * 19}h106`}
                  stroke="#c8dfee"
                  strokeWidth="6"
                />
              ))}
            </g>
          </>
        ) : (
          <>
            {screen(128, 85, 194, 158, "code")}
            <path d="M410 89L465 111L411 136L356 111Z" fill="#1b2c55" />
            <path d="M377 122V143Q410 162 443 141V121" fill="#36538c" />
            <path d="M464 112V155" stroke="#eabb55" strokeWidth="4" />
            {[0, 1, 2].map((i) => (
              <rect
                key={i}
                x={402 + i * 6}
                y={287 + i * 23}
                width="115"
                height="21"
                rx="5"
                fill={["#428feb", "#f0af5c", "#8176dd"][i]}
              />
            ))}
            {bubble(349, 45, "✦", "#efbd54")}
          </>
        )}
      </g>
      {plant(91, 321, 0.85)}
      {plant(543, 319, 0.8)}
      {kind === 9 ? (
        <>
          {person(332, 283, 0.9, true, "#e8edf7")}
          {person(210, 352, 0.98, false, "#078dff")}
          {person(451, 362, 0.82, false, "#7950d9")}
          {laptop(208, 294, 0.95)}
          {laptop(419, 308, 0.66)}
        </>
      ) : (
        <>
          {person(
            kind === 4 ? 267 : 300,
            348,
            1.02,
            [1, 3, 6, 7].includes(kind),
          )}
          {laptop(295, 289, 1.02)}
        </>
      )}
      <g transform="translate(149 355)">
        <ellipse cx="0" cy="29" rx="19" ry="5" fill="#bddef9" />
        <path d="M-13 0H13L10 28H-10Z" fill={g("pot")} />
        <path
          d="M13 5Q32 3 24 17L13 20"
          fill="none"
          stroke="#94c8ef"
          strokeWidth="4"
        />
      </g>
      <circle className="scene-spark" cx="62" cy="159" r="7" fill={g("orb")} />
      <circle cx="536" cy="66" r="6" fill="#ffda95" />
      <circle cx="370" cy="362" r="5" fill="#ab8cf0" />
    </svg>
  );
}
