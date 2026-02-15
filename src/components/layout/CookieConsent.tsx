// File: src/components/layout/CookieConsent.tsx
"use client";

import { useEffect, useState } from "react";

const CONSENT_KEY = "cookie_consent";

type ConsentValue = "accepted" | "declined" | null;

export default function CookieConsent({
  ariaLabel,
  body,
  acceptText,
  declineText,
}: {
  ariaLabel: string;
  body: string;
  acceptText: string;
  declineText: string;
}) {
  const [isReady, setIsReady] = useState(false);
  const [consent, setConsent] = useState<ConsentValue>(null);

  // Keep first server/client render identical; read storage right after hydration.
  useEffect(() => {
    const rafId = window.requestAnimationFrame(() => {
      const stored = window.localStorage.getItem(CONSENT_KEY);
      if (stored === "accepted" || stored === "declined") {
        setConsent(stored);
      }
      setIsReady(true);
    });

    return () => window.cancelAnimationFrame(rafId);
  }, []);

  const handleChoice = (value: Exclude<ConsentValue, null>) => {
    try {
      window.localStorage.setItem(CONSENT_KEY, value);
    } catch {
      // Ignore storage access errors and still close the banner.
    }
    setConsent(value);
  };

  if (consent) {
    return null;
  }

  if (!isReady) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-live="polite"
      aria-label={ariaLabel}
      className="cookie-consent"
    >
      {/*
        Cookie Consent (best practice):
        - Essential cookies always on.
        - Analytics/marketing only after accept.
        - Decline keeps site fully usable.
      */}
      <div className="cookie-consent__inner">
        <p className="cookie-consent__text">{body}</p>
        <div className="cookie-consent__actions">
          <button
            type="button"
            className="btn cookie-consent__btn"
            onClick={() => handleChoice("accepted")}
          >
            {acceptText}
          </button>
          <button
            type="button"
            className="btn btn-ghost cookie-consent__btn"
            onClick={() => handleChoice("declined")}
          >
            {declineText}
          </button>
        </div>
      </div>
    </div>
  );
}
