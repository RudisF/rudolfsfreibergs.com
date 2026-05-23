import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import LogoImg from "@/components/work/LogoImg";
import { stack } from "@/content/stack";

export default function TechStack() {
  return (
    <section id="stack" className="scroll-mt-32 border-t border-rule py-20 md:py-28">
      <Container>
        <SectionHeader eyebrow="Tooling" title="The stack I work in" />

        <div className="mt-10 grid grid-cols-3 gap-4 md:grid-cols-6">
          {stack.map((t) => (
            <div
              key={t.name}
              className="group relative flex aspect-square items-center justify-center rounded-xl border border-rule bg-paper p-5"
            >
              <LogoImg
                name={t.name}
                src={t.logo}
                imgClassName="max-h-12 max-w-full object-contain opacity-70 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                fallbackClassName="text-center"
              />

              {/* Tooltip */}
              <span className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-[calc(100%+6px)] whitespace-nowrap rounded bg-ink px-2 py-1 font-mono text-[10px] text-paper opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                {t.name}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
