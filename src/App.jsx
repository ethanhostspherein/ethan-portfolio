import React, { useState, useEffect, useRef, lazy, Suspense } from "react";
import { apps, projects, profile } from "./data";
import { Icon, AppIcon } from "./Icon";
import Window from "./Window";
import LockScreen from "./LockScreen";
import { asset } from "./assets";
import {
  Spotlight,
  MissionControl,
  Settings,
  CalendarPanel,
  readPreferences,
  defaultPreferences,
} from "./DesktopTools";
import {
  About,
  Work,
  Project,
  Journey,
  Ideas,
  Writing,
  Contact,
  Resume,
  Terminal,
  SystemInfo,
} from "./Apps";
const Personal = lazy(() => import("./Personal"));
const Games = lazy(() => import("./Games"));
const titles = {
  ...Object.fromEntries(apps.map((a) => [a.id, a.name])),
  ...Object.fromEntries(projects.map((p) => [p.id, p.name])),
  terminal: "Terminal",
  system: "About This Mac",
  help: "Welcome home",
  settings: "System Settings",
};
const nativeAppNames = {about: "Contacts", work: "Finder", journey: "Safari", ideas: "Tips", writing: "Notes", contact: "Mail", resume: "Preview", life: "Photos", games: "Games"};
export default function App() {
  const [windows, setWindows] = useState([{ id: "about", z: 10, shift: 0 }]),
    [clock, setClock] = useState(new Date()),
    [menu, setMenu] = useState(null),
    [toast, setToast] = useState(""),
    [mobile, setMobile] = useState(window.innerWidth < 760),
    [locked, setLocked] = useState(true),
    [entering, setEntering] = useState(false);
  const [preferences, setPreferences] = useState(readPreferences);
  const [panel, setPanel] = useState(null),
    [context, setContext] = useState(null),
    [selected, setSelected] = useState(null),
    [menuX, setMenuX] = useState(15),
    [activity, setActivity] = useState([]);
  const [running, setRunning] = useState(["about"]);
  const [lockMode, setLockMode] = useState("restart");
  const actionTimers = useRef(new Map());
  const aurora = preferences.aurora,
    brightness = preferences.brightness,
    focusMode = preferences.focus;
  function updatePreference(key, value) {
    setPreferences((p) => ({
      ...p,
      [key]: typeof value === "function" ? value(p[key]) : value,
    }));
  }
  const setBrightness = (value) => updatePreference("brightness", value),
    setFocusMode = (value) => updatePreference("focus", value);
  useEffect(() => {
    try {
      localStorage.setItem("ethan-desktop-v1", JSON.stringify(preferences));
    } catch {}
  }, [preferences]);
  function showPanel(value) {
    setMenu(null);
    setContext(null);
    setPanel(value);
  }
  function desktopAction(id) {
    if (id === "mission") showPanel("mission");
    else if (id === "search") showPanel("search");
    else if (id === "apps") showPanel("apps");
    else if (id === "switcher") showPanel("switcher");
    else if (id === "lock") lock();
  }
  async function fullscreen() {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await document.documentElement.requestFullscreen();
    } catch {
      notify("Use your browser’s full screen option to expand the desktop.");
    }
  }
  function showDesktop() {
    setWindows((ws) =>
      ws.map((w) => ({ ...w, minimized: true, leaving: false })),
    );
    setMenu(null);
    setContext(null);
  }
  function tile(id, placement) {
    setWindows((ws) =>
      ws.map((w) =>
        w.id === id
          ? { ...w, tile: placement, maximized: false, z: ++z.current }
          : w,
      ),
    );
  }
  function quit(id) {
    setWindows((ws) => ws.filter((w) => w.id !== id));
    setRunning((rs) => rs.filter((r) => r !== id));
    setContext(null);
  }
  const z = useRef(10),
    sequence = useRef(""),
    toastTimer = useRef(null),
    loginTimer = useRef(null),
    ownerRef = useRef(null);
  function unlock() {
    if (entering) return;
    setEntering(true);
    loginTimer.current = setTimeout(() => {
      setLocked(false);
      setEntering(false);
    }, 550);
  }
  function lock(mode = "login") {
    setLockMode(["sleep", "restart"].includes(mode) ? mode : "login");
    setMenu(null);
    setPanel(null);
    setContext(null);
    setToast("");
    setLocked(true);
    setEntering(false);
  }
  useEffect(() => {
    if (!locked) ownerRef.current?.focus({ preventScroll: true });
  }, [locked]);
  function notify(message) {
    setToast(message);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 4200);
  }
  function open(id) {
    clearTimeout(actionTimers.current.get(id));
    setPanel(null);
    setContext(null);
    setSelected(null);
    setRunning((rs) => (rs.includes(id) ? rs : [...rs, id]));
    setActivity((a) =>
      [
        {
          label: `Opened ${titles[id] || id}`,
          time: new Date().toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
          }),
        },
        ...a,
      ].slice(0, 8),
    );
    setWindows((ws) => {
      const found = ws.some((w) => w.id === id);
      return found
        ? ws.map((w) =>
            w.id === id
              ? { ...w, minimized: false, leaving: false, z: ++z.current }
              : w,
          )
        : [...ws, { id, z: ++z.current, shift: (ws.length % 5) * 20 }];
    });
    setMenu(null);
  }
  function front(id) {
    setWindows((ws) =>
      ws.map((w) => (w.id === id ? { ...w, z: ++z.current } : w)),
    );
  }
  function close(id) {
    clearTimeout(actionTimers.current.get(id));
    setWindows((ws) =>
      ws.map((w) => (w.id === id ? { ...w, leaving: true } : w)),
    );
    actionTimers.current.set(
      id,
      setTimeout(() => setWindows((ws) => ws.filter((w) => w.id !== id)), 160),
    );
  }
  function minimize(id) {
    clearTimeout(actionTimers.current.get(id));
    setWindows((ws) =>
      ws.map((w) => (w.id === id ? { ...w, leaving: true } : w)),
    );
    actionTimers.current.set(
      id,
      setTimeout(
        () =>
          setWindows((ws) =>
            ws.map((w) =>
              w.id === id ? { ...w, minimized: true, leaving: false } : w,
            ),
          ),
        160,
      ),
    );
  }
  function maximize(id) {
    setWindows((ws) =>
      ws.map((w) =>
        w.id === id
          ? { ...w, tile: null, maximized: !w.maximized, z: ++z.current }
          : w,
      ),
    );
  }
  const visible = windows.filter((w) => !w.minimized),
    active = visible.reduce((a, w) => (w.z > (a?.z || 0) ? w : a), null);
  function swipe(direction) {
    const index = apps.findIndex((a) => a.id === active?.id);
    open(apps[(index + direction + apps.length) % apps.length].id);
  }
  useEffect(() => {
    const timer = setInterval(() => setClock(new Date()), 1000);
    const resize = () => setMobile(window.innerWidth < 760);
    window.addEventListener("resize", resize);
    return () => {
      clearInterval(timer);
      clearTimeout(toastTimer.current);
      clearTimeout(loginTimer.current);
      actionTimers.current.forEach((timer) => clearTimeout(timer));
      window.removeEventListener("resize", resize);
    };
  }, []);
  useEffect(() => {
    function key(e) {
      if (locked) return;
      if (e.key === "Escape") {
        if (panel) setPanel(null);
        else if (context) setContext(null);
        else setMenu(null);
        return;
      }
      if (
        (menu || context) &&
        ["ArrowDown", "ArrowUp", "Home", "End"].includes(e.key)
      ) {
        const list = document.querySelector(
          context ? ".desktop-context" : ".menu-dropdown",
        );
        if (list) {
          const items = [...list.querySelectorAll("button")],
            index = items.indexOf(document.activeElement);
          e.preventDefault();
          items[
            e.key === "Home"
              ? 0
              : e.key === "End"
                ? items.length - 1
                : (index + (e.key === "ArrowDown" ? 1 : -1) + items.length) %
                  items.length
          ]?.focus();
          return;
        }
      }
      if (
        ((e.metaKey || e.ctrlKey) && e.code === "Space") ||
        (e.altKey && e.key.toLowerCase() === "k")
      ) {
        e.preventDefault();
        showPanel(panel === "search" ? null : "search");
        return;
      }
      if (
        e.key === "F3" ||
        (e.ctrlKey && e.key === "ArrowUp") ||
        (e.altKey && e.key.toLowerCase() === "m")
      ) {
        e.preventDefault();
        showPanel(panel === "mission" ? null : "mission");
        return;
      }
      if (e.altKey && e.code === "Backquote") {
        e.preventDefault();
        showPanel("switcher");
        return;
      }
      if (
        (e.metaKey || e.ctrlKey) &&
        !e.target.matches("input,textarea") &&
        ["m", "w"].includes(e.key.toLowerCase()) &&
        active
      ) {
        e.preventDefault();
        (e.key.toLowerCase() === "m" ? minimize : close)(active.id);
        return;
      }
      if (panel || context) return;
      if (e.key === "Escape" && menu) {
        setMenu(null);
        return;
      }
      if (e.target.matches("input,textarea")) return;
      if (e.altKey) {
        const app = apps[Number(e.key) - 1];
        if (app) {
          e.preventDefault();
          open(app.id);
        }
        if (e.key.toLowerCase() === "t") {
          e.preventDefault();
          open("terminal");
        }
        if (e.key.toLowerCase() === "i") {
          e.preventDefault();
          open("system");
        }
        if (e.key.toLowerCase() === "l") {
          e.preventDefault();
          lock();
        }
      }
      sequence.current = (
        sequence.current +
        ({ ArrowUp: "U", ArrowDown: "D", ArrowLeft: "L", ArrowRight: "R" }[
          e.key
        ] || e.key.toUpperCase())
      ).slice(-10);
      if (sequence.current === "UUDDLRLRBA") {
        updatePreference("aurora", (a) => !a);
        notify("A little wonder unlocked. Welcome to aurora mode.");
      }
    }
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [active, menu, locked, panel, context]);
  function content(id) {
    if (projects.some((p) => p.id === id))
      return <Project id={id} open={open} />;
    switch (id) {
      case "about":
        return <About open={open} />;
      case "work":
        return <Work open={open} mobile={mobile} />;
      case "journey":
        return <Journey />;
      case "ideas":
        return <Ideas />;
      case "writing":
        return <Writing />;
      case "contact":
        return <Contact />;
      case "resume":
        return <Resume />;
      case "life":
        return <Personal open={open} />;
      case "games":
        return <Games active={active?.id === "games" && !locked && !panel} />;
      case "terminal":
        return <Terminal open={open} />;
      case "system":
        return <SystemInfo />;
      case "settings":
        return (
          <Settings
            preferences={preferences}
            update={updatePreference}
            reset={() => setPreferences(defaultPreferences)}
            fullscreen={fullscreen}
          />
        );
      default:
        return (
          <div className="editorial">
            <h1>Make yourself at home.</h1>
            <p className="lead">
              This is my little digital desktop. Click an app to explore. Drag
              windows by their title bar; use the traffic lights to close,
              minimize, or expand.
            </p>
            <p>
              On mobile, swipe horizontally inside an app to explore the next
              one. The dock is always there to help you find your way.
            </p>
            <button className="button" onClick={() => open("system")}>
              See keyboard shortcuts <Icon name="Keyboard" />
            </button>
          </div>
        );
    }
  }
  return (
    <main
      className={`desktop ${preferences.autoHideDock ? "dock-autohide" : ""} ${preferences.reducedMotion ? "motion-reduced" : ""} ${focusMode ? "focus-mode" : ""} ${aurora ? "aurora" : ""} ${locked ? "session-locked" : "session-open"} ${entering ? "session-entering" : ""}`}
      style={{ "--dock-icon-size": `${preferences.dockSize}px` }}
      onClick={(e) => {
        if (menu) setMenu(null);
        if (context) setContext(null);
        if (!e.target.closest(".desktop-app")) setSelected(null);
      }}
      onContextMenu={(e) => {
        if (
          e.target.closest(
            ".window,.dock,.menu-bar,.lock-screen,.system-overlay",
          )
        )
          return;
        e.preventDefault();
        setMenu(null);
        setContext({
          type: "desktop",
          x: Math.min(e.clientX, innerWidth - 225),
          y: Math.min(e.clientY, innerHeight - 210),
        });
      }}
    >
      <div className="wallpaper" />
      <div className="screen-bezel" aria-hidden="true" />
      <div className="camera-notch" aria-hidden="true">
        <i />
      </div>
      <div
        className="display-dimmer"
        aria-hidden="true"
        style={{ opacity: (100 - brightness) / 150 }}
      />
      <div
        className="desktop-session"
        inert={locked ? true : undefined}
        aria-hidden={locked ? true : undefined}
      >
        <div className="desktop-workspace" inert={panel ? true : undefined}>
          <nav className="menu-bar" aria-label="Desktop menu">
            <div className="menu-left">
              <button
                className="brand-mark"
                aria-label="Open system menu"
                onClick={(e) => {
                  e.stopPropagation();
                  setMenu(menu === "system" ? null : "system");
                }}
              >
                <img className="apple-mark" src={asset("macos/apple.svg")} alt="" width="14" height="17" />
              </button>
              <button
                ref={ownerRef}
                className="owner"
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuX(e.currentTarget.getBoundingClientRect().left);
                  setMenu(menu === "app" ? null : "app");
                }}
              >
                {nativeAppNames[active?.id] || titles[active?.id] || "Finder"}
              </button>
              {["File", "Edit", "View", ...(!active || active.id === "work" ? ["Go"] : []), "Window", "Help"].map((label) => (
                <button
                  className="menu-item"
                  key={label}
                  onClick={(e) => {
                    e.stopPropagation();
                    setMenuX(e.currentTarget.getBoundingClientRect().left);
                    setMenu(menu === label ? null : label);
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="menu-right">
              <button
                className="status-button spotlight-toggle"
                aria-label="Open Spotlight"
                onClick={(e) => {
                  e.stopPropagation();
                  showPanel("search");
                }}
              >
                <Icon name="Search" size={17} />
              </button>
              <button
                className={`status-button control-toggle ${menu === "controls" ? "selected" : ""}`}
                aria-label="Control Center"
                aria-expanded={menu === "controls"}
                onClick={(e) => {
                  e.stopPropagation();
                  setMenu(menu === "controls" ? null : "controls");
                }}
              >
                <Icon name="SlidersHorizontal" size={18} />
              </button>
              <button
                className="status-button"
                aria-label="Connection status"
                onClick={(e) => {
                  e.stopPropagation();
                  setMenu(menu === "controls" ? null : "controls");
                }}
              >
                <Icon name="Wifi" size={18} />
              </button>
              <button
                className="status-button"
                aria-label="Energy status"
                onClick={() => open("settings")}
              >
                <Icon name="BatteryFull" size={24} />
              </button>
              <button
                className="date-button"
                aria-label="Open Notification Center"
                aria-expanded={menu === "calendar"}
                onClick={(e) => {
                  e.stopPropagation();
                  setMenu(menu === "calendar" ? null : "calendar");
                }}
              >
                <time>
                  {clock.toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}{" "}
                  <span>
                    {clock.toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </span>
                </time>
              </button>
            </div>
          </nav>
          {menu === "controls" && (
            <section
              className="control-center"
              aria-label="Control Center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="control-network">
                <span className="control-symbol">
                  <Icon name="Wifi" />
                </span>
                <div>
                  <strong>Connection</strong>
                  <small>
                    {navigator.onLine ? "Browser online" : "Browser offline"}
                  </small>
                </div>
              </div>
              <button
                className={`control-focus ${focusMode ? "enabled" : ""}`}
                aria-pressed={focusMode}
                onClick={() => setFocusMode(!focusMode)}
              >
                <span className="control-symbol">
                  <Icon name="Moon" />
                </span>
                <div>
                  <strong>Focus</strong>
                  <small>{focusMode ? "Distractions hidden" : "Off"}</small>
                </div>
                <span>{focusMode ? "On" : "Off"}</span>
              </button>
              <label className="control-brightness">
                <strong>Display</strong>
                <span>
                  <Icon name="Sun" size={21} />
                  <input
                    type="range"
                    aria-label="Display brightness"
                    min="35"
                    max="100"
                    value={brightness}
                    onChange={(e) => setBrightness(Number(e.target.value))}
                  />
                </span>
              </label>
              <div className="control-footer">
                <button onClick={() => updatePreference("aurora", !aurora)}>
                  <Icon name="Sparkles" size={16} />
                  {aurora ? "Original wallpaper" : "Aurora wallpaper"}
                </button>
                <button onClick={lock}>Lock screen</button>
              </div>
            </section>
          )}
          {menu === "calendar" && (
            <CalendarPanel
              clock={clock}
              dismiss={() => setMenu(null)}
              activity={activity}
            />
          )}
          {menu && !["controls", "calendar"].includes(menu) && (
            <div
              className="menu-dropdown"
              role="menu"
              style={{ left: menu === "system" ? 15 : menuX }}
              onClick={(e) => e.stopPropagation()}
            >
              {(menu === "app"
                ? [
                    [`About ${nativeAppNames[active?.id] || titles[active?.id] || "Finder"}`, "system"],
                    ["System Settings…", "settings"],
                    ["Quit application", "quit-active"],
                  ]
                : menu === "system"
                  ? [
                      ["About This Mac", "system"],
                      ["System Settings…", "settings"],
                      ["Force Quit Application…", "quit-active"],
                      ["Sleep", "sleep"],
                      ["Restart…", "restart"],
                      ["Lock Screen", "lock"],
                    ]
                  : menu === "File" || menu === "Go"
                    ? apps.map((a) => [`Open ${a.name}`, a.id])
                    : menu === "Edit"
                      ? [["Copy portfolio address", "copy-address"]]
                      : menu === "Window"
                        ? [
                            ["Minimize window", "minimize"],
                            ["Zoom window", "maximize"],
                            ["Close window", "close"],
                            ["Move & Resize · Left half", "tile-left"],
                            ["Move & Resize · Right half", "tile-right"],
                            ["Return to floating window", "tile-reset"],
                            ...visible.map((w) => [titles[w.id], w.id]),
                          ]
                        : menu === "View"
                          ? [
                              ["Show desktop", "desktop"],
                              ["Spotlight Search…", "search"],
                              ["Applications", "apps"],
                              ["Mission Control", "mission"],
                              ["Switch application…", "switcher"],
                              ["Open About Me", "about"],
                              ["Toggle aurora wallpaper", "aurora"],
                            ]
                          : [
                              ["Getting started", "help"],
                              ["Keyboard shortcuts", "system"],
                              ["Contact Ethan", "contact"],
                            ]
              ).map(([label, id]) => (
                <button
                  key={label}
                  role="menuitem"
                  onClick={() => {
                    if (["search", "apps", "mission", "switcher"].includes(id))
                      desktopAction(id);
                    else if (id === "quit-active") {
                      if (active) quit(active.id);
                      setMenu(null);
                    } else if (id.startsWith("tile-")) {
                      if (active)
                        tile(
                          active.id,
                          id === "tile-reset" ? null : id.slice(5),
                        );
                      setMenu(null);
                    } else if (id === "copy-address") {
                      navigator.clipboard
                        .writeText(location.href)
                        .then(() => notify("Portfolio address copied."))
                        .catch(() =>
                          notify(
                            "Copy the portfolio address from your browser’s address bar.",
                          ),
                        );
                      setMenu(null);
                    } else if (["minimize", "maximize", "close"].includes(id)) {
                      if (active)
                        ({ minimize, maximize, close })[id](active.id);
                      setMenu(null);
                    } else if (id === "sleep") {
                      lock("sleep");
                    } else if (id === "restart") {
                      setWindows([{ id: "about", z: ++z.current, shift: 0 }]);
                      setRunning(["about"]);
                      lock("restart");
                    } else if (id === "lock") {
                      lock();
                    } else if (id === "desktop") {
                      showDesktop();
                    } else if (id === "aurora") {
                      updatePreference("aurora", (a) => !a);
                      setMenu(null);
                    } else open(id);
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
          <div className="desktop-icons" aria-label="Portfolio applications">
            {apps.map((app) => (
              <button
                key={app.id}
                className={`desktop-app ${selected === app.id ? "selected" : ""}`}
                aria-label={`Open ${app.name}`}
                onClick={() => (mobile ? open(app.id) : setSelected(app.id))}
                onDoubleClick={() => !mobile && open(app.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    open(app.id);
                  }
                }}
                onContextMenu={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelected(app.id);
                  setContext({
                    type: "app",
                    id: app.id,
                    x: Math.min(e.clientX, innerWidth - 225),
                    y: Math.min(e.clientY, innerHeight - 210),
                  });
                }}
              >
                <AppIcon app={app} desktop />
                <span>{app.name}</span>
              </button>
            ))}
          </div>
          <button
            className="sticky-note"
            onClick={() =>
              notify("You found a little note. Good people make good things. ♡")
            }
          >
            <span>
              A little corner
              <br />
              of the internet.
            </span>
            <span>
              Make yourself
              <br />
              at home. ♡
            </span>
          </button>
          <div className="desktop-caption">
            Good things start
            <br />
            with curiosity.
            <span />
          </div>
          {windows.map((win) => (
            <Window
              key={win.id}
              win={win}
              title={titles[win.id]}
              active={win.id === active?.id}
              mobile={mobile}
              hidden={win.minimized || (mobile && win.id !== active?.id)}
              onTile={tile}
              onFront={front}
              onClose={close}
              onMinimize={minimize}
              onMaximize={maximize}
              onSwipe={swipe}
            >
              <Suspense fallback={<div className="app-loading" role="status">Opening {titles[win.id]}…</div>}>{content(win.id)}</Suspense>
            </Window>
          ))}
          <nav className="dock" aria-label="Application dock">
            {[apps.find((app) => app.id === "work"), ...apps.filter((app) => app.id !== "work" && (!mobile || ["about", "life", "games", "contact"].includes(app.id)))].map((app) => (
              <button
                key={app.id}
                aria-label={`Open ${app.name}`}
                title={app.name}
                className={`dock-app ${running.includes(app.id) ? "running" : ""} ${active?.id === app.id ? "focused" : ""}`}
                onClick={() => open(app.id)}
                onContextMenu={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setContext({
                    type: "app",
                    id: app.id,
                    x: Math.min(e.clientX, innerWidth - 225),
                    y: Math.max(42, e.clientY - 185),
                  });
                }}
              >
                <span className="dock-tooltip">{app.name}</span>
                <AppIcon app={app} small />
                <i />
              </button>
            ))}
            <span className="dock-separator" />
            {[
              { id: "apps", label: "Applications", icon: "LayoutGrid" },
              {
                id: "settings",
                label: "System Settings",
                icon: "SlidersHorizontal",
              },
            ].map((tool) => (
              <button
                key={tool.id}
                className={`dock-app utility-dock utility-${tool.id}`}
                aria-label={tool.label}
                onClick={() =>
                  tool.id === "settings"
                    ? open("settings")
                    : desktopAction(tool.id)
                }
              >
                <span className="dock-tooltip">{tool.label}</span>
                <AppIcon app={{id: tool.id, color: "graphite"}} small />
                <i />
              </button>
            ))}
            <button
              className={`dock-app terminal-dock ${running.includes("terminal") ? "running" : ""}`}
              aria-label="Open Terminal"
              title="Terminal"
              onClick={() => open("terminal")}
            >
              <span className="dock-tooltip">Terminal</span>
              <AppIcon app={{ id: "terminal", color: "graphite" }} small />
              <i />
            </button>
          </nav>
          <div className="dock-reveal-zone" aria-hidden="true" />
          {context && (
            <div
              role="menu"
              aria-label="Desktop context menu"
              className="desktop-context menu-dropdown"
              style={{ left: context.x, top: context.y }}
              onClick={(e) => e.stopPropagation()}
            >
              {(context.type === "app"
                ? [
                    ["Open", () => open(context.id)],
                    ["Show all windows", () => showPanel("mission")],
                    ["Get Info", () => open("system")],
                    ["Quit", () => quit(context.id)],
                  ]
                : [
                    ["Show desktop", showDesktop],
                    ["Mission Control", () => showPanel("mission")],
                    ["Change wallpaper…", () => open("settings")],
                    ["System Settings…", () => open("settings")],
                  ]
              ).map(([label, handler]) => (
                <button
                  role="menuitem"
                  key={label}
                  onClick={() => {
                    handler();
                    setContext(null);
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
        {panel && panel !== "mission" && (
          <Spotlight
            key={panel}
            mode={panel === "search" ? "search" : panel}
            windows={windows}
            running={running}
            titles={titles}
            open={open}
            dismiss={() => setPanel(null)}
            action={desktopAction}
          />
        )}
        {panel === "mission" && (
          <MissionControl
            windows={windows}
            titles={titles}
            open={open}
            dismiss={() => setPanel(null)}
          />
        )}
        {toast && (
          <div role="status" className="toast">
            <Icon name="Sparkles" size={18} />
            {toast}
          </div>
        )}
        <div className="sr-only">
          {profile.name}, {profile.role}. Explore projects, professional
          journey, ideas, writing, contact, and resume. Use Alt with number keys
          1 through 9 to open apps.
        </div>
      </div>
      {locked && (
        <LockScreen
          clock={clock}
          entering={entering}
          onEnter={unlock}
          initialMode={lockMode}
        />
      )}
    </main>
  );
}
