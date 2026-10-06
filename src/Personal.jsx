import React, { useState } from "react";
import { personal } from "./personal-data";
import { Icon } from "./Icon";
import { asset } from "./assets";
import "./personal.css";
import TravelJournal from "./TravelJournal";

export default function Personal({ open }) {
  const [tab, setTab] = useState("Off the clock");

  const tabs = ["Off the clock", "Places", "Toolbox", "Little things"];
  return (
    <div
      className={`personal-app personal-${tab.toLowerCase().replaceAll(" ", "-")}`}
    >
      <header className="personal-toolbar">
        <span>
          <Icon name="Compass" size={18} /> Personal journal
        </span>
        <div role="tablist" aria-label="Personal journal sections">
          {tabs.map((name, index) => (
            <button
              key={name}
              id={`life-tab-${index}`}
              role="tab"
              aria-selected={tab === name}
              aria-controls="life-panel"
              tabIndex={tab === name ? 0 : -1}
              onClick={() => setTab(name)}
              onKeyDown={(e) => {
                if (
                  ["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)
                ) {
                  e.preventDefault();
                  const next =
                    e.key === "Home"
                      ? 0
                      : e.key === "End"
                        ? tabs.length - 1
                        : (index +
                            (e.key === "ArrowRight" ? 1 : -1) +
                            tabs.length) %
                          tabs.length;
                  setTab(tabs[next]);
                  document.getElementById(`life-tab-${next}`)?.focus();
                }
              }}
            >
              {name}
            </button>
          ))}
        </div>
      </header>
      <section
        id="life-panel"
        role="tabpanel"
        aria-labelledby={`life-tab-${tabs.indexOf(tab)}`}
        className="personal-content"
      >
        {tab === "Off the clock" && (
          <>
            <div className="personal-intro">
              <div>
                <span className="personal-eyebrow">
                  A person behind the projects
                </span>
                <h1>
                  Still building.
                  <br />
                  <em>Still curious.</em>
                </h1>
                <p>
                  Ideas. Travel. Tech. People. Impact. A few of the things that
                  connect my work with the world outside it.
                </p>
                <button className="button" onClick={() => open("games")}>
                  Take a little break <Icon name="ArrowRight" size={16} />
                </button>
              </div>
              <figure>
                <img
                  src={asset("photos/ethan-still-building.webp")}
                  alt="Ethan Barman outdoors — Still Building"
                  width="720"
                  height="900"
                  loading="lazy"
                />
                <figcaption>Always a work in progress.</figcaption>
              </figure>
            </div>
            <h2 className="personal-section-title">
              Things that keep me curious
            </h2>
            <div className="interest-grid">
              {personal.interests.map((interest, i) => (
                <article key={interest.title}>
                  <span className={`interest-number interest-${i}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3>{interest.title}</h3>
                  <p>{interest.description}</p>
                </article>
              ))}
            </div>
            {personal.hobbies.length > 0 && (
              <>
                <h2 className="personal-section-title">Away from the screen</h2>
                <div className="hobby-list">
                  {personal.hobbies.map((hobby) => (
                    <article key={hobby.title}>
                      <Icon name={hobby.icon || "Sparkles"} size={24} />
                      <div>
                        <h3>{hobby.title}</h3>
                        <p>{hobby.description}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </>
            )}
          </>
        )}
        {tab === "Toolbox" && (
          <>
            <span className="personal-eyebrow">
              Founder. Operator. Developer.
            </span>
            <h1>My technical toolbox.</h1>
            <p className="personal-lead">
              The tools and foundations behind the things I build.
            </p>
            <div className="toolbox-summary">
              <strong>I build the Hostizzy products.</strong>
              <p>
                I develop the projects in Hostizzy’s GitHub organization,
                connecting hospitality experience with hands-on software
                development. From the first product decision to the code and the
                release.
              </p>
            </div>
            <div className="skill-grid">
              {personal.skills.map((skill) => (
                <article key={skill.title}>
                  <h2>{skill.title}</h2>
                  <div className="skill-tags">
                    {skill.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <p>{skill.description}</p>
                </article>
              ))}
            </div>
            <div className="toolbox-sources">
              <a
                href="https://github.com/Hostizzy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Explore my repositories ↗
              </a>
              <a
                href="https://www.linkedin.com/in/ethanbarman"
                target="_blank"
                rel="noopener noreferrer"
              >
                Background & certifications ↗
              </a>
            </div>
          </>
        )}
        {tab === "Places" && <TravelJournal places={personal.places} />}
        {tab === "Little things" && (
          <>
            <span className="personal-eyebrow">A few things to know</span>
            <h1>
              Small details.
              <br />A little more me.
            </h1>
            <div className="little-things">
              {personal.littleThings.map((item, i) => (
                <article key={item.title}>
                  <span>0{i + 1}</span>
                  <div>
                    <h2>{item.title}</h2>
                    <p>{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className="personal-links">
              <button className="button primary" onClick={() => open("games")}>
                Open the arcade <Icon name="ArrowRight" size={17} />
              </button>
              {personal.socials.map((s) => (
                <a
                  className="button"
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {s.name}
                  <Icon name="ArrowUpRight" size={16} />
                </a>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
