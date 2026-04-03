import Link from "next/link";
import { games } from "@/data/games";

export const metadata = {
  title: "Free Online Games | GameZone",
  description: "Play high-quality, free online browser games on GameZone. From puzzles to action-packed adventures, find your next favorite game here.",
  keywords: ["online games", "free browser games", "puzzle games", "arcade games", "HTML5 games", "GameZone"],
};

export default function GamesPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* ✴---Temp---✴ */}
      
      <nav className="w-full  py-4 flex justify-between items-center   backdrop-blur">
        <Link href="/" className="hover:text-gray-300">
          <h1 className="text-3xl font-bold">🎮 GameZone</h1>
        </Link>

        <div className="flex gap-4 text-sm">
          <Link href="/" className="hover:text-gray-300">
            Home
          </Link>
        </div>
      </nav>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <Link
            key={game.id}
            href={`/games/${game.slug}`}
            className="bg-gray-800 p-5 rounded-xl hover:border-white border border-gray-700 transition"
          >
            <h2 className="text-xl font-semibold">{game.title}</h2>
            <p className="text-sm text-gray-400 mt-2">{game.description}</p>
            <span className="text-xs text-green-400 mt-3 inline-block">
              ● {game.status}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
