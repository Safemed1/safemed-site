SafeMed Concierge — Static Site
=================================

Files:
- index.html        (main page; uses Tailwind CDN + styles.css + script.js)
- styles.css        (your custom CSS additions)
- script.js         (mobile nav + small helpers)
- assets/           (put your images and logo here)

Images to add to /assets:
- clinician-hero-920.webp
- service-medication.webp
- service-dme.webp
- service-family.webp
- service-home.webp
- logo.svg (optional; remove <img> if you don't have it yet)

Integrations to update:
- Calendly: replace the iframe src with your booking URL
- Formspree: replace the action attribute with your endpoint

Deploying on GitHub Pages:
1) Create a new public repo (or use your existing one).
2) Upload these files at the repo root (index.html at top-level).
3) In repo Settings → Pages → set “Deploy from a branch”, branch=main, folder=/root.
4) Wait for the Pages link to appear; visit it to verify.

Contact section placeholders:
- Phone, email, and address are dummy values. Replace with real info.
