"use client";

import { useState } from "react";

interface LogoImgProps {
  name: string;
  src: string;
  imgClassName?: string;
  fallbackClassName?: string;
}

export default function LogoImg({
  name,
  src,
  imgClassName = "",
  fallbackClassName = "",
}: LogoImgProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className={`font-mono text-xs text-stone ${fallbackClassName}`.trim()}>{name}</span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={name}
      loading="lazy"
      onError={() => setFailed(true)}
      className={imgClassName}
    />
  );
}
