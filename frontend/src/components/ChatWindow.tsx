import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../api/chatAPI';
import './ChatWindow.css';
import { ChatMessageComponent } from './ChatMessage';

interface ChatWindowProps {
    messages: ChatMessage[];
    isLoading: boolean;
    onSendMessage: (message: string) => void;
    onNewChat: () => void;
    hasMessages: boolean;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
    messages,
    isLoading,
    onSendMessage,
    onNewChat,
    hasMessages,
}) => {
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto-scroll to latest message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = () => {
        const trimmedMessage = inputValue.trim();
        if (trimmedMessage && !isLoading) {
            onSendMessage(trimmedMessage);
            setInputValue('');
            inputRef.current?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="chat-window">
            <div className="chat-header">
                <h1>💬 TechHub Support Chat</h1>
                {hasMessages && (
                    <button className="new-chat-btn" onClick={onNewChat} title="Start a new conversation">
                        ➕ New Chat
                    </button>
                )}
            </div>            <div className="messages-container">
                {messages.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon">👋</div>
                        <h2>Welcome to TechHub Support</h2>
                        <p>Start a conversation by asking about shipping, returns, or anything else!</p>
                        <div className="example-questions">
                            <p className="hint">Try asking:</p>
                            <ul>
                                <li>"What's your return policy?"</li>
                                <li>"Do you ship to Canada?"</li>
                                <li>"What are your support hours?"</li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    <>
                        {messages.map((message) => (
                            <ChatMessageComponent key={message.id} message={message} />
                        ))}
                        {isLoading && (
                            <div className="typing-indicator">
                                <div className="typing-dot"></div>
                                <div className="typing-dot"></div>
                                <div className="typing-dot"></div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </>
                )}
            </div>

            <div className="input-container">
                <div className="input-wrapper">
                    <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type your message here..."
                        disabled={isLoading}
                        className="message-input"
                    />
                    <button
                        onClick={handleSendMessage}
                        disabled={isLoading || !inputValue.trim()}
                        className="send-button"
                        title="Send message (or press Enter)"
                    >
                        {isLoading ? '⏳' : '📤'}
                    </button>
                </div>
                <p className="input-hint">Press Enter to send</p>
            </div>
        </div>
    );
};
