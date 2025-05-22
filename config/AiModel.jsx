const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is not set");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash", // Consider using flash for better free-tier limits
    safetySettings: [
        {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
    ],
});

const generationConfig = {
    temperature: 0.7, // Lower temperature for more consistent email templates
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 4096, // Reduced to stay within free tier limits
    responseMimeType: "application/json",
};

export const GenerateEmailTemplateAIModel = model.startChat({
    generationConfig,
    history: [],
});

// Usage with error handling
export async function generateEmailTemplate(prompt) {
    try {
        const result = await GenerateEmailTemplateAIModel.sendMessage(prompt);
        return result.response.text();
    } catch (error) {
        if (error.message.includes('429')) {
            throw new Error('Rate limit exceeded. Please try again later.');
        } else if (error.message.includes('quota')) {
            throw new Error('API quota exceeded. Consider upgrading your plan.');
        }
        throw error;
    }
}
