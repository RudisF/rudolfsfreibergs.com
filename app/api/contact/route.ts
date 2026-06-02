import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = "contact@rudolfsfreibergs.com";
const TO = "rudis.freibergs@gmail.com";

interface ContactPayload {
  topic?: string;
  name?: string;
  email?: string;
  message?: string;
}

function notificationHtml(topic: string, name: string, email: string, message: string) {
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
            <a href="mailto:${email}" style="display:inline-block;background:#2f4cff;color:#ffffff;font-size:14px;font-weight:600;padding:12px 24px;border-radius:8px;text-decoration:none;">Reply to ${name.split(" ")[0] || email}</a>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function autoReplyHtml(name: string) {
  const first = name.split(" ")[0] || "there";
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

  const { topic = "General", name = "", email = "", message = "" } = data;

  if (!email || !message) {
    return NextResponse.json({ error: "Email and message are required." }, { status: 400 });
  }

  try {
    const { error } = await resend.batch.send([
      // Notification to Rudolfs
      {
        from: FROM,
        to: TO,
        replyTo: email,
        subject: `New enquiry (${topic}) — ${name || email}`,
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
