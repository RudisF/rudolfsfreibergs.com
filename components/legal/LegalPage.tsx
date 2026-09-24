import type { ReactNode } from "react";
import Container from "@/components/ui/Container";

interface LegalPageProps {
  title: string;
  lastUpdated?: string;
  children: ReactNode;
}

export default function LegalPage({
  title,
  lastUpdated = "22 May 2026",
  children,
}: LegalPageProps) {
  return (
    <div className="bg-paper text-ink">
      <Container className="py-20 md:py-28">
        <div className="mx-auto max-w-2xl">
          <h1 className="display text-[clamp(2.5rem,6vw,3.5rem)] text-ink">{title}</h1>
          <p className="meta mt-4 text-stone">Last updated: {lastUpdated}</p>

          {/* Body: Inter 17px / 1.7, serif H2 section headers */}
          <div
            className="mt-10 font-sans text-ink [&_a]:text-accent [&_a]:underline-offset-4 [&_a:hover]:underline [&>h2]:mb-3 [&>h2]:mt-10 [&>h2]:text-2xl [&>h2]:font-extrabold [&>h2]:leading-snug [&>h3]:mb-2 [&>h3]:mt-6 [&>h3]:text-xl [&>h3]:font-bold [&>ol]:my-4 [&>ol]:list-decimal [&>ol]:pl-6 [&>p]:my-4 [&>ul]:my-4 [&>ul]:list-disc [&>ul]:pl-6 [&_li]:my-1"
            style={{ fontSize: "17px", lineHeight: 1.7 }}
          >
            {children}
          </div>

          <p className="mt-12 border-t border-rule/40 pt-6 text-sm text-stone">
            If you have questions, email{" "}
            <a
              href="mailto:rudis.freibergs@gmail.com"
              className="text-accent underline-offset-4 hover:underline"
            >
              rudis.freibergs@gmail.com
            </a>
            .
          </p>
        </div>
      </Container>
    </div>
  );
}
