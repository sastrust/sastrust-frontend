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
      <div className="product-teaser-layout">
        <div className="product-teaser-visual" aria-hidden="true">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt=""
              fill
              sizes="(max-width: 900px) 100vw, 46vw"
              className="product-teaser-image"
            />
          ) : null}
        </div>

        <div className="product-teaser-copy-wrap">
          <div className="product-teaser-copy section-copy">
            <div className="eyebrow product-teaser-eyebrow">{eyebrow}</div>
            <h2 className="product-teaser-title">{title}</h2>
            <p className="product-teaser-body">{body}</p>
            <Link className="product-teaser-btn" href={base ? `${base}/products` : "/products"}>
              {ctaText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
