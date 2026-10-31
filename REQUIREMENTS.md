# Hangman Game (`forca-game`) — Requirements & Specification

## 1. Project Overview
A web-based classic **Hangman (Forca)** game built in **English**, designed as a collaborative coding project between a parent (using **Vite, React, JavaScript, Tailwind CSS, and Vitest**) and a **7-year-old son**.

The app will be deployed to **GitHub Pages** so it can be played anywhere on both **desktop computers** (physical keyboard + mouse) and **mobile devices** (touch screen).

### Core Goals
1. **Kid-Hackable Codebase**: Isolate game data, styling tokens, and simple logic into clean, readable sections so a 7-year-old can type real code changes (adding words, changing Tailwind colors, tweaking the stick-figure SVG, and editing tests) and immediately see the results.
2. **Playable Everywhere**: Responsive single-screen layout that works seamlessly on a phone, tablet, or laptop without scrolling.
3. **Zero-Backend Static Hosting**: Fast client-side bundle hosted on GitHub Pages.

---

## 2. Tech Stack
- **Build Tool**: [Vite](https://vite.dev/) (`@vitejs/plugin-react`)
- **UI Framework**: [React](https://react.dev/) (JavaScript / JSX)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Unit Testing**: [Vitest](https://vitest.dev/)
- **Deployment**: GitHub Pages (via GitHub Actions or `gh-pages`)

---

## 3. Functional Requirements

### FR-1: Secret Word & Category/Hint System
- Words are stored in a dedicated, easy-to-edit file (`src/data/words.js`).
- Each entry is an object containing:
  - `word`: Uppercase English string (`A–Z` only, e.g., `"DINOSAUR"`).
  - `category`: Short category label (e.g., `"Animals"`, `"Space"`, `"Food"`).
  - `hint`: Kid-friendly clue (e.g., `"A giant prehistoric reptile"`).
- At the start of each round, the game selects a random word from the list (avoiding immediate repeats when possible).
- Players can see the **Category** automatically.
- **Hint Restriction (2 Lives Left)**: Hints are locked at the start of a round (`"💡 Hint not permited yet!"`) and only become available when the player has **2 or fewer lives left** (`livesLeft <= 2`). Once unlocked, players can click the **"💡 Need a Hint?"** button to reveal the clue.

### FR-2: Classic Stick-Figure Gallows (6 Lives)
- Rendered via an inline SVG component (`src/components/HangmanDrawing.jsx`).
- **Always visible**: The wooden gallows (base, vertical pole, top beam, rope).
- **Revealed progressively on each wrong guess (max 6 wrong guesses)**:
  1. **Head** (`<circle>`)
  2. **Body** (`<line>`)
  3. **Left Arm** (`<line>`)
  4. **Right Arm** (`<line>`)
  5. **Left Leg** (`<line>`)
  6. **Right Leg** (`<line>`)
- **Lives Indicator**: Visual hearts (`❤️` / `🖤`) or counter showing remaining lives (`6 - wrongGuesses.length`).

### FR-3: Mystery Word Display
- Displays one letter slot per character in the secret word (`src/components/WordDisplay.jsx`).
- **During gameplay**:
  - Letters present in `guessedLetters` are shown in uppercase.
  - Unguessed letters are shown as empty underlined slots.
- **When the game is lost**:
  - Any remaining unguessed letters are revealed in a distinct highlight color (e.g., red/amber) so the player can read the full word.

### FR-4: Dual Input (On-Screen Keyboard + Physical Keyboard)
- **On-Screen Keyboard (`src/components/Keyboard.jsx`)**:
  - Displays all 26 English letters (`A` through `Z`) in a responsive grid.
  - Each key reflects one of three states:
    - **Unguessed**: Default clickable button style.
    - **Correct Guess**: Highlighted in green (`bg-emerald-500 text-white`), disabled.
    - **Wrong Guess**: Highlighted in red/faded (`bg-rose-400 opacity-50 text-white`), disabled.
  - All buttons are disabled once the game is won or lost.
- **Physical Keyboard Support**:
  - Pressing `A–Z` (case-insensitive) on a physical keyboard triggers the same guess handler.
  - Pressing `Enter` when the game is over starts a new round.

### FR-5: Win / Lose Detection & Replay
- **Win Condition**: Every unique letter in `secretWord` is included in `guessedLetters`.
- **Lose Condition**: The number of wrong guesses reaches `MAX_MISTAKES` (`6`).
- **End-of-Round Banner**:
  - Displays a celebratory win message (e.g., `"🎉 YOU WON!"`) or encouraging lose message (e.g., `"💀 GAME OVER! The word was..."`).
  - Displays a prominent **"Play Again 🔄"** button that resets `guessedLetters`, hides and locks the hint again, and picks a new random word.

---

## 4. Non-Functional & Mobile Requirements

- **Mobile-First Viewport Fit**:
  - Uses `min-h-dvh` with compact spacing on small screens so the gallows, word slots, and keyboard all fit on a standard smartphone viewport without vertical scrolling.
- **Kid & Touch Ergonomics**:
  - Keyboard buttons have a minimum tap height of `44px` (`h-11` or `h-12`) and `touch-manipulation` to prevent double-tap zoom delays on iOS/Android.
- **Kid-Friendly Code Structure**:
  - Pure game logic lives in `src/utils/gameLogic.js` with zero React dependencies so it is easy to reason about and test in Vitest.
  - Constants like `MAX_MISTAKES = 6`, `HINT_MAX_LIVES = 2`, colors, and messages are clearly named at the top of files.

---

## 5. Proposed Project Structure

```text
forca-game/
├── .github/
│   └── workflows/
│       └── deploy.yml             # Automatic GitHub Pages deployment
├── public/
├── src/
│   ├── components/
│   │   ├── HangmanDrawing.jsx     # SVG gallows + 6 stick-figure body parts
│   │   ├── WordDisplay.jsx        # Letter boxes / underscores for the secret word
│   │   ├── Keyboard.jsx           # A-Z on-screen buttons
│   │   └── GameStatus.jsx         # Win/Lose banner, lives hearts, & Play Again button
│   ├── data/
│   │   └── words.js               # ⭐ KID ZONE: Word list, categories, and hints
│   ├── utils/
│   │   ├── gameLogic.js           # Pure helper functions (wrong guesses, win/lose & hint checks)
│   │   └── gameLogic.test.js      # ⭐ KID ZONE: Simple Vitest unit tests
│   ├── App.jsx                    # Main game state & physical keyboard listener
│   ├── index.css                  # Tailwind CSS import
│   └── main.jsx                   # React entry point
├── index.html
├── package.json
└── vite.config.js                 # Includes `base: '/forca-game/'` for GitHub Pages
```

---

## 6. Acceptance Criteria Checklist
- [ ] Game loads a random English word from `src/data/words.js`.
- [ ] Clicking an on-screen letter or pressing a physical key `A–Z` registers a guess.
- [ ] Correct letters appear in their matching slots in the word.
- [ ] Wrong letters add one stick-figure body part (up to 6 parts) and reduce remaining hearts.
- [ ] Hint is locked (`"💡 Hint not permited yet!"`) until the player has 2 or fewer lives remaining, then unlocks the `"💡 Need a Hint?"` button.
- [ ] Already-guessed letters cannot be guessed a second time.
- [ ] Guessing all letters before 6 mistakes displays the **Win** state.
- [ ] Making 6 mistakes displays the **Lose** state and reveals the secret word.
- [ ] **Play Again** resets the board with a new word.
- [ ] Unit tests in `src/utils/gameLogic.test.js` pass with `npm test`.
- [ ] Layout works comfortably on both a mobile phone screen (`375px` width) and desktop browser.
- [ ] App deploys and runs at `https://<username>.github.io/forca-game/`.

