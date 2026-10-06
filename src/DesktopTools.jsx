import React, { useEffect, useRef, useState } from "react";
import { apps, projects } from "./data";
import { AppIcon, Icon } from "./Icon";
import { asset } from "./assets";

const utilities = [
  { id: "settings", name: "System Settings", icon: "SlidersHorizontal" },
  { id: "terminal", name: "Terminal", icon: "Terminal" },
  { id: "system", name: "About this desktop", icon: "HardDrive" },
];
export const defaultPreferences = {
  brightness: 100,
  focus: false,
  aurora: false,
  dockSize: 54,
  autoHideDock: false,
  reducedMotion: false,
};
export function readPreferences() {
  try {
    const saved = JSON.parse(
      localStorage.getItem("ethan-desktop-v1") || "null",
    );
    if (!saved || typeof saved !== "object") return defaultPreferences;
    return {
      brightness: Math.min(100, Math.max(35, Number(saved.brightness) || 100)),
      dockSize: Math.min(64, Math.max(40, Number(saved.dockSize) || 54)),
      ...Object.fromEntries(
        ["focus", "aurora", "autoHideDock", "reducedMotion"].map((key) => [
          key,
          saved[key] === true,
        ]),
      ),
    };
  } catch {
    return defaultPreferences;
  }
}

function usePanelFocus(ref, dismiss) {
  useEffect(() => {
    const previous = document.activeElement;
    const panel = ref.current;
    panel.querySelector("input,button")?.focus();
    function key(e) {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        dismiss();
      }
      if (e.key !== "Tab") return;
      const controls = [...panel.querySelectorAll("input,button,a")].filter(
        (el) => !el.disabled && el.getClientRects().length,
      );
      if (!controls.length) return;
      const first = controls[0],
        last = controls.at(-1);
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    panel.addEventListener("keydown", key);
    return () => {
      panel.removeEventListener("keydown", key);
      if (previous?.isConnected) previous.focus({ preventScroll: true });
    };
  }, []);
}

export function Spotlight({
  mode = "search",
  open,
  dismiss,
  windows,
  running,
  titles,
  action,
}) {
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const ref = useRef(null);
  usePanelFocus(ref, dismiss);
  const entries =
    mode === "switcher"
      ? [...running]
          .sort(
            (a, b) =>
              (windows.find((w) => w.id === b)?.z || 0) -
              (windows.find((w) => w.id === a)?.z || 0),
          )
          .map((id) => ({
            id,
            name: titles[id],
            category: windows.find((w) => w.id === id)?.minimized
              ? "Minimized window"
              : windows.some((w) => w.id === id)
                ? "Open window"
                : "Running app",
            app: apps.find((a) => a.id === id),
          }))
      : [
          ...apps.map((app) => ({ ...app, app, category: "Application" })),
          ...(mode === "apps"
            ? []
            : [
                ...projects.map((p) => ({
                  ...p,
                  category: "Project",
                  detail: p.type,
                })),
                ...utilities.map((u) => ({ ...u, category: "System" })),
                {
                  id: "mission",
                  name: "Mission Control",
                  category: "Action",
                  icon: "LayoutGrid",
                },
                {
                  id: "lock",
                  name: "Lock screen",
                  category: "Action",
                  icon: "Moon",
                },
              ]),
        ];
  const results = entries.filter((item) =>
    `${item.name} ${item.detail || ""} ${item.category}`
      .toLowerCase()
      .includes(query.toLowerCase().trim()),
  );
  const selected = Math.min(index, Math.max(0, results.length - 1));
  function choose(item) {
    dismiss();
    if (item.category === "Action") action(item.id);
    else open(item.id);
  }
  return (
    <div className="system-overlay" onClick={dismiss}>
      <section
        className={`spotlight ${mode === "apps" ? "launchpad" : ""} ${mode === "switcher" ? "app-switcher" : ""}`}
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={
          mode === "apps"
            ? "Applications"
            : mode === "switcher"
              ? "App Switcher"
              : "Spotlight Search"
        }
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (
            [
              "ArrowDown",
              "ArrowUp",
              ...(mode === "switcher" ? ["ArrowLeft", "ArrowRight"] : []),
            ].includes(e.key)
          ) {
            e.preventDefault();
            setIndex(
              (selected +
                (["ArrowDown", "ArrowRight"].includes(e.key) ? 1 : -1) +
                results.length) %
                (results.length || 1),
            );
          }
          if (
            e.key === "Enter" &&
            e.target.tagName === "INPUT" &&
            results[selected]
          ) {
            e.preventDefault();
            choose(results[selected]);
          }
        }}
      >
        <div className="spotlight-input">
          <Icon name="Search" size={25} />
          <input
            aria-label="Search desktop"
            placeholder={
              mode === "switcher" ? "Switch to an open app" : "Spotlight Search"
            }
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIndex(0);
            }}
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            aria-controls="spotlight-results"
          />
          <button aria-label="Close search" onClick={dismiss}>
            esc
          </button>
        </div>
        <div id="spotlight-results" className="spotlight-results">
          {!results.length && (
            <p className="search-empty">No results for “{query}”</p>
          )}
          {results.map((item, i) => (
            <button
              key={item.id}
              className={`spotlight-result ${i === selected ? "selected" : ""}`}
              onClick={() => choose(item)}
              onPointerEnter={() => setIndex(i)}
            >
              {item.app ? (
                <AppIcon app={item.app} small />
              ) : (
                <span className="search-symbol">
                  <Icon name={item.icon || "Folder"} size={24} />
                </span>
              )}
              <span>
                <strong>{item.name}</strong>
                <small>{item.detail || item.category}</small>
              </span>
              <span className="result-kind">
                {i === selected ? "↵" : item.category}
              </span>
            </button>
          ))}
        </div>
        <footer>
          <span>↑ ↓ to navigate · return to open</span>
          <span>
            {mode === "apps"
              ? "Your applications"
              : "Search your digital desktop"}
          </span>
        </footer>
      </section>
    </div>
  );
}

export function MissionControl({ windows, titles, open, dismiss }) {
  const ref = useRef(null);
  usePanelFocus(ref, dismiss);
  return (
    <div className="system-overlay mission-overlay" onClick={dismiss}>
      <section
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label="Mission Control"
        className="mission-control"
        onClick={(e) => e.stopPropagation()}
      >
        <header>
          <div>
            <span className="space-preview">
              <Icon name="LayoutGrid" size={25} />
            </span>
            <strong>Desktop 1</strong>
          </div>
          <button onClick={dismiss}>
            Done <span>esc</span>
          </button>
        </header>
        <div className="mission-heading">
          <h1>Your open windows</h1>
          <p>Select a window to pick up where you left off.</p>
        </div>
        <div className="mission-grid">
          {windows.map((w) => {
            const app = apps.find((a) => a.id === w.id),
              project = projects.find((p) => p.id === w.id);
            return (
              <button
                key={w.id}
                className="mission-card"
                onClick={() => {
                  open(w.id);
                  dismiss();
                }}
                aria-label={`Switch to ${titles[w.id]}`}
              >
                <div className="mission-preview">
                  <div className="preview-chrome">
                    <i />
                    <i />
                    <i />
                    <span>{titles[w.id]}</span>
                  </div>
                  {project ? (
                    <img src={project.image} alt="" loading="lazy" />
                  ) : (
                    <div className="preview-content">
                      {app ? (
                        <AppIcon app={app} />
                      ) : (
                        <Icon name="Terminal" size={45} />
                      )}
                      <strong>{titles[w.id]}</strong>
                      <span>
                        {w.minimized ? "Minimized in Dock" : "Ready to explore"}
                      </span>
                    </div>
                  )}
                </div>
                <span className="mission-label">
                  {titles[w.id]}
                  {w.minimized && <small>Minimized</small>}
                </span>
              </button>
            );
          })}
        </div>
        {!windows.length && (
          <p className="mission-empty">
            No open windows. Open an app from the dock.
          </p>
        )}
      </section>
    </div>
  );
}

export function Settings({ preferences, update, reset, fullscreen }) {
  const [tab, setTab] = useState("Desktop & Dock");
  return (
    <div className="settings-app">
      <aside>
        <div className="settings-profile">
          <span>
            <img
              src={asset("photos/ethan-headshot.webp")}
              alt=""
              width="40"
              height="40"
              loading="lazy"
            />
          </span>
          <div>
            <strong>Ethan Barman</strong>
            <small>Personal desktop</small>
          </div>
        </div>
        {["Desktop & Dock", "Display", "Accessibility"].map((name) => (
          <button
            key={name}
            className={tab === name ? "selected" : ""}
            onClick={() => setTab(name)}
          >
            <Icon
              name={
                name === "Display"
                  ? "Sun"
                  : name === "Accessibility"
                    ? "UserRound"
                    : "LayoutGrid"
              }
              size={18}
            />
            {name}
          </button>
        ))}
      </aside>
      <article>
        <h1>{tab}</h1>
        <p className="settings-description">Make yourself at home.</p>
        {tab === "Desktop & Dock" && (
          <>
            <div className="settings-wallpaper">
              <span className={preferences.aurora ? "aurora-preview" : ""} />
              <div>
                <strong>Wallpaper</strong>
                <p>Midnight glass</p>
                <button onClick={() => update("aurora", !preferences.aurora)}>
                  {preferences.aurora ? "Use original" : "Use aurora"}
                </button>
              </div>
            </div>
            <div className="settings-group">
              <label className="setting-row">
                <span>Dock size</span>
                <input
                  type="range"
                  aria-label="Dock size"
                  min="40"
                  max="64"
                  value={preferences.dockSize}
                  onChange={(e) => update("dockSize", Number(e.target.value))}
                />
              </label>
              <Toggle
                label="Automatically hide the Dock"
                checked={preferences.autoHideDock}
                onChange={(v) => update("autoHideDock", v)}
              />
              <Toggle
                label="Focus · hide desktop icons"
                checked={preferences.focus}
                onChange={(v) => update("focus", v)}
              />
            </div>
          </>
        )}
        {tab === "Display" && (
          <div className="settings-group">
            <label className="setting-row">
              <span>Brightness</span>
              <input
                aria-label="Display brightness"
                type="range"
                min="35"
                max="100"
                value={preferences.brightness}
                onChange={(e) => update("brightness", Number(e.target.value))}
              />
            </label>
            <div className="setting-row">
              <span>Browser display</span>
              <button onClick={fullscreen}>Toggle full screen</button>
            </div>
          </div>
        )}
        {tab === "Accessibility" && (
          <div className="settings-group">
            <Toggle
              label="Reduce motion"
              checked={preferences.reducedMotion}
              onChange={(v) => update("reducedMotion", v)}
            />
            <div className="setting-row">
              <span>Keyboard navigation</span>
              <small>Tab · arrow keys · return</small>
            </div>
            <div className="setting-row">
              <span>Search shortcut</span>
              <small>⌘ Space / Alt + K</small>
            </div>
          </div>
        )}
        <p className="settings-footnote">
          Preferences are saved in this browser. Display controls affect this
          website.
        </p>
        <button className="reset-settings" onClick={reset}>
          Reset desktop preferences
        </button>
      </article>
    </div>
  );
}
function Toggle({ label, checked, onChange }) {
  return (
    <label className="setting-row">
      <span>{label}</span>
      <input
        className="system-switch"
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
    </label>
  );
}

export function CalendarPanel({ clock, dismiss, activity }) {
  const [month, setMonth] = useState(
    new Date(clock.getFullYear(), clock.getMonth(), 1),
  );
  const year = month.getFullYear(),
    m = month.getMonth(),
    start = new Date(year, m, 1).getDay(),
    days = new Date(year, m + 1, 0).getDate();
  return (
    <section
      className="calendar-panel"
      aria-label="Notification Center"
      onClick={(e) => e.stopPropagation()}
    >
      <header>
        <h2>
          {month.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <button
          aria-label="Previous month"
          onClick={() => setMonth(new Date(year, m - 1, 1))}
        >
          ‹
        </button>
        <button
          aria-label="Next month"
          onClick={() => setMonth(new Date(year, m + 1, 1))}
        >
          ›
        </button>
        <button aria-label="Close Notification Center" onClick={dismiss}>
          ×
        </button>
      </header>
      <div className="calendar-grid">
        {"SMTWTFS".split("").map((d, i) => (
          <strong key={i}>{d}</strong>
        ))}
        {Array.from({ length: start }, (_, i) => (
          <span key={`empty${i}`} />
        ))}
        {Array.from({ length: days }, (_, i) => (
          <span
            key={i}
            className={
              year === clock.getFullYear() &&
              m === clock.getMonth() &&
              i + 1 === clock.getDate()
                ? "today"
                : ""
            }
          >
            {i + 1}
          </span>
        ))}
      </div>
      <button
        className="calendar-today"
        onClick={() =>
          setMonth(new Date(clock.getFullYear(), clock.getMonth(), 1))
        }
      >
        Back to today
      </button>
      <div className="activity-heading">
        <strong>Recent activity</strong>
        <span>This visit</span>
      </div>
      {activity.length ? (
        activity.slice(0, 4).map((a, i) => (
          <div key={i} className="activity-item">
            <Icon name="Layers" size={17} />
            <span>
              {a.label}
              <small>{a.time}</small>
            </span>
          </div>
        ))
      ) : (
        <p className="activity-empty">
          Your desktop is ready. Open something interesting.
        </p>
      )}
    </section>
  );
}

export function QuickLook({ project, open, dismiss }) {
  const ref = useRef(null);
  usePanelFocus(ref, dismiss);
  return (
    <div className="quick-look-backdrop" onClick={dismiss}>
      <section
        ref={ref}
        className="quick-look"
        role="dialog"
        aria-modal="true"
        aria-label={`Quick Look · ${project.name}`}
        onClick={(e) => e.stopPropagation()}
      >
        <header>
          <button aria-label="Close Quick Look" onClick={dismiss}>
            ×
          </button>
          <strong>{project.name}</strong>
          <button
            onClick={() => {
              dismiss();
              open(project.id);
            }}
          >
            Open project ↗
          </button>
        </header>
        <img
          src={project.image}
          alt={`${project.name} public website preview`}
          loading="lazy"
        />
        <div>
          <span>{project.type}</span>
          <h2>{project.tag}</h2>
          <p>{project.description}</p>
        </div>
        <footer>Quick Look · press Escape to close</footer>
      </section>
    </div>
  );
}
