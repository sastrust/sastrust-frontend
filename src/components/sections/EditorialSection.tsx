// File: src/components/sections/EditorialSection.tsx
// Section: Editorial
// Fields (max): eyebrow, title, body, imageUrl, imageAlt, layout, theme
import Image from "next/image";
export default function EditorialSection({
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
    <section className="section editorial">
      <div className="container">
        <div className="editorial-grid">
          <div>
            <div className="eyebrow">{eyebrow}</div>
            <h2 className="h2">{title}</h2>
            <p className="editorial-body">{body}</p>
          </div>
          <div className="editorial-media">
            {/* Replace with Image component when content is wired. */}
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
