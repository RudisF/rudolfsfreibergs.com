import type { Metadata } from "next";

export const metadata: Metadata = { title: "Soulful" };

export default function SoulfulPage() {
  return (
    <section className="mx-auto max-w-content px-6 py-24">
      <h1 className="font-serif text-4xl font-bold">Soulful</h1>
      <p className="mt-4 text-stone">Coming soon.</p>
    </section>
  );
}
