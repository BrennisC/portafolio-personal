import { Code } from "lucide-react";
import { SKILLS_DATA } from "../utis/data.ts";

const categories = ["frontend", "backend", "tools"] as const;

export default function SkillsCard() {
  return (
    <div className="flex h-full flex-col rounded-[1.5rem] border border-blue-100 bg-white p-6 shadow-[0_20px_50px_rgba(15,37,77,0.08)] sm:p-7">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-800">
          <Code className="h-4 w-4" />
        </span>
        <div>
          <h3 className="text-xl font-semibold text-blue-950">Habilidades</h3>
          <p className="mt-1 text-sm text-slate-500">
            Tecnologias organizadas para una lectura mas rapida.
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-5">
        {categories.map((category) => {
          const items = SKILLS_DATA.filter((skill) => skill.category === category);

          return (
            <section key={category} className="rounded-[1.25rem] border border-blue-100 bg-[#fffdf8] p-4 sm:p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
                {category}
              </p>

              <div className="mt-3 flex flex-wrap gap-2.5">
                {items.map((skill) => (
                  <span
                    key={skill.name}
                    className="rounded-full border border-blue-100 bg-white px-3 py-2 text-sm text-slate-600"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
