"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/adventures", label: "Adventures" },
  { href: "/blog", label: "Notes" },
  { href: "/media", label: "Featured" },
] as const;

// Routes whose hero is a full-bleed image or video: the bar floats over it.
const OVERLAY_ROUTES = ["/", "/adventures"];

function HamburgerIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden
    >
      <line x1="3" y1="8" x2="21" y2="8" />
      <line x1="3" y1="16" x2="21" y2="16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const overlay = OVERLAY_ROUTES.includes(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const position = overlay ? "fixed inset-x-0 top-0" : "sticky top-0";
  const surface =
    overlay && !scrolled
      ? "bg-gradient-to-b from-navy/75 to-transparent"
      : "border-b border-cream/10 bg-navy/95 backdrop-blur-md";

  return (
    <>
      <header className={`${position} z-40 transition-colors duration-300 ${surface}`}>
        <div className="flex h-[72px] items-center justify-between px-5 md:h-[88px] md:px-14">
          <Link
            href="/"
            className="text-lg font-black uppercase tracking-[-0.03em] text-cream transition-colors hover:text-gold md:text-xl"
          >
            Rudolfs Freibergs
          </Link>

          <nav className="hidden items-center gap-9 md:flex" aria-label="Main navigation">
            {NAV_LINKS.map(({ href, label }) => {
              const active = isActive(pathname, href);
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`border-b-2 py-1.5 text-sm font-semibold uppercase tracking-[0.08em] transition-colors ${
                    active
                      ? "border-gold text-gold"
                      : "border-transparent text-cream hover:text-gold"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
            <Link
              href="/contact"
              aria-current={pathname === "/contact" ? "page" : undefined}
              className={`inline-flex min-h-[44px] items-center border px-5 text-sm font-semibold uppercase tracking-[0.08em] transition-colors ${
                pathname === "/contact"
                  ? "border-gold bg-gold text-navy"
                  : "border-cream/55 text-cream hover:border-gold hover:text-gold"
              }`}
            >
              Contact
            </Link>
          </nav>

          <button
            className="flex h-11 w-11 items-center justify-center text-cream md:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
          >
            <HamburgerIcon />
          </button>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <div
        className={`fixed inset-0 z-50 bg-navy transition-opacity duration-200 ${
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="flex h-full flex-col px-5 pb-10">
          <div className="flex h-[72px] items-center justify-between">
            <Link href="/" className="text-lg font-black uppercase tracking-[-0.03em] text-cream">
              Rudolfs Freibergs
            </Link>
            <button
              className="flex h-11 w-11 items-center justify-center text-cream"
              onClick={() => setMenuOpen(false)}
              aria-label="Close navigation menu"
            >
              <CloseIcon />
            </button>
          </div>

          <nav className="mt-6 flex flex-col" aria-label="Mobile navigation">
            {[...NAV_LINKS, { href: "/contact", label: "Contact" }].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`display border-b border-cream/15 py-4 text-[clamp(2.2rem,11vw,3.2rem)] transition-colors ${
                  isActive(pathname, href) ? "text-gold" : "text-cream hover:text-gold"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
