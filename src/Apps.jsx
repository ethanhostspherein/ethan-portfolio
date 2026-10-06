import React, { useState } from "react";
import { Icon } from "./Icon";
import { profile, projects, notes, sources } from "./data";
import { QuickLook } from "./DesktopTools";
import { asset } from "./assets";
import EditorialHome from "./EditorialHome";
import AppShelf, { developedApps } from "./AppShelf";
export function About({ open }) {
  return <EditorialHome open={open} />;
}
function ProductArt({ project }) {
  if (project.image)
    return (
      <img
        className="project-image"
        src={project.image}
        alt={`${project.name} public website preview`}
        loading="lazy"
        width="720"
        height="470"
      />
    );
  return (
    <div
      className={`product-art art-${project.id}`}
      style={{ background: project.color }}
    >
      <div className="mini-product">
        <div className="mini-side">
          <strong>
            {project.name.toLowerCase()}
            <span>®</span>
          </strong>
          <span>My workspace</span>
          <span>Overview</span>
          <span>Collections</span>
          <span>Settings</span>
        </div>
        <div className="mini-main">
          <small>
            {project.id === "orbit"
              ? "MONDAY, A FRESH START"
              : project.id === "fieldnotes"
                ? "YOUR EVERYDAY, REMEMBERED"
                : "BUILT WITH INTENTION"}
          </small>
          <h3>
            {project.id === "orbit"
              ? "A little more focus."
              : project.id === "fieldnotes"
                ? "The good little things."
                : "Space to create."}
          </h3>
          <div className="mini-panels">
            {[1, 2, 3].map((n) => (
              <div key={n}>
                <span className="mini-orb" />
                <i />
                <i />
                <i />
              </div>
            ))}
          </div>
          <p>{project.tag}</p>
        </div>
      </div>
    </div>
  );
}
export function Work({ open, mobile }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All projects");
  const [selected, setSelected] = useState(null),
    [preview, setPreview] = useState(null),
    [view, setView] = useState("grid");
  return (
    <>
      <div className="finder" inert={preview ? true : undefined}>
        <aside>
          <small>FAVORITES</small>
          {[
            "All projects",
            "Hospitality & operations",
            "Travel technology",
            "Hospitality software",
            "Civic technology",
          ].map((f, i) => (
            <button
              className={filter === f ? "selected" : ""}
              onClick={() => setFilter(f)}
              key={f}
            >
              <Icon name={i ? "Folder" : "LayoutGrid"} size={17} />
              {f}
            </button>
          ))}
          <div className="sidebar-bottom">
            <Icon name="HardDrive" size={16} />
            Ethan’s workspace
          </div>
        </aside>
        <div className="finder-main">
          <div className="app-toolbar">
            <span>
              Selected work <small> / {projects.length} projects</small>
            </span>
            <div className="finder-view-controls">
              <button
                aria-label="Grid view"
                aria-pressed={view === "grid"}
                onClick={() => setView("grid")}
              >
                <Icon name="LayoutGrid" size={16} />
              </button>
              <button
                aria-label="List view"
                aria-pressed={view === "list"}
                onClick={() => setView("list")}
              >
                <Icon name="FileText" size={16} />
              </button>
              <button
                aria-label="Quick Look selected project"
                disabled={!selected}
                onClick={() =>
                  setPreview(projects.find((p) => p.id === selected))
                }
              >
                ◉
              </button>
            </div>
            <label className="search">
              <Icon name="Search" size={16} />
              <input
                aria-label="Search projects"
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
          </div>
          {filter === "All projects" && !query && <AppShelf open={open} />}
          <div
            className={`project-list ${view === "list" ? "finder-list-view" : ""}`}
          >
            {projects
              .filter(
                (p) =>
                  (filter === "All projects" || p.type === filter) &&
                  `${p.name} ${p.type}`
                    .toLowerCase()
                    .includes(query.toLowerCase()),
              )
              .map((p) => (
                <button
                  className={`project-card ${selected === p.id ? "selected" : ""}`}
                  key={p.id}
                  aria-label={`Open ${p.name}`}
                  onClick={() => (mobile ? open(p.id) : setSelected(p.id))}
                  onDoubleClick={() => !mobile && open(p.id)}
                  onKeyDown={(e) => {
                    if (e.key === " ") {
                      e.preventDefault();
                      setSelected(p.id);
                      setPreview(p);
                    }
                    if (e.key === "Enter") {
                      e.preventDefault();
                      open(p.id);
                    }
                  }}
                >
                  <ProductArt project={p} />
                  <div className="project-label">
                    <div>
                      <h3>
                        {p.name}
                        <Icon name="ArrowUpRight" size={16} />
                      </h3>
                      <p>{p.type}</p>
                    </div>
                    <small>{p.year}</small>
                  </div>
                </button>
              ))}
            {!projects.some(
              (p) =>
                (filter === "All projects" || p.type === filter) &&
                `${p.name} ${p.type}`
                  .toLowerCase()
                  .includes(query.toLowerCase()),
            ) && (
              <p className="empty">
                No matching projects. Try a different search.
              </p>
            )}
          </div>
          <footer>
            {mobile
              ? "Tap a project to explore"
              : "Double-click to open · select and press Space for Quick Look"}
          </footer>
        </div>
      </div>
      {preview && (
        <QuickLook
          project={preview}
          open={open}
          dismiss={() => setPreview(null)}
        />
      )}
    </>
  );
}
export function Project({ id, open }) {
  const p = projects.find((p) => p.id === id);
  return (
    <article className="project-detail">
      <ProductArt project={p} />
      <div className="detail-copy">
        <span className="detail-meta">
          {p.type} · {p.year}
        </span>
        <h1>{p.name}</h1>
        <h2>{p.tag}</h2>
        <p>{p.description}</p>
        <div className="detail-columns">
          <div>
            <h3>My role</h3>
            <p>{p.role}</p>
          </div>
          <div>
            <h3>The outcome</h3>
            <p>{p.result}</p>
          </div>
        </div>
        <h3>What makes it work</h3>
        <ul>
          {p.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
        <div className="actions">
          {developedApps.find(app => app.project === id)?.play && <a className="button play-store-link" href={developedApps.find(app => app.project === id).play} target="_blank" rel="noopener noreferrer">Get it on Google Play <Icon name="ArrowUpRight" size={16} /></a>}
          <a
            className="button primary"
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit {p.name} <Icon name="ArrowUpRight" size={16} />
          </a>
          <a
            className="source-link"
            href={p.source}
            target="_blank"
            rel="noopener noreferrer"
          >
            Public source <Icon name="ExternalLink" size={12} />
          </a>
        </div>
      </div>
    </article>
  );
}
export function Journey() {
  return (
    <article className="editorial">
      <span className="section-icon">
        <Icon name="Mountain" size={30} />
      </span>
      <h1>A journey in the making.</h1>
      <p className="lead">
        A few chapters, a lot of curiosity, and the things I learned along the
        way.
      </p>
      <div className="timeline">
        {[
          [
            "2026",
            "Travel technology",
            "A connected hospitality ecosystem",
            "JuxTravel launches across India. HostOS and ResIQ support the operating side of the business.",
          ],
          [
            "2024 — 2025",
            "Hostizzy",
            "Operations meet technology",
            "Expanding property operations, earning Airbnb Superhost recognition, and building in-house software.",
          ],
          [
            "2021 — 2023",
            "Hostizzy",
            "Building the foundations",
            "From early Delhi NCR properties to an incorporated business and a growing hospitality team.",
          ],
          [
            "2017 — 2019",
            "Airbnb · LinkedIn-listed role",
            "Inside the guest experience",
            "Quality Analyst experience before building a hospitality business of his own.",
          ],
          [
            "2014 — 2017",
            "Google · LinkedIn-listed role",
            "A technology chapter",
            "Quality Analyst experience listed on Ethan’s public professional profile.",
          ],
        ].map(([date, company, title, body]) => (
          <section key={date}>
            <span className="timeline-dot" />
            <small>{date}</small>
            <h2>{title}</h2>
            <span>{company}</span>
            <p>{body}</p>
          </section>
        ))}
      </div>
      <small className="sample-note">
        Sources: Hostizzy’s company timeline and public LinkedIn profile.
      </small>
    </article>
  );
}
export function Ideas() {
  const [selected, setSelected] = useState(null);
  const ideas = [
    [
      "AI-assisted building",
      "Domain expertise meets useful tools",
      "An ongoing theme in Ethan’s public posts: start with a real operational problem, use AI collaboratively, and iterate toward working software.",
      "Public theme",
      "Sparkles",
    ],
    [
      "Human-first travel",
      "Make the trip fit the person",
      "JuxTravel explores preference-led discovery, practical reality checks, and a more personal travel experience.",
      "Product direction",
      "Compass",
    ],
    [
      "Hospitality operating systems",
      "Better tools for everyday operations",
      "HostOS and ResIQ connect founder-led product work with real-world property and reservation workflows.",
      "Building in public",
      "Layers",
    ],
  ];
  return (
    <div className="editorial">
      <h1>Small ideas. Open possibilities.</h1>
      <p className="lead">
        The experiments on my desk. Some will become something. Others are here
        for the joy of making.
      </p>
      <div className="idea-list">
        {ideas.map(([name, tag, body, status, icon], i) => (
          <section key={name}>
            <span className={`idea-symbol idea-${i}`}>
              <Icon name={icon} size={30} />
            </span>
            <div>
              <small>{status}</small>
              <h2>{name}</h2>
              <p>{tag}</p>
            </div>
            <button
              aria-label={`Explore ${name}`}
              className="icon-button"
              onClick={() => setSelected(selected === i ? null : i)}
            >
              <Icon name={selected === i ? "Minus" : "Plus"} />
            </button>
            {selected === i && <p className="idea-description">{body}</p>}
          </section>
        ))}
      </div>
      <p className="sample-note">
        Directions drawn from public projects and posts; not claims of
        unreleased products.
      </p>
    </div>
  );
}
export function Writing() {
  const [current, setCurrent] = useState(0),
    [query, setQuery] = useState("");
  return (
    <div className="notes">
      <aside>
        <div className="notes-heading">
          <Icon name="NotebookPen" size={20} />
          <strong>All notes</strong>
          <span>{notes.length}</span>
        </div>
        <label className="search">
          <Icon name="Search" size={15} />
          <input
            aria-label="Search notes"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search notes"
          />
        </label>
        {notes.map(
          (n, i) =>
            n.title.toLowerCase().includes(query.toLowerCase()) && (
              <button
                key={n.title}
                className={current === i ? "selected" : ""}
                onClick={() => setCurrent(i)}
              >
                <strong>{n.title}</strong>
                <small>{n.date}</small>
                <p>{n.preview}</p>
              </button>
            ),
        )}
      </aside>
      <article>
        <span className="note-date">{notes[current].date}</span>
        <h1>{notes[current].title}</h1>
        {notes[current].body.map((p) => (
          <p key={p}>{p}</p>
        ))}
        <a
          className="source-link"
          href={notes[current].url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Read the original <Icon name="ArrowUpRight" size={15} />
        </a>
      </article>
    </div>
  );
}
export function Contact() {
  const [ready, setReady] = useState(false);
  function compose(e) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(f.get("subject"))}&body=${encodeURIComponent(`From: ${f.get("name")} <${f.get("email")}>\n\n${f.get("message")}`)}`;
    setReady(true);
  }
  return (
    <div className="mail">
      <aside>
        <span className="mail-symbol">
          <Icon name="Mail" size={35} />
        </span>
        <h2>Good things start with a hello.</h2>
        <p>
          A project, an interesting idea, or just a conversation. I’d love to
          hear from you.
        </p>
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
        <small>Public business contact · New Delhi, India.</small>
      </aside>
      <form onSubmit={compose}>
        <div className="mail-heading">
          <Icon name="SquarePen" size={19} />
          <strong>New message</strong>
        </div>
        <label>
          To <input readOnly aria-label="Recipient" value={profile.email} />
        </label>
        <label>
          Name{" "}
          <input
            name="name"
            required
            placeholder="Your name"
            autoComplete="name"
          />
        </label>
        <label>
          From{" "}
          <input
            name="email"
            required
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
          />
        </label>
        <label>
          Subject{" "}
          <input
            name="subject"
            required
            placeholder="Let’s build something good"
          />
        </label>
        <textarea
          name="message"
          aria-label="Message"
          required
          placeholder="Hi Ethan,\n\nI have something in mind…"
        />
        <div className="mail-footer">
          <span>
            {ready
              ? "Email draft opened. Send it in your email app."
              : "Opens a draft in your email app."}
          </span>
          <button type="submit" className="button primary">
            Create draft <Icon name="Send" size={16} />
          </button>
        </div>
      </form>
    </div>
  );
}
export function Resume() {
  const [zoom, setZoom] = useState(100);
  return (
    <div className="resume">
      <div className="app-toolbar">
        <span>Ethan-Barman-Profile.pdf</span>
        <div>
          <button
            className="icon-button"
            aria-label="Zoom out"
            disabled={zoom <= 75}
            onClick={() => setZoom((z) => z - 25)}
          >
            <Icon name="Minus" size={15} />
          </button>
          <span>{zoom}%</span>
          <button
            className="icon-button"
            aria-label="Zoom in"
            disabled={zoom >= 150}
            onClick={() => setZoom((z) => z + 25)}
          >
            <Icon name="Plus" size={15} />
          </button>
          <a className="button primary compact" href={asset("resume.pdf")} download>
            <Icon name="Download" size={16} />
            Download
          </a>
        </div>
      </div>
      <div className="paper-stage">
        <article className="resume-paper" style={{ fontSize: `${zoom}%` }}>
          <h1>{profile.name}</h1>
          <p className="resume-role">{profile.role}</p>
          <small>{profile.email} · New Delhi, India</small>
          <hr />
          <h2>Profile</h2>
          <p>
            I build things that make the internet feel a little more useful.
            Co-Founder & CEO of Hostizzy, building at the intersection of
            hospitality, travel, and technology.
          </p>
          <h2>Experience</h2>
          <h3>
            Co-Founder & CEO, Hostizzy <span>Current</span>
          </h3>
          <p>
            Hospitality operations, product strategy, technology, and client
            relationships.
          </p>
          <h3>
            Quality Analyst, Airbnb <span>2017 — 2019</span>
          </h3>
          <p>Role and dates listed on Ethan’s public LinkedIn profile.</p>
          <h2>Selected projects</h2>
          {projects.map((p) => (
            <p key={p.id}>
              <strong>{p.name}</strong> — {p.role}
            </p>
          ))}
          <h2>Skills</h2>
          <p>
            Hospitality operations · Product strategy · AI-assisted development
            · Guest experience · Travel technology
          </p>
          <footer>
            Public-source professional profile. Sources: LinkedIn and Hostizzy.
            Compiled October 2026.
          </footer>
        </article>
      </div>
    </div>
  );
}
export function Terminal({ open }) {
  const [history, setHistory] = useState([
      "Welcome to Ethan’s little corner of the internet.",
      "Type help to discover what’s here.",
    ]),
    [command, setCommand] = useState("");
  function run(e) {
    e.preventDefault();
    const c = command.trim().toLowerCase();
    let result = "Command not found. Try help.";
    if (c === "clear") {
      setHistory([]);
      setCommand("");
      return;
    }
    if (c === "help")
      result =
        "Commands: about, work, ideas, contact, whoami, date, coffee, clear";
    if (["about", "work", "ideas", "contact"].includes(c)) {
      open(c);
      result = `Opening ${c}…`;
    }
    if (c === "whoami")
      result = `${profile.name} — founder, operator, curious builder.`;
    if (c === "date") result = new Date().toLocaleString();
    if (c === "coffee") result = "☕ Brewing ideas… one cup at a time.";
    setHistory((h) => [...h, `guest ~ % ${command}`, result]);
    setCommand("");
  }
  return (
    <div className="terminal-body">
      {history.map((line, i) => (
        <div key={i}>{line}</div>
      ))}
      <form onSubmit={run}>
        <label htmlFor="terminal-command">guest ~ % </label>
        <input
          id="terminal-command"
          data-autofocus
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          autoComplete="off"
          spellCheck="false"
        />
      </form>
    </div>
  );
}
export function SystemInfo() {
  return (
    <div className="system-info">
      <img className="system-apple" src={asset("macos/apple.svg")} alt="" width="48" height="58" />
      <h1>Ethan’s MacBook</h1>
      <p>Designed for curiosity. Built for the web.</p>
      <dl>
        <dt>Version</dt>
        <dd>1.0 · Personal edition</dd>
        <dt>Powered by</dt>
        <dd>React, coffee & good intentions</dd>
        <dt>Memory</dt>
        <dd>A lifetime of interesting things</dd>
        <dt>Shortcuts</dt>
        <dd>
          Alt + 1–9 · Open apps
          <br />
          Alt + T · Terminal
          <br />
          Alt + I · System info
          <br />
          ⌘ / Ctrl + Space · Spotlight
          <br />
          Alt + K · Spotlight (browser shortcut)
          <br />
          Alt + M · Mission Control
          <br />
          Alt + ` · App switcher
          <br />
          ⌘ / Ctrl + M · Minimize
          <br />
          ⌘ / Ctrl + W · Close window
          <br />
          Escape · Dismiss menus and overlays
        </dd>
      </dl>
      <small>Try ↑ ↑ ↓ ↓ ← → ← → B A. A little surprise awaits.</small>
    </div>
  );
}
