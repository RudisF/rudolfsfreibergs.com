import { NextResponse } from "next/server";

export async function POST() {
  // TODO: wire to Formspree using process.env.FORMSPREE_NEWSLETTER_ID
  return NextResponse.json({ ok: true }, { status: 200 });
}
