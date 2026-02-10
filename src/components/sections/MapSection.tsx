// File: src/components/sections/MapSection.tsx
// Section: Map
// Fields (max): title, address, mapEmbedUrl
export default function MapSection({
  eyebrow,
  title,
  body,
  mapLabel,
}: {
  eyebrow: string;
  title: string;
  body: string;
  mapLabel: string;
}) {
  return (
    <section className="section map">
      <div className="container">
        <div className="map-grid">
          <div>
            <div className="eyebrow">{eyebrow}</div>
            <h2 className="h2">{title}</h2>
            <p className="body-lg">{body}</p>
          </div>
          <div className="map-frame">{mapLabel}</div>
        </div>
      </div>
    </section>
  );
}
