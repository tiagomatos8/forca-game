const getHead = (wrongGuessCount) => {
    // 1: Happy, 2: Neutral, 3: Worried, 4: Scared, 5: Grimacing, 6+: Dead
    const isDead = wrongGuessCount >= 6;
    const isGrimacing = wrongGuessCount === 5;
    const isScared = wrongGuessCount === 4;

    return (
        <g key="head">
            {/* Base Head (turns slightly paler when dead) */}
            <circle
                cx="140"
                cy="70"
                r="20"
                className={`stroke-slate-800 transition-colors duration-300 ${isDead ? "fill-slate-200" : "fill-amber-200"
                    }`}
                strokeWidth="5"
            />

            {/* EYES */}
            {isDead ? (
                // 6: Dead 'X' Eyes
                <g className="stroke-slate-800" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M 130 62 L 136 68 M 136 62 L 130 68" />
                    <path d="M 144 62 L 150 68 M 150 62 L 144 68" />
                </g>
            ) : isGrimacing ? (
                // 5: Squinting '> <' Eyes
                <g className="stroke-slate-800 fill-none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M 130 62 L 136 65 L 130 68" />
                    <path d="M 150 62 L 144 65 L 150 68" />
                </g>
            ) : (
                // 1-4: Standard / Wide Circle Eyes
                <g className="fill-slate-800">
                    <circle cx="133" cy="65" r={isScared ? "3" : "2.2"} />
                    <circle cx="147" cy="65" r={isScared ? "3" : "2.2"} />
                </g>
            )}

            {/* MOUTH */}
            {wrongGuessCount === 1 && (
                // 1: Happy Smile
                <path
                    d="M 133 75 Q 140 83 147 75"
                    className="stroke-slate-800 fill-none"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                />
            )}
            {wrongGuessCount === 2 && (
                // 2: Unsure Straight Mouth
                <line
                    x1="134"
                    y1="78"
                    x2="146"
                    y2="78"
                    className="stroke-slate-800"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                />
            )}
            {wrongGuessCount === 3 && (
                // 3: Worried Slight Frown
                <path
                    d="M 133 80 Q 140 74 147 80"
                    className="stroke-slate-800 fill-none"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                />
            )}
            {wrongGuessCount === 4 && (
                // 4: Scared 'O' Gasp
                <circle
                    cx="140"
                    cy="78"
                    r="3.5"
                    className="stroke-slate-800 fill-none"
                    strokeWidth="2.5"
                />
            )}
            {wrongGuessCount === 5 && (
                // 5: Panicked Deep Frown
                <path
                    d="M 132 81 Q 140 71 148 81"
                    className="stroke-slate-800 fill-none"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                />
            )}
            {isDead && (
                // 6: Dead Flat Mouth + Tongue Sticking Out
                <g>
                    <path
                        d="M 133 78 L 147 78"
                        className="stroke-slate-800 fill-none"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                    />
                    <path
                        d="M 140 78 L 140 83 A 2.5 2.5 0 0 0 145 83 L 145 78 Z"
                        className="fill-rose-500 stroke-slate-800"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                    />
                </g>
            )}
        </g>
    );
};

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

export default function HangmanDrawing({ wrongGuessCount }) {
    const bodyParts = [
        getHead(wrongGuessCount),
        BODY,
        LEFT_ARM,
        RIGHT_ARM,
        LEFT_LEG,
        RIGHT_LEG,
    ];

    return (
        <div className="flex justify-center">
            <svg viewBox="0 0 220 230" className="w-44 h-44 md:w-56 md:h-56">
                {/* Gallows Structure */}
                <line x1="20" y1="215" x2="120" y2="215" className="stroke-amber-800" strokeWidth="8" strokeLinecap="round" />
                <line x1="60" y1="215" x2="60" y2="20" className="stroke-amber-800" strokeWidth="8" strokeLinecap="round" />
                <line x1="60" y1="20" x2="140" y2="20" className="stroke-amber-800" strokeWidth="8" strokeLinecap="round" />
                <line x1="140" y1="20" x2="140" y2="50" className="stroke-amber-700" strokeWidth="4" />

                {/* Reveal 1 body part per wrong guess */}
                {bodyParts.slice(0, wrongGuessCount)}
            </svg>
        </div>
    );
}