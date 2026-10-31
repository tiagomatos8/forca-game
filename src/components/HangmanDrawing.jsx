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