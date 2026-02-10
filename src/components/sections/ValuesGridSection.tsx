// File: src/components/sections/ValuesGridSection.tsx
// Section: Values Grid
// Fields (max): title, items[{ title, body, icon, image, imageAlt }]
import Image from "next/image";

export default function ValuesGridSection({
  eyebrow,
  title,
  items,
}: {
  eyebrow: string;
  title: string;
  items: { title: string; body: string; imageUrl: string }[];
}) {
  return (
    <section className="section values-grid">
      <div className="container">
        <div className="values-head">
          <div className="eyebrow">{eyebrow}</div>
          <h2 className="h2">{title}</h2>
        </div>
        <div className="values-cards">
          {items.map((item, index) => (
            <div className="value-card" key={`${item.title}-${index}`}>
              <div className="value-icon">{String(index + 1).padStart(2, "0")}</div>
              <h3 className="h3">{item.title}</h3>
              <p>{item.body}</p>
              <div className="media-frame media-frame-sm">
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
