"use client";

import { useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";

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
      <p className="font-sans text-sm text-stone">
        You&apos;re on the list. Expect real stories, not noise.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-start">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        disabled={status === "loading"}
        className="h-12 flex-1 rounded-sm border border-rule bg-transparent px-4 text-sm text-paper placeholder:text-stone focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
      />
      <Button type="submit" variant="primary" size="md" disabled={status === "loading"}>
        {status === "loading" ? "Subscribing…" : "Subscribe"}
      </Button>

      {status === "error" && (
        <p className="text-xs text-red-400 sm:col-span-2">
          Something went wrong - please try again.
        </p>
      )}
    </form>
  );
}
