import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import { certifications, mentorships } from "@/content/certifications";

export default function Certifications() {
  return (
    <section id="certifications" className="scroll-mt-32 border-t border-rule py-20 md:py-28">
      <Container>
        <SectionHeader eyebrow="Credentials" title="Certifications" />

        {/* Two-column list */}
        <div className="mt-10 grid grid-cols-1 gap-x-12 sm:grid-cols-2">
          {certifications.map((c) => (
            <div
              key={`${c.name}-${c.issuer}`}
              className="flex flex-col border-t border-rule/40 py-4"
            >
              <p className="font-serif text-lg font-medium leading-snug text-ink">{c.name}</p>
              <p className="mt-1 font-mono text-xs uppercase tracking-widest text-stone">
                {c.issuer}
              </p>
            </div>
          ))}
        </div>

        {/* Mentorship */}
        <h3 className="mt-14 font-mono text-xs font-medium uppercase tracking-widest text-stone">
          Mentorship
        </h3>
        <div className="mt-4 grid grid-cols-1 gap-x-12 sm:grid-cols-2">
          {mentorships.map((m) => (
            <div
              key={`${m.name}-${m.mentor}`}
              className="flex flex-col border-t border-rule/40 py-4"
            >
              <p className="font-serif text-lg font-medium leading-snug text-ink">{m.name}</p>
              <p className="mt-1 font-mono text-xs uppercase tracking-widest text-stone">
                {m.mentor}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
