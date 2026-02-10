// File: src/components/sections/ValuesIntroSection.tsx
// Section: Values Intro
// Fields (max): eyebrow, title, body
export default function ValuesIntroSection({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <section className="section values-intro">
      <div className="container">
        <div className="values-intro-inner">
          <div className="eyebrow">{eyebrow}</div>
          <h2 className="h2">{title}</h2>
          <p className="body-lg">{body}</p>
        </div>
      </div>
    </section>
  );
}
