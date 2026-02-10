// File: src/components/sections/ImageGallerySection.tsx
// Section: Image Gallery
// Fields (max): title, images[{ src, alt, caption }]
import Image from "next/image";

export default function ImageGallerySection({
  eyebrow,
  title,
  items,
}: {
  eyebrow: string;
  title: string;
  items: { imageUrl: string }[];
}) {
  return (
    <section className="section gallery">
      <div className="container">
        <div className="gallery-head">
          <div className="eyebrow">{eyebrow}</div>
          <h2 className="h2">{title}</h2>
        </div>
        <div className="gallery-grid">
          {items.map((item, index) => (
            <div className="media-frame gallery-item" key={`${item.imageUrl}-${index}`}>
              {item.imageUrl ? (
                <Image
                  src={item.imageUrl}
                  alt={`${title} ${index + 1}`}
                  fill
                  sizes="(max-width: 900px) 50vw, 25vw"
                  className="media-img"
                />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
