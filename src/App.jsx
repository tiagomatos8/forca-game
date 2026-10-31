export default function App() {
  // 🧒 KID ZONE: Change your game title and background color!
  const GAME_TITLE = "Luca and Tiago SUPER HANGMAN";
  const BG_COLOR = "bg-lime-300"; // Try: bg-amber-100, bg-emerald-100, bg-purple-100

  return (
    <main className={`min-h-dvh ${BG_COLOR} flex flex-col items-center p-4 font-sans`}>
      <h1 className="text-3xl md:text-5xl font-extrabold text-slate-800 tracking-wide">
        {GAME_TITLE}
      </h1>
    </main>
  );
}