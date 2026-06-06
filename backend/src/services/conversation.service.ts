import { prisma } from "../lib/prisma";
import { AppError } from "../middleware/errorHandler";

export interface ChatMessage {
    id: string;
    content: string;
    sender: "user" | "ai";
    timestamp: Date;
}

export interface Conversation {
    id: string;
    messages: ChatMessage[];
    createdAt: Date;
    updatedAt: Date;
}

/**
 * Get or create a conversation
 */
export async function getOrCreateConversation(
    conversationId?: string
): Promise<string> {
    if (conversationId) {
        // Verify conversation exists
        const conversation = await prisma.conversation.findUnique({
            where: { id: conversationId },
        });

        if (!conversation) {
            throw new AppError("Conversation not found", 404);
        }

        return conversationId;
    }

    // Create new conversation
    const newConversation = await prisma.conversation.create({
        data: {},
    });

    return newConversation.id;
}

/**
 * Add message to conversation
 */
export async function addMessage(
    conversationId: string,
    sender: "user" | "ai",
    content: string
): Promise<ChatMessage> {
    const message = await prisma.message.create({
        data: {
            conversationId,
            sender,
            content,
        },
    });

    return {
        id: message.id,
        content: message.content,
        sender: message.sender as "user" | "ai",
        timestamp: message.createdAt,
    };
}

/**
 * Get conversation history
 */
export async function getConversationMessages(
    conversationId: string
): Promise<ChatMessage[]> {
    const messages = await prisma.message.findMany({
        where: { conversationId },
        orderBy: { createdAt: "asc" },
    });

    return messages.map((msg) => ({
        id: msg.id,
        content: msg.content,
        sender: msg.sender as "user" | "ai",
        timestamp: msg.createdAt,
    }));
}

/**
 * Get full conversation with metadata
 */
export async function getConversation(
    conversationId: string
): Promise<Conversation> {
    const conversation = await prisma.conversation.findUnique({
        where: { id: conversationId },
        include: {
            messages: {
                orderBy: { createdAt: "asc" },
            },
        },
    });

    if (!conversation) {
        throw new AppError("Conversation not found", 404);
    }

    return {
        id: conversation.id,
        createdAt: conversation.createdAt,
        updatedAt: conversation.updatedAt,
        messages: conversation.messages.map((msg) => ({
            id: msg.id,
            content: msg.content,
            sender: msg.sender as "user" | "ai",
            timestamp: msg.createdAt,
        })),
    };
}

/**
 * Validate message input
 */
export function validateMessageInput(message: string): void {
    if (!message || typeof message !== "string") {
        throw new AppError("Message is required", 400);
    }

    const trimmed = message.trim();
    if (trimmed.length === 0) {
        throw new AppError("Message cannot be empty", 400);
    }

    if (trimmed.length > 5000) {
        throw new AppError("Message is too long (max 5000 characters)", 400);
    }
}
