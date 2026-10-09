import { NextResponse } from "next/server";
import { escapeHtml, isEmail, sendMail } from "@/app/backend/utils/mailer";

// Contact page form → the shop's own inbox (GMAIL_USER). The visitor's address goes in replyTo
// (Gmail rewrites any foreign "from"), so the shop can just hit Reply.
export async function POST(req) {
  try {
    const emailData = await req.json();
    const { firstName, lastName, email, phone, services, text } = emailData || {};
    if (!firstName || !lastName || !isEmail(email) || !phone || !text) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }
    const serviceList = Array.isArray(services) && services.length ? services.join(", ") : "None";

    await sendMail({
      to: process.env.GMAIL_USER,
      replyTo: email.trim(),
      subject: `New Contact Form Submission — ${firstName} ${lastName}`.slice(0, 150),
      html: `
        <h3>New Message from ${escapeHtml(firstName)} ${escapeHtml(lastName)}</h3>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Services Selected:</strong> ${escapeHtml(serviceList)}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space:pre-wrap">${escapeHtml(text)}</p>
      `,
    });

    return NextResponse.json({ message: "Email sent successfully!" }, { status: 200 });
  } catch (error) {
    console.error("[mail] contact form failed:", error?.code || error?.message || error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
