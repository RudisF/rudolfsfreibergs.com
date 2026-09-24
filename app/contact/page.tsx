import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Rudolfs Freibergs about speaking, corporate work, or just to say hi.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage({ searchParams }: { searchParams: { topic?: string } }) {
  return (
    <section className="grid grid-cols-1 bg-sand lg:min-h-[940px] lg:grid-cols-[620px_1fr]">
      <div className="relative hidden min-h-[360px] lg:block">
        <Image
          src="/images/adventures/Nepal_2.jpg"
          alt="Temple stairway, Nepal"
          fill
          priority
          sizes="620px"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col justify-center gap-7 px-5 py-14 md:px-[72px] md:py-16">
        <h1 className="display text-[clamp(2.75rem,5vw,4.5rem)] text-[#151515]">
          Where the <span className="text-gold-deep">conversation</span> starts
        </h1>
        <p className="max-w-[600px] text-lg leading-relaxed text-on-sand">
          Tell me what brought you here - a story that landed, a place you&apos;re curious about, a
          question you&apos;ve been sitting with.
        </p>
        <div className="max-w-[720px]">
          <Suspense fallback={null}>
            <ContactForm initialTopic={searchParams.topic} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
