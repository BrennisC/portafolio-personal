import { Github, Linkedin, Mail } from "lucide-react";
import foto from "../../assets/img/brennis-castro.webp";

const specialties = [
  "Frontend con React",
  "Backend con Node.js",
  "APIs REST",
  "UI funcional",
  "TypeScript",
];

export default function BioCard() {
  return (
    <div
      id="bio-card"
      className="flex h-full flex-col justify-between rounded-[1.5rem] border border-blue-100 bg-white p-6 shadow-[0_20px_50px_rgba(15,37,77,0.08)] sm:p-7 lg:min-h-[30rem]"
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
          Portafolio personal
        </p>

        <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-start">
          <img
            src={foto}
            alt="Brennis Castro"
            className="h-28 w-28 rounded-[1.25rem] border border-blue-100 object-cover shadow-sm"
          />

          <div className="flex-1">
            <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-700">
              Full Stack Developer
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-blue-950 sm:text-4xl">
              Brennis Castro
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-7 text-slate-500">
              Desarrollo soluciones web modernas con enfoque en claridad, rendimiento y experiencia de usuario.
            </p>

            <div className="mt-5 flex flex-wrap gap-2.5">
              <a
                id="bio-github-link"
                href="https://github.com/BrennisC"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-blue-100 px-3.5 py-2 text-xs text-slate-600 transition hover:border-blue-300 hover:text-blue-800"
              >
                <Github className="h-3.5 w-3.5" /> GitHub
              </a>
              <a
                id="bio-linkedin-link"
                href="https://linkedin.com/in/brenniscastro"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-blue-100 px-3.5 py-2 text-xs text-slate-600 transition hover:border-blue-300 hover:text-blue-800"
              >
                <Linkedin className="h-3.5 w-3.5" /> LinkedIn
              </a>
              <a
                id="bio-email-link"
                href="mailto:brennisbenjaminn@gmail.com"
                className="inline-flex items-center gap-2 rounded-full border border-blue-100 px-3.5 py-2 text-xs text-slate-600 transition hover:border-blue-300 hover:text-blue-800"
              >
                <Mail className="h-3.5 w-3.5" /> Correo
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-[1.25rem] border border-blue-100 bg-[#fffaf0] p-5 sm:p-6">
          <p className="text-base leading-8 text-slate-700">
            Soy desarrollador full stack y me gusta construir productos bien estructurados, faciles de usar y visualmente cuidados. Combino implementacion tecnica con atencion al detalle en la interfaz para crear experiencias mas claras y profesionales.
          </p>
        </div>

        <div className="mt-7">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
            Especialidades principales
          </p>
          <div className="mt-3 flex flex-wrap gap-2.5">
            {specialties.map((item) => (
              <span
                key={item}
                className="rounded-full border border-blue-100 bg-white px-3 py-1.5 text-xs text-slate-600"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
