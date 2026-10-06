import React, { useState } from "react";
import { personal } from "./personal-data";
import { Icon } from "./Icon";
import { asset } from "./assets";
import "./personal.css";

export default function Personal({ open }) {
  const [tab, setTab] = useState("Off the clock");
  const [place, setPlace] = useState(personal.places[0] || null);
  const tabs = ["Off the clock", "Places", "Toolbox", "Little things"];
  return <div className="personal-app">
    <header className="personal-toolbar"><span><Icon name="Compass" size={18} /> Personal journal</span>
      <div role="tablist" aria-label="Personal journal sections">{tabs.map((name, index) => <button key={name} id={`life-tab-${index}`} role="tab" aria-selected={tab === name} aria-controls="life-panel" tabIndex={tab === name ? 0 : -1} onClick={() => setTab(name)} onKeyDown={(e) => {
        if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) {
          e.preventDefault();
          const next = e.key === "Home" ? 0 : e.key === "End" ? tabs.length - 1 : (index + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
          setTab(tabs[next]); document.getElementById(`life-tab-${next}`)?.focus();
        }
      }}>{name}</button>)}</div>
    </header>
    <section id="life-panel" role="tabpanel" aria-labelledby={`life-tab-${tabs.indexOf(tab)}`} className="personal-content">
      {tab === "Off the clock" && <>
        <div className="personal-intro"><div><span className="personal-eyebrow">A person behind the projects</span><h1>Still building.<br /><em>Still curious.</em></h1><p>Ideas. Travel. Tech. People. Impact. A few of the things that connect my work with the world outside it.</p><button className="button" onClick={() => open("games")}>Take a little break <Icon name="ArrowRight" size={16} /></button></div><figure><img src={asset("photos/ethan-still-building.webp")} alt="Ethan Barman outdoors — Still Building" width="720" height="900" loading="lazy" /><figcaption>Always a work in progress.</figcaption></figure></div>
        <h2 className="personal-section-title">Things that keep me curious</h2>
        <div className="interest-grid">{personal.interests.map((interest, i) => <article key={interest.title}><span className={`interest-number interest-${i}`}>{String(i + 1).padStart(2, "0")}</span><h3>{interest.title}</h3><p>{interest.description}</p></article>)}</div>
        {personal.hobbies.length > 0 && <><h2 className="personal-section-title">Away from the screen</h2><div className="hobby-list">{personal.hobbies.map(hobby => <article key={hobby.title}><Icon name={hobby.icon || "Sparkles"} size={24} /><div><h3>{hobby.title}</h3><p>{hobby.description}</p></div></article>)}</div></>}
      </>}
      {tab === "Toolbox" && <>
        <span className="personal-eyebrow">Founder. Operator. Developer.</span><h1>My technical toolbox.</h1><p className="personal-lead">The tools and foundations behind the things I build.</p>
        <div className="toolbox-summary"><strong>I build the Hostizzy products.</strong><p>I develop the projects in Hostizzy’s GitHub organization, connecting hospitality experience with hands-on software development. From the first product decision to the code and the release.</p></div>
        <div className="skill-grid">{personal.skills.map(skill => <article key={skill.title}><h2>{skill.title}</h2><div className="skill-tags">{skill.tags.map(tag => <span key={tag}>{tag}</span>)}</div><p>{skill.description}</p></article>)}</div>
        <div className="toolbox-sources"><a href="https://github.com/Hostizzy" target="_blank" rel="noopener noreferrer">Explore my repositories ↗</a><a href="https://www.linkedin.com/in/ethanbarman" target="_blank" rel="noopener noreferrer">Background & certifications ↗</a></div>
      </>}
      {tab === "Places" && <>
        <span className="personal-eyebrow">The world beyond this desktop</span><h1>Places & perspectives.</h1><p className="personal-lead">A personal travel journal. Places, little discoveries, and the stories worth keeping.</p>
        {personal.places.length ? <><div className="travel-stats"><strong>{personal.places.length}<small>places in the journal</small></strong><strong>{new Set(personal.places.map(p => p.country)).size}<small>{new Set(personal.places.map(p => p.country)).size === 1 ? "country" : "countries"} in this journal</small></strong></div><div className="place-grid">{personal.places.map(p => <button key={p.name} onClick={() => setPlace(p)} aria-expanded={place?.name === p.name}><Icon name="Mountain" size={24} /><span><strong>{p.name}</strong><small>{p.country} {p.year ? `· ${p.year}` : ""}</small></span><Icon name="ArrowRight" size={17} /></button>)}</div>{place && <article className="place-story" aria-live="polite"><span className="personal-eyebrow">A page from the journal</span><h2>{place.name}</h2><p>{place.story}</p><a href={place.source} target="_blank" rel="noopener noreferrer">See the original travel post ↗</a></article>}</> : <div className="travel-empty"><div className="passport-stamp">More<br />stories<br /><span>to come</span></div><h2>The journal is taking shape.</h2><p>A few places. A few good stories.<br />The next pages will land here soon.</p><button className="button" onClick={() => open("work")}>Explore what I’m building <Icon name="ArrowRight" size={16} /></button></div>}
      </>}
      {tab === "Little things" && <><span className="personal-eyebrow">A few things to know</span><h1>Small details.<br />A little more me.</h1><div className="little-things">{personal.littleThings.map((item, i) => <article key={item.title}><span>0{i + 1}</span><div><h2>{item.title}</h2><p>{item.description}</p></div></article>)}</div><div className="personal-links"><button className="button primary" onClick={() => open("games")}>Open the arcade <Icon name="ArrowRight" size={17} /></button>{personal.socials.map(s => <a className="button" key={s.name} href={s.url} target="_blank" rel="noopener noreferrer">{s.name}<Icon name="ArrowUpRight" size={16} /></a>)}</div></>}
    </section>
  </div>;
}

