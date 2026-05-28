"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import Button from "@/components/ui/Button";

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
  "w-full rounded-sm border border-rule bg-paper px-4 text-ink placeholder:text-stone focus:outline-none focus:ring-2 focus:ring-accent";

export default function ContactForm({ initialTopic }: { initialTopic?: string }) {
  const params = useSearchParams();
  // Read ?topic from the URL; fall back to the server-provided value so the
  // server render and first client render agree (no hydration mismatch).
  const slug = params.get("topic") ?? initialTopic;
  const preselected: TopicLabel =
    TOPICS.find((t) => t.slug === slug)?.label ?? "Speaking";

  const [topic, setTopic] = useState<TopicLabel>(preselected);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
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
        body: JSON.stringify({ topic, name, email, message }),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMsg(
          res.status >= 500
            ? "Something went wrong on my end — please try again shortly."
            : "Please double-check your details and try again.",
        );
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error — please check your connection and try again.");
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
      <div className="rounded-2xl border border-rule p-8 md:p-10">
        <h2 className="font-serif text-4xl font-medium text-ink">Message received.</h2>
        <p className="mt-3 text-base leading-relaxed text-stone">
          Thanks for reaching out — I&apos;ll get back to you soon.
        </p>

        <label className="mt-8 flex cursor-pointer items-center gap-3 text-sm text-ink">
          <input
            type="checkbox"
            checked={subscribed}
            onChange={handleSubscribeToggle}
            disabled={subStatus === "loading" || subStatus === "success"}
            className="h-4 w-4 shrink-0 accent-accent"
          />
          Also subscribe me to field notes
        </label>

        {subStatus === "success" && (
          <p className="mt-3 text-sm text-stone">You&apos;re on the list — no noise, just field notes.</p>
        )}
        {subStatus === "error" && (
          <p className="mt-3 text-sm text-red-600">Couldn&apos;t subscribe — please try again.</p>
        )}
      </div>
    );
  }

  // ── Form ───────────────────────────────────────────────────────────────────
  const loading = status === "loading";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Name */}
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="font-mono text-xs uppercase tracking-widest text-stone">
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
          className={`h-12 ${inputClass} disabled:opacity-50`}
        />
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="font-mono text-xs uppercase tracking-widest text-stone">
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
          className={`h-12 ${inputClass} disabled:opacity-50`}
        />
      </div>

      {/* Topic chips */}
      <fieldset className="flex flex-col gap-3">
        <legend className="mb-1 font-mono text-xs uppercase tracking-widest text-stone">
          What&apos;s this about?
        </legend>
        <div className="flex flex-wrap gap-3">
          {TOPICS.map((t) => {
            const isActive = topic === t.label;
            return (
              <button
                type="button"
                key={t.label}
                onClick={() => setTopic(t.label)}
                aria-pressed={isActive}
                className={`rounded-full border px-5 py-2 font-mono text-xs uppercase tracking-widest transition-colors ${
                  isActive
                    ? "border-accent bg-accent text-white"
                    : "border-rule text-ink hover:border-stone"
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
        <label htmlFor="message" className="font-mono text-xs uppercase tracking-widest text-stone">
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

      {status === "error" && <p className="text-sm text-red-600">{errorMsg}</p>}

      {/* Send */}
      <div className="flex justify-end">
        <Button type="submit" variant="primary" size="lg" disabled={loading}>
          {loading ? "Sending…" : "Send"}
        </Button>
      </div>
    </form>
  );
}
