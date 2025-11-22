import { ArrowTopRightOnSquareIcon, ClockIcon } from "@heroicons/react/24/outline";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { tutorials } from "@/data/tutorials";

const resources = [
  {
    title: "VBA Coding Standards",
    description: "Best practices for naming, error handling, logging, and modularisation in Access.",
    href: "https://learn.microsoft.com/en-us/office/vba/language/reference/user-interface-help"
  },
  {
    title: "DAO Patterns",
    description: "Reference patterns for building resilient DAO recordsets and transactions.",
    href: "https://learn.microsoft.com/en-us/office/client-developer/access/desktop-database-reference/dao-reference"
  },
  {
    title: "UI Modernisation",
    description: "Upgrade Access UX with theming, tab navigation, and custom ribbon commands.",
    href: "https://support.microsoft.com/en-us/office/create-a-tab-control-05f1978b-b1f7-4f79-858f-58b69cb2e68b"
  }
];

export default function TutorialsPage() {
  return (
    <>
      <NavBar />
      <PageHeader
        title="Structured Learning Paths"
        subtitle="Progress through Access VBA capabilities with curated, outcome-driven modules and hands-on labs."
        badge="Curriculum"
      />
      <section className="mt-10 grid gap-6 md:grid-cols-2">
        {tutorials.map((tutorial) => (
          <article key={tutorial.id} className="relative flex flex-col rounded-3xl border border-slate-800/60 bg-slate-900/40 p-8">
            <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wide text-primary-200/90">
              <ClockIcon className="h-4 w-4" />
              {tutorial.duration}
            </div>
            <h2 className="mt-4 text-xl font-semibold text-slate-100">{tutorial.title}</h2>
            <p className="mt-3 text-sm text-slate-300">{tutorial.summary}</p>
            <ul className="mt-6 space-y-2 text-sm text-slate-300">
              {tutorial.topics.map((topic) => (
                <li key={topic} className="rounded-xl border border-slate-800/80 bg-slate-900/70 px-3 py-2">
                  {topic}
                </li>
              ))}
            </ul>
            <span className="mt-auto pt-6 text-xs uppercase tracking-widest text-slate-500">
              Capstone lab · Automated workbook migration
            </span>
          </article>
        ))}
      </section>
      <section className="mt-12 rounded-3xl border border-slate-800/60 bg-slate-900/40 p-8">
        <h3 className="text-lg font-semibold text-slate-100">Further Reading</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {resources.map((resource) => (
            <a
              key={resource.title}
              href={resource.href}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col rounded-2xl border border-slate-800/60 bg-slate-900/50 p-5 transition hover:border-primary-500/50"
            >
              <h4 className="text-sm font-semibold text-slate-100 group-hover:text-primary-200">{resource.title}</h4>
              <p className="mt-2 text-xs text-slate-400">{resource.description}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary-200/90">
                Read guide
                <ArrowTopRightOnSquareIcon className="h-4 w-4" />
              </span>
            </a>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
