import { useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import { Project } from "../types";

const PROJECTS_DATA: Project[] = [
  {
    id: "p1",
    title: "TechFlow App",
    description:
      "Aplicacion web desarrollada con una arquitectura de microfrontends usando React 19 y Vite.",
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
      "Aplicacion para gestionar actividades del auditorio de la facultad de ingenieria de informatica y sistemas.",
    tags: ["Java", "Spring Boot", "REST API", "JWT Auth", "PostgreSQL"],
    githubUrl: "https://github.com/BrennisC/SIGEA.git",
    featured: true,
    category: "backend",
    metrics: { label: "Avg Latency", value: "<15ms" },
  },
  {
    id: "p3",
    title: "SED",
    description:
      "Sistema de evaluacion docente creado para agilizar los procesos de evaluacion en la universidad.",
    tags: ["Python", "Django", "JWT Auth", "PostgreSQL", "HTML"],
    githubUrl: "https://github.com/BrennisC/sed_backend.git",
    featured: false,
    category: "fullstack",
    metrics: { label: "Throughput", value: "8.5k req/s" },
  },
];

type Category = "all" | "frontend" | "backend" | "fullstack";

export default function ProjectsCard() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const filteredProjects =
    activeCategory === "all"
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((project) => project.category === activeCategory);

  return (
    <div
      id="projects-card"
      className="flex h-full flex-col rounded-[1.5rem] border border-blue-100 bg-white p-6 shadow-[0_20px_50px_rgba(15,37,77,0.08)] sm:p-7 lg:min-h-[30rem]"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-xl font-semibold text-blue-950">Proyectos</h3>
          <p className="mt-1 text-sm text-slate-500">
            Seleccion de trabajo con foco en resultado, stack y claridad.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          {(["all", "frontend", "backend", "fullstack"] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={[
                "rounded-full px-3 py-2 capitalize transition",
                activeCategory === cat
                  ? "bg-blue-900 text-white"
                  : "border border-blue-100 text-slate-600 hover:border-blue-300 hover:text-blue-800",
              ].join(" ")}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4">
        {filteredProjects.map((project) => (
          <article
            key={project.id}
            className="rounded-[1.25rem] border border-blue-100 bg-[#fffdf8] p-4 transition hover:border-blue-300 hover:shadow-md sm:p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-700">
                  {project.category}
                </p>
                <h4 className="mt-2 text-lg font-semibold text-blue-950">
                  {project.title}
                </h4>
              </div>

              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-blue-100 text-slate-500 transition hover:border-blue-300 hover:text-blue-800"
                aria-label={`Ver repositorio de ${project.title}`}
              >
                <Github className="h-4 w-4" />
              </a>
            </div>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              {project.description}
            </p>

            <p className="mt-3 text-xs leading-6 text-slate-500">
              {project.tags.join(" • ")}
            </p>

            {project.metrics && (
              <div className="mt-4 flex items-center justify-between gap-3 border-t border-blue-100 pt-4 text-xs text-slate-500">
                <span>
                  {project.metrics.label}: <strong className="font-semibold text-blue-900">{project.metrics.value}</strong>
                </span>

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-blue-800 transition hover:text-blue-950"
                >
                  Ver repositorio <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
