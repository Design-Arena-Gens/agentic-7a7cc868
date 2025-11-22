"use client";

import { FormEvent, useMemo, useState } from "react";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { createVbaForm, FormControl, FormDesignerState } from "@/lib/formBuilder";
import { ClipboardDocumentCheckIcon, ClipboardDocumentIcon } from "@heroicons/react/24/outline";

const controlOptions: FormControl["controlType"][] = ["TextBox", "ComboBox", "CheckBox", "DatePicker", "Number"];

const seed: FormDesignerState = {
  formName: "Onboarding",
  description: "Collect employee onboarding details with validation and defaults.",
  controls: [
    { id: "txtEmployee", label: "Employee Name", controlType: "TextBox", dataField: "EmployeeName", isRequired: true },
    { id: "cboRole", label: "Role", controlType: "ComboBox", dataField: "Role", isRequired: true },
    { id: "chkLdap", label: "Provision LDAP", controlType: "CheckBox", dataField: "ProvisionLDAP", isRequired: false }
  ]
};

export default function FormDesignerPage() {
  const [state, setState] = useState<FormDesignerState>(seed);
  const [copied, setCopied] = useState(false);

  const formCode = useMemo(() => createVbaForm(state), [state]);

  const updateControl = (index: number, partial: Partial<FormControl>) => {
    setState((prev) => ({
      ...prev,
      controls: prev.controls.map((control, i) => (i === index ? { ...control, ...partial } : control))
    }));
  };

  const addControl = () => {
    setState((prev) => ({
      ...prev,
      controls: [
        ...prev.controls,
        {
          id: `control${prev.controls.length + 1}`,
          label: "New Control",
          controlType: "TextBox",
          dataField: "FieldName",
          isRequired: false
        }
      ]
    }));
  };

  const removeControl = (index: number) => {
    setState((prev) => ({
      ...prev,
      controls: prev.controls.filter((_, i) => i !== index)
    }));
  };

  const handleMetaChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const copyFormCode = async () => {
    await navigator.clipboard.writeText(formCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <>
      <NavBar />
      <PageHeader
        title="Generate polished Access forms"
        subtitle="Describe your fields, validation rules, and defaults — receive VBA scaffolding that builds the form module for you."
        badge="Form Designer"
      />
      <section className="mt-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6 rounded-3xl border border-slate-800/60 bg-slate-900/40 p-8">
          <div className="grid gap-4 text-sm text-slate-100">
            <label className="flex flex-col gap-2">
              <span className="text-xs uppercase tracking-widest text-slate-400">Form name</span>
              <input
                name="formName"
                value={state.formName}
                onChange={handleMetaChange}
                className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-2 text-sm text-slate-100 focus:border-primary-500/70 focus:outline-none"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-xs uppercase tracking-widest text-slate-400">Purpose</span>
              <textarea
                name="description"
                value={state.description}
                onChange={handleMetaChange}
                rows={3}
                className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 focus:border-primary-500/70 focus:outline-none"
              />
            </label>
          </div>

          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-100">Controls</h2>
            <button onClick={addControl} className="button-secondary text-xs">Add control</button>
          </div>

          <div className="space-y-4">
            {state.controls.map((control, index) => (
              <div key={control.id} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 text-sm">
                <div className="flex flex-col gap-3">
                  <div className="grid gap-3 md:grid-cols-2">
                    <label className="flex flex-col gap-1 text-xs text-slate-300">
                      Control ID
                      <input
                        value={control.id}
                        onChange={(event) => updateControl(index, { id: event.target.value })}
                        className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm focus:border-primary-500/60 focus:outline-none"
                      />
                    </label>
                    <label className="flex flex-col gap-1 text-xs text-slate-300">
                      Label
                      <input
                        value={control.label}
                        onChange={(event) => updateControl(index, { label: event.target.value })}
                        className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm focus:border-primary-500/60 focus:outline-none"
                      />
                    </label>
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    <label className="flex flex-col gap-1 text-xs text-slate-300">
                      Data field
                      <input
                        value={control.dataField}
                        onChange={(event) => updateControl(index, { dataField: event.target.value })}
                        className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm focus:border-primary-500/60 focus:outline-none"
                      />
                    </label>
                    <label className="flex flex-col gap-1 text-xs text-slate-300">
                      Control type
                      <select
                        value={control.controlType}
                        onChange={(event) => updateControl(index, { controlType: event.target.value as FormControl["controlType"] })}
                        className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm focus:border-primary-500/60 focus:outline-none"
                      >
                        {controlOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <div className="grid gap-3 md:grid-cols-[auto_1fr] items-center">
                    <label className="flex items-center gap-2 text-xs text-slate-300">
                      <input
                        type="checkbox"
                        checked={control.isRequired}
                        onChange={(event) => updateControl(index, { isRequired: event.target.checked })}
                        className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-primary-500 focus:ring-primary-500"
                      />
                      Required
                    </label>
                    <label className="flex flex-col gap-1 text-xs text-slate-300">
                      Default value
                      <input
                        value={control.defaultValue ?? ""}
                        onChange={(event) => updateControl(index, { defaultValue: event.target.value })}
                        placeholder="(optional)"
                        className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm focus:border-primary-500/60 focus:outline-none"
                      />
                    </label>
                  </div>
                </div>
                <button onClick={() => removeControl(index)} className="mt-4 text-xs font-semibold text-red-400 hover:text-red-300">
                  Remove control
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="rounded-3xl border border-slate-800/60 bg-slate-900/40 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-100">Generated VBA</h2>
              <button onClick={copyFormCode} className="button-secondary text-xs">
                {copied ? <ClipboardDocumentCheckIcon className="h-4 w-4" /> : <ClipboardDocumentIcon className="h-4 w-4" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <div className="code-block mt-5 max-h-[620px] overflow-auto text-sm">
              <pre>
                <code>{formCode}</code>
              </pre>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-800/60 bg-slate-900/40 p-6 text-sm text-slate-300">
            <h3 className="text-base font-semibold text-slate-100">Deployment tips</h3>
            <ul className="mt-3 space-y-2 text-xs">
              <li className="rounded-xl border border-slate-800/80 bg-slate-950/60 px-3 py-2">Paste the generated code into a form module before opening layout view.</li>
              <li className="rounded-xl border border-slate-800/80 bg-slate-950/60 px-3 py-2">Enable trusted locations to avoid macro security prompts.</li>
              <li className="rounded-xl border border-slate-800/80 bg-slate-950/60 px-3 py-2">Pair with the Macro Builder routines for cohesive automation.</li>
            </ul>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
