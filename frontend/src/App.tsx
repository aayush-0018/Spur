import React, { useState, useEffect } from 'react';
import { ChatMessage, chatAPI } from './api/chatAPI';
import { ChatWindow } from './components/ChatWindow';
import './App.css';

function App() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [conversationId, setConversationId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Load conversation from URL or localStorage
    useEffect(() => {
        const savedConversationId = localStorage.getItem('conversationId');
        if (savedConversationId) {
            setConversationId(savedConversationId);
            loadConversation(savedConversationId);
        }
    }, []);

    const loadConversation = async (convId: string) => {
        try {
            const conversation = await chatAPI.getConversation(convId);
            setMessages(conversation.messages);
            setError(null);
        } catch (err) {
            console.error('Failed to load conversation:', err);
            setError('Failed to load conversation history');
        }
    };

    const handleSendMessage = async (message: string) => {
        if (!message.trim()) return;

        // Add user message to UI immediately
        const userMessage: ChatMessage = {
            id: `temp-user-${Date.now()}`,
            sender: 'user',
            content: message,
            timestamp: new Date().toISOString(),
        };

        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setIsLoading(true);
        setError(null);

        try {
            const response = await chatAPI.sendMessage(message, conversationId || undefined);

            // Save conversation ID
            if (!conversationId) {
                const newConvId = response.conversationId;
                setConversationId(newConvId);
                localStorage.setItem('conversationId', newConvId);
            }

            // Update user message with real ID and add AI response
            setMessages((prevMessages) => {
                const updatedMessages = prevMessages.map((msg) =>
                    msg.id.startsWith('temp-user-')
                        ? { ...msg, id: response.userMessage.id }
                        : msg
                );
                return [...updatedMessages, response.aiMessage];
            });
            setError(null);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An error occurred';
            setError(errorMessage);
            // Remove the temporary user message on error
            setMessages((prevMessages) =>
                prevMessages.filter((msg) => !msg.id.startsWith('temp-user-'))
            );
            console.error('Error sending message:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleNewChat = () => {
        setMessages([]);
        setConversationId(null);
        localStorage.removeItem('conversationId');
        setError(null);
    };

    return (
        <div className="app">
            {error && (
                <div className="error-banner">
                    <span>⚠️ {error}</span>
                    <button onClick={() => setError(null)}>✕</button>
                </div>
            )}
            <ChatWindow
                messages={messages}
                isLoading={isLoading}
                onSendMessage={handleSendMessage}
                onNewChat={handleNewChat}
                hasMessages={messages.length > 0}
            />
        </div>
    );
}

export default App;
