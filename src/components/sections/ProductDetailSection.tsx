// File: src/components/sections/ProductDetailSection.tsx
// Section: Product Detail
// Fields (max): title, subtitle, images, description, details, badges
import Image from "next/image";
export default function ProductDetailSection({
  eyebrow,
  title,
  body,
  bullets,
  buttonText,
  mainImageUrl,
  gallery,
}: {
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
  buttonText: string;
  mainImageUrl: string;
  gallery: string[];
}) {
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
            <div className="eyebrow">{eyebrow}</div>
            <h1 className="h1">{title}</h1>
            <p className="body-lg">{body}</p>
            <div className="product-detail-list">
              {bullets.map((item, index) => (
                <div key={`${item}-${index}`}>• {item}</div>
              ))}
            </div>
            <button type="button" className="btn">
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
