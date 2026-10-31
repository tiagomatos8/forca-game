export const MAX_MISTAKES = 6;

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