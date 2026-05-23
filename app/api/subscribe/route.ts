import { NextResponse } from "next/server";

interface SubscribePayload {
  email?: string;
}

export async function POST(request: Request) {
  const id = process.env.FORMSPREE_NEWSLETTER_ID;
  if (!id) {
    return NextResponse.json({ error: "Newsletter is not configured." }, { status: 500 });
  }

  let data: SubscribePayload;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { email } = data;
  if (!email) {
    return NextResponse.json({ error: "Email is required." }, { status: 400 });
  }

  try {
    const res = await fetch(`https://formspree.io/f/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ email, _subject: `New newsletter signup — ${email}` }),
    });

    if (res.ok) return NextResponse.json({ ok: true });

    const detail = await res.json().catch(() => ({}));
    return NextResponse.json({ error: "Could not subscribe.", detail }, { status: 502 });
  } catch {
    return NextResponse.json({ error: "Could not reach the mail service." }, { status: 502 });
  }
}
