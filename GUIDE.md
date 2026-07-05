# Quick Edit Guide

Cheat sheet for common small changes to the Himdeura site. Edit the file, then `npm run dev` to preview, or just commit/push (GitHub Actions deploys to himdeura.com).

## Address
Appears in two places — update both:
- `src/components/Footer.jsx` — inside the `<address>` block
- `src/pages/Contact.jsx` — `contactItems` array (Address `lines`) and the map caption (`📍 ...`)

## Phone numbers
- `src/components/Footer.jsx` — `tel:` links
- `src/pages/Contact.jsx` — `contactItems` Phone entry

## Email addresses
- `src/components/Footer.jsx` — `mailto:` link
- `src/pages/Contact.jsx` — `contactItems` Email entry

## Social links (Instagram / Facebook)
- `src/components/Footer.jsx` — social icon links near the top
- `src/pages/Contact.jsx` — `socialLinks` buttons near the bottom

## Google Maps embed
- `src/pages/Contact.jsx` — `iframe src` under "Map". Get a new embed URL from Google Maps → Share → Embed a map.

## Footer copyright year
- Auto-updates (`new Date().getFullYear()`) — no manual edit needed.

## Page content (headings, paragraphs, hero text)
- Home: `src/pages/Home.jsx`
- About: `src/pages/About.jsx`
- Products: `src/pages/Products.jsx`
- Contact: `src/pages/Contact.jsx`
- Nav bar: `src/components/Navbar.jsx`

## Styling
Each page/component has a matching `*.module.css` file next to it (e.g. `Contact.jsx` ↔ `Contact.module.css`).
