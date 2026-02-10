// File: src/components/sections/SustainabilityPillarsSection.tsx
// Section: Sustainability Pillars
// Fields (max): title, items[{ title, body, image, imageAlt }]
import Image from "next/image";

export default function SustainabilityPillarsSection({
  eyebrow,
  title,
  items,
}: {
  eyebrow: string;
  title: string;
  items: { title: string; body: string; imageUrl: string }[];
}) {
  return (
    <section className="section pillars">
      <div className="container">
        <div className="pillars-head">
          <div className="eyebrow">{eyebrow}</div>
          <h2 className="h2">{title}</h2>
        </div>
        <div className="pillars-grid">
          {items.map((item, index) => (
            <div className="pillar-card" key={`${item.title}-${index}`}>
              <div className="media-frame">
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    sizes="(max-width: 900px) 100vw, 30vw"
                    className="media-img"
                  />
                ) : null}
              </div>
              <h3 className="h3">{item.title}</h3>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
