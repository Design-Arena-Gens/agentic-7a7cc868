import Link from "next/link";

const links = [
  { label: "Home", href: "/" },
  { label: "Tutorials", href: "/tutorials" },
  { label: "Code Examples", href: "/code-examples" },
  { label: "Macro Builder", href: "/macro-builder" },
  { label: "Form Designer", href: "/form-designer" }
];

export function NavBar() {
  return (
    <header className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
      <Link href="/" className="inline-flex items-center gap-3 text-lg font-semibold text-primary-300 hover:text-primary-200">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-500/20 text-primary-200">
          VBA
        </span>
        <span className="text-xl font-bold">Access VBA Studio</span>
      </Link>
      <nav className="flex flex-wrap items-center gap-3 text-sm text-slate-200/90">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-full border border-transparent px-4 py-2 transition hover:border-primary-500/60 hover:text-primary-200"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
