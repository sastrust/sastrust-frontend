// File: src/components/sections/ValuesThreeSection.tsx
// Section: Values (four columns)
export default function ValuesThreeSection({
  title,
  items,
}: {
  title?: string;
  items: { title: string; subtitle?: string; body: string; accent?: string }[];
}) {
  const accentColors = ["#f04b20", "#5a8f34", "#1ea0dc", "#b52a2a"];

  return (
    <section className="section values-three">
      <div className="container values-three-shell">
        {title ? (
          <div className="values-three-head">
            <h2 className="h2">{title}</h2>
          </div>
        ) : null}

        <div className="values-three-grid">
          {items.map((item, index) => (
            <div className="values-three-card" key={`${item.title}-${index}`}>
              <span
                className="values-three-flag"
                style={{ backgroundColor: accentColors[index] ?? accentColors[0] }}
                aria-hidden="true"
              />
              <div className="values-three-copy">
                <h3 className="values-three-title">
                  <span className="values-three-title-primary">{item.title}</span>
                  <span className="values-three-title-secondary">BEHIND</span>
                </h3>
                <p className="values-three-body">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
