import React, { useId } from "react";

// Original vector artwork: layered materials and dimensional silhouettes,
// rather than a line symbol dropped into a generic colored tile.
export default function DesktopIcon({ type }) {
  const id = useId().replace(/:/g, "");
  const grad = (name) => `url(#${id}-${name})`;
  const tile = (a, b) => (
    <rect
      x="3"
      y="3"
      width="58"
      height="58"
      rx="14"
      fill={grad(a)}
      stroke={b || "#ffffff60"}
      strokeWidth=".7"
    />
  );
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="desktop-icon-art">
      <defs>
        {Object.entries({
          blue: ["#6acbff", "#1462dc"],
          book: ["#b9a27e", "#816344"],
          orange: ["#ffe090", "#f09126"],
          mint: ["#69dfcd", "#238d8b"],
          dark: ["#515365", "#151722"],
          paper: ["#ffffff", "#e7e8ee"],
          yellow: ["#fff39a", "#f6c947"],
          folder: ["#8ad6ff", "#35a4ef"],
          folderfront: ["#69c9ff", "#2390dc"],
          red: ["#fa6a72", "#cc2635"],
        }).map(([name, colors]) => (
          <linearGradient
            id={`${id}-${name}`}
            key={name}
            x1="0"
            x2="0.7"
            y1="0"
            y2="1"
          >
            {colors.map((c, i) => (
              <stop key={c} offset={i ? "100%" : "0%"} stopColor={c} />
            ))}
          </linearGradient>
        ))}
        <filter
          id={`${id}-shadow`}
          x="-40%"
          y="-40%"
          width="180%"
          height="190%"
        >
          <feDropShadow
            dx="0"
            dy="1.3"
            stdDeviation="1"
            floodColor="#132339"
            floodOpacity=".22"
          />
        </filter>
      </defs>
      {type === "about" && (
        <>
          {tile("book")}
          <rect
            x="12"
            y="8"
            width="39"
            height="48"
            rx="5"
            fill={grad("paper")}
            filter={grad("shadow")}
          />
          <rect x="10" y="8" width="6" height="48" rx="2" fill="#675040" />
          <path
            d="M12 17h5m-5 9h5m-5 12h5m-5 10h5"
            stroke="#d1bf9e"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="34" cy="25" r="7" fill="#849bb0" />
          <path d="M22 43c0-8 24-8 24 0v3H22Z" fill="#849bb0" />
          <rect x="53" y="16" width="5" height="10" rx="1.5" fill="#dfbc85" />
          <rect x="53" y="30" width="5" height="10" rx="1.5" fill="#c3a381" />
        </>
      )}
      {type === "work" && (
        <g filter={grad("shadow")}>
          <path
            d="M5 17a5 5 0 015-5h15l5 5h24a5 5 0 015 5v28H5Z"
            fill={grad("folder")}
          />
          <path d="M7 20h48v28H7Z" fill="#bfeaff" />
          <path
            d="M4 26a4 4 0 014-4h48a4 4 0 014 4v25a5 5 0 01-5 5H9a5 5 0 01-5-5Z"
            fill={grad("folderfront")}
            stroke="#8bd8ff"
            strokeWidth=".6"
          />
          <path d="M8 25h47" stroke="#b5e8ff" strokeWidth=".8" opacity=".7" />
        </g>
      )}
      {type === "journey" && (
        <>
          {tile("mint")}
          <circle cx="32" cy="32" r="23" fill="#fff" filter={grad("shadow")} />
          <circle
            cx="32"
            cy="32"
            r="19"
            fill="#f0f9f9"
            stroke="#90b9bb"
            strokeWidth=".7"
          />
          {Array.from({ length: 12 }, (_, i) => (
            <path
              key={i}
              d="M32 14v3"
              transform={`rotate(${i * 30} 32 32)`}
              stroke="#83a9ae"
              strokeWidth="1"
            />
          ))}
          <path d="M42 20 35 35 21 44 29 28Z" fill="#ee6666" />
          <path d="M21 44 29 28 35 35Z" fill="#387fba" />
          <circle
            cx="32"
            cy="32"
            r="2.5"
            fill="#fff"
            stroke="#ccc"
            strokeWidth=".5"
          />
        </>
      )}
      {type === "ideas" && (
        <>
          {tile("orange")}
          <g filter={grad("shadow")}>
            <path
              d="M20 25a12 12 0 1124 0c0 6-6 8-7 15H27c-1-7-7-9-7-15Z"
              fill="#fff6d8"
            />
            <path
              d="m27 28 5 5 5-5m-5 5v8"
              stroke="#e9be65"
              fill="none"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
            <path d="M27 41h10v6a5 5 0 01-10 0Z" fill="#e8cf9a" />
            <path d="M27 43h10m-10 3h10" stroke="#ad9467" strokeWidth="1.2" />
          </g>
          <path
            d="M32 7v3M13 15l3 3m-7 9h4m36-12-3 3m9 9h-4"
            stroke="#fff7d7"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </>
      )}
      {type === "writing" && (
        <>
          {tile("paper")}
          <rect
            x="5"
            y="4"
            width="54"
            height="16"
            rx="9"
            fill={grad("yellow")}
          />
          <path d="M5 14h54v9H5Z" fill={grad("yellow")} />
          <path d="M6 24h52" stroke="#d5b23d" strokeWidth="1" />
          {[32, 39, 46, 53].map((y) => (
            <path
              key={y}
              d={`M12 ${y}h40`}
              stroke="#cad0d7"
              strokeWidth=".85"
            />
          ))}
          <path d="M19 26v29" stroke="#edb2b4" strokeWidth=".65" />
        </>
      )}
      {type === "contact" && (
        <>
          {tile("blue")}
          <g filter={grad("shadow")}>
            <rect
              x="10"
              y="17"
              width="44"
              height="31"
              rx="3"
              fill={grad("paper")}
            />
            <path
              d="m11 46 16-15m26 15L37 31"
              stroke="#c8d5e4"
              strokeWidth="1"
            />
            <path
              d="m11 19 18 15a5 5 0 006 0l18-15"
              fill="#f9fcff"
              stroke="#bccedf"
              strokeWidth="1"
            />
          </g>
        </>
      )}
      {type === "resume" && (
        <g filter={grad("shadow")}>
          <path
            d="M15 5h24l11 11v41a3 3 0 01-3 3H16a3 3 0 01-3-3V8a3 3 0 012-3Z"
            fill={grad("paper")}
            stroke="#d1d5dc"
            strokeWidth=".6"
          />
          <path d="M39 5v8a3 3 0 003 3h8" fill="#cfd6df" />
          <path
            d="M21 25h20m-20 5h20m-20 5h14"
            stroke="#bdc5d0"
            strokeWidth="1.6"
          />
          <rect x="9" y="40" width="39" height="14" rx="3" fill={grad("red")} />
          <text
            x="28.5"
            y="50.3"
            textAnchor="middle"
            fontFamily="Arial,sans-serif"
            fontSize="9"
            fontWeight="700"
            fill="white"
            letterSpacing="1"
          >
            PDF
          </text>
        </g>
      )}
      {type === "terminal" && (
        <>
          {tile("dark")}
          <rect
            x="8"
            y="9"
            width="48"
            height="46"
            rx="5"
            fill="#191c23"
            stroke="#777c8a"
            strokeWidth=".7"
          />
          <path
            d="m17 22 9 8-9 8"
            fill="none"
            stroke="#f0f1f4"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M32 39h14"
            stroke="#f0f1f4"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </>
      )}
    </svg>
  );
}
