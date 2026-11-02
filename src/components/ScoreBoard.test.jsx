import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import ScoreBoard from "./ScoreBoard";

describe("ScoreBoard", () => {
    it("displays the current wins and losses", () => {
        const markup = renderToStaticMarkup(
            <ScoreBoard wins={4} losses={2} />,
        );

        expect(markup).toContain("Wins: 4");
        expect(markup).toContain("Losses: 2");
        expect(markup).toContain("bg-emerald-200");
        expect(markup).toContain("bg-rose-200");
    });
});
