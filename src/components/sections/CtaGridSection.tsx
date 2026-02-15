// File: src/components/sections/CtaGridSection.tsx
// Section: CTA Grid
// Fields (max): title, items[{ title, image, imageAlt, ctaText, ctaHref }]
import Image from "next/image";

export default function CtaGridSection({
  eyebrow,
  title,
  items,
}: {
  eyebrow: string;
  title: string;
  items: { title: string; ctaText: string; imageUrl: string }[];
}) {
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
              <a className="btn btn-ghost" href="#">
                {item.ctaText}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
