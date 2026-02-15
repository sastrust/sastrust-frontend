// File: src/app/api/contact/route.ts
import { NextResponse } from "next/server";

type ContactPayload = {
  name: string;
  email: string;
  message: string;
  token: string;
  locale?: string;
};

type RecaptchaVerifyResponse = {
  success?: boolean;
  challenge_ts?: string;
  hostname?: string;
  score?: number;
  action?: string;
  "error-codes"?: string[];
};

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const asString = (value: unknown) => (typeof value === "string" ? value : "");

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    const body = (await request.json()) as unknown;
    payload = {
      name: asString(isObject(body) ? body.name : ""),
      email: asString(isObject(body) ? body.email : ""),
      message: asString(isObject(body) ? body.message : ""),
      token: asString(isObject(body) ? body.token : ""),
      locale: asString(isObject(body) ? body.locale : ""),
    };
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_payload" }, { status: 400 });
  }

  if (!payload.name || !payload.email || !payload.message || !payload.token) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }

  const secretKey = process.env.RECAPTCHA_SECRET_KEY ?? "";
  if (!secretKey) {
    return NextResponse.json({ ok: false, error: "recaptcha_not_configured" }, { status: 500 });
  }

  const verifyBody = new URLSearchParams({
    secret: secretKey,
    response: payload.token,
  });

  const verifyResponse = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: verifyBody.toString(),
    cache: "no-store",
  });

  if (!verifyResponse.ok) {
    return NextResponse.json({ ok: false, error: "recaptcha_verify_failed" }, { status: 502 });
  }

  const verifyData = (await verifyResponse.json()) as RecaptchaVerifyResponse;
  if (!verifyData.success) {
    return NextResponse.json({ ok: false, error: "recaptcha_invalid" }, { status: 400 });
  }

  // TODO: Add mail service integration here (Resend/SMTP/etc).
  return NextResponse.json({ ok: true });
}
