import {
  ExternalLink,
  GitCommit,
  Github,
  GitPullRequest,
  Star,
} from "lucide-react";

const stats = [
  { label: "Commits", value: "1,280+", icon: GitCommit },
  { label: "Stars", value: "142", icon: Star },
  { label: "PRs", value: "64", icon: GitPullRequest },
];

export default function GithubCard() {
  return (
    <div className="flex h-full flex-col rounded-[1.5rem] border border-blue-100 bg-white p-6 shadow-[0_20px_50px_rgba(15,37,77,0.08)] sm:p-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-800">
            <Github className="h-4 w-4" />
          </span>
          <div>
            <h3 className="text-xl font-semibold text-blue-950">GitHub</h3>
            <p className="text-sm text-slate-500">Actividad y consistencia de trabajo</p>
          </div>
        </div>

        <a
          id="github-card-external-link"
          href="https://github.com/BrennisC"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 rounded-full border border-blue-100 px-3 py-2 text-xs text-slate-600 transition hover:border-blue-300 hover:text-blue-800"
        >
          Ver perfil <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {stats.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="rounded-[1.25rem] border border-blue-100 bg-[#fffdf8] p-4"
          >
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-blue-700">
              <Icon className="h-3.5 w-3.5" />
              {label}
            </div>
            <p className="mt-3 text-2xl font-semibold text-blue-950">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-[1.25rem] border border-blue-100 bg-[#fffaf0] p-5 sm:p-6">
          <p className="text-sm leading-7 text-slate-700">
          Mi perfil en GitHub refleja continuidad en el desarrollo, participacion en proyectos y una base tecnica enfocada en construir soluciones mantenibles.
          </p>
      </div>
    </div>
  );
}
