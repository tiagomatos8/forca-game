# Parent + 7-Year-Old Build Guide: Hangman (`forca-game`)

This guide breaks the project into **8 short "Missions" (15–25 minutes each)**.
Each mission clearly separates:
- **🛠️ Parent Driver**: Scaffolding, wiring hooks, and boilerplate.
- **🧒 Co-Pilot (Your 7-Year-Old)**: Typing real strings/numbers/Tailwind colors, running tests, and testing on the computer & phone.

> **💡 Pro-Tip for Coding with a 7-Year-Old**:
> Put your code editor on the left half of the screen and the browser preview on the right half. Because Vite has instant **Hot Module Replacement (HMR)**, every time your son types a color or word and presses `Cmd + S`, the game updates in milliseconds!

---

## Mission 0: Project Setup & "Hello, Game!"

### 🛠️ Parent Driver: Scaffold Vite + React + Tailwind + Vitest
Run these commands in `/Users/sabrina/PROJECTS/tcmx/forca-game`:

```bash
# 1. Scaffold Vite React (JS) in the current folder
npm create vite@latest . -- --template react

# 2. Install dependencies + Tailwind CSS v4 + Vitest
npm install
npm install -D tailwindcss @tailwindcss/vite vitest
```

Update `vite.config.js` so Tailwind works and the base URL is ready for GitHub Pages:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/forca-game/',
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'node',
  },
})
```

Replace the contents of `src/index.css` with:

```css
@import "tailwindcss";
```

Add `"test": "vitest"` to the `"scripts"` section of `package.json`:

```json
"scripts": {
  "dev": "vite --host",
  "build": "vite build",
  "preview": "vite preview",
  "test": "vitest"
}
```
*(Adding `--host` to `dev` prints a local Network URL like `http://192.168.1.x:5173/forca-game/` so you can open the game on your phone right away while coding!)*

### 🧒 Co-Pilot Task: Customize the Title & Background Color
Open `src/App.jsx` and put this starter shell in place:

```jsx
export default function App() {
  // 🧒 KID ZONE: Change your game title and background color!
  const GAME_TITLE = "SUPER HANGMAN";
  const BG_COLOR = "bg-sky-100"; // Try: bg-amber-100, bg-emerald-100, bg-purple-100

  return (
    <main className={`min-h-dvh ${BG_COLOR} flex flex-col items-center p-4 font-sans`}>
      <h1 className="text-3xl md:text-5xl font-extrabold text-slate-800 tracking-wide">
        {GAME_TITLE}
      </h1>
    </main>
  );
}
```
1. Start the dev server with `npm run dev`.
2. Let your son type his own `GAME_TITLE` in quotes and try swapping `bg-sky-100` for `bg-amber-100`, `bg-lime-100`, or `bg-indigo-100`.

---

## Mission 1: The Secret Word Vault (`src/data/words.js`)

### 🛠️ Parent Driver: Create the Word List File
Create `src/data/words.js` with a clean array of objects.

```js
export const WORDS = [
  { word: "DINOSAUR", category: "Animals", hint: "A giant prehistoric lizard" },
  { word: "ROCKET", category: "Space", hint: "Flies astronauts to the moon" },
  { word: "PIZZA", category: "Food", hint: "Round, cheesy, and has slices" },
  { word: "SHARK", category: "Ocean", hint: "Has lots of sharp teeth and fins" },
  { word: "ROBOT", category: "Tech", hint: "A machine made of metal and gears" },
];

export function getRandomWord(previousWord = "") {
  const choices = WORDS.filter((item) => item.word !== previousWord);
  const pool = choices.length > 0 ? choices : WORDS;
  const randomIndex = Math.floor(Math.random() * pool.length);
  return pool[randomIndex];
}
```

### 🧒 Co-Pilot Task: Type Secret Words!
Have your son copy-paste a line in `WORDS` and type **5 to 10 of his own words** in `ALL CAPS` (plus a category and a funny hint for each!).
- Remind him: **Only letters `A` to `Z` (no spaces or hyphens yet!)**.

---

## Mission 2: The Game Brain & Green Checkmarks (Vitest)

Before building the UI, write the rules of Hangman as tiny pure functions so your son can see how tests work.

### 🛠️ Parent Driver: Create `src/utils/gameLogic.js`
```js
export const MAX_MISTAKES = 6;

// 1. Return only the guessed letters that are NOT in the secret word
export function getWrongGuesses(secretWord, guessedLetters) {
  return guessedLetters.filter((letter) => !secretWord.includes(letter));
}

// 2. Did the player guess every letter in the secret word?
export function isGameWon(secretWord, guessedLetters) {
  return secretWord
    .split("")
    .every((letter) => guessedLetters.includes(letter));
}

// 3. Did the player make 6 or more wrong guesses?
export function isGameLost(secretWord, guessedLetters) {
  return getWrongGuesses(secretWord, guessedLetters).length >= MAX_MISTAKES;
}
```

### 🧒 Co-Pilot Task: Play "Red Light, Green Light" with Vitest!
Create `src/utils/gameLogic.test.js`:

```js
import { describe, it, expect } from "vitest";
import { getWrongGuesses, isGameWon, isGameLost } from "./gameLogic";

describe("Hangman Game Rules", () => {
  it("counts wrong guesses correctly", () => {
    // 🧒 Try changing the secret word or the guessed letters!
    const wrong = getWrongGuesses("CAT", ["C", "Z", "X"]);
    expect(wrong).toEqual(["Z", "X"]);
  });

  it("knows when the player WINS", () => {
    const won = isGameWon("DOG", ["D", "O", "G"]);
    expect(won).toBe(true);
  });

  it("knows when the player LOSES after 6 mistakes", () => {
    const lost = isGameLost("DOG", ["A", "B", "C", "E", "F", "H"]);
    expect(lost).toBe(true);
  });
});
```

1. Run `npm test` in a terminal.
2. Show your son the **green `PASS` badges**.
3. **Challenge him**: *"Can you make the second test fail (turn RED) by removing `'G'` from `['D', 'O', 'G']`? Now can you fix it so it turns GREEN again?"*
4. Help him write one test of his own using one of his words (like `"PIZZA"`).

---

## Mission 3: Drawing the Stick Figure (`src/components/HangmanDrawing.jsx`)

Using an SVG means each body part is just one line of code with `(x, y)` coordinates!

### 🛠️ Parent Driver: Create `src/components/HangmanDrawing.jsx`
```jsx
// 🧒 KID ZONE: Change stroke="currentColor" or tweak sizes!
const HEAD = (
  <circle key="head" cx="140" cy="70" r="20" className="stroke-slate-800 fill-amber-200" strokeWidth="5" />
);

const BODY = (
  <line key="body" x1="140" y1="90" x2="140" y2="150" className="stroke-slate-800" strokeWidth="5" strokeLinecap="round" />
);

const LEFT_ARM = (
  <line key="left-arm" x1="140" y1="110" x2="110" y2="135" className="stroke-slate-800" strokeWidth="5" strokeLinecap="round" />
);

const RIGHT_ARM = (
  <line key="right-arm" x1="140" y1="110" x2="170" y2="135" className="stroke-slate-800" strokeWidth="5" strokeLinecap="round" />
);

const LEFT_LEG = (
  <line key="left-leg" x1="140" y1="150" x2="115" y2="190" className="stroke-slate-800" strokeWidth="5" strokeLinecap="round" />
);

const RIGHT_LEG = (
  <line key="right-leg" x1="140" y1="150" x2="165" y2="190" className="stroke-slate-800" strokeWidth="5" strokeLinecap="round" />
);

const BODY_PARTS = [HEAD, BODY, LEFT_ARM, RIGHT_ARM, LEFT_LEG, RIGHT_LEG];

export default function HangmanDrawing({ wrongGuessCount }) {
  return (
    <div className="flex justify-center">
      <svg viewBox="0 0 220 230" className="w-44 h-44 md:w-56 md:h-56">
        {/* Gallows Structure */}
        <line x1="20" y1="215" x2="120" y2="215" className="stroke-amber-800" strokeWidth="8" strokeLinecap="round" />
        <line x1="60" y1="215" x2="60" y2="20" className="stroke-amber-800" strokeWidth="8" strokeLinecap="round" />
        <line x1="60" y1="20" x2="140" y2="20" className="stroke-amber-800" strokeWidth="8" strokeLinecap="round" />
        <line x1="140" y1="20" x2="140" y2="50" className="stroke-amber-700" strokeWidth="4" />

        {/* Reveal 1 body part per wrong guess */}
        {BODY_PARTS.slice(0, wrongGuessCount)}
      </svg>
    </div>
  );
}
```

### 🧒 Co-Pilot Task: Experiment with the Stick Figure
1. Temporarily render `<HangmanDrawing wrongGuessCount={6} />` in `App.jsx`.
2. Let your son change `wrongGuessCount` from `0` to `1`, `2`, `3`, `4`, `5`, `6` and watch the stick figure appear piece by piece.
3. Let him change `r="20"` on `HEAD` to `r="35"` (giant bobblehead!) and pick the `fill-amber-200` color for the head.

---

## Mission 4: The Mystery Word Slots (`src/components/WordDisplay.jsx`)

### 🛠️ Parent Driver: Create `src/components/WordDisplay.jsx`
```jsx
export default function WordDisplay({ secretWord, guessedLetters, revealAll = false }) {
  return (
    <div className="flex flex-wrap justify-center gap-2 my-3 px-2">
      {secretWord.split("").map((letter, index) => {
        const isGuessed = guessedLetters.includes(letter);
        const shouldShow = isGuessed || revealAll;

        return (
          <span
            key={index}
            className="w-9 h-12 md:w-12 md:h-14 border-b-4 border-slate-800 bg-white/80 rounded-t-lg flex items-center justify-center text-2xl md:text-4xl font-black uppercase shadow-xs"
          >
            <span
              className={
                !isGuessed && revealAll
                  ? "text-rose-500" // Missed letter revealed at Game Over
                  : "text-slate-900"
              }
            >
              {shouldShow ? letter : ""}
            </span>
          </span>
        );
      })}
    </div>
  );
}
```

### 🧒 Co-Pilot Task: Style the Letter Tiles
Let your son test `<WordDisplay secretWord="ROCKET" guessedLetters={["R", "T"]} />` and tweak:
- Tile background color (`bg-white/80` -> `bg-yellow-50`, etc.)
- Missed letter color (`text-rose-500`)

---

## Mission 5: The Touch & Click Keyboard (`src/components/Keyboard.jsx`)

### 🛠️ Parent Driver + 🧒 Co-Pilot: Build `src/components/Keyboard.jsx`
Have your son type out the 26 letters of `ALPHABET` himself!

```jsx
// 🧒 KID ZONE: Type all 26 letters from A to Z!
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function Keyboard({
  secretWord,
  guessedLetters,
  onGuess,
  disabled = false,
}) {
  return (
    <div className="grid grid-cols-7 sm:grid-cols-9 gap-1.5 md:gap-2 max-w-xl w-full px-2">
      {ALPHABET.map((letter) => {
        const isGuessed = guessedLetters.includes(letter);
        const isCorrect = isGuessed && secretWord.includes(letter);
        const isWrong = isGuessed && !secretWord.includes(letter);

        // 🧒 KID ZONE: Pick button colors for right, wrong, and unused keys!
        let buttonColor = "bg-white hover:bg-sky-200 text-slate-800 border-slate-300";
        if (isCorrect) {
          buttonColor = "bg-emerald-500 text-white border-emerald-600";
        } else if (isWrong) {
          buttonColor = "bg-rose-400 text-white border-rose-500 opacity-50";
        }

        return (
          <button
            key={letter}
            onClick={() => onGuess(letter)}
            disabled={isGuessed || disabled}
            className={`h-11 md:h-12 rounded-xl font-bold text-lg md:text-xl border-b-4 transition active:translate-y-0.5 touch-manipulation ${buttonColor} disabled:cursor-not-allowed`}
          >
            {letter}
          </button>
        );
      })}
    </div>
  );
}
```

---

## Mission 6: Putting It All Together (`src/App.jsx`)

### 🛠️ Parent Driver: Connect State & Physical Keyboard in `src/App.jsx`
```jsx
import { useState, useEffect, useCallback } from "react";
import { getRandomWord } from "./data/words";
import {
  MAX_MISTAKES,
  getWrongGuesses,
  isGameWon,
  isGameLost,
} from "./utils/gameLogic";
import HangmanDrawing from "./components/HangmanDrawing";
import WordDisplay from "./components/WordDisplay";
import Keyboard from "./components/Keyboard";

export default function App() {
  const [wordEntry, setWordEntry] = useState(() => getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [showHint, setShowHint] = useState(false);

  const secretWord = wordEntry.word;
  const wrongGuesses = getWrongGuesses(secretWord, guessedLetters);
  const isWinner = isGameWon(secretWord, guessedLetters);
  const isLoser = isGameLost(secretWord, guessedLetters);
  const isGameOver = isWinner || isLoser;
  const livesLeft = MAX_MISTAKES - wrongGuesses.length;

  const handleGuess = useCallback(
    (letter) => {
      if (isGameOver || guessedLetters.includes(letter)) return;
      setGuessedLetters((prev) => [...prev, letter]);
    },
    [guessedLetters, isGameOver]
  );

  const startNewGame = useCallback(() => {
    setWordEntry((prev) => getRandomWord(prev.word));
    setGuessedLetters([]);
    setShowHint(false);
  }, []);

  // Physical keyboard support for desktop play
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toUpperCase();
      if (/^[A-Z]$/.test(key)) {
        handleGuess(key);
      } else if (e.key === "Enter" && isGameOver) {
        startNewGame();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleGuess, isGameOver, startNewGame]);

  // 🧒 KID ZONE: Customize your win and lose messages!
  const WIN_MESSAGE = "🎉 YOU SAVED HIM! AWESOME JOB!";
  const LOSE_MESSAGE = "💀 OH NO! BETTER LUCK NEXT TIME!";

  return (
    <main className="min-h-dvh bg-sky-100 flex flex-col items-center justify-between py-3 px-2 font-sans select-none">
      {/* Top Header & Lives */}
      <header className="text-center">
        <h1 className="text-2xl md:text-4xl font-extrabold text-slate-800">
          SUPER HANGMAN
        </h1>
        <div className="flex items-center justify-center gap-3 mt-1 text-sm md:text-base font-bold text-slate-700">
          <span className="bg-amber-200 px-3 py-0.5 rounded-full">
            Category: {wordEntry.category}
          </span>
          <span>
            {"❤️".repeat(livesLeft)}
            {"🖤".repeat(wrongGuesses.length)}
          </span>
        </div>
      </header>

      {/* Stick Figure Drawing */}
      <HangmanDrawing wrongGuessCount={wrongGuesses.length} />

      {/* Hint Button / Text */}
      <div className="h-7 flex items-center justify-center">
        {!showHint ? (
          <button
            onClick={() => setShowHint(true)}
            className="text-xs md:text-sm bg-amber-300 hover:bg-amber-400 text-slate-900 font-bold px-3 py-1 rounded-full shadow-xs"
          >
            💡 Need a Hint?
          </button>
        ) : (
          <p className="text-sm md:text-base font-semibold text-slate-700 bg-white/70 px-3 py-0.5 rounded-full">
            💡 Hint: {wordEntry.hint}
          </p>
        )}
      </div>

      {/* Mystery Word Slots */}
      <WordDisplay
        secretWord={secretWord}
        guessedLetters={guessedLetters}
        revealAll={isLoser}
      />

      {/* Win / Lose Banner */}
      {isGameOver && (
        <div className="flex flex-col items-center gap-2 my-1">
          <p
            className={`text-lg md:text-2xl font-extrabold ${
              isWinner ? "text-emerald-700" : "text-rose-600"
            }`}
          >
            {isWinner ? WIN_MESSAGE : LOSE_MESSAGE}
          </p>
          <button
            onClick={startNewGame}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-2 rounded-xl shadow-md active:scale-95 transition"
          >
            Play Again 🔄
          </button>
        </div>
      )}

      {/* A-Z Keyboard */}
      <Keyboard
        secretWord={secretWord}
        guessedLetters={guessedLetters}
        onGuess={handleGuess}
        disabled={isGameOver}
      />
    </main>
  );
}
```

### 🧒 Co-Pilot Task: Playtest on Computer & Phone!
1. Have your son customize `WIN_MESSAGE`, `LOSE_MESSAGE`, and the hearts emoji (`❤️` vs `⭐` or `🍕`).
2. Open the local network URL (`http://192.168.x.x:5173/forca-game/`) on a mobile phone and play several rounds together!

---

## Mission 7: Publish to GitHub Pages 🚀

### 🛠️ Parent Driver: Create GitHub Actions Workflow
Create `.github/workflows/deploy.yml` so every `git push` automatically builds and publishes the game:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build-and-deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Run unit tests
        run: npm test -- --run

      - name: Build with Vite
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: "./dist"

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Enable GitHub Pages in Repository Settings (One-Time Setup)
1. Push your code to GitHub (`main` branch).
2. On GitHub, go to **Settings → Pages**.
3. Under **Build and deployment → Source**, select **GitHub Actions**.
4. Once the workflow finishes (about 45 seconds), your game will be live at:
   `https://<your-github-username>.github.io/forca-game/`

### 🧒 Co-Pilot Task: The Big Launch!
Let your son press **Enter** on `git push` in the terminal, watch the GitHub Action turn green, and bookmark the live link on the home screen of your phone or tablet!

---

## Bonus Ideas for Future Rainy Days 🌟
Once the base game is live, here are fun upgrades you and your son can add in 10 minutes anytime:
1. **Sound Effects**: Record your son saying *"Woohoo!"* (correct letter) and *"Uh-oh!"* (wrong letter) on your phone, drop the `.mp3` files in `public/sounds/`, and play them with `new Audio('sounds/woohoo.mp3').play()`.
2. **Hand-Drawn Stages**: Have your son draw the 6 stages of the hangman on paper, snap photos, and swap the SVG with `<img src={...} />`.
3. **Win Streak Counter**: Track how many words in a row he solves without losing (`localStorage.getItem('highScore')`).

