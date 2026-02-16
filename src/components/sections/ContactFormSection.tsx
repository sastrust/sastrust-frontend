// File: src/components/sections/ContactFormSection.tsx
// Section: Contact Form
// Fields (max): title, subtitle, fields, submitText, recaptchaSiteKey
"use client";

import Script from "next/script";
import { useEffect, useMemo, useRef, useState } from "react";

type RecaptchaRenderOptions = {
  sitekey: string;
  callback: (token: string) => void;
  "expired-callback"?: () => void;
  "error-callback"?: () => void;
};

type Grecaptcha = {
  ready: (callback: () => void) => void;
  render: (container: HTMLElement, options: RecaptchaRenderOptions) => number;
  reset: (widgetId?: number) => void;
};

declare global {
  interface Window {
    grecaptcha?: Grecaptcha;
  }
}

type SubmitStatus = "idle" | "success" | "error";

export default function ContactFormSection({
  locale,
  eyebrow,
  title,
  body,
  fields,
  recaptchaLabel,
  submitText,
  submitSuccessText,
  submitErrorText,
  recaptchaRequiredText,
  recaptchaUnavailableText,
}: {
  locale: string;
  eyebrow: string;
  title: string;
  body: string;
  fields: { name: string; email: string; message: string };
  recaptchaLabel: string;
  submitText: string;
  submitSuccessText: string;
  submitErrorText: string;
  recaptchaRequiredText: string;
  recaptchaUnavailableText: string;
}) {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";
  const hasSiteKey = siteKey.trim().length > 0;

  const recaptchaContainerRef = useRef<HTMLDivElement>(null);
  const recaptchaWidgetIdRef = useRef<number | null>(null);

  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [token, setToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [feedback, setFeedback] = useState("");

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    message: "",
  });

  const missingCaptchaMessage = useMemo(
    () => recaptchaRequiredText || (locale === "tr" ? "reCAPTCHA gerekli." : "reCAPTCHA is required."),
    [locale, recaptchaRequiredText]
  );

  useEffect(() => {
    if (!scriptLoaded || !hasSiteKey || !window.grecaptcha || !recaptchaContainerRef.current) {
      return;
    }

    if (recaptchaWidgetIdRef.current !== null) {
      return;
    }

    window.grecaptcha.ready(() => {
      if (!recaptchaContainerRef.current || !window.grecaptcha) {
        return;
      }

      recaptchaWidgetIdRef.current = window.grecaptcha.render(recaptchaContainerRef.current, {
        sitekey: siteKey,
        callback: (nextToken) => {
          setToken(nextToken);
          setStatus("idle");
          setFeedback("");
        },
        "expired-callback": () => setToken(""),
        "error-callback": () => setToken(""),
      });
    });
  }, [hasSiteKey, scriptLoaded, siteKey]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("idle");
    setFeedback("");

    if (!hasSiteKey) {
      setStatus("error");
      setFeedback(
        recaptchaUnavailableText ||
          (locale === "tr"
            ? "reCAPTCHA yapılandırması eksik."
            : "reCAPTCHA configuration is missing.")
      );
      return;
    }

    if (!token) {
      setStatus("error");
      setFeedback(missingCaptchaMessage);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formValues,
          token,
          locale,
        }),
      });

      if (!response.ok) {
        throw new Error("CONTACT_SUBMIT_FAILED");
      }

      setStatus("success");
      setFeedback(
        submitSuccessText ||
          (locale === "tr"
            ? "Mesajınız alındı."
            : "Your message has been received.")
      );
      setFormValues({
        name: "",
        email: "",
        message: "",
      });
      setToken("");
      if (window.grecaptcha && recaptchaWidgetIdRef.current !== null) {
        window.grecaptcha.reset(recaptchaWidgetIdRef.current);
      }
    } catch {
      setStatus("error");
      setFeedback(
        submitErrorText ||
          (locale === "tr"
            ? "Mesaj gönderilirken bir hata oluştu."
            : "An error occurred while sending your message.")
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section contact-form">
      {hasSiteKey ? (
        <Script
          src="https://www.google.com/recaptcha/api.js?render=explicit"
          strategy="afterInteractive"
          onLoad={() => setScriptLoaded(true)}
        />
      ) : null}

      <div className="container">
        <div className="contact-grid">
          <div className="section-copy">
            <div className="eyebrow">{eyebrow}</div>
            <h2 className="h2">{title}</h2>
            <p className="body-lg">{body}</p>
          </div>
          <form className="contact-panel" onSubmit={handleSubmit}>
            <label>
              {fields.name}
              <input
                type="text"
                name="name"
                required
                value={formValues.name}
                onChange={(event) =>
                  setFormValues((prev) => ({ ...prev, name: event.target.value }))
                }
              />
            </label>
            <label>
              {fields.email}
              <input
                type="email"
                name="email"
                required
                value={formValues.email}
                onChange={(event) =>
                  setFormValues((prev) => ({ ...prev, email: event.target.value }))
                }
              />
            </label>
            <label>
              {fields.message}
              <textarea
                name="message"
                rows={4}
                required
                value={formValues.message}
                onChange={(event) =>
                  setFormValues((prev) => ({ ...prev, message: event.target.value }))
                }
              />
            </label>

            <div className="recaptcha-placeholder">
              <div className="recaptcha-title">{recaptchaLabel}</div>
              {hasSiteKey ? (
                <div ref={recaptchaContainerRef} />
              ) : (
                <div className="recaptcha-note">
                  {recaptchaUnavailableText ||
                    (locale === "tr"
                      ? "reCAPTCHA yapılandırması eksik."
                      : "reCAPTCHA configuration is missing.")}
                </div>
              )}
            </div>

            {feedback ? (
              <p
                className={
                  status === "success"
                    ? "contact-feedback contact-feedback-success"
                    : "contact-feedback contact-feedback-error"
                }
              >
                {feedback}
              </p>
            ) : null}

            <button type="submit" className="btn" disabled={isSubmitting}>
              {isSubmitting
                ? locale === "tr"
                  ? "Gönderiliyor..."
                  : "Sending..."
                : submitText}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
