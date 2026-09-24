"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";

const TOPICS = [
  { label: "Speaking", slug: "speaking" },
  { label: "Corporate or work", slug: "corporate-or-work" },
  { label: "Sauna or session", slug: "sauna-or-session" },
  { label: "Adventures", slug: "adventures" },
  { label: "Just say hi", slug: "just-say-hi" },
] as const;

type TopicLabel = (typeof TOPICS)[number]["label"];

type Status = "idle" | "loading" | "success" | "error";
type SubStatus = "idle" | "loading" | "success" | "error";

const inputClass =
  "w-full border border-[#151515] bg-cream/35 px-4 text-base text-[#151515] placeholder:text-on-sand/70 focus:outline-none focus:ring-2 focus:ring-navy";

const labelClass = "meta text-[#151515]";

export default function ContactForm({ initialTopic }: { initialTopic?: string }) {
  const params = useSearchParams();
  // Read ?topic from the URL; fall back to the server-provided value so the
  // server render and first client render agree (no hydration mismatch).
  const slug = params.get("topic") ?? initialTopic;
  const preselected: TopicLabel = TOPICS.find((t) => t.slug === slug)?.label ?? "Speaking";

  const [topic, setTopic] = useState<TopicLabel>(preselected);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // Success-state subscribe checkbox
  const [subscribed, setSubscribed] = useState(false);
  const [subStatus, setSubStatus] = useState<SubStatus>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, name, email, message, company }),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMsg(
          res.status === 429
            ? "Too many messages - please try again a bit later."
            : res.status >= 500
              ? "Something went wrong on my end - please try again shortly."
              : "Please double-check your details and try again."
        );
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error - please check your connection and try again.");
    }
  }

  async function handleSubscribeToggle(e: ChangeEvent<HTMLInputElement>) {
    const checked = e.target.checked;
    setSubscribed(checked);
    if (!checked || subStatus === "success") return;

    setSubStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setSubStatus(res.ok ? "success" : "error");
    } catch {
      setSubStatus("error");
    }
  }

  // ── Success state ──────────────────────────────────────────────────────────
  if (status === "success") {
    return (
      <div className="bg-navy p-8 text-cream md:p-10">
        <h2 className="display text-5xl">
          Message <span className="text-gold">received.</span>
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-on-navy">
          Thanks for reaching out - I&apos;ll get back to you soon.
        </p>

        <label className="mt-8 flex cursor-pointer items-center gap-3 text-base text-cream">
          <input
            type="checkbox"
            checked={subscribed}
            onChange={handleSubscribeToggle}
            disabled={subStatus === "loading" || subStatus === "success"}
            className="h-5 w-5 shrink-0 accent-gold"
          />
          Also subscribe me to field notes
        </label>

        {subStatus === "success" && (
          <p className="mt-3 text-sm text-on-navy">
            You&apos;re on the list - no noise, just field notes.
          </p>
        )}
        {subStatus === "error" && (
          <p className="mt-3 text-sm text-[#f27860]">Couldn&apos;t subscribe - please try again.</p>
        )}
      </div>
    );
  }

  // ── Form ───────────────────────────────────────────────────────────────────
  const loading = status === "loading";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Honeypot - hidden from people, often filled by bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {/* Name */}
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
            placeholder="Your name"
            className={`h-[52px] ${inputClass} disabled:opacity-50`}
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            placeholder="your@email.com"
            className={`h-[52px] ${inputClass} disabled:opacity-50`}
          />
        </div>
      </div>

      {/* Topic chips */}
      <fieldset className="flex flex-col gap-3">
        <legend className={`mb-1 ${labelClass}`}>What&apos;s this about?</legend>
        <div className="flex flex-wrap gap-2">
          {TOPICS.map((t) => {
            const isActive = topic === t.label;
            return (
              <button
                type="button"
                key={t.label}
                onClick={() => setTopic(t.label)}
                aria-pressed={isActive}
                className={`min-h-[44px] border px-4 text-sm font-semibold transition-colors ${
                  isActive
                    ? "border-navy bg-navy text-cream"
                    : "border-[#151515] text-[#151515] hover:bg-cream/40"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Message */}
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea
          id="message"
          required
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={loading}
          placeholder="Tell me a little about what you have in mind…"
          className={`min-h-[140px] resize-y py-3 ${inputClass} disabled:opacity-50`}
        />
      </div>

      {status === "error" && <p className="text-sm font-semibold text-[#7a1d12]">{errorMsg}</p>}

      {/* Send */}
      <div>
        <button type="submit" className="btn-navy" disabled={loading}>
          {loading ? "Sending…" : "Send"} <span aria-hidden>→</span>
        </button>
      </div>
    </form>
  );
}
