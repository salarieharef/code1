"use client";

export default function defaultCustomImageLoader({
  src,
  width,
  quality,
}: {
  src?: string;
  width?: number;
  quality?: number;
}) {
  return src;
}
