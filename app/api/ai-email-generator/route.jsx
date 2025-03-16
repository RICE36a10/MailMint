import {NextResponse} from "next/server";
import {GenerateEmailTemplateAIModel} from "@/config/AiModel";

export async function POST(req) {
    const {prompt} = await req.json();
    try {
        const result = await GenerateEmailTemplateAIModel.sendMessage(prompt);

        const aiResponsetext = result.response.text();
        console.log(aiResponsetext);

        let jsonResponse;
        try {
            jsonResponse = JSON.parse(aiResponsetext);
        } catch (parseError) {
            throw new Error(`Invalid JSON response: ${aiResponsetext}`);
        }

        // save to DB
        return new Response(JSON.stringify(jsonResponse), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (e) {
        console.error("API Error:", e.message, e.stack);
        return new Response(
            JSON.stringify({
                error: e.message || "Failed to generate email template",
            }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
