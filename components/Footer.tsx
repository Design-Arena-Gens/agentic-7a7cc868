export function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-800 pt-6 text-xs text-slate-400">
      <p>
        Crafted for Access VBA practitioners. Build smarter macros, automate workflows, and modernize legacy Access solutions.
      </p>
      <p className="mt-2">&copy; {new Date().getFullYear()} Access VBA Studio. All rights reserved.</p>
    </footer>
  );
}
