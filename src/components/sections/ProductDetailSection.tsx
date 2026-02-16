// File: src/components/sections/ProductDetailSection.tsx
// Section: Product Detail
// Fields (max): title, subtitle, images, description, details, badges
import Link from "next/link";
import Image from "next/image";
import { DEFAULT_LOCALE } from "../../lib/i18n";
export default function ProductDetailSection({
  locale,
  eyebrow,
  title,
  body,
  bullets,
  buttonText,
  mainImageUrl,
  gallery,
}: {
  locale: string;
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
  buttonText: string;
  mainImageUrl: string;
  gallery: string[];
}) {
  const base = locale === DEFAULT_LOCALE ? "" : `/${locale}`;

  return (
    <section className="section product-detail">
      <div className="container">
        <div className="product-detail-grid">
          <div className="product-gallery">
            <div className="media-frame product-media-lg">
              {mainImageUrl ? (
                <Image
                  src={mainImageUrl}
                  alt={title}
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                  className="media-img"
                />
              ) : null}
            </div>
            <div className="product-thumb-grid">
              {gallery.map((label, index) => (
                <div className="media-frame media-frame-sm" key={`${label}-${index}`}>
                  {label ? (
                    <Image
                      src={label}
                      alt={`${title} ${index + 1}`}
                      fill
                      sizes="(max-width: 900px) 33vw, 10vw"
                      className="media-img"
                    />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
          <div className="product-detail-info">
            <div className="section-copy">
              <div className="eyebrow">{eyebrow}</div>
              <h1 className="h1">{title}</h1>
              <p className="body-lg">{body}</p>
            </div>
            <div className="product-detail-list">
              {bullets.map((item, index) => (
                <div key={`${item}-${index}`}>• {item}</div>
              ))}
            </div>
            <Link className="btn" href={base ? `${base}/contact` : "/contact"}>
              {buttonText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
