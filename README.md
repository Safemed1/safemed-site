
# Safemed Website (Redesign)

This is a compact, multi‑page static site ready for GitHub Pages.

## Structure
- `index.html` — Home with booking + side gallery
- `services.html` — Services & pricing with image examples
- `about.html` — Brand values
- `contact.html` — Contact form (routes to Calendly)
- `assets/` — Images, CSS, JS
  - `assets/img/clinician-hero-920.webp` (if present) or `clinician-hero-920.svg` placeholder
  - `assets/img/medication-organizing.jpg` (placeholder)
  - `assets/img/dme-cleaning.jpg` (placeholder)
  - `assets/css/styles.css`
  - `assets/js/app.js`
  - `assets/logo.svg`

## Set your Calendly link
Search for `https://calendly.com/safemed/consult` in the HTML and replace with your real booking URL.

## Deploy to GitHub Pages
1. Create a new repo on GitHub (e.g., `safemed-site`).
2. Upload ALL files/folders from this ZIP to the repo root.
3. In GitHub: Settings → Pages → Build & deployment → Source = **Deploy from a branch**. Branch = **main**, Folder = **/** (root).
4. Save. Your site will be live at `https://<your-username>.github.io/safemed-site/`.

## Replacing placeholders with generated images
- Replace `assets/img/medication-organizing.jpg` and `assets/img/dme-cleaning.jpg` with realistic photos (same filenames) — or update the HTML to point to your new files.
- Replace `assets/img/clinician-hero-920.svg` with your hero photo (rename to `clinician-hero-920.webp` to match the HTML).

