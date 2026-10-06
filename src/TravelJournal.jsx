import React, { useRef, useState } from "react";
import { Icon } from "./Icon";
import { asset } from "./assets";
import credits from "../public/travel/credits.json";

const locations = {
  Amritsar: ["amritsar", "Heritage", "Punjab"],
  Manali: ["manali", "Hills", "Himachal Pradesh"],
  "McLeod Ganj": ["mcleod-ganj", "Hills", "Himachal Pradesh"],
  Mukteshwar: ["mukteshwar", "Hills", "Uttarakhand"],
  Kashmir: ["kashmir", "Hills", "Kashmir"],
  Mumbai: ["mumbai", "Cities", "Maharashtra"],
  Haridwar: ["haridwar", "Heritage", "Uttarakhand"],
  Kolkata: ["kolkata", "Cities", "West Bengal"],
  Guwahati: ["guwahati", "Cities", "Assam"],
  Shimla: ["shimla", "Hills", "Himachal Pradesh"],
  "Kainchi Dham": ["kainchi-dham", "Heritage", "Uttarakhand"],
};

export default function TravelJournal({ places }) {
  const [filter, setFilter] = useState("All places");
  const [selected, setSelected] = useState("Kashmir");
  const hero = useRef(null);
  const filtered = places.filter(
    (p) => filter === "All places" || locations[p.name]?.[1] === filter,
  );
  const place = filtered.find((p) => p.name === selected) || filtered[0];
  const [slug, , region] = locations[place.name];
  const credit = credits[slug];
  const index = filtered.indexOf(place);
  function move(direction) {
    setSelected(
      filtered[(index + direction + filtered.length) % filtered.length].name,
    );
  }
  function choose(name) {
    setSelected(name);
    hero.current?.scrollIntoView({
      block: "start",
      behavior:
        window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        document.querySelector(".reduced-motion")
          ? "auto"
          : "smooth",
    });
  }
  return (
    <div className="destination-journal">
      <header className="destination-heading">
        <h1>
          A little further
          <br />
          from the screen.
        </h1>
        <p>
          Eleven places. Different perspectives.
          <br />A few pages from my travels around India.
        </p>
      </header>
      <nav className="destination-filters" aria-label="Filter destinations">
        {["All places", "Hills", "Cities", "Heritage"].map((name) => (
          <button
            key={name}
            aria-pressed={filter === name}
            onClick={() => setFilter(name)}
          >
            {name}
          </button>
        ))}
      </nav>
      <figure className="destination-feature" ref={hero}>
        <img
          key={slug}
          src={asset(`travel/${slug}.webp`)}
          alt={`Destination photograph: ${credit.title.replace(/^File:/, "")}`}
          width="960"
          height="640"
          loading="lazy"
          decoding="async"
        />
        <figcaption>
          <span>
            {region}
            {place.year ? ` · ${place.year}` : ""}
          </span>
          <h2>{place.name}</h2>
          <div className="destination-controls">
            <button aria-label="Previous destination" onClick={() => move(-1)}>
              <Icon name="ArrowRight" size={20} className="previous-arrow" />
            </button>
            <span>
              {index + 1} / {filtered.length}
            </span>
            <button aria-label="Next destination" onClick={() => move(1)}>
              <Icon name="ArrowRight" size={20} />
            </button>
          </div>
        </figcaption>
      </figure>
      <div className="destination-context" aria-live="polite">
        <p>
          {place.ownerSupplied
            ? `${place.name} is part of my travel journal. Explore the other stops below.`
            : place.story}
        </p>
        {place.source && (
          <a href={place.source} target="_blank" rel="noopener noreferrer">
            My original post <Icon name="ArrowUpRight" size={14} />
          </a>
        )}
      </div>
      <div className="photo-credit">
        Destination photo by{" "}
        <a href={credit.source} target="_blank" rel="noopener noreferrer">
          {credit.credit}
        </a>{" "}
        ·{" "}
        <a href={credit.licenseUrl} target="_blank" rel="noopener noreferrer">
          {credit.license}
        </a>
        <span>
          Resized; cropped in this view. Illustrative destination photography.
        </span>
      </div>
      <div className="destination-contact-sheet">
        {filtered.map((p) => {
          const [id, , location] = locations[p.name];
          return (
            <button
              className={p.name === place.name ? "selected-destination" : ""}
              key={p.name}
              aria-label={`View ${p.name} photograph`}
              aria-pressed={p.name === place.name}
              onClick={() => choose(p.name)}
            >
              <img
                src={asset(`travel/${id}.webp`)}
                alt=""
                width="320"
                height="220"
                loading="lazy"
                decoding="async"
              />
              <span>
                <strong>{p.name}</strong>
                <small>{location}</small>
              </span>
            </button>
          );
        })}
      </div>
      <details className="photo-credits-list">
        <summary>Photography & credits</summary>
        <p>
          Destination photos illustrate places I’ve visited; they are
          contributed by the photographers below. Images were resized and are
          cropped for display.
        </p>
        {places.map((p) => {
          const [id] = locations[p.name];
          const c = credits[id];
          return (
            <div key={id}>
              <a href={c.source} target="_blank" rel="noopener noreferrer">
                {p.name} — {c.credit}
              </a>
              <a href={c.licenseUrl} target="_blank" rel="noopener noreferrer">
                {c.license}
              </a>
            </div>
          );
        })}
      </details>
    </div>
  );
}
