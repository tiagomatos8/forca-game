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
          Luca and Tiago SUPER HANGMAN
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
            className={`text-lg md:text-2xl font-extrabold ${isWinner ? "text-emerald-700" : "text-rose-600"
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