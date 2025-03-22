import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    // Parse the incoming JSON data
    const emailData = await req.json();
    console.log("Incoming emailData:", emailData);
    console.log("process.env.GMAIL_USER", process.env.GMAIL_USER);

    // Set CORS headers to allow requests from your frontend
    const responseHeaders = new Headers();
    responseHeaders.set("Access-Control-Allow-Origin", "*"); // Allows all origins (or replace with your domain)
    responseHeaders.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    responseHeaders.set("Access-Control-Allow-Headers", "Content-Type");

    // Check for the preflight OPTIONS request
    if (req.method === "OPTIONS") {
      return new Response(null, {
        status: 200,
        headers: responseHeaders,
      });
    }

    // Validate the incoming email data
    if (
      !emailData.firstName ||
      !emailData.lastName ||
      !emailData.email ||
      !emailData.phone ||
      !emailData.services ||
      !emailData.text
    ) {
      console.error("Validation error: Missing required fields.");
      return new Response(
        JSON.stringify({ error: "All fields are required." }),
        { status: 400, headers: responseHeaders }
      );
    }

    // Create the transporter for sending emails using Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    // Prepare the email options
    const mailOptions = {
      from: emailData.email,
      to: process.env.GMAIL_USER, // Your Gmail address
      subject: "New Contact Form Submission",
      html: `
        <h3>New Message from ${emailData.firstName} ${emailData.lastName}</h3>
        <p><strong>Email:</strong> ${emailData.email}</p>
        <p><strong>Phone:</strong> ${emailData.phone}</p>
        <p><strong>Services Selected:</strong> ${
          emailData.services?.join(", ") || "None"
        }</p>
        <p><strong>Message:</strong></p>
        <p>${emailData.text}</p>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");

    return new Response(
      JSON.stringify({ message: "Email sent successfully!" }),
      { status: 200, headers: responseHeaders }
    );
  } catch (error) {
    console.error(
      "Error handling request:=====================================",
      error
    );
    return new Response(JSON.stringify({ error: "Failed to send email" }), {
      status: 500,
      headers: responseHeaders,
    });
  }
}
