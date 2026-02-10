// File: src/components/sections/SupplyChainSection.tsx
// Section: Supply Chain
// Fields (max): title, subtitle, steps, note
export default function SupplyChainSection({
  eyebrow,
  title,
  body,
  steps,
  note,
}: {
  eyebrow: string;
  title: string;
  body: string;
  steps: { title: string; body: string }[];
  note: string;
}) {
  return (
    <section className="section supply-chain">
      <div className="container">
        <div className="supply-head">
          <div className="eyebrow">{eyebrow}</div>
          <h2 className="h2">{title}</h2>
          <p className="body-lg">{body}</p>
        </div>
        <div className="supply-steps">
          {steps.map((step, index) => (
            <div className="supply-step" key={`${step.title}-${index}`}>
              <div className="step-index">{String(index + 1).padStart(2, "0")}</div>
              <div>
                <h3 className="h3">{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="supply-note">{note}</div>
      </div>
    </section>
  );
}
