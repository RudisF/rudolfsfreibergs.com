import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";

const SITE_LINKS = [
  { href: "/adventures", label: "Adventures" },
  { href: "/work", label: "Work" },
  { href: "/soulful", label: "Soulful experiences" },
  { href: "/media", label: "Media" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/rudolfs_freibergs/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/rudolfs-freibergs/" },
  { label: "YouTube", href: "https://www.youtube.com/@rudolfsfreibergs2733" },
] as const;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-sand text-[#151515]">
      <div className="grid grid-cols-1 gap-12 px-5 pb-10 pt-14 md:grid-cols-3 md:gap-16 md:px-14 md:pt-16">
        {/* Newsletter */}
        <div className="flex flex-col gap-4">
          <h2 className="display text-[32px]">Stories by email</h2>
          <p className="text-base leading-relaxed text-on-sand">
            Expedition updates, new films and occasional reflections.
          </p>
          <NewsletterForm />
        </div>

        {/* Links */}
        <nav
          aria-label="Footer"
          className="grid grid-cols-2 content-start gap-x-6 gap-y-3.5 text-[15px] font-semibold"
        >
          <ul className="flex flex-col gap-3.5">
            {SITE_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-gold-deep">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="flex flex-col gap-3.5">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-gold-deep"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* B:Engage */}
        <a
          href="https://b2b-engagement.com/"
          className="group flex flex-col gap-3.5 self-start bg-navy p-7 text-cream"
        >
          <span className="text-[30px] font-black tracking-[-0.04em]">
            B<span className="text-gold">:</span>Engage
          </span>
          <span className="text-[15px] leading-relaxed text-on-navy">
            My B2B practice. Fractional CMO work for B2B software, SaaS and commerce companies.
          </span>
          <span className="meta text-gold transition-colors group-hover:text-cream">
            b2b-engagement.com →
          </span>
        </a>
      </div>

      <div className="mx-5 flex flex-col gap-3 border-t border-[#151515]/30 py-5 text-[13px] font-semibold text-on-sand sm:flex-row sm:justify-between md:mx-14">
        <span>© Rudolfs Freibergs {year}</span>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-[#151515]">
            Privacy policy
          </Link>
          <Link href="/terms" className="hover:text-[#151515]">
            Terms of service
          </Link>
        </div>
      </div>
    </footer>
  );
}
