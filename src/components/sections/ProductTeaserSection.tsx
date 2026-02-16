// File: src/components/sections/ProductTeaserSection.tsx
// Section: Product Teaser (links to products page)
// Fields (max): title, body, ctaText, ctaHref, image, imageAlt
import Link from "next/link";
import { DEFAULT_LOCALE } from "../../lib/i18n";
import Image from "next/image";

export default function ProductTeaserSection({
  locale,
  eyebrow,
  title,
  body,
  ctaText,
  imageUrl,
}: {
  locale: string;
  eyebrow: string;
  title: string;
  body: string;
  ctaText: string;
  imageUrl: string;
}) {
  const base = locale === DEFAULT_LOCALE ? "" : `/${locale}`;

  return (
    <section className="section product-teaser">
      <div className="container">
        <div className="product-teaser-grid">
          <div className="section-copy">
            <div className="eyebrow">{eyebrow}</div>
            <h2 className="h2">{title}</h2>
            <p className="body-lg">{body}</p>
            <Link className="btn" href={base ? `${base}/products` : "/products"}>
              {ctaText}
            </Link>
          </div>
          <div>
            <div className="media-frame">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={title}
                  fill
                  sizes="(max-width: 900px) 100vw, 40vw"
                  className="media-img"
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
