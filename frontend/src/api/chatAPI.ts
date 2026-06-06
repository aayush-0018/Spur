import axios, { AxiosError } from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export interface ChatMessage {
    id: string;
    content: string;
    sender: 'user' | 'ai';
    timestamp: string;
}

export interface ConversationResponse {
    conversationId: string;
    userMessage: ChatMessage;
    aiMessage: ChatMessage;
}

export interface ConversationData {
    id: string;
    createdAt: string;
    updatedAt: string;
    messages: ChatMessage[];
}

interface ErrorResponse {
    error: {
        message: string;
        statusCode: number;
    };
}

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const chatAPI = {
    /**
     * Send a message and get AI response
     */
    async sendMessage(
        message: string,
        conversationId?: string
    ): Promise<ConversationResponse> {
        try {
            const response = await api.post<ConversationResponse>('/api/chat/message', {
                message,
                conversationId,
            });
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            const errorMessage =
                axiosError?.response?.data?.error?.message ||
                'Failed to send message. Please try again.';
            throw new Error(errorMessage);
        }
    },

    /**
     * Get full conversation with all messages
     */
    async getConversation(conversationId: string): Promise<ConversationData> {
        try {
            const response = await api.get<ConversationData>(
                `/api/conversations/${conversationId}`
            );
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            const errorMessage =
                axiosError?.response?.data?.error?.message ||
                'Failed to load conversation. Please try again.';
            throw new Error(errorMessage);
        }
    },

    /**
     * Get only messages from a conversation
     */
    async getMessages(conversationId: string): Promise<{ conversationId: string; messages: ChatMessage[] }> {
        try {
            const response = await api.get<{ conversationId: string; messages: ChatMessage[] }>(
                `/api/conversations/${conversationId}/messages`
            );
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            const errorMessage =
                axiosError?.response?.data?.error?.message ||
                'Failed to load messages. Please try again.';
            throw new Error(errorMessage);
        }
    },
};
