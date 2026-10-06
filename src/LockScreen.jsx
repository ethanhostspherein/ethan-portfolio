import React, { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { profile } from "./data";
import { asset } from "./assets";

export default function LockScreen({
  clock,
  entering,
  onEnter,
  initialMode = "login",
}) {
  const [mode, setMode] = useState(initialMode);
  const timer = useRef(null);
  useEffect(() => {
    function key(e) {
      if (e.target.closest("button") && mode === "login") return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (mode === "sleep") setMode("login");
        else if (mode === "login" && !entering) onEnter();
      }
    }
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [mode, entering, onEnter]);
  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => {
    if (initialMode === "restart")
      timer.current = setTimeout(() => setMode("login"), 1300);
  }, []);
  function restart() {
    setMode("restart");
    timer.current = setTimeout(() => setMode("login"), 1300);
  }
  if (mode === "sleep")
    return (
      <button
        className="sleep-screen"
        aria-label="Wake desktop"
        onClick={() => setMode("login")}
      >
        <Icon name="Moon" size={29} />
        <span>Click anywhere to wake</span>
      </button>
    );
  if (mode === "restart")
    return (
      <section
        className="boot-screen"
        role="status"
        aria-label="Restarting portfolio"
      >
        <img className="boot-apple" src={asset("macos/apple.svg")} alt="" width="64" height="77" />
        <div className="boot-progress">
          <i />
        </div>
        <span className="sr-only">Starting your desktop…</span>
      </section>
    );
  return (
    <section
      className={`lock-screen ${entering ? "unlocking" : ""}`}
      aria-label="Welcome to Ethan’s desktop"
    >
      <div className="lock-status" aria-hidden="true">
        <Icon name="Wifi" size={23} />
        <Icon name="BatteryFull" size={29} />
      </div>
      <div className="lock-clock">
        <p>
          {clock.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </p>
        <time>
          {clock.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: false,
          })}
        </time>
      </div>
      <div className="lock-profile">
        <div className="lock-avatar" aria-hidden="true">
          <img
            src={asset("photos/ethan-headshot.webp")}
            alt=""
            width="360"
            height="432"
            decoding="async"
            fetchPriority="high"
          />
        </div>
        <h1>{profile.name}</h1>
        <p>A little corner of the internet.</p>
        <button className="login-button" onClick={onEnter} disabled={entering}>
          <span>{entering ? "Welcome home" : "Enter desktop"}</span>
          <span className="login-arrow">
            <Icon name="ArrowRight" size={28} />
          </span>
        </button>
        <small>No password needed. Just curiosity.</small>
      </div>
      <div className="lock-actions">
        <button onClick={() => setMode("sleep")}>
          <span>
            <Icon name="Moon" size={25} />
          </span>
          Sleep
        </button>
        <button onClick={restart}>
          <span>
            <Icon name="RotateCcw" size={25} />
          </span>
          Restart
        </button>
      </div>
    </section>
  );
}
