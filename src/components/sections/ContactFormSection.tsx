// File: src/components/sections/ContactFormSection.tsx
// Section: Contact Form
// Fields (max): title, subtitle, fields, submitText, recaptchaSiteKey
export default function ContactFormSection({
  eyebrow,
  title,
  body,
  fields,
  recaptchaLabel,
  submitText,
}: {
  eyebrow: string;
  title: string;
  body: string;
  fields: { name: string; email: string; message: string };
  recaptchaLabel: string;
  submitText: string;
}) {
  return (
    <section className="section contact-form">
      <div className="container">
        <div className="contact-grid">
          <div>
            <div className="eyebrow">{eyebrow}</div>
            <h2 className="h2">{title}</h2>
            <p className="body-lg">{body}</p>
          </div>
          <form className="contact-panel">
            <label>
              {fields.name}
              <input type="text" name="name" />
            </label>
            <label>
              {fields.email}
              <input type="email" name="email" />
            </label>
            <label>
              {fields.message}
              <textarea name="message" rows={4} />
            </label>
            <div className="recaptcha-placeholder">{recaptchaLabel}</div>
            <button type="submit" className="btn">
              {submitText}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
