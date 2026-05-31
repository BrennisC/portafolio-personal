import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  MapPin,
  Briefcase,
} from "lucide-react";
import { motion } from "motion/react";
import foto from "../../assets/img/brennis-castro.webp";
export default function BioCard() {
  return (
    <div
      id="bio-card"
      className="h-full flex flex-col justify-between bg-zinc-900/80 border border-zinc-800 p-10 rounded-3xl relative overflow-hidden group"
    >
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 w-44 h-44 bg-emerald-500/5 rounded-full filter blur-2xl group-hover:bg-emerald-500/10 transition-all duration-700 -mr-10 -mt-10" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-500/5 rounded-full filter blur-xl group-hover:bg-cyan-500/10 transition-all duration-700 -ml-16 -mb-16 pointer-events-none" />

      {/* Profile Header */}
      <div className="flex flex-col gap-4 z-10">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={foto}
              alt="Brennis Castro"
              className="w-30 h-30 rounded-2xl"
            />
          </div>

          <div>
            <span className="text-emerald-400 text-[10px] font-semibold tracking-wider uppercase border border-emerald-500/20 px-2 py-0.5 rounded-full bg-emerald-500/5 font-mono">
              Full Stack Developer
            </span>
            <h1 className="text-xl font-sans font-bold text-white tracking-tight mt-1">
              Brennis Castro
            </h1>
            <p className="text-xs text-zinc-400 font-sans">
              brennisbenjaminn@gmail.com
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed mt-2 font-light">
          Apasionado por la ingeniería de software y el{" "}
          <span className="text-white font-medium">
            diseño de interfaces interactivas
          </span>{" "}
          de alto rendimiento. Construyo soluciones robustas end-to-end con
          arquitecturas modernas.
        </p>

        <div className="flex flex-col gap-2 mt-2">
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-sans">
              Timezone: GMT-4 / GMT-5 (Col, Per, Chi, Equ)
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-sans">
              Disponible para Trabajo Remoto / Hybrid
            </span>
          </div>
        </div>
      </div>

      {/* Actions and Social Info */}
      <div className="grid grid-cols-3 gap-2 mt-6 z-10">
        <a
          id="bio-github-link"
          href="https://github.com/BrennisC"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center p-3 rounded-2xl border border-zinc-800 bg-zinc-950/40 hover:bg-zinc-800 hover:border-zinc-700 transition"
        >
          <Github className="w-5 h-5 text-white mb-1" />
          <span className="text-[10px] font-sans text-zinc-400 font-medium tracking-wide">
            GitHub
          </span>
        </a>

        <a
          id="bio-linkedin-link"
          href="https://linkedin.com/in/brenniscastro"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center p-3 rounded-2xl border border-zinc-800 bg-zinc-950/40 hover:bg-zinc-800 hover:border-zinc-700 transition"
        >
          <Linkedin className="w-5 h-5 text-cyan-400 mb-1" />
          <span className="text-[10px] font-sans text-zinc-400 font-medium tracking-wide">
            LinkedIn
          </span>
        </a>

        <a
          id="bio-email-link"
          href="mailto:brennisbenjaminn@gmail.com"
          className="flex flex-col items-center justify-center p-3 rounded-2xl border border-zinc-800 bg-zinc-950/40 hover:bg-zinc-800 hover:border-zinc-700 transition"
        >
          <Mail className="w-5 h-5 text-emerald-400 mb-1" />
          <span className="text-[10px] font-sans text-zinc-400 font-medium tracking-wide">
            Email
          </span>
        </a>
      </div>
    </div>
  );
}
