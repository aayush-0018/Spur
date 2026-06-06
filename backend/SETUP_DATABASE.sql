-- AI Chat Backend Database Setup
-- PostgreSQL manual schema creation

-- Create database
CREATE DATABASE ai_chat_db;

-- Connect to ai_chat_db and run the following:

-- Create conversations table
CREATE TABLE conversations (
  id TEXT PRIMARY KEY,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create messages table
CREATE TABLE messages (
  id TEXT PRIMARY KEY,
  "conversationId" TEXT NOT NULL,
  sender TEXT NOT NULL CHECK (sender IN ('user', 'ai')),
  content TEXT NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("conversationId") REFERENCES conversations(id) ON DELETE CASCADE
);

-- Create index on conversationId for faster queries
CREATE INDEX idx_messages_conversation_id ON messages("conversationId");

-- Create FAQ items table (optional, for future use)
CREATE TABLE faq_items (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(category, question)
);

-- Verify tables created
SELECT tablename FROM pg_tables WHERE schemaname = 'public';
