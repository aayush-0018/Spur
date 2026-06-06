import { Router, Request, Response, NextFunction } from "express";
import { z } from "zod";
import {
    validateMessageInput,
    addMessage,
    getOrCreateConversation,
} from "../services/conversation.service";
import { generateReply } from "../services/llm.service";
import { AppError } from "../middleware/errorHandler";

const router: Router = Router();

// Schema validation
const ChatMessageSchema = z.object({
    message: z.string().min(1).max(5000),
    conversationId: z.string().optional(),
});

/**
 * POST /api/chat/message
 * Send a message and get AI response
 */
router.post("/message", async (req: Request, res: Response) => {
    try {
        const { message, conversationId } = ChatMessageSchema.parse(req.body);

        // Validate input
        validateMessageInput(message);

        // Get or create conversation
        const convId = await getOrCreateConversation(conversationId);

        // Save user message
        const userMsg = await addMessage(convId, "user", message.trim());

        // Generate AI response
        const aiReply = await generateReply(message.trim(), convId);

        // Save AI message
        const aiMsg = await addMessage(convId, "ai", aiReply);

        res.status(200).json({
            conversationId: convId,
            userMessage: userMsg,
            aiMessage: aiMsg,
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            throw new AppError("Invalid request format", 400);
        }
        throw error;
    }
});

export default router;
