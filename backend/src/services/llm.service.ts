import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from "../lib/prisma";
import { AppError } from "../middleware/errorHandler";

if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY environment variable is required");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

interface ConversationMessage {
    role: "user" | "model";
    parts: Array<{ text: string }>;
}

const SYSTEM_PROMPT = `You are a helpful and friendly customer support agent for a small e-commerce store called "TechHub Store".

Your role is to provide accurate, concise, and helpful answers to customer questions.

Store Information:
- Shipping Policy: We offer FREE shipping on orders over $50 to USA and Canada. Standard shipping takes 5-7 business days, Express shipping takes 2-3 business days.
- Return Policy: We offer a 30-day money-back guarantee on all products. Items must be in original condition with all packaging intact.
- Support Hours: Monday to Friday, 9 AM to 6 PM EST. Weekend support available for urgent issues.
- Contact: support@techhubstore.com

Guidelines:
1. Always be polite and professional
2. Provide specific information when available
3. If you don't know something, offer to escalate to a human agent
4. Keep responses concise
5. Use a warm and supportive tone`;

async function getConversationHistory(
    conversationId: string
): Promise<ConversationMessage[]> {
    const messages = await prisma.message.findMany({
        where: { conversationId },
        orderBy: { createdAt: "asc" },
    });

    return messages.map(
        (msg: { sender: string; content: string }): ConversationMessage => ({
            role: msg.sender === "user" ? "user" : "model",
            parts: [{ text: msg.content }],
        })
    );
}

export async function generateReply(
    userMessage: string,
    conversationId: string
): Promise<string> {
    try {
        const history = await getConversationHistory(conversationId);

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const chat = model.startChat({
            history,
            generationConfig: {
                maxOutputTokens: 500,
                temperature: 0.7,
            },
        });

        const contextualMessage = `${SYSTEM_PROMPT}\n\nUser message: ${userMessage}`;

        const result = await chat.sendMessage(contextualMessage);
        const response = result.response;
        const text = response.text();

        if (!text) {
            throw new Error("Empty response from Gemini API");
        }

        return text;
    } catch (error) {
        console.error("LLM ERROR:", error);

        if (error instanceof AppError) {
            throw error;
        }

        if (error instanceof Error) {
            if (error.message.includes("API_KEY") || error.message.includes("401")) {
                throw new AppError(
                    "LLM service configuration error. Please check your Gemini API key.",
                    503
                );
            }
            if (error.message.includes("rate limit") || error.message.includes("429")) {
                throw new AppError(
                    "Service is temporarily overloaded. Please try again in a moment.",
                    429
                );
            }
        }

        throw new AppError(
            error instanceof Error
                ? error.message
                : "Failed to generate AI response",
            500
        );
    }
}