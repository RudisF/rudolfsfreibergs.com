import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service">
      {/* TODO: replace the placeholder below with the full Terms of Service text from
          section 18 of the build brief — keep the numbering and section headings
          exactly as written. Section headers go in <h2>, sub-headers in <h3>. */}
      <p>
        <em>
          Placeholder — paste the full Terms of Service draft from section 18 of the build brief
          here. Numbering and section headings will be preserved exactly as written.
        </em>
      </p>

      <h2>1. Section heading</h2>
      <p>Body copy renders in Inter at 17px with a 1.7 line height.</p>

      <h2>2. Another section</h2>
      <p>Section headings render in Fraunces as serif H2s.</p>
    </LegalPage>
  );
}
