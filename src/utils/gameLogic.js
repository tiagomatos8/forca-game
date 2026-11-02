export const MAX_MISTAKES = 6;
export const HINT_MAX_LIVES = 2;
export const INITIAL_SCORE = { wins: 0, losses: 0 };

// 1. Return only the guessed letters that are NOT in the secret word
export function getWrongGuesses(secretWord, guessedLetters) {
    return guessedLetters.filter((letter) => !secretWord.includes(letter));
}

// 2. Did the player guess every letter in the secret word?
export function isGameWon(secretWord, guessedLetters) {
    return secretWord
        .split("")
        .every((letter) => guessedLetters.includes(letter));
}

// 3. Did the player make 6 or more wrong guesses?
export function isGameLost(secretWord, guessedLetters) {
    return getWrongGuesses(secretWord, guessedLetters).length >= MAX_MISTAKES;
}

// 4. Can the player use a hint? (Only when 2 or fewer lives are left)
export function canUseHint(livesLeft) {
    return livesLeft <= HINT_MAX_LIVES;
}

export function getGameResult(secretWord, guessedLetters) {
    if (isGameWon(secretWord, guessedLetters)) return "win";
    if (isGameLost(secretWord, guessedLetters)) return "loss";
    return null;
}

export function updateScore(score, result) {
    if (result === "win") {
        return { ...score, wins: score.wins + 1 };
    }

    if (result === "loss") {
        return { ...score, losses: score.losses + 1 };
    }

    return score;
}
