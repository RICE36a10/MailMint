import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { emails, subject, message } = await req.json();

        if (!emails || !Array.isArray(emails) || emails.length === 0) {
            return NextResponse.json({ success: false, error: "Invalid email list" }, { status: 400 });
        }

        // Check if env variables are loaded
        const user = process.env.EMAIL_USER;
        const pass = process.env.EMAIL_PASS;

        if (!user || !pass) {
            console.error("Missing EMAIL_USER or EMAIL_PASS in environment variables.");
            return NextResponse.json({ success: false, error: "Missing email credentials" }, { status: 500 });
        }

        // Configure transporter
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: { user, pass },
        });

        let mailOptions = {
            from: `"My App" <${user}>`, // Custom sender name
            to: emails.join(","), // Send to multiple recipients
            subject: subject || "No Subject",
            text: "Your email client does not support HTML.",
            html: message, // HTML email content
        };

        let info = await transporter.sendMail(mailOptions);

        console.log("Email sent:", info.messageId);

        return NextResponse.json({ success: true, info });
    } catch (error) {
        console.error("Email sending error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
