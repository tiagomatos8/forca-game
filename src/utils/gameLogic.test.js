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