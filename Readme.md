# Durgasai Gundubogula — Personal Domain Redirect

> A sleek, single-page redirect hosted at the root of this GitHub Pages domain.  
> The site presents a branded landing page that directs visitors to the official homepage at **[dsainvg.me](https://dsainvg.me)**.

---

## ✨ Design

| Attribute | Value |
|---|---|
| **Color Palette** | Dark midnight (`#080b14`) background with warm orange / amber accents |
| **Typography** | [Outfit](https://fonts.google.com/specimen/Outfit) (headings) · [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) (body) |
| **Effects** | Glassmorphism card · animated glow blobs · procedural starfield · shimmer button |
| **Animation** | Fade-in on load · rotating avatar glow · floating ambient orbs · twinkling stars |

---

## 🗂 Project Structure

```
personalwebsite/
├── index.html   # The entire site — self-contained HTML + CSS + JS
├── CNAME        # Custom domain mapping for GitHub Pages
└── README.md    # This file
```

---

## 🚀 How It Works

This repository is published via **GitHub Pages**. Any visitor to the mapped custom domain sees `index.html`, which renders a branded redirect card and links them to the real portfolio site.

No build step, no frameworks, no dependencies — just one HTML file.

---

## 🛠 Local Preview

Open `index.html` directly in any modern browser, or use a simple static server:

```bash
# Python 3
python -m http.server 8080
```

Then visit `http://localhost:8080`.

---

## 📄 License

© Durgasai Gundubogula. All rights reserved.
