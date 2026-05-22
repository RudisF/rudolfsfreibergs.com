import Link from "next/link";

const links = [
  { href: "/about", label: "About" },
  { href: "/adventures", label: "Adventures" },
  { href: "/work", label: "Work" },
  { href: "/soulful", label: "Soulful" },
  { href: "/media", label: "Media" },
  { href: "/contact", label: "Contact" },
  { href: "/blog", label: "Blog" },
];

export default function Nav() {
  return (
    <header className="border-b border-rule">
      <nav className="mx-auto flex max-w-content items-center justify-between px-6 py-4">
        <Link href="/" className="font-serif text-xl font-bold tracking-tight text-ink">
          RF
        </Link>
        <ul className="flex gap-6">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="text-sm text-stone transition-colors hover:text-ink"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
