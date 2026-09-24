import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-start justify-center gap-8 bg-navy px-5 py-20 md:px-14">
      <h1 className="display text-[clamp(3rem,9vw,8rem)] text-cream">
        Off the <span className="text-gold">map</span>
      </h1>
      <p className="max-w-[480px] text-lg leading-relaxed text-on-navy">
        This page does not exist, or it moved.
      </p>
      <Link href="/" className="btn-gold">
        Back to the start <span aria-hidden>→</span>
      </Link>
    </section>
  );
}
