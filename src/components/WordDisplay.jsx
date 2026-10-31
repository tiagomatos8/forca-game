export default function WordDisplay({ secretWord, guessedLetters, revealAll = false }) {
    return (
        <div className="flex flex-wrap justify-center gap-2 my-3 px-2">
            {secretWord.split("").map((letter, index) => {
                const isGuessed = guessedLetters.includes(letter);
                const shouldShow = isGuessed || revealAll;

                return (
                    <span
                        key={index}
                        className="w-9 h-12 md:w-12 md:h-14 border-b-4 border-slate-800 bg-white/80 rounded-t-lg flex items-center justify-center text-2xl md:text-4xl font-black uppercase shadow-xs"
                    >
                        <span
                            className={
                                !isGuessed && revealAll
                                    ? "text-rose-500" // Missed letter revealed at Game Over
                                    : "text-slate-900"
                            }
                        >
                            {shouldShow ? letter : ""}
                        </span>
                    </span>
                );
            })}
        </div>
    );
}