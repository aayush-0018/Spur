# 🤖 Spur - AI Live Chat Support Agent

An intelligent full-stack AI customer support platform powered by **Google Gemini 2.5 Flash**, featuring contextual conversations, persistent chat history, PostgreSQL storage, and production-ready deployment on Render.

![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Node.js](https://img.shields.io/badge/Node.js-24-green)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue)
![Prisma](https://img.shields.io/badge/Prisma-ORM-black)
![Render](https://img.shields.io/badge/Render-Deployed-purple)

---

# 🎯 Overview

Spur is a production-ready AI-powered customer support platform that enables users to interact with an intelligent chatbot backed by **Google Gemini 2.5 Flash**.

The application maintains contextual conversations, stores chat history in PostgreSQL, and provides REST APIs for conversation management. It is built using a modern full-stack architecture with React, Express, TypeScript, Prisma, and PostgreSQL.

---

# 🏗️ System Architecture

```text
┌───────────────────────────────────────┐
│            React Frontend             │
│     Chat UI + Conversation State      │
└───────────────────┬───────────────────┘
                    │
                    │ HTTP Requests
                    ▼
┌───────────────────────────────────────┐
│         Express API Server            │
│                                       │
│ • Request Validation                  │
│ • Conversation Management             │
│ • Error Handling                      │
└───────────────┬───────────┬───────────┘
                │           │
                │           │
                ▼           ▼

      ┌────────────────┐   ┌────────────────────┐
      │ PostgreSQL DB  │   │ Gemini 2.5 Flash   │
      │                │   │                    │
      │ Conversations  │   │ Context Aware AI   │
      │ Messages       │   │ Response Engine    │
      │ FAQ Items      │   │                    │
      └────────────────┘   └────────────────────┘
```

---

# 🔄 Request Processing Flow

```text
User Message
      │
      ▼
Validate Request
      │
      ▼
Create / Load Conversation
      │
      ▼
Load Message History
      │
      ▼
Build Gemini Context
      │
      ▼
Generate AI Response
      │
      ▼
Store User Message
      │
      ▼
Store AI Message
      │
      ▼
Return Response
```

---

# 📋 Tech Stack

## Frontend

| Technology | Purpose              |
| ---------- | -------------------- |
| React 18   | UI Framework         |
| TypeScript | Type Safety          |
| Axios      | API Communication    |
| CSS3       | Styling & Animations |

## Backend

| Technology | Purpose        |
| ---------- | -------------- |
| Node.js    | Runtime        |
| Express.js | REST API       |
| TypeScript | Type Safety    |
| Prisma     | ORM            |
| Gemini SDK | AI Integration |

## Database

| Technology | Purpose        |
| ---------- | -------------- |
| PostgreSQL | Data Storage   |
| Prisma ORM | Database Layer |

## Deployment

| Service            | Purpose          |
| ------------------ | ---------------- |
| Render Web Service | Backend Hosting  |
| Render Static Site | Frontend Hosting |
| Render PostgreSQL  | Managed Database |

---

# API Summary

| Method | Endpoint               | Description                   |
| ------ | ---------------------- | ----------------------------- |
| POST   | /api/chat/message      | Send message to AI            |
| GET    | /api/conversations/:id | Retrieve conversation history |
| GET    | /health                | Health check                  |

---

# 1️⃣ Send Message

## Endpoint

```http
POST /api/chat/message
```

## cURL Request

```bash
curl -X POST http://localhost:3001/api/chat/message \
-H "Content-Type: application/json" \
-d '{
  "message":"What is your return policy?"
}'
```

## Request Body

| Field          | Type   | Required |
| -------------- | ------ | -------- |
| conversationId | String | No       |
| message        | String | Yes      |

## Success Response

```json
{
  "success": true,
  "data": {
    "conversationId": "clh7k9m2k000108l89t5k9b2k",
    "userMessageId": "msg_1",
    "aiMessageId": "msg_2",
    "aiResponse": "We offer a 30-day return policy.",
    "timestamp": "2024-01-15T10:30:45.123Z"
  }
}
```

---

# 2️⃣ Get Conversation History

## Endpoint

```http
GET /api/conversations/:conversationId
```

## cURL Request

```bash
curl -X GET \
http://localhost:3001/api/conversations/clh7k9m2k000108l89t5k9b2k
```

## Success Response

```json
{
  "success": true,
  "data": {
    "conversation": {
      "id": "clh7k9m2k000108l89t5k9b2k"
    },
    "messages": [
      {
        "sender": "user",
        "content": "Hello"
      },
      {
        "sender": "ai",
        "content": "Hi! How can I help?"
      }
    ]
  }
}
```

---

# 3️⃣ Health Check

## Endpoint

```http
GET /health
```

## cURL Request

```bash
curl http://localhost:3001/health
```

## Response

```json
{
  "status": "ok"
}
```

---

# 🔄 API Request Lifecycle

```text
Client App
    │
    │ POST /api/chat/message
    ▼

Express Server
    │
    ├── Validate Input
    ├── Create/Get Conversation
    ├── Save User Message
    │
    ▼

PostgreSQL
    │
    ▼

Gemini 2.5 Flash
    │
    ▼

Save AI Response
    │
    ▼

Return JSON Response
    │
    ▼

Frontend UI Updates
```

---

# 🗄️ Database Schema

## ORM

**Prisma ORM**

## Database

**PostgreSQL**

---

# Prisma Schema

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Conversation {
  id        String   @id @default(cuid())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  messages Message[]

  @@map("conversations")
}

model Message {
  id             String @id @default(cuid())
  conversationId String

  conversation Conversation
    @relation(fields: [conversationId], references: [id], onDelete: Cascade)

  sender    String
  content   String
  createdAt DateTime @default(now())

  @@index([conversationId])
  @@map("messages")
}

model FaqItem {
  id        String   @id @default(cuid())
  category  String
  question  String
  answer    String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([category, question])
  @@map("faq_items")
}
```

---

# Database Tables

## Conversation Table

| Column    | Type     | Description             |
| --------- | -------- | ----------------------- |
| id        | CUID     | Conversation ID         |
| createdAt | DateTime | Created Timestamp       |
| updatedAt | DateTime | Last Activity Timestamp |

---

## Message Table

| Column         | Type     | Description            |
| -------------- | -------- | ---------------------- |
| id             | CUID     | Message ID             |
| conversationId | CUID     | Conversation Reference |
| sender         | String   | user / ai              |
| content        | Text     | Message Content        |
| createdAt      | DateTime | Created Timestamp      |

---

## FAQ Table

| Column   | Type   | Description  |
| -------- | ------ | ------------ |
| id       | CUID   | FAQ ID       |
| category | String | FAQ Category |
| question | String | FAQ Question |
| answer   | Text   | FAQ Answer   |

---

# Entity Relationship Diagram

```text
┌─────────────────────────┐
│      Conversation       │
├─────────────────────────┤
│ id (PK)                 │
│ createdAt               │
│ updatedAt               │
└─────────────┬───────────┘
              │
              │ 1 : N
              ▼
┌─────────────────────────┐
│        Message          │
├─────────────────────────┤
│ id (PK)                 │
│ conversationId (FK)     │
│ sender                  │
│ content                 │
│ createdAt               │
└─────────────────────────┘


┌─────────────────────────┐
│        FaqItem          │
├─────────────────────────┤
│ id (PK)                 │
│ category                │
│ question                │
│ answer                  │
└─────────────────────────┘
```

---

# ☁️ Deployment Architecture

```text
React Frontend
(Render Static Site)
          │
          ▼

Node.js Backend
(Render Web Service)
          │
          ▼

PostgreSQL
(Render Managed DB)
          │
          ▼

Gemini 2.5 Flash API
```

---

# 🔐 Environment Variables

## Backend

```env
DATABASE_URL=postgresql:xx
GEMINI_API_KEY=xx

PORT=3001

NODE_ENV=production
```

## Frontend

```env
REACT_APP_API_URL=https://spur-backend2.onrender.com/
```

---

# 🚀 Local Setup

## Clone Repository

```bash
git clone https://github.com/aayush-0018/Spur.git
cd Spur
```

## Backend

```bash
cd backend

npm install

npx prisma generate

npm run dev
```

## Frontend

```bash
cd frontend

npm install

npm start
```

---

# 🧪 Testing

## Send Message

```bash
curl -X POST http://localhost:3001/api/chat/message \
-H "Content-Type: application/json" \
-d '{"message":"Hello"}'
```

## Conversation History

```bash
curl http://localhost:3001/api/conversations/CONVERSATION_ID
```

## Health Check

```bash
curl http://localhost:3001/health
```

---

# 🛣️ Future Enhancements

* User Authentication
* JWT Security
* Semantic Search using Embeddings
* Conversation Analytics
* Admin Dashboard
* Knowledge Base Uploads
* Multi-language Support
* Rate Limiting
* Voice Chat
* Mobile Application

---
