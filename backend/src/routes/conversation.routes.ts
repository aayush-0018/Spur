import { Router, Request, Response, NextFunction } from "express";
import { getConversation, getConversationMessages } from "../services/conversation.service";
import { AppError } from "../middleware/errorHandler";

const router: Router = Router();

/**
 * GET /api/conversations/:conversationId
 * Get full conversation with all messages
 */
router.get("/:conversationId", async (req: Request, res: Response) => {
    try {
        const { conversationId } = req.params;

        if (!conversationId) {
            throw new AppError("Conversation ID is required", 400);
        }

        const conversation = await getConversation(conversationId);

        res.status(200).json(conversation);
    } catch (error) {
        throw error;
    }
});

/**
 * GET /api/conversations/:conversationId/messages
 * Get only messages from a conversation
 */
router.get("/:conversationId/messages", async (req: Request, res: Response) => {
    try {
        const { conversationId } = req.params;

        if (!conversationId) {
            throw new AppError("Conversation ID is required", 400);
        }

        const messages = await getConversationMessages(conversationId);

        res.status(200).json({
            conversationId,
            messages,
        });
    } catch (error) {
        throw error;
    }
});

export default router;
