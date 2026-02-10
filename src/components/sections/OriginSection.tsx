// File: src/components/sections/OriginSection.tsx
// Section: Origin (full-width narrative)
// Fields (max): body
export default function OriginSection({ body }: { body: string }) {
  return (
    <section className="section origin-full">
      <div className="container">
        <p className="origin-full-text">{body}</p>
      </div>
    </section>
  );
}
