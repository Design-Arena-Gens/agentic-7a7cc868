"use client";

import { useMemo, useState } from "react";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { generateMacro, MacroBlueprint, MacroConfig, starterBlueprints } from "@/lib/macroTemplates";
import { ClipboardDocumentCheckIcon, ClipboardDocumentIcon, PlusIcon } from "@heroicons/react/24/outline";

const availableActions = [
  "RefreshDashboard",
  "LogRefresh",
  "SendMail",
  "BuildApprovalEmail",
  "ValidateSecurity",
  "OpenOnboardingPane",
  "PersistLog",
  "ArchiveRecords"
];

const triggers: MacroConfig["trigger"][] = ["FormLoad", "ButtonClick", "Timer", "RecordChange"];

export default function MacroBuilderPage() {
  const [macroName, setMacroName] = useState("AutoRefreshDashboard");
  const [trigger, setTrigger] = useState<MacroConfig["trigger"]>("Timer");
  const [actions, setActions] = useState<MacroConfig["actions"]>([
    { action: "RefreshDashboard" },
    { action: "LogRefresh" }
  ]);
  const [copied, setCopied] = useState(false);

  const macroCode = useMemo(() => generateMacro({ macroName, trigger, actions }), [macroName, trigger, actions]);

  const applyBlueprint = (blueprint: MacroBlueprint) => {
    setMacroName(blueprint.name.replace(/\s+/g, ""));
    setTrigger(blueprint.trigger);
    setActions(blueprint.actions.map((action) => ({ action })));
    setCopied(false);
  };

  const updateAction = (index: number, action: string) => {
    setActions((prev) => prev.map((item, i) => (i === index ? { ...item, action } : item)));
  };

  const addAction = () => {
    setActions((prev) => [...prev, { action: availableActions[0] ?? "PersistLog" }]);
  };

  const removeAction = (index: number) => {
    setActions((prev) => prev.filter((_, i) => i !== index));
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(macroCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <>
      <NavBar />
      <PageHeader
        title="Design resilient Access macros"
        subtitle="Sequence reusable actions, pick triggers, and export scaffolding with standardised error handling."
        badge="Macro Studio"
      />
      <section className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6 rounded-3xl border border-slate-800/60 bg-slate-900/40 p-8">
          <h2 className="text-lg font-semibold text-slate-100">Configuration</h2>
          <div className="grid gap-4 text-sm text-slate-200">
            <label className="flex flex-col gap-2">
              <span className="text-xs uppercase tracking-widest text-slate-400">Macro name</span>
              <input
                value={macroName}
                onChange={(event) => setMacroName(event.target.value)}
                className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-2 text-sm text-slate-100 focus:border-primary-500/70 focus:outline-none"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-xs uppercase tracking-widest text-slate-400">Trigger</span>
              <div className="flex flex-wrap gap-2">
                {triggers.map((item) => {
                  const isActive = item === trigger;
                  return (
                    <button
                      key={item}
                      onClick={() => setTrigger(item)}
                      className={`rounded-xl px-3 py-2 text-xs font-semibold transition ${
                        isActive
                          ? "bg-primary-500/20 text-primary-100 border border-primary-500/60"
                          : "border border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-700"
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </label>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-slate-400">Actions</span>
                <button onClick={addAction} className="button-secondary text-xs">
                  <PlusIcon className="h-4 w-4" />
                  Add action
                </button>
              </div>
              <div className="space-y-3">
                {actions.map((action, index) => (
                  <div
                    key={`${action.action}-${index}`}
                    className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3"
                  >
                    <select
                      value={action.action}
                      onChange={(event) => updateAction(index, event.target.value)}
                      className="flex-1 rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-100 focus:border-primary-500/60 focus:outline-none"
                    >
                      {availableActions.map((available) => (
                        <option key={available} value={available}>
                          {available}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => removeAction(index)}
                      className="text-xs font-semibold text-slate-400 transition hover:text-red-400"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800/60 bg-slate-950/50 p-6">
            <h3 className="text-sm font-semibold text-slate-100">Blueprints</h3>
            <p className="mt-2 text-xs text-slate-400">
              Load a starting template and tailor it to your workflow. Blueprints follow best-practice naming and logging patterns.
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {starterBlueprints.map((blueprint) => (
                <button
                  key={blueprint.name}
                  onClick={() => applyBlueprint(blueprint)}
                  className="rounded-2xl border border-slate-800/60 bg-slate-900/60 p-4 text-left text-sm transition hover:border-primary-500/60"
                >
                  <h4 className="font-semibold text-slate-100">{blueprint.name}</h4>
                  <p className="mt-2 text-xs text-slate-400">{blueprint.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-3xl border border-slate-800/60 bg-slate-900/40 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-100">Generated VBA</h2>
              <button onClick={copyToClipboard} className="button-secondary text-xs">
                {copied ? <ClipboardDocumentCheckIcon className="h-4 w-4" /> : <ClipboardDocumentIcon className="h-4 w-4" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <div className="code-block mt-4 max-h-[600px] overflow-auto text-sm">
              <pre>
                <code>{macroCode}</code>
              </pre>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-800/60 bg-slate-900/40 p-6 text-sm text-slate-300">
            <h3 className="text-base font-semibold text-slate-100">Implementation checklist</h3>
            <ul className="mt-4 space-y-2 text-xs">
              <li className="rounded-xl border border-slate-800/80 bg-slate-950/60 px-3 py-2">Add macro module to trusted Access project</li>
              <li className="rounded-xl border border-slate-800/80 bg-slate-950/60 px-3 py-2">Bind actions to existing libraries or adapt to your naming</li>
              <li className="rounded-xl border border-slate-800/80 bg-slate-950/60 px-3 py-2">Test with Access breakpoints and Debug.Print output</li>
            </ul>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
