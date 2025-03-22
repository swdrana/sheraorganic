import nodemailer from "nodemailer";

export async function POST(req) {
  const responseHeaders = new Headers();
  responseHeaders.set("Access-Control-Allow-Origin", "*"); // Update this to your specific domain for production
  responseHeaders.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  responseHeaders.set("Access-Control-Allow-Headers", "Content-Type");

  try {
    // Check for the preflight OPTIONS request
    if (req.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: responseHeaders });
    }

    // Parse the incoming JSON data
    const emailData = await req.json();
    console.log("Incoming emailData:", emailData);

    // Validate the incoming email data
    const { sender, message } = emailData; // Adjust the expected fields
    if (!sender || !message) {
      console.error("Validation error: Missing required fields.");
      return new Response(
        JSON.stringify({ error: "Sender and message fields are required." }),
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
      from: sender,
      to: process.env.GMAIL_USER, // Your Gmail address
      subject: "New Subscrition gamil",
      html: `
        <p><strong>From:</strong> ${sender}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
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
    console.error("Error handling request:", error);
    return new Response(JSON.stringify({ error: "Failed to send email." }), {
      status: 500,
      headers: responseHeaders,
    });
  }
}
