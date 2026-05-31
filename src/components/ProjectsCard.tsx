import { useState } from "react";
import { Project } from "../types";
import { ExternalLink, Github, Folder, Eye, Code, Layers } from "lucide-react";
import { motion } from "motion/react";

const PROJECTS_DATA: Project[] = [
  {
    id: "p1",
    title: "TechFlow App",
    description:
      "Este proyecto desarrolle una aplicacion web con la arquitectura de microfrontends utilizando React 19 y Vite.",
    tags: ["React 19", "Vite", "Tailwind v4"],
    githubUrl: "https://github.com/BrennisC/techflow-app.git",
    featured: true,
    category: "frontend",
    metrics: { label: "Performance", value: "99%" },
  },
  {
    id: "p2",
    title: "Sigea App",
    description:
      "Aplicacion para poder gestionar las actividades que se desarrollar en la auditorio de la facultadad de ingenieria de informatica y sistemas",
    tags: ["Java", "Spring Boot", "RestApi", "JWT Auth", "PostgreSQL"],
    githubUrl: "https://github.com/BrennisC/SIGEA.git",
    featured: true,
    category: "backend",
    metrics: { label: "Avg Latency", value: "<15ms" },
  },
  {
    id: "p3",
    title: "SED",
    description:
      "Sistema de evualuacion docente, creada para poder agilizar los procesos de evaluacion docente de la UNIVERSIDAD NACIONAL AGRARIA DE LA SELVA",
    tags: ["Python", "Django", "JWT Auth", "PostgreSQL", "HTML"],
    githubUrl: "https://github.com/BrennisC/sed_backend.git",
    featured: false,
    category: "fullstack",
    metrics: { label: "Throughput", value: "8.5k req/s" },
  },
];

export default function ProjectsCard() {
  const [activeCategory, setActiveCategory] = useState<
    "all" | "frontend" | "backend" | "fullstack"
  >("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects =
    activeCategory === "all"
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.category === activeCategory);

  return (
    <div
      id="projects-card"
      className="h-full flex flex-col justify-between bg-zinc-900/80 border border-zinc-800 p-5 rounded-3xl relative overflow-hidden group"
    >
      {/* Background decoration */}
      <div className="absolute bottom-4 right-4 w-28 h-28 bg-emerald-500/5 rounded-full filter blur-xl group-hover:bg-emerald-500/10 transition pointer-events-none" />

      {/* Header with Navigation Categorization */}
      <div className="z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Folder className="w-4 h-4" />
            </div>
            <h3 className="font-sans font-semibold text-white text-sm">
              Proyectos Selectos
            </h3>
          </div>

          {/* Quick Filters */}
          <div className="flex bg-zinc-950 border border-zinc-900 rounded-lg p-0.5 text-[9px] font-mono select-none">
            {(["all", "frontend", "backend", "fullstack"] as const).map(
              (cat) => (
                <button
                  key={cat}
                  id={`filter-${cat}`}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-2 py-1 rounded-md capitalize transition-all duration-200 cursor-pointer ${
                    activeCategory === cat
                      ? "bg-emerald-500 text-black font-semibold"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {cat}
                </button>
              ),
            )}
          </div>
        </div>

        {/* Project Thumb List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[220px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-zinc-800">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              onClick={() => setSelectedProject(proj)}
              className="group/item flex flex-col justify-between p-3 border border-zinc-800/80 hover:border-zinc-700 bg-zinc-950/40 hover:bg-zinc-950 rounded-2xl cursor-pointer transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-semibold">
                    {proj.category}
                  </span>
                  {proj.metrics && (
                    <span className="text-[9px] font-mono text-zinc-500 bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded-md">
                      {proj.metrics.label}: {proj.metrics.value}
                    </span>
                  )}
                </div>
                <h4 className="font-sans font-bold text-white text-xs group-hover/item:text-emerald-400 transition">
                  {proj.title}
                </h4>
                <p className="text-[10px] text-zinc-400 font-sans mt-1 line-clamp-2 leading-relaxed">
                  {proj.description}
                </p>
              </div>

              <div className="flex items-center gap-1.5 mt-2.5 flex-wrap">
                {proj.tags.slice(0, 3).map((t, idx) => (
                  <span
                    key={idx}
                    className="text-[8px] font-sans text-zinc-500 bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded"
                  >
                    {t}
                  </span>
                ))}
                {proj.tags.length > 3 && (
                  <span className="text-[8px] font-sans text-zinc-600 font-medium font-mono">
                    +{proj.tags.length - 3}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer statistics info */}
      <div className="flex items-center justify-between border-t border-zinc-800/80 pt-3 mt-4 text-[10px] font-mono text-zinc-500 z-10">
        <span className="flex items-center gap-1">
          <Code className="w-3.5 h-3.5 text-zinc-400" /> Solid Software Design
        </span>
        <a
          href="https://github.com/BrennisC"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 hover:underline transition"
        >
          Ver más en GitHub <ExternalLink className="w-2.5 h-2.5" />
        </a>
      </div>

      {/* Interactive detail popup */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/65 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-3xl max-w-md w-full relative">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white text-sm"
            >
              ✕
            </button>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[9px] font-mono uppercase bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">
                {selectedProject.category}
              </span>
              {selectedProject.metrics && (
                <span className="text-[9px] font-mono text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded-full">
                  {selectedProject.metrics.label}:{" "}
                  {selectedProject.metrics.value}
                </span>
              )}
            </div>
            <h3 className="font-sans font-bold text-white text-lg mb-2">
              {selectedProject.title}
            </h3>
            <p className="text-zinc-400 font-sans text-xs leading-relaxed mb-4">
              {selectedProject.description}
            </p>

            <div className="mb-4">
              <h4 className="text-[10px] uppercase font-mono text-zinc-500 tracking-wider mb-1.5">
                Tech Matrix
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedProject.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-sans text-zinc-300 bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded-lg"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl text-xs font-semibold tracking-wide border border-zinc-800 hover:border-zinc-700 bg-zinc-900 text-white transition-all"
              >
                <Github className="w-3.5 h-3.5" /> Core Repo
              </a>
              <button
                onClick={() => setSelectedProject(null)}
                className="flex-shrink-0 bg-emerald-500 text-black hover:bg-emerald-400 active:scale-95 py-2 px-4 rounded-xl text-xs font-semibold transition-all"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
