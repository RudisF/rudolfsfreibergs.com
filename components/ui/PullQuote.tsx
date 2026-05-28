interface PullQuoteProps {
  quote: string;
  attribution?: string;
  className?: string;
}

export default function PullQuote({ quote, attribution, className = "" }: PullQuoteProps) {
  return (
    <figure className={`mx-auto max-w-2xl text-center ${className}`.trim()}>
      <blockquote
        className="font-serif italic text-ink"
        style={{ fontSize: "32px", lineHeight: 1.4 }}
      >
        {quote}
      </blockquote>
      {attribution && (
        <figcaption className="mt-6 font-mono text-sm text-stone">- {attribution}</figcaption>
      )}
    </figure>
  );
}
