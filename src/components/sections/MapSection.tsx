// File: src/components/sections/MapSection.tsx
// Section: Map
// Fields (max): title, address, mapEmbedUrl
export default function MapSection({
  eyebrow,
  title,
  body,
  mapLabel,
  mapUrl,
  mapEmbedUrl,
}: {
  eyebrow: string;
  title: string;
  body: string;
  mapLabel: string;
  mapUrl: string;
  mapEmbedUrl?: string;
}) {
  // If embed URL is not provided, build a generic Google Maps embed query from mapUrl.
  const iframeSrc =
    mapEmbedUrl && mapEmbedUrl.trim().length > 0
      ? mapEmbedUrl
      : `https://maps.google.com/maps?q=${encodeURIComponent(mapUrl)}&output=embed`;

  return (
    <section className="section map">
      <div className="container">
        <div className="map-grid">
          <div>
            <div className="eyebrow">{eyebrow}</div>
            <h2 className="h2">{title}</h2>
            <p className="body-lg">{body}</p>
          </div>
          <div className="map-frame">
            <iframe
              src={iframeSrc}
              title={mapLabel}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="map-embed"
            />
            <div className="map-actions">
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="map-link"
              >
                {mapLabel}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
