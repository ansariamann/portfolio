<div align="center">

# Aman Ansari — Portfolio

**Full Stack Java, Machine Learning & AWS Engineer**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-ansariaman.netlify.app-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://ansariaman.netlify.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

*A clean, performant, standalone portfolio website built with HTML5, CSS3, Vanilla JavaScript, and Tailwind CSS. Zero runtime build complexity, direct browser executable.*

</div>

---

## 🌟 Overview

This repository hosts the official personal portfolio website of **Aman Ansari**, showcasing production web systems, machine learning research, cloud architecture, and competitive programming achievements.

The codebase is built on **pure standard web technologies (HTML5, CSS3, JavaScript ES6+)** complemented by the compiled Hashton design system stylesheet and Tailwind CSS. It runs natively in any web browser without needing `npm install`, Node.js runtimes, or build steps.

---

## 🚀 Key Features

- 🌓 **Theme Management**: Dark and light modes with automatic OS system preference detection and `localStorage` persistence.
- 🎨 **Hashton-Inspired Aesthetic**: Minimalist typography, custom warm color palettes (`--paper`, `--surface`, `--ink`, `--accent`), glassmorphic cards (`.glass-card`), and subtle ambient background animations.
- ⚡ **Interactive Skills Section**: Dynamic category filtering across 24 technologies with official vector icons and micro-interactions.
- 💼 **Featured Work & Projects Showcase**:
  - Main landing highlights 4 featured production systems.
  - Dedicated [`projects.html`](projects.html) with real-time text search, category filtering, and modal detail views.
- 🛡️ **Cybersecurity & ML Case Studies**: [`case-studies.html`](case-studies.html) covering DDoS attack mitigation (96% accuracy), malware binary classification, and LSTM network anomaly detection.
- 📊 **Competitive Programming (LeetCode)**:
  - Real-time profile overview for `@teatoast` (150+ solved, current streak, global ranking).
  - Difficulty progress bars (Easy 80, Medium 55, Hard 15).
  - Chronological recent activity feed with expandable problem summaries.
- 📜 **Verified Certifications**:
  - Oracle Cloud Infrastructure 2025 Certified Data Science Professional
  - Oracle Cloud Infrastructure 2025 Certified Developer Professional
  - Oracle Cloud Infrastructure 2025 Certified Generative AI Professional
- 📬 **Fully Working Contact Form**:
  - Multi-tier delivery: Direct **EmailJS Browser SDK** integration + **Netlify Forms** backend + graceful pre-filled mail client fallback.
  - Real-time client-side validation and instant feedback alerts.

---

## 📁 Repository Structure

```
portfolio/
├── index.html            # Main portfolio landing page (Hero, About, Work, Skills, Certs, LeetCode, Contact)
├── projects.html         # Complete projects catalog with search & modal details
├── case-studies.html     # In-depth machine learning & cybersecurity case studies
├── __forms.html          # Netlify build-time form detection helper
├── package.json          # Lightweight project manifest with run scripts
├── .gitignore            # Clean git ignore configuration
├── css/
│   └── style.css         # Production stylesheet (Hashton tokens, Tailwind utilities & glassmorphism)
├── js/
│   ├── main.js           # Core client logic (Theme, mobile drawer, scrollspy, skills filter, form)
│   ├── projects.js       # Projects dataset, live search, and modal controller
│   └── case-studies.js   # Case studies data & metrics visualization
├── images/               # Profile photo, handwritten signature, certificate badges & logos
│   ├── certifications/   # Oracle accreditation badges
│   └── platforms/        # LeetCode and competitive programming logos
└── cv/
    └── Aman_Ansari_CV.pdf# Downloadable resume
```

---

## 💻 Quick Start & Running Locally

Because this codebase is pure HTML/CSS/JS, you can run it instantly without compiling:

### Option 1: Direct File Open
Simply double-click [`index.html`](index.html) to open it in any web browser.

### Option 2: Python HTTP Server (Recommended)
```bash
# Start server on port 3000
python -m http.server 3000
```
Then navigate to `http://localhost:3000`.

### Option 3: Node.js Serve
```bash
npx serve . -p 3000
```

---

## 🚀 Deployment

### Deploy to Netlify
1. Connect your repository to [Netlify](https://www.netlify.com/).
2. Set **Publish directory** to `/` (root directory).
3. Leave the **Build command** empty (static site requires no build).
4. Netlify will automatically detect the contact form via `__forms.html` / `index.html`.

### Deploy to GitHub Pages
1. Go to your repository settings on GitHub $\rightarrow$ **Pages**.
2. Select `main` (or `master`) branch as the source and `/ (root)` folder.
3. Click **Save**. Your site will be live in seconds.

---

## 🛠️ Tech Stack & Integrations

| Layer | Technologies |
| :--- | :--- |
| **Markup & Semantics** | HTML5, Semantic Elements, WAI-ARIA Accessibility |
| **Styling & Design** | CSS3, Tailwind CSS, Custom Properties (Hashton Palette), Google Fonts (Inter, JetBrains Mono) |
| **Scripting & Logic** | Modern JavaScript (ES6+), Vanilla DOM APIs |
| **Email Delivery** | [EmailJS](https://www.emailjs.com/) (`@emailjs/browser` v4), [Netlify Forms](https://www.netlify.com/platform/core/forms/) |
| **Asset Optimization** | SVG Vectors, Optimized PNGs, WebP |

---

## 👤 Author

**Aman Ansari**
- 🌐 Website: [ansariaman.netlify.app](https://ansariaman.netlify.app/)
- 💼 LinkedIn: [linkedin.com/in/-aman-ansari](https://linkedin.com/in/-aman-ansari)
- 🐙 GitHub: [@ansariamann](https://github.com/ansariamann)
- 🐦 Twitter: [@thoht_z](https://twitter.com/thoht_z)
- ✉️ Email: [iamamanansari786a@gmail.com](mailto:iamamanansari786a@gmail.com)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
