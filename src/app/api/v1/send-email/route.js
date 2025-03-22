import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { to, subject, text } = await req.json();

    // Validate the request body
    if (!to || !subject || !text) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400,
      });
    }

    // Create a transporter object
    const transporter = nodemailer.createTransport({
      service: "Gmail", // or another email service
      auth: {
        user: process.env.GMAIL_USER, // Your Gmail address
        pass: process.env.GMAIL_PASSWORD, // Your Gmail app password
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to, // Recipient
      subject,
      text, // Email body
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ message: "Email sent successfully", info }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to send email" }), {
      status: 500,
    });
  }
}
