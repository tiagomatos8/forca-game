export const WORDS = [
    // Animals
    { word: "DINOSAUR", category: "Animals", hint: "A giant prehistoric lizard" },
    { word: "MONKEY", category: "Animals", hint: "Loves bananas and swings in trees" },
    { word: "PANDA", category: "Animals", hint: "A black and white bear that eats bamboo" },
    { word: "TIGER", category: "Animals", hint: "A big orange cat with black stripes" },
    { word: "ZEBRA", category: "Animals", hint: "Looks like a horse with black and white stripes" },
    { word: "PUPPY", category: "Animals", hint: "A baby dog that loves to bark and play" },
    { word: "RABBIT", category: "Animals", hint: "Has long ears and loves to hop" },
    { word: "GIRAFFE", category: "Animals", hint: "The tallest animal with a very long neck" },

    // Food
    { word: "PIZZA", category: "Food", hint: "Round, cheesy, and cut into slices" },
    { word: "SUSHI", category: "Food", hint: "Japanese dish made with rice and fish" },
    { word: "BANANA", category: "Food", hint: "A long yellow fruit you peel to eat" },
    { word: "COOKIE", category: "Food", hint: "A sweet baked treat, often with chocolate chips" },
    { word: "BURGER", category: "Food", hint: "A patty served inside a round bun" },
    { word: "POPCORN", category: "Food", hint: "A salty crunchy snack for watching movies" },
    { word: "DONUT", category: "Food", hint: "A sweet fried ring with frosting or sprinkles" },
    { word: "APPLE", category: "Food", hint: "A crunchy red or green fruit" },

    // Ocean
    { word: "SHARK", category: "Ocean", hint: "Has lots of sharp teeth and fins" },
    { word: "DOLPHIN", category: "Ocean", hint: "A smart ocean mammal that jumps out of water" },
    { word: "OCTOPUS", category: "Ocean", hint: "A sea creature with eight tentacles" },
    { word: "WHALE", category: "Ocean", hint: "The largest animal in the ocean" },
    { word: "TURTLE", category: "Ocean", hint: "Swims in the sea and hides inside a shell" },
    { word: "CRAB", category: "Ocean", hint: "Walks sideways on the beach and has claws" },

    // Space
    { word: "ROCKET", category: "Space", hint: "Flies astronauts to the moon" },
    { word: "PLANET", category: "Space", hint: "A large round world that orbits the sun" },
    { word: "ALIEN", category: "Space", hint: "A creature from another world" },
    { word: "COMET", category: "Space", hint: "An icy space rock with a bright glowing tail" },
    { word: "MOON", category: "Space", hint: "Shines bright in the night sky" },

    // Tech & Things
    { word: "ROBOT", category: "Tech", hint: "A machine made of metal and gears" },
    { word: "CAMERA", category: "Tech", hint: "Used to take photos and videos" },
    { word: "GUITAR", category: "Music", hint: "An instrument with six strings you strum" },
    { word: "TRAIN", category: "Vehicles", hint: "Rides on metal tracks and says choo-choo" },

    // Nature & Adventure
    { word: "RAINBOW", category: "Nature", hint: "Colorful arc in the sky after it rains" },
    { word: "VOLCANO", category: "Nature", hint: "A mountain that erupts with hot lava" },
    { word: "CASTLE", category: "Places", hint: "A giant stone home for kings and queens" },
    { word: "PIRATE", category: "Adventure", hint: "Sails the seven seas looking for treasure" },
    { word: "DRAGON", category: "Fantasy", hint: "A flying monster that breathes fire" },
];

export function getRandomWord(previousWord = "") {
    const choices = WORDS.filter((item) => item.word !== previousWord);
    const pool = choices.length > 0 ? choices : WORDS;
    const randomIndex = Math.floor(Math.random() * pool.length);
    return pool[randomIndex];
}
