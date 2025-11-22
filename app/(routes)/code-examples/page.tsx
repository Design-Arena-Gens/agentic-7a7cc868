"use client";

import { useMemo, useState } from "react";
import { codeExamples } from "@/data/codeExamples";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { FunnelIcon } from "@heroicons/react/24/outline";

const tags = Array.from(new Set(codeExamples.flatMap((example) => example.tags)));

export default function CodeExamplesPage() {
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const filteredExamples = useMemo(() => {
    if (!activeTags.length) {
      return codeExamples;
    }
    return codeExamples.filter((example) => activeTags.every((tag) => example.tags.includes(tag)));
  }, [activeTags]);

  const toggleTag = (tag: string) => {
    setActiveTags((prev) => (prev.includes(tag) ? prev.filter((item) => item !== tag) : [...prev, tag]));
  };

  return (
    <>
      <NavBar />
      <PageHeader
        title="Production-ready VBA snippets"
        subtitle="Filter, copy, and adapt tested routines covering data integration, automation, and security."
        badge="Code library"
      />
      <section className="mt-6 rounded-3xl border border-slate-800/60 bg-slate-900/40 p-6">
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
          <span className="badge flex items-center gap-2">
            <FunnelIcon className="h-4 w-4" />
            Filter
          </span>
          {tags.map((tag) => {
            const isActive = activeTags.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                  isActive
                    ? "border-primary-500/80 bg-primary-500/20 text-primary-100"
                    : "border-slate-700 bg-slate-900/60 text-slate-300 hover:border-slate-600"
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </section>
      <section className="mt-8 grid gap-7">
        {filteredExamples.map((example) => (
          <article key={example.id} className="rounded-3xl border border-slate-800/60 bg-slate-900/50 p-8 shadow-lg shadow-slate-950/30">
            <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wide text-primary-200/90">
              {example.tags.map((tag) => (
                <span key={tag} className="badge bg-primary-500/10 text-primary-100">
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="mt-4 text-xl font-semibold text-slate-100">{example.title}</h2>
            <p className="mt-2 text-sm text-slate-300">{example.description}</p>
            <div className="code-block mt-5 overflow-x-auto text-sm">
              <pre>
                <code>{example.code}</code>
              </pre>
            </div>
          </article>
        ))}
        {!filteredExamples.length ? (
          <div className="rounded-3xl border border-slate-800/60 bg-slate-900/30 p-10 text-center text-sm text-slate-400">
            No examples match your filters yet. Toggle tags to explore the full library.
          </div>
        ) : null}
      </section>
      <Footer />
    </>
  );
}
