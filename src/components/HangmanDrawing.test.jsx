import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import HangmanDrawing from "./HangmanDrawing";

describe("HangmanDrawing", () => {
    it("always renders the gallows", () => {
        const markup = renderToStaticMarkup(<HangmanDrawing wrongGuessCount={0} />);

        expect(markup).toContain('x1="20" y1="215" x2="120" y2="215"');
        expect(markup).toContain('x1="60" y1="20" x2="140" y2="20"');
        expect(markup).not.toContain('cx="140" cy="70"');
    });

    it("reveals one body part for each wrong guess", () => {
        const oneMistake = renderToStaticMarkup(
            <HangmanDrawing wrongGuessCount={1} />,
        );
        const threeMistakes = renderToStaticMarkup(
            <HangmanDrawing wrongGuessCount={3} />,
        );
        const sixMistakes = renderToStaticMarkup(
            <HangmanDrawing wrongGuessCount={6} />,
        );

        expect(oneMistake).toContain('cx="140" cy="70"');
        expect(oneMistake).not.toContain('x1="140" y1="90"');
        expect(threeMistakes).toContain('x1="140" y1="90"');
        expect(threeMistakes).toContain('x1="140" y1="110" x2="110"');
        expect(sixMistakes).toContain('x1="140" y1="150" x2="165"');
    });

    it("shows the dead expression after six or more mistakes", () => {
        const markup = renderToStaticMarkup(
            <HangmanDrawing wrongGuessCount={7} />,
        );

        expect(markup).toContain("fill-slate-200");
        expect(markup).toContain("M 130 62 L 136 68");
        expect(markup).toContain("M 133 78 L 147 78");
    });
});
