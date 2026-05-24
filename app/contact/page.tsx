import type { Metadata } from "next";
import { Suspense } from "react";
import Container from "@/components/ui/Container";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Rudolfs Freibergs about speaking, corporate work, or just to say hi.",
};

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/rudolfs_freibergs/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/rudolfs-freibergs/" },
  { label: "YouTube", href: "https://www.youtube.com/@rudolfsfreibergs2733" },
];

export default function ContactPage({
  searchParams,
}: {
  searchParams: { topic?: string };
}) {
  return (
    <Container className="py-20 md:py-28">
      {/* Heading */}
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-serif font-medium text-ink" style={{ fontSize: "56px" }}>
          Contact Rudolfs
        </h1>
        <p className="mt-4 text-base text-stone">
          Send me a note — I usually reply within a couple of days.
        </p>
      </div>

      {/* Form */}
      <div className="mx-auto mt-12 max-w-2xl">
        <Suspense fallback={null}>
          <ContactForm initialTopic={searchParams.topic} />
        </Suspense>
      </div>

      {/* Elsewhere */}
      <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-stone">
        Or find me elsewhere —{" "}
        {SOCIALS.map((s, i) => (
          <span key={s.label}>
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink underline-offset-4 hover:underline"
            >
              {s.label}
            </a>
            {i < SOCIALS.length - 1 ? " · " : "."}
          </span>
        ))}
      </p>
    </Container>
  );
}
