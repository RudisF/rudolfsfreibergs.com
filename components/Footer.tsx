import Link from "next/link";
import Container from "@/components/ui/Container";
import NewsletterForm from "@/components/NewsletterForm";
import SocialLink from "@/components/SocialLink";

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/rudolfs_freibergs/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/rudolfs-freibergs/" },
  { label: "YouTube", href: "https://www.youtube.com/@rudolfsfreibergs2733" },
] as const;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink">
      {/* ── Row 1: Newsletter ──────────────────────────────────────── */}
      <div className="border-b border-rule">
        <Container className="py-14">
          <div className="max-w-lg">
            <p className="font-mono text-xs font-medium uppercase tracking-widest text-stone">
              Newsletter
            </p>
            <h2 className="mt-2 font-serif text-2xl font-semibold text-paper">
              Stories worth knowing about
            </h2>
            <p className="mt-1 text-sm text-stone">
              No noise. Expedition updates, new films, and occasional reflections.
            </p>
            <div className="mt-6">
              <NewsletterForm />
            </div>
          </div>
        </Container>
      </div>

      {/* ── Row 2: Social ──────────────────────────────────────────── */}
      <div className="border-b border-rule">
        <Container className="py-10">
          <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-14">
            {SOCIALS.map((s) => (
              <SocialLink key={s.label} {...s} />
            ))}
          </div>
        </Container>
      </div>

      {/* ── Row 3: Legal ───────────────────────────────────────────── */}
      <Container className="py-6">
        <div className="flex flex-col items-center gap-3 text-xs text-stone sm:flex-row sm:justify-between">
          <span>© Rudolfs Freibergs {year}</span>
          <div className="flex gap-5">
            <Link href="/privacy" className="transition-colors hover:text-paper">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-paper">
              Terms of Service
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
