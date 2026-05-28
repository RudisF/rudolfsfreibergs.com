import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import CtaBand from "@/components/ui/CtaBand";
import Eyebrow from "@/components/ui/Eyebrow";
import WorkSubNav from "@/components/work/WorkSubNav";
import WorkRow from "@/components/work/WorkRow";
import ClientLogoStrip from "@/components/work/ClientLogoStrip";
import Certifications from "@/components/work/Certifications";
import TechStack from "@/components/work/TechStack";
import { clients } from "@/content/stack";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Eight years across B2B marketing, account management, go-to-market, and AI - treating marketing as a revenue engine rooted in data and strategic precision.",
};

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
          Marketing, account management, go-to-market, and AI - the disciplines behind the
          day job, and the stories they generate.
        </p>
      </Container>

      <WorkRow
        id="marketing"
        eyebrow="B2B Marketing"
        side="left"
        image="/images/work/Work_1.png"
        title="Demand that compounds"
        body="I treat B2B marketing as a revenue engine, not a campaign calendar - built on data, full-funnel attribution, and tight alignment with account management. Eight years of building playbooks with executives, finding expansion in markets that look saturated.\n\nReal hand on experience hosting executive roundtables in Dubai, Zurich, London and Latvia."
      />

      <WorkRow
        id="account-management"
        eyebrow="Account Management"
        side="right"
        image="/images/work/Work_4.JPG"
        title="Relationships over transactions"
        body="I built an account management department from the ground up - scaled it to a global portfolio of 130+ accounts, The framework is high-touch, growth-focused, proactive. I believe in meaningful engagement - the kind that creates unforgettable, exciting moments and deepens over time into a trusted, long-term relationship."
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
        body="A Go-To-Market strategy lives or dies on the alignment between internal execution and external timing. I build GTM ecosystems with AI at the core. In my concepts: the seller wins when they know more about the buyer's actual situation than the buyer does.\n\nThat competitive edge for marketing doesn't come from more engagement. It comes from account management knowledge who've lived inside one customer segment for years, layered with AI that surfaces what's happening inside the account before the lead even arrives. When the first conversation starts, you are telling them something about their own business they hadn't noticed yet."
      />

      <WorkRow
        id="ai"
        eyebrow="AI Projects"
        side="right"
        image="/images/work/Work_4.JPG"
        title="Leverage, not hype"
        body="I build systems that turn your private corpus into messages that can't be replicated. That's the whole game. The solutions you delivered, the industry context behind them - it lives with the PMs and Account Managers who built it, often without ever reaching the Marketing team. So the sharpest knowledge in your company is the knowledge that never makes it to your buyer.\n\nThat gap is the competitive edge most companies leave on the table. AI doesn't replace the people who hold it - it amplifies their intuition, surfaces what they know but haven't articulated, and gets it into the hands of the team writing the next message.\n\nCompanies that go horizontally don't understand verticals - they don't understand why customers actually buy. My job in marketing is to advance the intuition of the customer. AI is how you finally do that at scale."
      />

      <Certifications />
      <TechStack />

      {/* Closing CTA */}
      <CtaBand heading="Want to talk?" ctaLabel="Get in touch" href="/contact" tone="accent" />
    </>
  );
}
