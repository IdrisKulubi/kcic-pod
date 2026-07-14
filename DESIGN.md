<!-- SEED: re-run /impeccable document once there's code to capture the actual tokens and components. -->

---
name: Sustainably Speaking Africa
description: The Living Frequency of Change
---

# Design System: Sustainably Speaking Africa

## 1. Overview

**Creative North Star: "The Living Frequency"**

Sustainably Speaking Africa is an editorial climate media platform, not a corporate brochure. The visual system combines African climate storytelling, sound waves and podcast frequencies, innovation and clean technology, human portraits, and the movement from challenge to solution. The foundation is dark and cinematic: near-black forest green, warm off-white text, and KCIC brand accents that pulse with audio and interaction.

The mood is African editorial magazine plus modern radio studio plus climate innovation laboratory. Overlapping circular shapes from the KCIC brand book modernize into animated sound-wave circles and portrait masks. Identity comes from sound, people, and place, not decorative green wash.

**Key Characteristics:**

- Dark editorial foundation with lime and cyan as active signals
- Circular masks, waveform rings, and the KCIC frequency mark as recurring motifs
- Oversized typography for headlines and quotes; restrained UI chrome
- Choreographed scroll and audio-reactive motion; credibility and usability over spectacle
- Explicit rejection of generic green NGO aesthetics and SaaS podcast templates

## 2. Colors

Full palette: multiple named roles, each used deliberately on a dark cinematic surface.

### Primary

- **KCIC Lime Green** `[resolve from KCIC brand book during token implementation]`: Main active colour. Play controls, primary CTAs, live waveform accents, frequency mark pulse, topic highlights when selected.

### Secondary

- **KCIC Cyan Blue** `[resolve from KCIC brand book during token implementation]`: Secondary accents. Links, topic labels, secondary waveform layers, platform affordances.

### Tertiary

- **Warm Highlight** `[resolve from KCIC brand book during token implementation]`: Small yellow or warm orange accents for highlights, alerts, or emphasis. Use sparingly.

### Neutral

- **Deep Forest Foundation** `[resolve from KCIC brand book during token implementation]`: Near-black green page background. The default surface.
- **Warm Off-White** `[resolve from KCIC brand book during token implementation]`: Primary text on dark surfaces.
- **Metadata Grey** `[resolve from KCIC brand book during token implementation]`: Duration, dates, labels, secondary copy.

### Named Rules

**The Dark Editorial Rule.** The surface is dark and cinematic. Color carries meaning through frequency, topic, and interaction, not corporate green wash. Lime and cyan are signals of life and action, not background fills.

**The One Voice Rule.** Warm highlight accents appear on a small fraction of any screen. Their rarity is the point.

## 3. Typography

**Display Font:** Instrument Serif or equivalent editorial contrast serif (quotes and major statements only) `[font pairing to be finalized at implementation]`

**Body Font:** Gotham when KCIC has a licensed web version; otherwise Montserrat, Manrope, or Plus Jakarta Sans `[font pairing to be finalized at implementation]`

**Character:** Confident sans for UI and body; editorial serif reserved for quotations, hero statements, and pull quotes. Hierarchy through scale and weight contrast, not decoration.

### Hierarchy

- **Display** (serif, oversized clamp): Episode titles, quote wall statements, major homepage headlines.
- **Headline** (sans, bold, large): Section titles, guest names in features.
- **Title** (sans, medium): Card titles, topic navigator labels.
- **Body** (sans, regular, max 65–75ch): Descriptions, bios, archive summaries.
- **Label** (sans, small, grey metadata): Duration, dates, topic tags, platform links.

### Named Rules

**The Editorial Serif Rule.** The contrast serif appears only for quotations and major statements. Never for navigation, buttons, or body copy.

## 4. Elevation

Flat by default. Depth comes from tonal layering on the dark foundation, circular portrait masks, waveform rings, and motion, not from drop shadows. Shadows are rare and purposeful: subtle lift on hover for interactive cards only. No glassmorphism as default. No gradient text.

## 5. Components

No bespoke components exist yet. Signature motifs to implement during build:

- **KCIC frequency mark:** Pulsing sound-frequency shape; reacts to pointer, expands during playback, page transition loader, image mask source.
- **Circular portrait masks:** Overlapping circles from brand book, applied to guest photography.
- **Waveform rings:** Animated sound-wave circles around featured guests and episode artwork.
- **Cursor-following play control:** Circular play button follows pointer over episode imagery on hover.

Re-run `/impeccable document` in scan mode once tokens and components land in code.

## 6. Do's and Don'ts

### Do:

- **Do** use transform and opacity for animation; GSAP for complex sequences, CSS for hover and simple transitions.
- **Do** provide reduced-motion alternatives and simpler animation on mobile.
- **Do** keep audio muted until user interaction; support keyboard-accessible player controls.
- **Do** offer full transcript access and high-contrast text on dark surfaces.
- **Do** use circular masks, waveforms, and portraits as the primary visual language.
- **Do** tint neutrals toward the brand green hue; use OKLCH when implementing tokens.

### Don't:

- **Don't** build a generic green corporate NGO or climate site.
- **Don't** clone Inkomoko visually (information architecture only).
- **Don't** use stock globe or map gimmicks that do not aid episode discovery.
- **Don't** ship a podcast site that is only YouTube embeds and identical card grids.
- **Don't** let motion block usability or feel unserious.
- **Don't** use gradient text, glassmorphism as default, hero-metric templates, or side-stripe border accents.
- **Don't** force autoplay audio or animate layout properties.
