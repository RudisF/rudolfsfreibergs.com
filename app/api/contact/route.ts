import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = "contact@rudolfsfreibergs.com";
const TO = "rudis.freibergs@gmail.com";

const TOPICS = ["Speaking", "Corporate or work", "Sauna or session", "Adventures", "Just say hi"];

const MAX_NAME = 100;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 5000;
const EMAIL_RE = /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/;

// Best-effort per-IP rate limit. In-memory, so it resets on cold starts and
// isn't shared between serverless instances, but it stops casual abuse.
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function singleLine(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

interface ContactPayload {
  topic?: unknown;
  name?: unknown;
  email?: unknown;
  message?: unknown;
  company?: unknown;
}

function notificationHtml(rawTopic: string, rawName: string, rawEmail: string, rawMessage: string) {
  const topic = escapeHtml(rawTopic);
  const name = escapeHtml(rawName);
  const email = escapeHtml(rawEmail);
  const message = escapeHtml(rawMessage);
  const mailto = escapeHtml(encodeURIComponent(rawEmail));
  const replyName = escapeHtml(rawName.split(" ")[0] || rawEmail);
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f3ee;font-family:system-ui,sans-serif;color:#0b0b0d;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f3ee;padding:40px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid rgba(11,11,13,0.12);">
        <!-- Header -->
        <tr>
          <td style="background:#0b0b0d;padding:24px 32px;">
            <p style="margin:0;font-size:13px;letter-spacing:0.12em;text-transform:uppercase;color:#a8a8a3;">rudolfsfreibergs.com</p>
            <h1 style="margin:6px 0 0;font-size:22px;font-weight:500;color:#f4f3ee;">New enquiry</h1>
          </td>
        </tr>
        <!-- Topic badge -->
        <tr>
          <td style="padding:28px 32px 0;">
            <span style="display:inline-block;background:#2f4cff1a;color:#2f4cff;font-size:12px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;padding:4px 12px;border-radius:100px;">${topic}</span>
          </td>
        </tr>
        <!-- Fields -->
        <tr>
          <td style="padding:20px 32px 0;">
            <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#a8a8a3;">From</p>
            <p style="margin:0;font-size:15px;color:#0b0b0d;">${name} &lt;${email}&gt;</p>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 32px 28px;">
            <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#a8a8a3;">Message</p>
            <div style="background:#f4f3ee;border-radius:8px;padding:16px 20px;font-size:15px;line-height:1.7;color:#0b0b0d;white-space:pre-wrap;">${message}</div>
          </td>
        </tr>
        <!-- CTA -->
        <tr>
          <td style="padding:0 32px 32px;">
            <a href="mailto:${mailto}" style="display:inline-block;background:#2f4cff;color:#ffffff;font-size:14px;font-weight:600;padding:12px 24px;border-radius:8px;text-decoration:none;">Reply to ${replyName}</a>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function autoReplyHtml(name: string) {
  const first = escapeHtml(name.split(" ")[0] || "there");
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f3ee;font-family:system-ui,sans-serif;color:#0b0b0d;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f3ee;padding:40px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid rgba(11,11,13,0.12);">
        <!-- Header -->
        <tr>
          <td style="background:#0b0b0d;padding:24px 32px;">
            <p style="margin:0;font-size:13px;letter-spacing:0.12em;text-transform:uppercase;color:#a8a8a3;">rudolfsfreibergs.com</p>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:36px 32px 32px;">
            <h1 style="margin:0 0 16px;font-size:26px;font-weight:500;line-height:1.2;color:#0b0b0d;">Got your message, ${first}.</h1>
            <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#5a5a57;">Thanks for reaching out. I read every message and will get back to you shortly.</p>
            <p style="margin:0;font-size:15px;line-height:1.7;color:#5a5a57;">- Rudolfs</p>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="padding:20px 32px;border-top:1px solid rgba(11,11,13,0.08);">
            <p style="margin:0;font-size:12px;color:#a8a8a3;">You're receiving this because you submitted the contact form at <a href="https://www.rudolfsfreibergs.com" style="color:#a8a8a3;">rudolfsfreibergs.com</a>.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function POST(request: Request) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "Contact form is not configured." }, { status: 500 });
  }

  let data: ContactPayload;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: real visitors never see this field, bots tend to fill it.
  // Pretend success so bots don't learn to skip it.
  if (typeof data.company === "string" && data.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many messages. Please try again later." }, { status: 429 });
  }

  const topic =
    typeof data.topic === "string" && TOPICS.includes(data.topic) ? data.topic : "General";
  const name = typeof data.name === "string" ? singleLine(data.name) : "";
  const email = typeof data.email === "string" ? data.email.trim() : "";
  const message = typeof data.message === "string" ? data.message.trim() : "";

  if (!email || !message) {
    return NextResponse.json({ error: "Email and message are required." }, { status: 400 });
  }

  if (
    name.length > MAX_NAME ||
    email.length > MAX_EMAIL ||
    message.length > MAX_MESSAGE ||
    !EMAIL_RE.test(email)
  ) {
    return NextResponse.json({ error: "Please check your details and try again." }, { status: 400 });
  }

  try {
    const { error } = await resend.batch.send([
      // Notification to Rudolfs
      {
        from: FROM,
        to: TO,
        replyTo: email,
        subject: `New enquiry (${topic}) - ${name || email}`,
        html: notificationHtml(topic, name, email, message),
      },
      // Auto-reply to visitor
      {
        from: FROM,
        to: email,
        replyTo: TO,
        subject: `Got your message${name ? `, ${name.split(" ")[0]}` : ""}.`,
        html: autoReplyHtml(name),
      },
    ]);

    if (error) {
      return NextResponse.json({ error: "Could not send your message." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Could not reach the mail service." }, { status: 502 });
  }
}
