// File: src/components/sections/StatementSection.tsx
// Section: Statement
// Fields (max): title, body, highlight
export default function StatementSection({
  eyebrow,
  title,
  body,
  highlight,
}: {
  eyebrow: string;
  title: string;
  body: string;
  highlight: string;
}) {
  return (
    <section className="section statement">
      <div className="container">
        <div className="statement-inner">
          <div className="eyebrow">{eyebrow}</div>
          <h2 className="h2">{title}</h2>
          <p className="body-lg">{body}</p>
          <div className="statement-highlight">{highlight}</div>
        </div>
      </div>
    </section>
  );
}
