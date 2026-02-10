// File: src/components/sections/ValuesThreeSection.tsx
// Section: Values (three columns)
// Fields (max): title, items[{ title, body }]
export default function ValuesThreeSection({
  title,
  items,
}: {
  title: string;
  items: { title: string; body: string }[];
}) {
  return (
    <section className="section values-three">
      <div className="container">
        <div className="values-three-head">
          <h2 className="h2">{title}</h2>
        </div>
        <div className="values-three-grid">
          {items.map((item, index) => (
            <div className="values-three-card" key={`${item.title}-${index}`}>
              <span className="values-three-icon" aria-hidden="true" />
              <h3 className="h3">{item.title}</h3>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
