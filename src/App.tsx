/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import BioCard from "./components/BioCard";
import ProjectsCard from "./components/ProjectsCard";
import SkillsCard from "./components/SkillsCard";
import GithubCard from "./components/GithubCard";
import ContactCard from "./components/ContactCard";
import { Sparkles, FolderCode, Heart, Coffee } from "lucide-react";

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-emerald-500 selection:text-black py-8 px-4 sm:px-6 lg:px-8 relative overflow-x-hidden font-sans">
      {/* Background ambient lighting effects */}
      <div className="absolute top-[20%] left-[-10%] w-[50%] h-[400px] bg-emerald-500/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute top-[60%] right-[-10%] w-[40%] h-[500px] bg-cyan-500/5 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Dynamic header navigation */}
        <header
          id="site-header"
          className="flex flex-col sm:flex-row items-center justify-between border-b border-zinc-900 pb-6 mb-8 gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 p-[1px] flex items-center justify-center">
              <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center">
                <FolderCode className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div>
              <h1 className="text-lg font-sans font-extrabold text-white tracking-tight">
                Brennis Benjaminn Castro Cano
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-zinc-400 bg-zinc-900/60 border border-zinc-800/80 px-3 py-1.5 rounded-full">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              Work Mode Active
            </span>
          </div>
        </header>

        {/* Bento Grid layout construct */}
        <main className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Block A: Biography / Presentation */}
          <div className="md:col-span-2">
            <BioCard />
          </div>

          {/* Block C: Select portfolio projects gallery with filter and popup */}
          <div className="md:col-span-2">
            <ProjectsCard />
          </div>

          {/* Block F: Simulation of continuous commits on github metrics */}
          <div className="md:col-span-2">
            <GithubCard />
          </div>

          {/* Block G: Categorized skill levels list */}
          <div className="md:col-span-2">
            <SkillsCard />
          </div>

          {/* Block I: Inbox messages recorder contact details (persistent) */}
          <div className="md:col-span-4">
            <ContactCard />
          </div>
        </main>

        {/* Elegant site footer details */}
        <footer
          id="site-footer"
          className="mt-12 pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4 font-mono"
        >
          <div className="flex items-center gap-1">
            <span>
              Diseñado con pasión. Desarrollado en TypeScript + React.
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/BrennisC"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              GitHub
            </a>
            <span>•</span>
            <a
              href="https://linkedin.com/in/brenniscastro"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              LinkedIn
            </a>
            <span>•</span>
            <span className="flex items-center gap-1 text-zinc-600">
              <Coffee className="w-3.5 h-3.5" /> Crafted in 2026
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
