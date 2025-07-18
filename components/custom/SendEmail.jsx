"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {useHtmlCode} from "@/app/provider";
import { toast } from "sonner";

export default function SendEmail() {
    const [emails, setEmails] = useState("");
    const [subject, setSubject] = useState("");
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const {htmlCode, setHtmlCode} = useHtmlCode();



    const sendEmail = async () => {
        setLoading(true);
        setResponse(null);
        try {
            const emailArray = emails.split(",").map(email => email.trim());
            const res = await fetch(`${window.location.origin}/api/sendEmail`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    emails: emailArray,
                    subject: subject || "No Subject",
                    message: `<div>${htmlCode}</div>`, // Wrap message in a div
                }),
            });

            const data = await res.json();
            if (data.success) {
                toast.success("Email sent successfully!");
            } else {
                toast.error(`Error: ${data.error}`);
            }
            setResponse(data.success ? "Email sent successfully!" : `Error: ${data.error}`);
        } catch (error) {
            setResponse("Failed to send email");
            toast.error("Failed to send email");
        }

        setLoading(false);
    };

    return (
        <div className="flex justify-center items-center">
            <Dialog>
                {/* Trigger Button */}
                <DialogTrigger asChild>
                    <Button>Try Sending Email</Button>
                </DialogTrigger>

                {/* Dialog Content */}
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Send Email</DialogTitle>
                    </DialogHeader>

                    {/* Email Input */}
                    <Input
                        type="text"
                        placeholder="Enter emails (comma-separated)"
                        value={emails}
                        onChange={(e) => setEmails(e.target.value)}
                    />

                    {/* Subject Input */}
                    <Input
                        type="text"
                        placeholder="Enter subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />

                    {/* Response Message */}
                    {response && (
                        <p className={`text-sm ${response.includes("Error") ? "text-red-500" : "text-green-500"}`}>
                            {response}
                        </p>
                    )}

                    <DialogFooter>
                        <Button onClick={sendEmail} disabled={loading}>
                            {loading ? "Sending..." : "Send this Email"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
