import { useState } from "react";
import { Github, Star, GitPullRequest, GitCommit, ExternalLink } from "lucide-react";
import { motion } from "motion/react";

export default function GithubCard() {
  const [hoveredCell, setHoveredCell] = useState<{ day: number; count: number } | null>(null);

  // Generate systematic commit values over 7 rows (days) and 24 columns (weeks) representing half a year
  const rows = 7;
  const cols = 26;
  const daysOfWeek = ["Dom", "", "Mar", "", "Vie", "", ""];

  // Re-usable seed to mimic standard dynamic green activity grids
  const getCommitLevel = (commits: number) => {
    if (commits === 0) return "bg-zinc-950";
    if (commits <= 2) return "bg-emerald-900/40 text-emerald-300";
    if (commits <= 4) return "bg-emerald-800/70 text-emerald-200";
    if (commits <= 6) return "bg-emerald-600 text-emerald-100";
    return "bg-emerald-400 text-black";
  };

  const getCommitCount = (colIndex: number, rowIndex: number) => {
    // Generate organic layout commits index
    const val = (colIndex * 3 + rowIndex * 7) % 11;
    if (val === 3 || val === 7) return 0; // blank
    return val;
  };

  return (
    <div id="github-card" className="h-full flex flex-col justify-between bg-zinc-900/80 border border-zinc-800 p-5 rounded-3xl relative overflow-hidden group">
      {/* Background decoration blur */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-500/5 rounded-full filter blur-xl group-hover:bg-emerald-500/10 pointer-events-none transition duration-700" />

      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Github className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-sans font-semibold text-white text-sm">Actividad en GitHub</h3>
              <p className="text-[10px] text-zinc-500 font-sans">@BrennisC</p>
            </div>
          </div>
          
          <a
            id="github-card-external-link"
            href="https://github.com/BrennisC"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[10px] bg-zinc-950 hover:bg-zinc-800 px-2 py-1 border border-zinc-800 hover:border-zinc-700 text-zinc-300 rounded-lg transition"
          >
            <span>Seguir</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </div>

        {/* Stats segment */}
        <div className="grid grid-cols-3 gap-2 mb-4 bg-zinc-950/60 border border-zinc-950 rounded-2xl p-2.5 text-center">
          <div className="flex flex-col items-center">
            <span className="text-zinc-500 text-[9px] font-mono uppercase flex items-center gap-1">
              <GitCommit className="w-3 h-3 text-emerald-400" /> Commits
            </span>
            <span className="text-white text-sm font-sans font-bold mt-0.5">1,280+</span>
          </div>
          <div className="flex flex-col items-center border-x border-zinc-900">
            <span className="text-zinc-500 text-[9px] font-mono uppercase flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-400" /> Stars
            </span>
            <span className="text-white text-sm font-sans font-bold mt-0.5">142</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-zinc-500 text-[9px] font-mono uppercase flex items-center gap-1">
              <GitPullRequest className="w-3 h-3 text-cyan-400" /> PRs
            </span>
            <span className="text-white text-sm font-sans font-bold mt-0.5">64</span>
          </div>
        </div>

        {/* Dynamic Activity Grid */}
        <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-3 relative overflow-hidden">
          <div className="flex gap-1 justify-center">
            {/* Week headers spacing */}
            <div className="flex flex-col justify-between text-[8px] font-mono text-zinc-600 pr-1 select-none">
              {daysOfWeek.map((day, idx) => (
                <span key={idx} className="h-2 leading-none flex items-center justify-end w-4">
                  {day}
                </span>
              ))}
            </div>

            <div className="grid grid-flow-col gap-[3px]">
              {Array.from({ length: cols }).map((_, cIdx) => (
                <div key={cIdx} className="grid gap-[3px]">
                  {Array.from({ length: rows }).map((_, rIdx) => {
                    const count = getCommitCount(cIdx, rIdx);
                    return (
                      <div
                        key={rIdx}
                        onMouseEnter={() => setHoveredCell({ day: cIdx * 7 + rIdx, count })}
                        onMouseLeave={() => setHoveredCell(null)}
                        className={`w-2 h-2 rounded-[1.5px] transition-all duration-100 ${getCommitLevel(count)} ${
                          hoveredCell && hoveredCell.day === cIdx * 7 + rIdx ? "scale-125 shadow shadow-emerald-400/50" : ""
                        }`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Tooltip feedback */}
          <div className="text-center mt-2.5 h-3">
            {hoveredCell ? (
              <p className="text-[9px] font-mono text-emerald-400">
                Día {hoveredCell.day + 1}: {hoveredCell.count === 0 ? "Sin commits" : `${hoveredCell.count} contribuciones`}
              </p>
            ) : (
              <p className="text-[9px] font-mono text-zinc-500">
                Pasa el cursor sobre la cuadrícula para ver detalles
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="text-[9px] font-sans text-zinc-500 mt-2 text-right">
        Continuous Integration & Clean Deployments
      </div>
    </div>
  );
}
