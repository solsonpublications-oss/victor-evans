import { NextResponse } from "next/server";

/**
 * Contact form endpoint — placeholder implementation.
 *
 * Validates input and rejects honeypot submissions. Does NOT persist or email
 * anywhere yet — that wiring is the owner's choice (Formspree, Resend, a
 * database, etc.). Replace this handler before launch. See OPEN-ITEMS.
 *
 * No third-party scripts are loaded client-side. The form posts here natively.
 */
export async function POST(req: Request) {
  let body: Record<string, string> = {};
  const contentType = req.headers.get("content-type") || "";

  try {
    if (contentType.includes("application/json")) {
      body = await req.json();
    } else {
      const formData = await req.formData();
      formData.forEach((value, key) => {
        body[key] = String(value);
      });
    }
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid submission." },
      { status: 400 }
    );
  }

  // Honeypot — if filled, silently accept and discard.
  // Real users never see this field; bots fill it.
  if (body.company && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const message = (body.message || "").trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Name, email, and message are required." },
      { status: 422 }
    );
  }

  // Basic email sanity check — not RFC-perfect, just catch typos.
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 422 }
    );
  }

  if (message.length > 5000) {
    return NextResponse.json(
      { ok: false, error: "Message is too long. Please keep it under 5,000 characters." },
      { status: 422 }
    );
  }

  // TODO(owner): wire this to a real delivery mechanism.
  // Options: Resend, Postmark, SendGrid, Formspree, or a database row.
  // For now, log to server so submissions aren't silently lost in dev.
  if (process.env.NODE_ENV !== "production") {
    console.log("[contact] submission:", { name, email, messageLength: message.length });
  }

  return NextResponse.json({
    ok: true,
    message:
      "Thank you. The author will read every message. Replies are not automated.",
  });
}

export async function GET() {
  return NextResponse.json(
    { ok: false, error: "Method not allowed. POST a form submission." },
    { status: 405 }
  );
}
