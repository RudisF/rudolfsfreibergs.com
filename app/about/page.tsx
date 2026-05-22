import type { Metadata } from "next";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-content px-6 py-24">
      <h1 className="font-serif text-4xl font-bold">About</h1>
      <p className="mt-4 text-stone">Coming soon.</p>
    </section>
  );
}
