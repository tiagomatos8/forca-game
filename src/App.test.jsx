import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import App from "./App";

vi.mock("./data/words", () => ({
    getRandomWord: vi.fn(() => ({
        word: "CAT",
        category: "Animals",
        hint: "A small pet",
    })),
}));

describe("App", () => {
    it("renders a new round with its category, score, word slots, and keyboard", () => {
        const markup = renderToStaticMarkup(<App />);

        expect(markup).toContain("Luca and Tiago SUPER HANGMAN");
        expect(markup).toContain("Category: Animals");
        expect(markup).toContain("Wins: 0");
        expect(markup).toContain("Losses: 0");
        expect(markup).toContain("Hint not permited yet!");
        expect(markup.match(/border-b-4 border-slate-800 bg-white\/80/g)).toHaveLength(3);
        expect(markup.match(/<button/g)).toHaveLength(26);
    });
});
