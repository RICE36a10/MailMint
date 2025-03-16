import nodemailer from "nodemailer";

export async function POST(req) {
    try {
        const { emails, subject, message } = await req.json();

        if (!emails || !Array.isArray(emails) || emails.length === 0) {
            return Response.json({ success: false, error: "Invalid email list" }, { status: 400 });
        }

        // Check if env variables are loaded
        const user = process.env.EMAIL_USER;
        const pass = process.env.EMAIL_PASS;

        if (!user || !pass) {
            return Response.json({ success: false, error: "Missing email credentials" }, { status: 500 });
        }

        // Configure transporter
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: { user, pass },
        });

        let mailOptions = {
            from: user,
            to: emails.join(","), // Send to multiple users
            subject: subject,
            text: message,
        };

        let info = await transporter.sendMail(mailOptions);

        return Response.json({ success: true, info });
    } catch (error) {
        return Response.json({ success: false, error: error.message }, { status: 500 });
    }
}
