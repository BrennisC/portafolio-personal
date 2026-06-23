import { Coffee } from "lucide-react";
import BioCard from "./components/BioCard";
import ContactCard from "./components/ContactCard";
import GithubCard from "./components/GithubCard";
import ProjectsCard from "./components/ProjectsCard";
import SkillsCard from "./components/SkillsCard";

export default function App() {
  return (
    <div className="min-h-screen px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <main className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:items-start">
          <div className="flex flex-col gap-5 lg:col-span-7">
            <BioCard />
            <SkillsCard />
          </div>

          <div className="flex flex-col gap-5 lg:col-span-5">
            <ProjectsCard />
            <GithubCard />
          </div>

          <div className="lg:col-span-12">
            <ContactCard />
          </div>
        </main>
      </div>
    </div>
  );
}
