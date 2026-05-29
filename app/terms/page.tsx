import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for rudolfsfreibergs.com.",
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" lastUpdated="29 May 2026">
      <h2>1. About These Terms</h2>
      <p>
        These terms govern your use of rudolfsfreibergs.com. By using the site you agree to
        them. If you don&apos;t, please don&apos;t use the site. The site is operated by Rudolfs
        Freibergs in Latvia.
      </p>

      <h2>2. What This Site Is</h2>
      <p>
        This is a personal website containing essays, travel writing, work history, and contact
        information. Nothing on it is a contractual offer of services or employment. Any work I
        undertake is governed by a separate written agreement.
      </p>

      <h2>3. Intellectual Property</h2>
      <p>
        All text, photographs, video, and graphics on this site are mine unless credited
        otherwise. You may:
      </p>
      <ul>
        <li>
          read, print, and share individual pages for personal, non-commercial use, with a link
          back;
        </li>
        <li>quote short excerpts with attribution.</li>
      </ul>
      <p>You may not, without my written permission:</p>
      <ul>
        <li>reproduce the site or substantial parts of its content,</li>
        <li>use my photographs or writing for commercial purposes,</li>
        <li>
          use my name, image, or any content to train machine-learning models or generate
          derivative works at scale,
        </li>
        <li>republish on another website or platform.</li>
      </ul>

      <h2>4. Contact Form and Newsletter</h2>
      <p>
        By submitting the contact form or subscribing to the newsletter you confirm the
        information you give is accurate and that you are contacting me on your own behalf. You
        can unsubscribe from the newsletter at any time using the link in every email.
      </p>

      <h2>5. Third-Party Links</h2>
      <p>
        The site contains links to third-party websites (YouTube, LinkedIn, Instagram, press
        articles, etc.). I am not responsible for the content or privacy practices of those
        sites.
      </p>

      <h2>6. Availability and Disclaimer</h2>
      <p>
        The site is provided &ldquo;as is.&rdquo; I make no guarantee of uninterrupted
        availability or that the content is error-free. To the maximum extent permitted by
        Latvian and EU law, I disclaim liability for indirect, incidental, or consequential
        damages arising from your use of the site.
      </p>
      <p>
        Nothing in these terms limits liability for damages that cannot be excluded under
        Latvian consumer-protection law or the GDPR.
      </p>

      <h2>7. Governing Law</h2>
      <p>
        These terms are governed by the laws of the Republic of Latvia. Any disputes go before
        the competent courts of Latvia.
      </p>

      <h2>8. Changes</h2>
      <p>
        I may update these terms; the &ldquo;Last updated&rdquo; date above reflects the current
        version. Continued use of the site after a change constitutes acceptance.
      </p>

      <h2>9. Contact</h2>
      <p>
        Questions about these terms:{" "}
        <a href="mailto:rudis.freibergs@gmail.com">rudis.freibergs@gmail.com</a>.
      </p>
    </LegalPage>
  );
}
