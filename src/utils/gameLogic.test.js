import { describe, it, expect } from "vitest";
import {
    MAX_MISTAKES,
    INITIAL_SCORE,
    getWrongGuesses,
    isGameWon,
    isGameLost,
    canUseHint,
    getGameResult,
    updateScore,
} from "./gameLogic";

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

    it("does NOT allow a hint when more than 2 lives are left", () => {
        expect(canUseHint(6)).toBe(false);
        expect(canUseHint(5)).toBe(false);
        expect(canUseHint(4)).toBe(false);
        expect(canUseHint(3)).toBe(false);
    });

    it("allows a hint when 2 or fewer lives are left", () => {
        expect(canUseHint(2)).toBe(true);
        expect(canUseHint(1)).toBe(true);
        expect(canUseHint(0)).toBe(true);
    });

    it("unlocks hint only after 4 wrong guesses (2 lives remaining)", () => {
        const afterThreeMistakes = MAX_MISTAKES - getWrongGuesses("DOG", ["A", "B", "C"]).length;
        expect(canUseHint(afterThreeMistakes)).toBe(false);

        const afterFourMistakes = MAX_MISTAKES - getWrongGuesses("DOG", ["A", "B", "C", "E"]).length;
        expect(canUseHint(afterFourMistakes)).toBe(true);
    });

    it("identifies a finished win, loss, or in-progress round", () => {
        expect(getGameResult("DOG", ["D", "O", "G"])).toBe("win");
        expect(getGameResult("DOG", ["A", "B", "C", "E", "F", "H"])).toBe("loss");
        expect(getGameResult("DOG", ["D"])).toBe(null);
    });

    it("updates only the matching score when a round ends", () => {
        expect(updateScore(INITIAL_SCORE, "win")).toEqual({ wins: 1, losses: 0 });
        expect(updateScore({ wins: 2, losses: 1 }, "loss")).toEqual({ wins: 2, losses: 2 });
        expect(updateScore({ wins: 2, losses: 1 }, null)).toEqual({ wins: 2, losses: 1 });
    });
});
