import React from "react";
import { projects } from "./data";
import { Icon } from "./Icon";

export const developedApps = [
  {
    project: "juxtravel",
    platform: "Android + web",
    description:
      "Travel discovery, independent stays, and a personal travel Passport.",
    play: "https://play.google.com/store/apps/details?id=com.hostsphere.juxtravel",
  },
  {
    project: "resiq",
    platform: "Android + web",
    description:
      "Reservations and everyday operations, built for hospitality teams.",
    play: "https://play.google.com/store/apps/details?id=com.hostizzy.resiq",
  },
  {
    project: "hostos",
    name: "HostSuite Mobile",
    platform: "Android development",
    description:
      "The mobile companion to HostOS for staff, guests, and property owners.",
  },
];
export default function AppShelf({ open }) {
  return (
    <section className="app-shelf" aria-label="Apps developed by Ethan">
      <div className="shelf-heading">
        <div>
          <h1>Built. Shipped. In your pocket.</h1>
          <p>Apps I develop for travel and hospitality.</p>
        </div>
        <Icon name="Smartphone" size={28} />
      </div>
      <div className="shelf-apps">
        {developedApps.map((app) => {
          const project = projects.find((p) => p.id === app.project);
          return (
            <article
              key={app.project}
              className={`shelf-app shelf-${app.project}`}
            >
              <button
                className="shelf-preview"
                onClick={() => open(project.id)}
                aria-label={`Explore ${app.name || project.name}`}
              >
                <img
                  src={project.image}
                  alt={`${project.name} product preview`}
                  loading="lazy"
                  width="720"
                  height="470"
                />
              </button>
              <div className="shelf-copy">
                <small>{app.platform}</small>
                <h2>{app.name || project.name}</h2>
                <p>{app.description}</p>
                <div>
                  {app.play ? (
                    <a
                      href={app.play}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Google Play <Icon name="ArrowUpRight" size={14} />
                    </a>
                  ) : (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Explore HostOS <Icon name="ArrowUpRight" size={14} />
                    </a>
                  )}
                  <button
                    onClick={() => open(project.id)}
                    aria-label={`Details for ${app.name || project.name}`}
                  >
                    <Icon name="ArrowRight" size={18} />
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
