// File: src/components/sections/FaqSection.tsx
// Section: FAQ
// Fields (max): title, items[{ question, answer }]
export default function FaqSection({
  eyebrow,
  title,
  items,
}: {
  eyebrow: string;
  title: string;
  items: { question: string; answer: string }[];
}) {
  return (
    <section className="section faq">
      <div className="container">
        <div className="faq-head">
          <div className="eyebrow">{eyebrow}</div>
          <h2 className="h2">{title}</h2>
        </div>
        <div className="faq-list">
          {items.map((item, index) => (
            <div className="faq-item" key={`${item.question}-${index}`}>
              <h3 className="h3">{item.question}</h3>
              <p>{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
