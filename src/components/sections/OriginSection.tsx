// File: src/components/sections/OriginSection.tsx
// Section: Origin (full-width narrative)
// Fields (max): title, body
export default function OriginSection({
  title,
  body,
}: {
  title?: string;
  body: string;
}) {
  return (
    <section className="section origin-full">
      <div className="container">
        <h2 className="origin-full-title">{title ?? "BEHIND THE SEEN"}</h2>
        <p className="origin-full-text">{body}</p>
      </div>
    </section>
  );
}
