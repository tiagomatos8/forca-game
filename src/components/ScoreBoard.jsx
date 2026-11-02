export default function ScoreBoard({ wins, losses }) {
  return (
    <div className="flex items-center justify-center gap-3 mt-1 text-sm font-bold text-slate-700">
      <span className="bg-emerald-200 px-3 py-0.5 rounded-full">
        Wins: {wins}
      </span>
      <span className="bg-rose-200 px-3 py-0.5 rounded-full">
        Losses: {losses}
      </span>
    </div>
  );
}
