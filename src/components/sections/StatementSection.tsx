// File: src/components/sections/StatementSection.tsx
// Section: Statement
// Fields (max): title, body, highlight
import Image from "next/image";

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
      <div className="statement-layout">
        <div className="statement-copy-wrap">
          <div className="statement-inner section-copy">
            <div className="eyebrow statement-eyebrow">{eyebrow}</div>
            <h2 className="statement-title">{title}</h2>
            <p className="statement-body">{body}</p>

            <div className="statement-footer">
              <div className="statement-highlight" lang="en">
                {highlight}
              </div>
              <span className="statement-rule" aria-hidden="true" />
            </div>

            <Image
              src="/components/editorial/statement-seal.png"
              alt="Sastrust seal"
              width={170}
              height={170}
              className="statement-seal"
            />
          </div>
        </div>

        <div className="statement-visual" aria-hidden="true">
          <Image
            src="/components/editorial/statement-chain.png"
            alt=""
            fill
            sizes="40vw"
            className="statement-visual-image"
          />
        </div>
      </div>
    </section>
  );
}
