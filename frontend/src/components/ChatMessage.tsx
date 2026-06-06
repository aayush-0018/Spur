import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../api/chatAPI';
import './ChatMessage.css';

interface ChatMessageProps {
    message: ChatMessage;
}

export const ChatMessageComponent: React.FC<ChatMessageProps> = ({ message }) => {
    const isUser = message.sender === 'user';

    return (
        <div className={`chat-message ${isUser ? 'user-message' : 'ai-message'}`}>
            <div className="message-avatar">
                {isUser ? '👤' : '🤖'}
            </div>
            <div className="message-content">
                <div className="message-text">{message.content}</div>
                <div className="message-time">
                    {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </div>
            </div>
        </div>
    );
};
