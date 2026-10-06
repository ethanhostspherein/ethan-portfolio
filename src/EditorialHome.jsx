import React, { useState } from "react";
import { Icon } from "./Icon";
import { asset } from "./assets";

const chapters = {
  build: {
    title: (
      <>
        A little curiosity.
        <br />A lot of building.
      </>
    ),
    description:
      "I build things that make the internet feel a little more useful. Founder, operator, and the developer behind Hostizzy’s products.",
    action: "Explore what I’ve built",
    app: "work",
    note: "From hospitality problems to working products.",
  },
  roam: {
    title: (
      <>
        Good stories start
        <br />
        somewhere new.
      </>
    ),
    description:
      "Travel, people, and the moments between the milestones. A little journal of the world beyond this screen.",
    action: "Open my personal journal",
    app: "life",
    note: "Ideas. Travel. Tech. People. Impact.",
  },
  play: {
    title: (
      <>
        Make something.
        <br />
        Make a little time.
      </>
    ),
    description:
      "Even a working desktop needs a playful side. Flip a few cards, challenge the computer, or discover a small surprise.",
    action: "Take a break in Games",
    app: "games",
    note: "Stay curious. There’s more to explore.",
  },
};
export default function EditorialHome({ open }) {
  const [chapter, setChapter] = useState("build");
  const story = chapters[chapter];
  return (
    <article className={`editorial-home chapter-${chapter}`}>
      <header className="home-masthead">
        <span>Ethan Barman</span>
        <span>My digital life, open.</span>
        <button onClick={() => open("contact")}>
          Say hello <Icon name="ArrowUpRight" size={14} />
        </button>
      </header>
      <div className="home-cover">
        <div className="home-story" key={chapter}>
          <p className="home-greeting">Hi, I’m Ethan.</p>
          <h1>{story.title}</h1>
          <p className="home-description">{story.description}</p>
          <button className="home-cta" onClick={() => open(story.app)}>
            {story.action}
            <Icon name="ArrowUpRight" size={20} />
          </button>
        </div>
        <figure className="home-photo">
          <img
            src={asset("photos/ethan-still-building.webp")}
            alt="Ethan Barman — Still Building, work in progress"
            width="720"
            height="900"
            loading="lazy"
          />
          <figcaption>Always a work in progress.</figcaption>
        </figure>
      </div>
      <footer className="home-chapters">
        <nav aria-label="Explore Ethan’s story">
          {Object.entries({
            build: "The builder",
            roam: "The explorer",
            play: "The playful side",
          }).map(([id, label]) => (
            <button
              key={id}
              aria-pressed={chapter === id}
              onClick={() => setChapter(id)}
            >
              {label}
              <Icon
                name={
                  id === "build"
                    ? "Code"
                    : id === "roam"
                      ? "Compass"
                      : "Gamepad2"
                }
                size={17}
              />
            </button>
          ))}
        </nav>
        <div className="home-footer-detail">
          <p aria-live="polite">{story.note}</p>{" "}
          <button className="home-album-link" onClick={() => open("life")}>
            <img
              src={asset("travel/kashmir.webp")}
              alt="Kashmir destination photograph"
              width="58"
              height="42"
              loading="lazy"
            />
            <span>
              <strong>Beyond the screen</strong>
              <small>Open my travel photo journal</small>
            </span>
            <Icon name="ArrowUpRight" size={16} />
          </button>
        </div>
      </footer>
    </article>
  );
}
