# 🎮 Forca Game (Super Hangman)

A mobile- and desktop-friendly English Hangman game built with **Vite, React, JavaScript, Tailwind CSS, and Vitest**, created as a parent + 7-year-old coding adventure and hosted on **GitHub Pages**.

## ✨ Features
- **Classic 6-Lives Hangman**: Interactive SVG stick figure that updates with each wrong guess.
- **Last-Chance Hint System**: Hints stay locked (`"💡 Hint not permited yet!"`) until the player is down to **2 or fewer lives remaining**, unlocking the `"💡 Need a Hint?"` button.
- **Dual Input**: Play using the on-screen touch keyboard or a physical desktop keyboard (`A–Z`, plus `Enter` to play again).
- **Kid-Hackable & Tested**: Pure game rules in `src/utils/gameLogic.js` covered by Vitest unit tests in `src/utils/gameLogic.test.js`.

## 📚 Project Documentation
- [**Requirements & Spec (`REQUIREMENTS.md`)**](./REQUIREMENTS.md) — Functional requirements, mobile-first layout specs, file structure, and acceptance checklist.
- [**Step-by-Step Build Guide (`GUIDE.md`)**](./GUIDE.md) — 8 short, kid-friendly missions separating **🛠️ Parent Driver** setup from **🧒 7-Year-Old Co-Pilot** coding & testing tasks.

## 🚀 Quick Commands
```bash
npm run dev       # Start local dev server (accessible on computer + phone via local Wi-Fi)
npm test          # Run Vitest unit tests in watch mode
npm run build     # Build production static files into ./dist
```
