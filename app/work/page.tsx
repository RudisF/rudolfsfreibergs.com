import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import WorkSubNav from "@/components/work/WorkSubNav";
import WorkRow from "@/components/work/WorkRow";
import ClientLogoStrip from "@/components/work/ClientLogoStrip";
import Certifications from "@/components/work/Certifications";
import TechStack from "@/components/work/TechStack";
import { clients } from "@/content/stack";

export const metadata: Metadata = { title: "Work" };

export default function WorkPage() {
  return (
    <>
      <WorkSubNav />

      {/* Hero */}
      <Container className="py-20 md:py-28">
        <Eyebrow color="accent">What I do</Eyebrow>
        <h1
          className="mt-4 max-w-3xl font-serif leading-[1.05] text-ink"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 500 }}
        >
          Eight years turning technical work into human results
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-stone">
          Marketing, account management, go-to-market, and AI — the disciplines behind the
          day job, and the stories they generate.
        </p>
      </Container>

      <WorkRow
        id="marketing"
        eyebrow="B2B Marketing"
        side="left"
        image="/images/work/Work_1.png"
        title="Demand that compounds"
        body="I approach B2B marketing as a highly structured system designed to maximize engagement within specific ICP and TAM segments. I orchestrated a cross-functional team to unify data research, ABM and tailored content functions. My focus is on moving away from vague, unmeasurable marketing initiatives and instead building fully aligned, full-funnel attribution models. By synchronizing workflows directly with account management, I ensure 100% visibility into demand generation ROI and performance metrics. I develop tailored marketing playbooks and expansion strategies in direct collaboration with company executives. This high-level alignment allows us to aggressively capture business expansion opportunities and identify strategic partnerships. Ultimately, I treat B2B marketing not as a series of isolated creative campaigns, but as a core revenue engine rooted in data and strategic precision."
      />

      <WorkRow
        id="account-management"
        eyebrow="Account Management"
        side="right"
        image="/images/work/Work_4.JPG"
        title="Relationships over transactions"
        body="Account management is about evolving standard client relationships into predictable, high-growth revenue drivers. I built a dedicated Account Management department from the ground up, scaling it to successfully service a global portfolio of over 130 accounts. Rather than reacting to client issues as they arise, I formalized a holistic growth framework centered on high-touch relationship management and deep service penetration."
        metric={{ value: "93", label: "Net Promoter Score (NPS)" }}
      >
        <ClientLogoStrip clients={clients} />
      </WorkRow>

      <WorkRow
        id="gtm"
        eyebrow="GTM"
        side="left"
        image="/images/work/Work_3.png"
        title="From zero to launched"
        body="A successful Go-To-Market strategy requires absolute alignment between internal execution and external market opportunity. I specialize in creating and scaling comprehensive GTM and ABM ecosystems designed to deeply penetrate target market segments. This process begins by identifying high-growth market opportunities in direct collaboration with executive leadership. From there, I build specific sales and marketing channels across professional networks, digital platforms, and developer communities. My GTM methodology relies heavily on capturing precise decision-maker intent to ensure our outreach hits at the exact moment of need. I have pressure-tested these expansion frameworks internationally by curating and hosting global executive events and roundtables in major business hubs like Dubai, Zurich, London, and New York. A great GTM strategy does not just launch a product; it systematically institutionalizes demand generation."
      />

      <WorkRow
        id="ai"
        eyebrow="AI Projects"
        side="right"
        image="/images/work/Work_4.JPG"
        title="Leverage, not hype"
        body="I design and deploy AI solutions that integrate directly into sales and marketing pipelines to capture real-time account intent signals. This allows teams to instantly identify hidden engagement gaps within target accounts before revenue is lost. To keep our technical execution sharp and modern, I maintain hands-on experience building workflows with automation platforms like Claude Code. These automated pipelines help bridge the data divide, ensuring full-funnel attribution models have the clean, real-time data they need to function. By combining technical automation with psychological precision, I turn raw data into actionable insights for the frontline of the sales team. Ultimately, I use AI to strip away the guesswork from enterprise sales so we can focus entirely on high-value, human-to-human relationships."
      />

      <Certifications />
      <TechStack />

      {/* Closing CTA — full-bleed accent band */}
      <section className="bg-accent">
        <Container className="py-20 text-center md:py-28">
          <h2
            className="font-serif font-medium text-paper"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Want to talk?
          </h2>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-sm border border-paper px-8 font-sans text-sm font-medium text-paper transition-colors hover:bg-paper hover:text-accent"
            >
              Get in touch
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
