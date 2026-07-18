# Notary Desk Design System

Design direction and screen mockups for a privacy app on Midnight Network, built for the Midnight hackathon. The product idea is not final; this system covers the universal skeleton every app of this type shares: a user has a secret, the app proves something about it, a verifier sees only the proof. Deliverable is mockups plus a style guide, per hackathon rules (no prebuilt app code).

Sources given: the written brief only. No codebase, Figma, logos, or fonts were provided. There is no logo: render the product name in Libre Caslon Text wherever a mark would go.

## The concept: The Notary's Desk

The app as a precision instrument for certifying facts. Language mined from physical verification artifacts (notary stamps, certificates, ledger books), not cyber imagery. The desk is dark by default (a lamplit desk at night, zero glow, documents stay bone) and clearly distinct from the dark-glowing-crypto lane; a day theme is one pull-cord away.

**Signature element: the Seal.** A circular oxblood stamp. On proof-in-flight the ring draws itself while witness lines log real stages; on the receipt it thunks down once. This is the app's only orchestrated animation.

## Content fundamentals

- Sentence case everywhere except caps LABELS (13px, 600, tracked +8%).
- Plain verbs, active voice. Buttons say exactly what happens: "Commit your secret", "Generate proof", "Verify", "Start over".
- Second person ("your secret"), the app never says "I".
- No em dashes anywhere. Use a colon, a period, or a middle dot separator.
- No emoji, ever.
- Structural placeholders only: "Question title", "Commitment hash", "Token amount". Never data dressed up as real; no invented hashes, stats, or testimonials.
- Errors give direction, not mood: a VOID status is always paired with a line saying what to do next.
- The waiting state is honest: "Proof generation takes a few seconds by design."

## Visual foundations

- **Colors:** Desk #191512 (the ground: a warm ink-black desk at night; day theme #E2D9C6), Bone #F4EFE4 (document sheets; the --paper token), Ink #211D1A (text, signed states), Seal #872A21 (the stamp, primary actions, "now public" moments), Ledger #2E4A3F (private surfaces: anything on green never left the device), Wash #EBE5D8 (recessed panels, inputs), Rule #C9C2B6 (hairlines, perforation). Secondary text #4A443C, muted #6B6459, hover-press darks #6E1F18 / #243B32.
- **Semantic encoding:** paper = public record; ledger green = private; ink = authorship (the connected wallet chip is ink because an address is public, a signature, not a secret). Do not repurpose these.
- **Type:** Libre Caslon Text (display: product name and screen titles only, 400/700, tight leading, never under 32px), Public Sans (all UI/body, 400 to 700), IBM Plex Mono (hashes, addresses, amounts, timestamps, sequence numbers).
- **Backgrounds:** a flat desk ground with bone document sheets floating on it. Documents never change color; between night (default) and day themes only the desk and its shadow change. No gradients, textures, glow, or patterns.
- **Corners:** 0px on panels/cards/ledgers (documents), 2px on buttons/inputs/chips (plates), circles reserved exclusively for the Seal.
- **Borders:** 1.5px ink for structural frames, 1px rule for row dividers, dashed rule for pending states, dotted rule + torn notches for the ledger perforation.
- **Shadows:** exactly one: the soft lamplit drop under each document sheet (--doc-shadow). It is the physical shadow of paper on a desk, not glow. Nothing else casts.
- **Spacing:** 8-base scale: 4/8/12/16/24/32/48/64/96 (tokens --sp-1 to --sp-9). Desktop gutter 48px, mobile 20px.
- **Hover:** darker fill (seal to #6E1F18, ink chip to #332D28) or wash fill on outlines. Never lifts, glows, or scale-ups.
- **Press:** translateY(1px), a stamp pressing down.
- **Motion:** two keyframes total, both on the Seal (mn-draw, mn-thunk). Witness lines fade via opacity transition. Everything else is instant or a 120ms color ease. prefers-reduced-motion disables all of it.
- **Focus:** 2.5px seal-red outline, offset 2px (green on private fields, paper on the dark panel).
- **Transparency and blur:** none, except rgba(paper) hairlines/labels on the green panel.
- **Layout:** asymmetric two-column grids (1.15/0.85), certificate-ruled headers (full-width 1.5px ink rule under the top bar), content left-anchored. Stacks to one column under 860px; the ledger stacks under 720px.
- **Theme toggle:** a pull-cord switch hangs from the top right of the desk (mono label reads what it switches to: DAY or NIGHT). Night is default; choice persists in localStorage. Only --desk, --doc-shadow, and --text-on-desk change.
- **Numbering:** 01 Commit, 02 Prove, 03 Verify is the real protocol order. Done = ink, current = seal red, upcoming = muted. Never use numbers decoratively.

## Iconography

None by design. No icon set, no icon font, no emoji, no padlocks/shields/keys. Meaning is carried by type, color, and the Seal (the only pictorial element, built from SVG circles + textPath in the Seal component). Unicode used: middle dot separators and ellipsis in witness lines. If an icon set is ever needed, use a 1.5px-stroke set to match rule weight and flag it as an addition.

## Components

All styled by tokens/components.css (mn- prefixed classes), importable from the bundle:

- **Button** (components/actions): primary seal / secondary ink outline / paper (for the green panel) / ghost; md, lg.
- **WalletChip** (components/actions): Lace connect chip. Disconnected wash / connected ink with mono address.
- **Input** (components/forms): wash field, caps label, optional privacy="private" green tag + note.
- **Seal** (components/proof): embossed / drawing / stamped. The signature element.
- **Status** (components/proof): recorded / pending / void plates.
- **SequenceNav** (components/proof): the 01/02/03 protocol strip.
- **LedgerSplit** (components/proof): the two-part public vs private certificate with perforation.

## Intentional additions

The brief's kit list was buttons, inputs, wallet chip, status states, ledger. Added: **Seal** (the chosen signature element made reusable), **SequenceNav** (the numbering rule made concrete), Input's private variant (screen 2 requires marking secret-holding fields).

## Index

- styles.css: single import for consumers (tokens/colors, typography, spacing, base, components).
- tokens/: token CSS files.
- guidelines/: specimen cards (colors, type, spacing, corners, numbering).
- components/actions, components/forms, components/proof: the kit + per-directory cards.
- ui_kits/app/: the four screens (Landing, PrivateAction, ProofInFlight, Receipt) + index.html click-through.
- handoff.md: the one-page sheet to paste into a coding prompt.
- SKILL.md: agent skill entry point.

## Caveats

- Fonts load from Google Fonts CDN (no binaries in-project). Libre Caslon Text, Public Sans, IBM Plex Mono. If you have licensed files, drop them in and swap the @font-face source in tokens/typography.css.
- No logo exists; the product name is set in type. Do not draw one.
- All data slots are structural placeholders on purpose.