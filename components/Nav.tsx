"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/adventures", label: "Adventures" },
  { href: "/work", label: "Work" },
  { href: "/soulful", label: "Soulful experiences" },
  { href: "/media", label: "Media" },
  { href: "/blog", label: "Blog" },
] as const;

// ── inline icons ───────────────────────────────────────────────────────────────

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
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
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

// ── desktop nav link ───────────────────────────────────────────────────────────

function NavLink({ href, label, pathname }: { href: string; label: string; pathname: string }) {
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`relative whitespace-nowrap text-sm transition-colors duration-150 ${
        isActive ? "text-paper" : "text-stone hover:text-paper"
      }`}
    >
      {label}
      {isActive && (
        <span className="absolute -bottom-[3px] left-0 h-[2px] w-full rounded-full bg-accent" />
      )}
    </Link>
  );
}

// ── main component ─────────────────────────────────────────────────────────────

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock body scroll while menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // close on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* ── Sticky bar ─────────────────────────────────────────────── */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled ? "bg-ink/80 backdrop-blur-md" : "bg-ink"
        }`}
      >
        <Container>
          <div className="relative flex h-16 items-center justify-center">
            {/* Desktop: centered link row */}
            <nav
              className="hidden items-center gap-8 md:flex"
              aria-label="Main navigation"
            >
              {NAV_LINKS.map(({ href, label }) => (
                <NavLink key={href} href={href} label={label} pathname={pathname} />
              ))}

              <Button href="/contact" variant="primary" size="md">
                Get in touch
              </Button>
            </nav>

            {/* Mobile: right-aligned hamburger */}
            <button
              className="absolute right-0 text-paper md:hidden"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
            >
              <HamburgerIcon />
            </button>
          </div>
        </Container>
      </header>

      {/* ── Mobile full-screen overlay ─────────────────────────────── */}
      <div
        className={`fixed inset-0 z-50 bg-ink transition-opacity duration-200 ${
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!menuOpen}
      >
        <Container className="flex h-full flex-col py-6">
          {/* Close button */}
          <div className="flex justify-end">
            <button
              className="text-paper"
              onClick={() => setMenuOpen(false)}
              aria-label="Close navigation menu"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Links */}
          <nav
            className="flex flex-1 flex-col justify-center gap-7"
            aria-label="Mobile navigation"
          >
            {NAV_LINKS.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`font-serif text-3xl font-semibold transition-colors duration-150 ${
                    isActive
                      ? "text-paper underline decoration-accent underline-offset-4 decoration-2"
                      : "text-stone hover:text-paper"
                  }`}
                >
                  {label}
                </Link>
              );
            })}

            <div className="mt-4">
              <Button href="/contact" variant="primary" size="lg">
                Get in touch
              </Button>
            </div>
          </nav>
        </Container>
      </div>
    </>
  );
}
