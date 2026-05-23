import { NextResponse } from "next/server";

interface ContactPayload {
  topic?: string;
  name?: string;
  email?: string;
  message?: string;
}

export async function POST(request: Request) {
  const id = process.env.FORMSPREE_CONTACT_ID;
  if (!id) {
    return NextResponse.json({ error: "Contact form is not configured." }, { status: 500 });
  }

  let data: ContactPayload;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { topic, name, email, message } = data;
  if (!email || !message) {
    return NextResponse.json({ error: "Email and message are required." }, { status: 400 });
  }

  try {
    const res = await fetch(`https://formspree.io/f/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        topic: topic ?? "General",
        name: name ?? "",
        email,
        message,
        _subject: `New enquiry (${topic ?? "General"}) — ${name || email}`,
      }),
    });

    if (res.ok) return NextResponse.json({ ok: true });

    // Formspree returned a 4xx/5xx — surface a server-side failure to the form.
    const detail = await res.json().catch(() => ({}));
    return NextResponse.json({ error: "Could not send your message.", detail }, { status: 502 });
  } catch {
    return NextResponse.json({ error: "Could not reach the mail service." }, { status: 502 });
  }
}
