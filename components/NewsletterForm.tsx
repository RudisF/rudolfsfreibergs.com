"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="text-sm font-semibold text-on-sand">
        You&apos;re on the list. Expect real stories, not noise.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <div className="flex">
        <label htmlFor="newsletter-email" className="sr-only">
          Email
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          disabled={status === "loading"}
          className="h-[52px] min-w-0 flex-1 border border-[#151515] bg-transparent px-4 text-[15px] text-[#151515] placeholder:text-on-sand/70 focus:outline-none focus:ring-2 focus:ring-navy disabled:opacity-50"
        />
        <button type="submit" className="btn-navy" disabled={status === "loading"}>
          {status === "loading" ? "Subscribing…" : "Subscribe"}
        </button>
      </div>

      {status === "error" && (
        <p className="text-sm font-semibold text-[#7a1d12]">
          Something went wrong - please try again.
        </p>
      )}
    </form>
  );
}
