export default function Footer() {
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto flex max-w-content items-center justify-between px-6 py-6 text-sm text-stone">
        <span>© {new Date().getFullYear()} Rudolfs Freibergs</span>
        <span className="font-mono text-xs">rudolfsfreibergs.com</span>
      </div>
    </footer>
  );
}
