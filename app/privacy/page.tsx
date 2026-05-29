import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for rudolfsfreibergs.com.",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" lastUpdated="29 May 2026">
      <h2>1. Who Runs This Site</h2>
      <p>
        rudolfsfreibergs.com is operated by Rudolfs Freibergs (&ldquo;I&rdquo;, &ldquo;me&rdquo;),
        based in Latvia. You can reach me at{" "}
        <a href="mailto:rudis.freibergs@gmail.com">rudis.freibergs@gmail.com</a>.
        I am the data controller for any personal information processed through this site,
        within the meaning of the EU General Data Protection Regulation (GDPR) 2016/679.
      </p>

      <h2>2. What I Collect</h2>
      <p>I collect personal information only when you choose to give it to me:</p>

      <h3>a) Contact form</h3>
      <p>
        If you submit the form at /contact, I receive your name, email address, phone number
        (if you provide one), selected topic, and the message you wrote.
      </p>

      <h3>b) Newsletter signup</h3>
      <p>
        If you subscribe to the newsletter, I receive your email address and the date of signup.
      </p>

      <h3>c) Server logs</h3>
      <p>
        My hosting provider (Vercel Inc., USA) keeps standard web-server logs containing your
        IP address, browser user-agent string, and the pages you requested. I do not use these
        logs for analytics or profiling.
      </p>

      <p>
        I do not use cookies for tracking, advertising. I do not run third-party tools like
        Facebook Pixel.
      </p>

      <h2>3. Why I Process It</h2>
      <ul>
        <li>
          <strong>Contact form data</strong> - to read and respond to your message. Legal basis:
          legitimate interest in handling correspondence (GDPR Art. 6(1)(f)) or, where you have
          asked me about a service, performance of a pre-contractual step at your request
          (Art. 6(1)(b)).
        </li>
        <li>
          <strong>Newsletter data</strong> - to send you the newsletter you subscribed to. Legal
          basis: your consent (Art. 6(1)(a)). You can withdraw consent at any time by clicking
          unsubscribe in any newsletter email, or by emailing me.
        </li>
        <li>
          <strong>Server logs</strong> - to operate and secure the site. Legal basis: legitimate
          interest (Art. 6(1)(f)).
        </li>
      </ul>

      <h2>4. Who Else Touches Your Data</h2>
      <p>I use a small number of processors who act on my instructions:</p>
      <ul>
        <li>
          <strong>Formspree</strong> (Formspree Inc., USA) - relays form submissions to my email
          inbox.
        </li>
        <li>
          <strong>Vercel</strong> (Vercel Inc., USA) - hosts the site and keeps server logs.
        </li>
        <li>
          <strong>Google</strong> (Google LLC, USA) - operates the Gmail inbox at{" "}
          <a href="mailto:rudis.freibergs@gmail.com">rudis.freibergs@gmail.com</a> where your
          messages are stored.
        </li>
      </ul>
      <p>
        Transfers to the USA are made under the EU-US Data Privacy Framework or Standard
        Contractual Clauses, depending on the processor.
      </p>

      <h2>5. How Long I Keep It</h2>
      <ul>
        <li>
          <strong>Contact messages</strong>: in my inbox until I no longer need them for the
          conversation, typically up to 24 months. I delete sooner on request.
        </li>
        <li>
          <strong>Newsletter list</strong>: until you unsubscribe.
        </li>
        <li>
          <strong>Server logs</strong>: per Vercel&apos;s defaults (~30 days).
        </li>
      </ul>

      <h2>6. Your Rights</h2>
      <p>Under the GDPR you have the right to:</p>
      <ul>
        <li>access the personal data I hold about you,</li>
        <li>have it corrected if it is inaccurate,</li>
        <li>have it erased (&ldquo;right to be forgotten&rdquo;),</li>
        <li>restrict or object to processing,</li>
        <li>receive a copy in a portable format,</li>
        <li>withdraw consent at any time (for the newsletter),</li>
        <li>
          lodge a complaint with the Latvian Data State Inspectorate (Datu valsts inspekcija,{" "}
          <a href="https://www.dvi.gov.lv" target="_blank" rel="noopener noreferrer">
            https://www.dvi.gov.lv
          </a>
          ).
        </li>
      </ul>
      <p>
        To exercise any of these rights, email{" "}
        <a href="mailto:rudis.freibergs@gmail.com">rudis.freibergs@gmail.com</a>. I respond
        within 30 days.
      </p>

      <h2>7. Children</h2>
      <p>
        This site is not directed at children under 16. I do not knowingly collect personal
        information from anyone under 16.
      </p>

      <h2>8. Changes</h2>
      <p>
        I may update this policy. The &ldquo;Last updated&rdquo; date above always reflects the
        current version. Material changes will be announced in the newsletter (if you subscribe).
      </p>
    </LegalPage>
  );
}
