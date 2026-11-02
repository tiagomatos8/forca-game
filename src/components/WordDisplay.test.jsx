import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import WordDisplay from "./WordDisplay";

describe("WordDisplay", () => {
    it("renders one hidden slot for each secret letter", () => {
        const markup = renderToStaticMarkup(
            <WordDisplay secretWord="CAT" guessedLetters={[]} />,
        );

        expect(markup.match(/border-b-4/g)).toHaveLength(3);
        expect(markup).not.toContain(">C</span>");
        expect(markup).not.toContain(">A</span>");
        expect(markup).not.toContain(">T</span>");
    });

    it("reveals guessed letters while keeping other letters hidden", () => {
        const markup = renderToStaticMarkup(
            <WordDisplay secretWord="CAT" guessedLetters={["A"]} />,
        );

        expect(markup).toContain(">A</span>");
        expect(markup).not.toContain(">C</span>");
        expect(markup).not.toContain(">T</span>");
    });

    it("reveals missed letters in red at game over", () => {
        const markup = renderToStaticMarkup(
            <WordDisplay
                secretWord="CAT"
                guessedLetters={["A"]}
                revealAll
            />,
        );

        expect(markup).toContain("text-rose-500");
        expect(markup).toContain(">C</span>");
        expect(markup).toContain(">A</span>");
        expect(markup).toContain(">T</span>");
    });
});
