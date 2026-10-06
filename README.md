# Ethan’s Personal Desktop

A real responsive React website with a custom desktop window manager. Deploy the built `dist` folder to Vercel, Netlify, Cloudflare Pages, or another static host.

Entry sequence: a brief Apple startup screen, Ethan's photo login screen, then the interactive desktop. No password or account is required.

## Run locally

```sh
npm install
npm run dev
```

## Production build

```sh
npm run build
npm run preview
```

Use Node.js 20.19+ or 22.12+. The lockfile is included. Build command: `npm run build`. Output folder: `dist`. No backend or secret environment variables are required.

## Connect a personal domain

1. On GitHub Pages, add your domain under repository Settings → Pages → Custom domain. The included workflow reads the Pages configuration and automatically adjusts the asset base and metadata. On other hosts, import this folder as a Vite project.
2. Add your domain in the hosting dashboard.
3. At your domain registrar, copy the exact DNS records supplied by your host. Keep existing email/MX records.
4. Set the production `SITE_URL` environment variable to your full HTTPS URL, such as `https://yourdomain.com`, then rebuild. The build inserts the canonical URL, absolute social image URL, and sitemap.
5. Verify both your preferred domain and its `www` variant, enable HTTPS, and redirect the other variant to the preferred one through the host.

## Personalize

- `src/data.js`: profile, email, LinkedIn, real projects, public source links, and writing summaries.
- `src/Apps.jsx`: About content, professional journey, ideas, and resume viewer.
- `public/resume.pdf`: downloadable professional profile compiled from public sources. Replace with your own CV when available.
- `public/projects/`: optimized captures of the products’ public websites. HostOS shows the public HostSuite homepage, and Deshboard shows its public India dashboard. These captures contain no private account information.
- `public/photos/`: user-supplied photographs, optimized as WebP. The professional headshot appears at login and in Settings; the Still Building portrait appears in About Me. Photography is unchanged apart from orientation correction, resizing, and compression.

## Interactions

The website opens on a laptop-style login screen on every fresh page load. Click **Enter desktop** or press Enter to open the portfolio. There is no password or authentication barrier. Sleep dims the site until clicked or awakened with Enter; Restart plays a short startup sequence and returns to login. The system menu’s **Lock screen** action and **Alt + L** return to the entry screen without losing open windows.

Application icons use Apple's published macOS artwork: Contacts, Finder, Safari, Tips, Notes, Mail, Preview, Terminal, Applications, and System Settings. The same artwork appears on the desktop, in the dock, and in app navigation. Finder is first in the dock. The Apple logo appears in the system menu, restart screen, and About This Mac window. Source URLs are recorded in `public/macos/sources.json`; these assets belong to Apple.

Drag window title bars; double-click them to maximize. Traffic lights close, minimize, or maximize. Dock buttons open apps, restore minimized windows, and bring existing windows forward. Closing a window leaves its app running; right-click its dock icon and choose Quit to exit the app. On mobile, windows become touch-friendly app sheets and horizontal swipes change apps.

Alt + 1–7 opens apps. Alt + T opens Terminal. Alt + I opens System Info. Escape dismisses menus, search, Quick Look, and other overlays. Terminal supports `help`, `whoami`, `work`, `about`, `ideas`, `contact`, `date`, `coffee`, and `clear`. The Konami sequence toggles aurora mode. Reduced-motion preferences are honored. No sound is played.

Contact uses `mailto:` to create a draft in the visitor’s email app. The site does not claim to submit messages or store personal data. Published writing is represented as linked editorial summaries of public posts, not fabricated articles in Ethan’s voice.

## Content provenance

Research date: 6 October 2026.

- [LinkedIn profile](https://www.linkedin.com/in/ethanbarman): professional identity and listed Airbnb/Google quality analyst roles. LinkedIn blocks direct crawler access; public indexed profile excerpts were used.
- [Hostizzy’s official story](https://www.hostizzy.com/about): leadership, company timeline, and property-first approach.
- [Official investor page](https://invest.hostizzy.com/): leadership responsibilities and published business contact `admin@hostsphereindia.com`.
- [JuxTravel](https://www.juxtravel.com/): product features and launch date.
- [AI-assisted building post](https://www.linkedin.com/posts/ethanbarman_hospitality-ai-innovation-activity-7384800347036430336-Z6y7).
- [Agentic platform post](https://www.linkedin.com/posts/ethanbarman_ai-agentic-emergent-activity-7391221303179079680-0wqT).

Sources disagree on company founding dates, property counts, and GMV. The journey follows the current official Hostizzy timeline; conflicting financial and property-count claims are omitted. Product role descriptions summarize public founder/company information and do not assert that Ethan personally implemented every feature. The resume is a sourced profile, not a certified CV.

## Design

Generated visual concept and independent wallpaper using the built-in image generation tool. Native web text and controls, lucide utility symbols, Apple's published application artwork (requested by the portfolio owner), and a custom window system implement the desktop. Application asset reference: https://support.apple.com/en-mk/guide/mac-help/mchl110b00b7/mac .

The refreshed desktop uses original blue folder artwork, a screen bezel/camera notch, contextual menus, and a functional Control Center. Use its Display slider for brightness, Focus to hide desktop distractions, and Lock screen to return to the entry experience. Native device settings are not modified. The mobile interface omits the bezel and notch. Icons are independently drawn SVG artwork in src/DesktopIcon.jsx.


## macOS-style features

- Desktop: single-click selects a folder, double-click opens it; Enter also opens the selected folder. Mobile uses one tap.
- Spotlight: menu-bar magnifier, Alt + K, or Command / Control + Space. Search applications, projects, Terminal, System Settings, and desktop actions. Use arrows and Return to navigate.
- Applications: dock launcher with a searchable app grid.
- Mission Control: dock, View menu, Alt + M, F3, or Control + Up. Select an open or minimized window to restore it.
- App switcher: View menu or Alt + backtick. Includes running apps even if their last window is closed. Arrow keys select; Return opens.
- Finder: grid/list views, category filtering and search. On desktop, select a project then press Space for Quick Look; double-click opens its detail. Mobile tap opens the detail directly.
- Windows: drag, resize with the lower-right handle (arrow keys also resize), title-bar double-click to zoom, traffic lights, left/right tiling from Window menu or the green-button layout menu. Drag to a screen edge to tile. Minimized windows and mobile app switching preserve in-memory form/search state.
- System Settings: wallpaper, brightness, Dock size, Dock auto-hide, Focus, and reduced motion. Preferences are versioned and saved locally in this browser; Reset restores defaults. They change the website, not device settings.
- Notification Center: click the date for a navigable calendar and this visit’s recent app activity.
- System menu: Lock, Sleep/Wake, and a short Restart sequence. Restart resets open windows and retains preferences.

Command / Control + M minimizes and Command / Control + W closes a window when the browser forwards the shortcut. Operating systems and browsers may reserve these combinations, especially Command + Space and Command + W; the visible menus and Alt shortcuts remain available. Browser full screen depends on host support and requires a user gesture. Device Wi-Fi, authentication, and operating-system access are outside this website.

Behavior reference: [Apple’s Mac keyboard shortcuts](https://support.apple.com/en-us/102650) and [Mission Control](https://support.apple.com/en-gb/guide/mac-help/mh35798/26/mac/26).

