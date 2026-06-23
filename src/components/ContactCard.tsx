import { Github, Linkedin, Mail } from "lucide-react";

const links = [
  {
    id: "contact-email-link",
    label: "Correo",
    value: "brennisbenjaminn@gmail.com",
    href: "mailto:brennisbenjaminn@gmail.com",
    icon: Mail,
  },
  {
    id: "contact-linkedin-link",
    label: "LinkedIn",
    value: "linkedin.com/in/brenniscastro",
    href: "https://linkedin.com/in/brenniscastro",
    icon: Linkedin,
  },
  {
    id: "contact-github-link",
    label: "GitHub",
    value: "github.com/BrennisC",
    href: "https://github.com/BrennisC",
    icon: Github,
  },
];

export default function ContactCard() {
  return (
    <div className="flex h-full flex-col rounded-[1.5rem] border border-blue-100 bg-white p-6 shadow-[0_20px_50px_rgba(15,37,77,0.08)] sm:p-7">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
          Contacto
        </p>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight text-blue-950 sm:text-3xl">
          Hablemos sobre nuevas oportunidades y proyectos.
        </h3>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
          Si quieres conversar sobre desarrollo web, colaboraciones o propuestas profesionales, puedes escribirme o revisar mis perfiles directamente.
        </p>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
        {links.map(({ id, label, value, href, icon: Icon }) => (
          <a
            key={id}
            id={id}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="flex items-start gap-4 rounded-[1.25rem] border border-blue-100 bg-[#fffdf8] p-4 transition hover:border-blue-300 hover:shadow-md sm:p-5"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-800">
              <Icon className="h-4 w-4" />
            </span>

            <div className="min-w-0 pt-0.5">
              <p className="text-sm font-semibold text-blue-950">{label}</p>
              <p className="mt-1 break-all text-sm leading-6 text-slate-500">
                {value}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
