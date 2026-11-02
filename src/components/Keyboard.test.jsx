import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import Keyboard from "./Keyboard";

describe("Keyboard", () => {
    it("renders every letter from A to Z", () => {
        const markup = renderToStaticMarkup(
            <Keyboard secretWord="CAT" guessedLetters={[]} onGuess={() => {}} />,
        );

        expect(markup.match(/<button/g)).toHaveLength(26);
        expect(markup).toContain(">A</button>");
        expect(markup).toContain(">Z</button>");
    });

    it("styles correct and incorrect guesses differently", () => {
        const markup = renderToStaticMarkup(
            <Keyboard
                secretWord="CAT"
                guessedLetters={["A", "B"]}
                onGuess={() => {}}
            />,
        );

        expect(markup).toContain("bg-emerald-500 text-white border-emerald-600");
        expect(markup).toContain(
            "bg-rose-400 text-white border-rose-500 opacity-50",
        );
    });

    it("calls onGuess with the clicked letter and disables guessed letters", () => {
        const onGuess = vi.fn();
        const keyboard = Keyboard({
            secretWord: "CAT",
            guessedLetters: ["A"],
            onGuess,
        });
        const buttons = keyboard.props.children;
        const unguessedButton = buttons.find(
            (button) => button.props.children === "B",
        );
        const guessedButton = buttons.find(
            (button) => button.props.children === "A",
        );

        unguessedButton.props.onClick();
        expect(onGuess).toHaveBeenCalledWith("B");
        expect(guessedButton.props.disabled).toBe(true);
    });

    it("disables every key when the game is over", () => {
        const markup = renderToStaticMarkup(
            <Keyboard
                secretWord="CAT"
                guessedLetters={[]}
                onGuess={() => {}}
                disabled
            />,
        );

        expect(markup.match(/<button disabled=""/g)).toHaveLength(26);
    });
});
