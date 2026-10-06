---
name: Ethan Barman — Personal Editorial Journal
description: A personal editorial journal inside a familiar Mac-inspired desktop.
colors:
  journal-paper: "#f3efe5"
  journal-ink: "#243c34"
  journal-red: "#a83a2d"
  journal-rule: "#d2cec3"
  story-muted: "#3e5147"
  label-muted: "#546158"
  explorer-green: "#3b644b"
  playful-violet: "#563d80"
  shelf-evergreen: "#253e34"
  shelf-cream: "#f6f1e5"
  shelf-muted: "#d0dbce"
  travel-sage: "#e5ecd9"
  postcard-paper: "#faf7e9"
  travel-ink: "#263c32"
  travel-selected: "#5f7858"
  toolbox-evergreen: "#192b27"
  toolbox-toolbar: "#203731"
  toolbox-tabbar: "#14241f"
  toolbox-selected: "#d5e3bc"
  toolbox-paper: "#f4f1e5"
  toolbox-muted: "#d0dacd"
  toolbox-rule: "#496057"
  toolbox-tag: "#2d473b"
  toolbox-tag-text: "#e3ebd1"
  entry-cream: "#fff9e9"
  entry-sage: "#d1dfb7"
  entry-muted: "#eef0f8"
  focus-ring: "#9780f0"
typography:
  display:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(48px,6vw,86px)"
    fontWeight: 500
    lineHeight: 1.06
    letterSpacing: "-.025em"
  headline:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(36px,4vw,56px)"
    fontWeight: 500
    lineHeight: 1.07
    letterSpacing: "-.03em"
  shelf-title:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "29px"
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: "-.025em"
  personal-title:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "46px"
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: "-.025em"
  body:
    fontFamily: '"DM Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: "14px"
    lineHeight: 1.65
  action:
    fontFamily: '"DM Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: "13px"
    fontWeight: 600
  caption:
    fontFamily: "Caveat, cursive"
    fontSize: "19px"
rounded:
  photograph: "2px"
  tag: "3px"
  shelf-card: "10px"
  desktop-window: "15px"
  postcard: "0"
spacing:
  compact: "8px"
  copy: "14px"
  shelf-gap: "17px"
  section: "22px"
  cover-gap: "32px"
components:
  journal-action:
    textColor: "{colors.journal-red}"
    typography: "{typography.action}"
    padding: "13px 0"
  chapter-tab:
    textColor: "{colors.label-muted}"
    padding: "17px 0 13px"
  chapter-tab-selected:
    textColor: "{colors.journal-red}"
    padding: "17px 0 13px"
  shelf-card:
    backgroundColor: "{colors.journal-paper}"
    textColor: "{colors.journal-ink}"
    rounded: "{rounded.shelf-card}"
  shelf-copy:
    padding: "{spacing.copy}"
  postcard:
    backgroundColor: "{colors.postcard-paper}"
    textColor: "{colors.travel-ink}"
    rounded: "{rounded.postcard}"
    padding: "30px 20px"
  toolbox-tag:
    backgroundColor: "{colors.toolbox-tag}"
    textColor: "{colors.toolbox-tag-text}"
    rounded: "{rounded.tag}"
---

# Design System: Ethan Barman — Personal Editorial Journal

## Overview

**Creative North Star: "The Personal Editorial Journal"**

The portfolio feels like an open journal on Ethan's MacBook. Warm paper, a restrained coral accent, serif storytelling and handwritten photograph captions make the content personal. The preserved desktop chrome, artwork and controls give visitors a familiar way to explore.

Materials change with the subject: the About cover uses cream paper, the app shelf uses evergreen, travel uses pale green postcards, and the technical toolbox uses a deeper evergreen workspace. A cinematic login introduces the same curiosity through large type over the existing background artwork. These materials express one personal world while allowing its chapters to feel distinct.

**Key Characteristics:**

- Editorial serif headlines paired with practical sans-serif navigation.
- Cream paper, coral actions and evergreen working surfaces.
- Supplied photography and existing identity artwork as visual anchors.
- Thin rules, restrained card depth and functional desktop chrome.
- Responsive compositions that retain the story and keyboard access.

## Colors

The palette combines warm paper with earthy ink, coral and greens, with violet reserved for the playful chapter and the inherited focus indicator. The frontmatter is the normative source for color values.

### Primary

- **Journal Coral** (`journal-red`): Builder headlines, contact action, journal action and Google Play text links.
- **Journal Ink** (`journal-ink`): Text on cream surfaces and product cards.

### Secondary

- **Explorer Green** (`explorer-green`): Explorer headline, selected chapter marker and its matching action.
- **Shelf Evergreen** (`shelf-evergreen`): App shelf background and existing store-button treatment.
- **Travel Sage** (`travel-sage`): Travel journal background.
- **Toolbox Evergreen** (`toolbox-evergreen`): Technical workspace background; darker toolbar and tab-strip materials distinguish controls.
- **Toolbox Selected Sage** (`toolbox-selected`): Active technical tabs, heading and source links.

### Tertiary

- **Playful Violet** (`playful-violet`): Play chapter headline, action and selected marker.
- **Focus Violet** (`focus-ring`): Inherited keyboard focus outline across interactive controls.

### Neutral

- **Journal Paper** (`journal-paper`): About and app-card surfaces.
- **Journal Rule** (`journal-rule`): Masthead, chapter and shelf-copy dividers.
- **Postcard Paper** (`postcard-paper`): Travel cards on the sage background.
- **Shelf Cream / Toolbox Paper** (`shelf-cream`, `toolbox-paper`): Text on the respective evergreen surfaces.
- **Story Muted / Label Muted** (`story-muted`, `label-muted`): Paragraph and secondary chapter information on cream.
- **Entry Cream / Entry Muted** (`entry-cream`, `entry-muted`): Login headline and supporting text over the darkened artwork.

**The Chapter Color Rule.** A chapter's headline, action and selected marker share its accent. Change them together when switching chapters.

## Typography

**Display Font:** Fraunces, with Georgia and serif fallbacks. The local font is declared at weight 500.

**Body Font:** DM Sans, with the system sans-serif fallbacks in the frontmatter.

**Caption Font:** Caveat, with a cursive fallback.

Fraunces carries the personal voice through compact, balanced headlines. DM Sans keeps controls and product evidence legible; Caveat gives photograph captions the feel of an annotation.

### Hierarchy

- **Display:** The cinematic entry headline uses the display token; the mobile version uses `clamp(44px,12vw,62px)`.
- **Headline:** The About story uses the headline token, a maximum width of 510px, balanced wrapping and deliberate line breaks. Mobile uses `clamp(36px,10vw,48px)`.
- **Shelf title:** The shelf uses the shelf-title token; app names use sans-serif at 17px on desktop and 22px on mobile.
- **Personal title:** Personal-window headings use the personal-title token and reduce to 36px on mobile.
- **Body:** About paragraphs use the body token with a maximum width of 410px. Mobile paragraphs use 13px.
- **Action:** Primary journal actions use the action token. Desktop chapter controls use 12px, reducing to 10px on mobile.
- **Caption:** Supplied-photo annotation uses the caption token and rotates into vertical writing beside the image on mobile.

**The Story and Control Rule.** Use serif type for storytelling and sans-serif type for controls, product metadata and technical tags.

## Layout

The existing Mac-inspired desktop remains the navigation frame. Journal surfaces fill the window content; chrome, traffic-light controls, dock and desktop artwork retain their existing behavior.

On desktop, the About window uses `min(940px,calc(100vw - 290px))` at widths of at least 760px. Its cream content has 32px horizontal padding. The cover uses a two-column grid (`1.45fr 1fr`) with the cover-gap spacing token. The supplied portrait sits at the right, with a maximum width of 260px and a slight rotation. Masthead and chapter navigation use thin rules to organize the page.

Between 760px and 1050px, About padding reduces to 24px, headline size becomes 38px and the cover gap becomes 20px. The three-column app shelf becomes one column of horizontal cards with a 140px preview column. Tiled About windows use a single text column and hide the portrait to fit the available space.

At widths of 759px and below, About has 22px horizontal padding and a vertically stacked cover. The portrait becomes a full-width image with a caption alongside it. The app shelf becomes horizontally scrollable with mandatory horizontal scroll snapping, a 13px gap and cards at least 245px wide. Travel cards and toolbox rows become single-column layouts. Personal content uses `28px 25px 35px` padding.

The desktop login separates the large left-hand introduction from the right-hand clock and profile. Mobile keeps the introduction near the top and the profile near the bottom. A short-height mobile adjustment applies at 650px or below to keep the login usable.

## Elevation & Depth

Depth is a hybrid: retained desktop-window shadows establish the operating-system frame, while editorial content is mostly flat and divided with rules. Postcards receive a small ambient lift; the supplied About portrait is tilted slightly without an added card shadow. Product cards rely on material contrast against evergreen.

### Shadow Vocabulary

- **Desktop window:** `0 30px 70px #03042065, 0 4px 15px #03032140`.
- **Active desktop window:** `0 32px 85px #02032080, 0 5px 17px #03032150`.
- **Travel postcard:** `0 7px 15px #29412615`.

**The Material Depth Rule.** Retain window depth for the desktop frame; use rules and background materials to organize the journal.

## Shapes

The preserved desktop window uses the desktop-window radius token. App cards use the shelf-card radius token and clip their previews. Portrait corners use the photograph token; technical tags use the tag token. Travel postcards and toolbox rows use square corners. Travel entry wrappers alternate minus and plus one degree of rotation; their buttons remain upright within the wrapper. The About portrait rotates by two degrees on desktop and returns upright on mobile.

## Components

### Buttons

Journal actions are understated directional links expressed as buttons. They align text and an existing arrow icon, use the journal-action padding, and carry a bottom rule matching the chapter accent. Their current hover color is `#6e241c`. Contact uses a compact text-and-arrow action in the masthead.

All buttons and links inherit a visible keyboard outline (`3px` with `4px` offset). Disabled buttons inherit reduced opacity (`0.35`). Preserve these states when extending the content.

### Navigation

Builder, Explorer and Play are buttons in a labelled navigation region. The controls have a minimum height of 44px. The selected button has a two-pixel top border and stronger text weight; `aria-pressed` communicates the active chapter. Each chapter switches its headline, description, destination action, accent and live note. The portrait remains the same supplied asset.

Personal toolbars remain sticky at the top of scrolling content. Technical workspace tabs retain their tab semantics, with a pale selected surface against a dark tab bar. Keep keyboard navigation and the mobile desktop interpretation intact.

### Cards / Containers

App cards pair existing product previews with platform labels, names, descriptions, store or product links and a details button. The desktop preview is 112px high; mobile previews become 150px. Preview hover scales the image to 1.05 over 350ms. Use supplied project artwork without recoloring or replacing it.

The shelf currently shows verified Google Play destinations for JuxTravel and ResIQ. HostSuite Mobile is labelled Android development and links to HostOS. These distinctions are content truth, so the visual treatment must not imply a third store release.

### Travel Postcards

The travel surface uses pale green behind square paper cards. Selected cards retain an expanded-state outline (`2px` with `4px` offset); each expanded story appears immediately under its clicked card, inside the same paper entry with padding of \`0 20px 22px\`. A single selected entry controls the inline expansion, with \`aria-controls\` connecting its button to the story. The eleven destinations come from user-provided or verified content. Reuse supplied photos where available.

### Technical Toolbox

The dark evergreen workspace uses flat, ruled rows. On desktop each row has two columns (`1fr 1.4fr`), with the explanatory paragraph in the second column. Compact sage text tags describe technologies. Mobile rows stack into one column.

### Login Introduction

Large cream editorial type and sage emphasis sit over the preserved background with a dark gradient overlay. Entry uses an 850ms focus reveal; chapter changes use a 350ms focus reveal, both with `cubic-bezier(.16,1,.3,1)`. Honor the reduced-motion preference: entry and chapter animations are disabled; preview transitions are disabled through the media query. The existing in-app reduced-motion class also disables entry and chapter animations.

## Do's and Don'ts

### Do:

- **Do** preserve the Apple logo, existing application icons, project logos, supplied photographs and background artwork.
- **Do** retain the functioning desktop controls, accessible keyboard navigation and responsive touch interpretation.
- **Do** pair story accents with their selected markers and destination actions.
- **Do** use thin rules and material contrast to organize editorial content.
- **Do** keep app-store availability and travel entries grounded in supplied or verified content.

### Don't:

- **Don't** replace, recolor or invent identity assets and photographs.
- **Don't** turn Android development into an implied Google Play release.
- **Don't** invent product metrics or destinations to fill visual space.
- **Don't** remove focus indicators or ignore reduced-motion behavior.

