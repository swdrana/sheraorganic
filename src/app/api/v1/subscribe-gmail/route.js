import { NextResponse } from "next/server";
import { escapeHtml, isEmail, sendMail } from "@/app/backend/utils/mailer";

// Footer newsletter signup → notifies the shop's own inbox (GMAIL_USER).
export async function POST(req) {
  try {
    const { sender, message } = (await req.json()) || {};
    if (!isEmail(sender) || !message) {
      return NextResponse.json({ error: "Sender and message fields are required." }, { status: 400 });
    }

    await sendMail({
      to: process.env.GMAIL_USER,
      replyTo: sender.trim(),
      subject: "New newsletter subscription",
      html: `
        <p><strong>From:</strong> ${escapeHtml(sender)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message)}</p>
      `,
    });

    return NextResponse.json({ message: "Email sent successfully!" }, { status: 200 });
  } catch (error) {
    console.error("[mail] subscribe failed:", error?.code || error?.message || error);
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }
}
