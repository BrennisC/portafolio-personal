import { useState } from "react";
import { Star, Code, Server, Wrench, Shield } from "lucide-react";
import { motion } from "motion/react";

const SKILLS_DATA = [
  { name: "React.js / Next.js", level: 5, category: "frontend" },
  { name: "TypeScript / ES6", level: 5, category: "frontend" },
  { name: "Tailwind CSS", level: 5, category: "frontend" },
  { name: "Node.js / Express", level: 5, category: "backend" },
  { name: "PostgreSQL", level: 4, category: "backend" },
  { name: "REST / GraphQL", level: 4, category: "backend" },
  { name: "Java / Spring-Boot", level: 3, category: "backend" },
  { name: "Git & GitHub", level: 5, category: "tools" },
  { name: "Docker", level: 4, category: "tools" },
  { name: "Prisma ORM", level: 5, category: "backend" },
  { name: "Figma (UI Dev)", level: 4, category: "tools" },
];

export default function SkillsCard() {
  const [activeTab, setActiveTab] = useState<
    "all" | "frontend" | "backend" | "tools"
  >("all");

  const filteredSkills =
    activeTab === "all"
      ? SKILLS_DATA
      : SKILLS_DATA.filter((s) => s.category === activeTab);

  return (
    <div
      id="skills-card"
      className="h-full flex flex-col justify-between bg-zinc-900/80 border border-zinc-800 p-5 rounded-3xl relative overflow-hidden group"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-500/5 rounded-full filter blur-2xl group-hover:bg-cyan-500/10 transitionpointer-events-none" />

      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Code className="w-4 h-4" />
            </div>
            <h3 className="font-sans font-semibold text-white text-sm">
              Habilidades & Stack
            </h3>
          </div>

          {/* Tab buttons */}
          <div className="flex bg-zinc-950 border border-zinc-900 rounded-lg p-0.5 text-[8px] font-mono select-none">
            {(["all", "frontend", "backend", "tools"] as const).map((tab) => (
              <button
                key={tab}
                id={`skills-tab-${tab}`}
                onClick={() => setActiveTab(tab)}
                className={`px-1.5 py-1 rounded capitalize cursor-pointer ${
                  activeTab === tab
                    ? "bg-emerald-500 text-black font-semibold"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {tab === "tools" ? "Tools" : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic skills layout */}
        <div className="space-y-2.5 max-h-[190px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-zinc-800">
          {filteredSkills.map((skill, idx) => (
            <div key={idx} className="flex flex-col">
              <div className="flex items-center justify-between text-xs font-sans mb-1">
                <span className="text-zinc-300 font-medium">{skill.name}</span>
                <div className="flex gap-0.5" title={`Level: ${skill.level}/5`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={`w-1.5 h-1.5 rounded-full ${
                        i < skill.level ? "bg-emerald-400" : "bg-zinc-800"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="w-full h-1 bg-zinc-950 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full"
                  style={{ width: `${(skill.level / 5) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-zinc-800/80 pt-3 mt-4 flex items-center justify-between text-[10px] text-zinc-500 font-mono">
        <span className="flex items-center gap-1.5">
          <Server className="w-3.5 h-3.5 text-zinc-400" /> Backend Pro
        </span>
        <span className="flex items-center gap-1.5">
          <Wrench className="w-3.5 h-3.5 text-zinc-400" /> DevOps Ready
        </span>
      </div>
    </div>
  );
}
