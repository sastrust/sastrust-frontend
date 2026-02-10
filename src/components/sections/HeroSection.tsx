// File: src/components/sections/HeroSection.tsx
// Section: Hero
// Fields (max): eyebrow, title, subtitle, body, imageUrl, imageAlt, ctaText, ctaHref
import Image from "next/image";

export default function HeroSection({
  title,
  imageUrl,
}: {
  title: string;
  imageUrl: string;
}) {
  return (
    <section className="hero-fullbleed">
      {/* Full-bleed hero image background with centered statement text. */}
      <div className="hero-fullbleed__media">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            priority
            sizes="100vw"
            className="media-img"
          />
        ) : null}
      </div>
      <div className="hero-fullbleed__overlay" />
      <div className="hero-fullbleed__content">
        <h1 className="hero-fullbleed__title">{title}</h1>
      </div>
    </section>
  );
}
