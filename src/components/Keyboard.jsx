// 🧒 KID ZONE: Type all 26 letters from A to Z!
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function Keyboard({
    secretWord,
    guessedLetters,
    onGuess,
    disabled = false,
}) {
    return (
        <div className="grid grid-cols-7 sm:grid-cols-9 gap-1.5 md:gap-2 max-w-xl w-full px-2">
            {ALPHABET.map((letter) => {
                const isGuessed = guessedLetters.includes(letter);
                const isCorrect = isGuessed && secretWord.includes(letter);
                const isWrong = isGuessed && !secretWord.includes(letter);

                // 🧒 KID ZONE: Pick button colors for right, wrong, and unused keys!
                let buttonColor = "bg-white hover:bg-sky-200 text-slate-800 border-slate-300";
                if (isCorrect) {
                    buttonColor = "bg-emerald-500 text-white border-emerald-600";
                } else if (isWrong) {
                    buttonColor = "bg-rose-400 text-white border-rose-500 opacity-50";
                }

                return (
                    <button
                        key={letter}
                        onClick={() => onGuess(letter)}
                        disabled={isGuessed || disabled}
                        className={`h-11 md:h-12 rounded-xl font-bold text-lg md:text-xl border-b-4 transition active:translate-y-0.5 touch-manipulation ${buttonColor} disabled:cursor-not-allowed`}
                    >
                        {letter}
                    </button>
                );
            })}
        </div>
    );
}