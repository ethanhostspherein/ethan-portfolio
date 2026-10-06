import React, { useState } from "react";
import { Icon } from "./Icon";

export default function TravelJournal({ places }) {
  const [selected, setSelected] = useState(null);
  const countries = new Set(places.map((p) => p.country)).size;
  return (
    <>
      <h1>Places & perspectives.</h1>
      <p className="personal-lead">
        A personal travel journal. Places, little discoveries, and the stories
        worth keeping.
      </p>
      <div className="travel-stats">
        <strong>
          {places.length}
          <small>places in the journal</small>
        </strong>
        <strong>
          {countries}
          <small>
            {countries === 1 ? "country" : "countries"} in this journal
          </small>
        </strong>
      </div>
      <div className="place-grid">
        {places.map((place, index) => (
          <div className="place-entry" key={place.name}>
            <button
              onClick={() =>
                setSelected(selected === place.name ? null : place.name)
              }
              aria-expanded={selected === place.name}
              aria-controls={`place-story-${index}`}
            >
              <Icon name="Mountain" size={24} />
              <span>
                <strong>{place.name}</strong>
                <small>
                  {place.country}
                  {place.year ? ` · ${place.year}` : ""}
                </small>
              </span>
              <Icon
                name={selected === place.name ? "Minus" : "ArrowRight"}
                size={17}
              />
            </button>
            {selected === place.name && (
              <div className="inline-place-story" id={`place-story-${index}`}>
                <p>{place.story}</p>
                {place.source && (
                  <a
                    href={place.source}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    See the original travel post ↗
                  </a>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
