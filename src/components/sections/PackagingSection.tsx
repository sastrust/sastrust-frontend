// File: src/components/sections/PackagingSection.tsx
// Section: Packaging
// Fields (max): title, body, image, imageAlt
import Image from "next/image";

export default function PackagingSection({
  eyebrow,
  title,
  body,
  imageUrl,
}: {
  eyebrow: string;
  title: string;
  body: string;
  imageUrl: string;
}) {
  return (
    <section className="section packaging">
      <div className="container">
        <div className="packaging-grid">
          <div className="section-copy">
            <div className="eyebrow">{eyebrow}</div>
            <h2 className="h2">{title}</h2>
            <p className="body-lg">{body}</p>
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
