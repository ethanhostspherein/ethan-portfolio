import React, { useEffect, useRef, useState } from "react";
import { asset } from "./assets";
import { Icon } from "./Icon";

const apps = {
  juxtravel: {
    name: "JuxTravel",
    play: "https://play.google.com/store/apps/details?id=com.hostsphere.juxtravel",
  },
  resiq: {
    name: "ResIQ",
    play: "https://play.google.com/store/apps/details?id=com.hostizzy.resiq",
  },
};
export default function AppScreens() {
  const [selected, setSelected] = useState("juxtravel");
  const [screen, setScreen] = useState(0);
  const [zoom, setZoom] = useState(false);
  const viewer = useRef(null);
  useEffect(() => {
    if (zoom && !viewer.current.open) viewer.current.showModal();
  }, [zoom]);
  const app = apps[selected];
  return (
    <section
      className="real-app-showcase"
      aria-label="Official Android app screenshots"
    >
      <div className="app-showcase-copy">
        <h2>
          From my workspace
          <br />
          to your everyday.
        </h2>
        <p>Software I develop, shown through the published Android apps.</p>
        <div className="app-selection" aria-label="Choose an Android app">
          {Object.entries(apps).map(([id, item]) => (
            <button
              key={id}
              aria-pressed={selected === id}
              onClick={() => {
                setSelected(id);
                setScreen(0);
              }}
            >
              {item.name}
            </button>
          ))}
        </div>
        <h3>{app.name}</h3>
        <p>
          {selected === "juxtravel"
            ? "Travel discovery and verified stays, with a personal Passport for the journey."
            : "Bookings, properties, guests, and operational insights in one mobile workspace."}
        </p>
        <a href={app.play} target="_blank" rel="noopener noreferrer">
          View on Google Play <Icon name="ArrowUpRight" size={16} />
        </a>
        <small>
          Official screenshots from the published Play Store listings.
        </small>
      </div>
      <div className="app-device-stage">
        <div className="app-device">
          <button
            aria-label={`Enlarge ${app.name} screenshot`}
            onClick={() => setZoom(true)}
          >
            <img
              src={asset(`app-screens/${selected}-${screen}.webp`)}
              alt={`${app.name} official Android screenshot ${screen + 1}`}
              width="540"
              height="960"
              loading="lazy"
              decoding="async"
            />
          </button>
        </div>
        <div className="screen-selector">
          <button
            aria-label="Previous app screenshot"
            onClick={() => setScreen((screen + 2) % 3)}
          >
            <Icon name="ArrowRight" size={17} className="previous-arrow" />
          </button>
          <span aria-live="polite">Screen {screen + 1} of 3</span>
          <button
            aria-label="Next app screenshot"
            onClick={() => setScreen((screen + 1) % 3)}
          >
            <Icon name="ArrowRight" size={17} />
          </button>
        </div>
      </div>
      <dialog
        ref={viewer}
        className="screen-lightbox"
        aria-label={`${app.name} screenshot viewer`}
        onClose={() => setZoom(false)}
      >
        <header>
          <h2>
            {app.name} · Screen {screen + 1} of 3
          </h2>
          <button onClick={() => viewer.current.close()}>
            Close <Icon name="Minus" size={16} />
          </button>
        </header>
        <img
          src={asset(`app-screens/${selected}-${screen}.webp`)}
          alt={`${app.name} enlarged official Android screenshot ${screen + 1}`}
          loading="lazy"
          width="540"
          height="960"
        />
        <footer>
          <button onClick={() => setScreen((screen + 2) % 3)}>
            <Icon name="ArrowRight" className="previous-arrow" size={17} />{" "}
            Previous
          </button>
          <a href={app.play} target="_blank" rel="noopener noreferrer">
            Google Play ↗
          </a>
          <button onClick={() => setScreen((screen + 1) % 3)}>
            Next <Icon name="ArrowRight" size={17} />
          </button>
        </footer>
      </dialog>
    </section>
  );
}
