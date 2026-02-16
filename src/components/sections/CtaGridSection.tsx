// File: src/components/sections/CtaGridSection.tsx
// Section: CTA Grid
// Fields (max): title, items[{ title, image, imageAlt, ctaText, ctaHref }]
import Link from "next/link";
import Image from "next/image";
import { DEFAULT_LOCALE } from "../../lib/i18n";

export default function CtaGridSection({
  locale,
  eyebrow,
  title,
  items,
}: {
  locale: string;
  eyebrow: string;
  title: string;
  items: { title: string; ctaText: string; imageUrl: string; ctaHref?: string }[];
}) {
  const base = locale === DEFAULT_LOCALE ? "" : `/${locale}`;

  return (
    <section className="section cta-grid">
      <div className="container">
        <div className="cta-head">
          <div className="eyebrow">{eyebrow}</div>
          <h2 className="h2">{title}</h2>
        </div>
        <div className="cta-cards">
          {items.map((item, index) => (
            <div className="cta-card" key={`${item.title}-${index}`}>
              <div className="media-frame media-frame-sm">
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    loading="eager"
                    sizes="(max-width: 900px) 100vw, 30vw"
                    className="media-img"
                  />
                ) : null}
              </div>
              <h3 className="h3">{item.title}</h3>
              <Link
                className="btn btn-ghost"
                href={
                  item.ctaHref
                    ? item.ctaHref.startsWith("/")
                      ? `${base}${item.ctaHref}`
                      : item.ctaHref
                    : base
                      ? `${base}/contact`
                      : "/contact"
                }
              >
                {item.ctaText}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
