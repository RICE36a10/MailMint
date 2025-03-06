import {NextResponse} from "next/server";
import {GenerateEmailTemplateAIModel} from "@/config/AiModel";

export async function POST(req) {
    const {prompt} = await req.json();

    try {
        const result = await GenerateEmailTemplateAIModel.sendMessage(prompt);

        const aiResponse = result.response.text();
        console.log(aiResponse);

        // save to DB

        return NextResponse(aiResponse);
    } catch (e) {
        return NextResponse.json({error: e});
    }


    return NextResponse.json();
}
