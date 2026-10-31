export const WORDS = [
    { word: "DINOSAUR", category: "Animals", hint: "A giant prehistoric lizard" },
    { word: "ROCKET", category: "Space", hint: "Flies astronauts to the moon" },
    { word: "PIZZA", category: "Food", hint: "Round, cheesy, and has slices" },
    { word: "SHARK", category: "Ocean", hint: "Has lots of sharp teeth and fins" },
    { word: "ROBOT", category: "Tech", hint: "A machine made of metal and gears" },
    { word: "SUSHI", category: "Food", hint: "Japanese food" },
];

export function getRandomWord(previousWord = "") {
    const choices = WORDS.filter((item) => item.word !== previousWord);
    const pool = choices.length > 0 ? choices : WORDS;
    const randomIndex = Math.floor(Math.random() * pool.length);
    return pool[randomIndex];
}