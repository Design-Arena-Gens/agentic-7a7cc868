import Link from "next/link";
import { ArrowRightIcon, PlayCircleIcon, SparklesIcon } from "@heroicons/react/24/solid";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";

const highlights = [
  {
    title: "Guided Access VBA Blueprints",
    description: "Reusable automation patterns for imports, notifications, integrations, and secure workflows.",
    icon: SparklesIcon,
    href: "/tutorials"
  },
  {
    title: "Macro Assembly Studio",
    description: "Drag-to-sequence actions, choose triggers, and export production-ready VBA.",
    icon: PlayCircleIcon,
    href: "/macro-builder"
  },
  {
    title: "Form Designer",
    description: "Craft data-bound forms with validation and generate boilerplate form modules in seconds.",
    icon: ArrowRightIcon,
    href: "/form-designer"
  }
];

export default function HomePage() {
  return (
    <>
      <NavBar />
      <main className="flex flex-1 flex-col gap-12">
        <section className="relative overflow-hidden rounded-3xl border border-slate-800/60 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-10 shadow-2xl shadow-slate-950/40">
          <span className="badge">Microsoft Access Automation</span>
          <h1 className="mt-4 text-4xl font-bold leading-tight text-slate-50 sm:text-5xl">
            Modernise your Access apps without leaving VBA
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-300">
            Access VBA Studio combines best-practice macros, code generation, and form scaffolding. Accelerate delivery,
            reinforce standards, and ship maintainable Access solutions with confidence.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link className="button-primary" href="/macro-builder">
              Launch Macro Builder
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <Link className="button-secondary" href="/tutorials">
              Browse Learning Paths
            </Link>
          </div>
          <div className="pointer-events-none absolute -top-20 right-0 h-72 w-72 rounded-full bg-primary-500/20 blur-3xl" />
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {highlights.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group relative overflow-hidden rounded-3xl border border-slate-800/60 bg-slate-900/40 p-8 transition hover:border-primary-500/50 hover:bg-slate-900/70"
            >
              <item.icon className="h-8 w-8 text-primary-400" />
              <h2 className="mt-6 text-xl font-semibold text-slate-100 group-hover:text-white">{item.title}</h2>
              <p className="mt-3 text-sm text-slate-300 group-hover:text-slate-200">{item.description}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary-300 group-hover:text-primary-200">
                Explore
                <ArrowRightIcon className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <article className="relative overflow-hidden rounded-3xl border border-slate-800/60 bg-slate-900/40 p-8">
            <h3 className="text-2xl font-semibold text-slate-100">Rapid Automation Kits</h3>
            <p className="mt-3 text-sm text-slate-300">
              Kickstart projects with curated patterns for onboarding workflows, approval chains, and data synchronisation.
            </p>
            <ul className="mt-6 space-y-4 text-sm text-slate-300">
              <li className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4">
                <span className="font-semibold text-primary-200">Operations Hub</span>
                <p className="mt-2 text-slate-300">Import, cleanse, and reconcile data with resilient error-handling.</p>
              </li>
              <li className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4">
                <span className="font-semibold text-primary-200">Smart Notifications</span>
                <p className="mt-2 text-slate-300">Drive action with Outlook automations tailored to business rules.</p>
              </li>
              <li className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4">
                <span className="font-semibold text-primary-200">API Gateway</span>
                <p className="mt-2 text-slate-300">Connect Access to REST services with request signing and JSON parsing.</p>
              </li>
            </ul>
          </article>
          <aside className="rounded-3xl border border-slate-800/60 bg-slate-900/40 p-8">
            <h3 className="text-2xl font-semibold text-slate-100">Live Diagnostics</h3>
            <p className="mt-3 text-sm text-slate-300">
              Use the embedded logging and telemetry patterns to capture actionable diagnostics in Access.
            </p>
            <div className="code-block mt-6 text-xs">
              <pre>
                <code>
                  Application.SetOption "Error Trapping", 1
                  Debug.Print "[INFO] " & Format(Now(), "hh:nn:ss") & " Macro started"
                  Call PersistLog(CurrentProject.Name, CurrentUser(), "Macro", Now())
                </code>
              </pre>
            </div>
          </aside>
        </section>
      </main>
      <Footer />
    </>
  );
}
