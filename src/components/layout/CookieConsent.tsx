// File: src/components/layout/CookieConsent.tsx
"use client";

import { useEffect, useState } from "react";

const CONSENT_KEY = "cookie_consent";

type ConsentValue = "accepted" | "declined" | null;

export default function CookieConsent() {
  const [consent, setConsent] = useState<ConsentValue>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem(CONSENT_KEY);
    if (stored === "accepted" || stored === "declined") {
      setConsent(stored);
    }
  }, []);

  const handleChoice = (value: Exclude<ConsentValue, null>) => {
    window.localStorage.setItem(CONSENT_KEY, value);
    setConsent(value);
  };

  if (consent) {
    return null;
  }

  return (
    <div role="dialog" aria-live="polite" aria-label="Cookie consent">
      {/*
        Cookie Consent (best practice):
        - Essential cookies always on.
        - Analytics/marketing only after accept.
        - Decline keeps site fully usable.
      */}
      <div>
        <p>
          Zorunlu çerezler her zaman aktiftir. Analitik ve pazarlama çerezleri
          yalnızca izin verdiğinizde çalışır.
        </p>
        <div>
          <button type="button" onClick={() => handleChoice("accepted")}>Accept</button>
          <button type="button" onClick={() => handleChoice("declined")}>Decline</button>
        </div>
      </div>
    </div>
  );
}
