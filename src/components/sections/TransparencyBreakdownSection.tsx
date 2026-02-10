// File: src/components/sections/TransparencyBreakdownSection.tsx
// Section: Transparency Breakdown
// Fields (max): title, subtitle, tableRows, leftTotal, rightTotal, leftLabel, rightLabel
export default function TransparencyBreakdownSection({
  eyebrow,
  title,
  body,
  totalLabel,
  cards,
}: {
  eyebrow: string;
  title: string;
  body: string;
  totalLabel: string;
  cards: { label: string; rows: { label: string; value: string }[]; total: string }[];
}) {
  return (
    <section className="section transparency">
      <div className="container">
        <div className="transparency-head">
          <div className="eyebrow">{eyebrow}</div>
          <h2 className="h2">{title}</h2>
          <p className="body-lg">{body}</p>
        </div>
        <div className="transparency-grid">
          {cards.map((card, index) => (
            <div className="transparency-card" key={`${card.label}-${index}`}>
              <div className="transparency-label">{card.label}</div>
              <div className="transparency-rows">
                {card.rows.map((row, rowIndex) => (
                  <div className="transparency-row" key={`${row.label}-${rowIndex}`}>
                    <span>{row.label}</span>
                    <span>{row.value}</span>
                  </div>
                ))}
              </div>
              <div className="transparency-total">
                <span>{totalLabel}</span>
                <span>{card.total}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
