# 🤖 Spur - AI Live Chat Support Agent

An intelligent chatbot application that leverages **Google's Gemini 2.5 Flash AI model** to provide instant customer support. Built with modern web technologies including **React**, **Node.js**, **TypeScript**, and **PostgreSQL**.

## 🎯 Features

- ✨ **AI-Powered Responses** - Uses Google Gemini 2.5 Flash for intelligent, context-aware replies
- 💬 **Conversation Management** - Maintains conversation history with full context awareness
- 🔄 **Real-time Chat Interface** - Modern React UI with smooth animations and loading states
- 💾 **Persistent Storage** - PostgreSQL database for reliable message persistence
- 🚀 **Production Ready** - Deployed on Render with automatic deployments from GitHub
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile devices
- 🎨 **Beautiful UI** - Clean, modern interface with gradient design and smooth animations
- 🛡️ **Type-Safe** - Full TypeScript implementation for better code quality and reliability
- ⚡ **Fast & Efficient** - Optimized API responses and client-side caching

---

## 📋 Tech Stack

### Frontend
- **React 18.2.0** - UI library
- **TypeScript 4.9.5** - Type-safe JavaScript
- **Axios 1.6.2** - HTTP client
- **CSS3** - Styling with animations and gradients

### Backend
- **Node.js 24** - JavaScript runtime
- **Express.js 4.18.2** - Web framework
- **TypeScript 5.3.3** - Type-safe backend
- **Prisma 5.10.0** - ORM for database
- **Google Generative AI SDK** - Gemini API integration

### Database
- **PostgreSQL** - Relational database (via Render)
- **Prisma** - Database ORM and migrations

### Deployment
- **Render** - Cloud hosting platform
  - Web Service for backend
  - Static Site for frontend
  - PostgreSQL instance

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ or 24+ (for Render compatibility)
- npm or yarn
- Git
- PostgreSQL (or use Render's managed database)

### Local Development Setup

#### 1. Clone the Repository

```bash
git clone https://github.com/aayush-0018/Spur.git
cd Spur
```

#### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
DATABASE_URL=postgresql://user:password@localhost:5432/ai_chat_db
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3001
NODE_ENV=development
EOF

# Generate Prisma client
npx prisma generate

# Start development server
npm run dev
```

The backend will run on `http://localhost:3001`

#### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
REACT_APP_API_URL=http://localhost:3001/api
EOF

# Start development server
npm start
```

The frontend will run on `http://localhost:3000`

---

## 🏗️ Project Structure

```
Spur/
├── backend/
│   ├── src/
│   │   ├── index.ts                 # Express server entry point
│   │   ├── middleware/
│   │   │   └── errorHandler.ts      # Centralized error handling
│   │   ├── routes/
│   │   │   ├── chat.routes.ts       # Chat message endpoints
│   │   │   └── conversation.routes.ts # Conversation retrieval
│   │   ├── services/
│   │   │   ├── llm.service.ts       # Gemini AI integration
│   │   │   └── conversation.service.ts # Business logic
│   │   └── lib/
│   │       └── prisma.ts            # Prisma client singleton
│   ├── prisma/
│   │   └── schema.prisma            # Database schema
│   ├── tsconfig.json                # TypeScript configuration
│   ├── package.json                 # Dependencies
│   └── README.md                    # Backend documentation
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── chatAPI.ts           # Axios API client
│   │   ├── components/
│   │   │   ├── ChatWindow.tsx       # Main chat UI
│   │   │   └── ChatMessage.tsx      # Message component
│   │   ├── App.tsx                  # Root component
│   │   ├── App.css                  # Global styles
│   │   └── index.tsx                # React entry point
│   ├── public/
│   │   └── index.html               # HTML template
│   ├── tsconfig.json                # TypeScript configuration
│   ├── package.json                 # Dependencies
│   └── README.md                    # Frontend documentation
│
├── API_DOCUMENTATION.md             # Complete API documentation
├── DATABASE_SCHEMA.md               # Database schema & ERD
├── DEPLOYMENT_RENDER.md             # Render deployment guide
└── README.md                        # This file
```

---

## 🔌 API Endpoints

### Send Message (Chat)

```http
POST /api/chat/message
Content-Type: application/json

{
  "conversationId": "optional-id",
  "message": "Your question here"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "conversationId": "clh7k9m2k000108l89t5k9b2k",
    "aiResponse": "AI generated response here...",
    "timestamp": "2024-01-15T10:30:45.123Z"
  }
}
```

### Get Conversation History

```http
GET /api/conversations/:conversationId
```

**Response:**
```json
{
  "success": true,
  "data": {
    "conversation": { "id": "...", "createdAt": "..." },
    "messages": [
      { "id": "...", "sender": "user", "content": "...", "index": 0 },
      { "id": "...", "sender": "ai", "content": "...", "index": 1 }
    ]
  }
}
```

### Health Check

```http
GET /health
```

For detailed API documentation, see [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

---

## 📊 Database Schema

The application uses three main tables:

### Conversation
- Stores chat sessions with timestamps
- Contains relation to multiple messages

### Message
- Stores individual messages (user and AI)
- Linked to conversations
- Maintains order via `index` field

### FaqItem
- Knowledge base for FAQs (optional)
- Organized by category

See [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md) for complete schema details.

---

## 🔐 Environment Variables

### Backend (.env)

```env
# Database
DATABASE_URL=postgresql://user:password@host:port/database

# AI Model
GEMINI_API_KEY=your_google_gemini_api_key

# Server
PORT=3001
NODE_ENV=production
```

### Frontend (.env)

```env
# Backend API
REACT_APP_API_URL=https://your-backend.onrender.com/api
```

---

## 🚀 Deployment

### Deploy to Render

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Deployment ready"
   git push origin main
   ```

2. **Create Render Services**
   - PostgreSQL Database (create first)
   - Backend Web Service (Node.js)
   - Frontend Static Site (React)

3. **Set Environment Variables**
   - Backend: DATABASE_URL, GEMINI_API_KEY, PORT=3001
   - Frontend: REACT_APP_API_URL=<backend-url>

4. **Deploy**
   - Services will automatically deploy when code is pushed to GitHub

See [DEPLOYMENT_RENDER.md](./DEPLOYMENT_RENDER.md) for detailed setup instructions.

---

## 💻 Development Commands

### Backend

```bash
cd backend

# Install dependencies
npm install

# Start development with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run Prisma Studio (database GUI)
npx prisma studio

# Create database migration
npx prisma migrate dev --name migration_name

# Generate Prisma client
npx prisma generate
```

### Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm build

# Run tests
npm test

# Eject (not recommended)
npm eject
```

---

## 🧪 Testing

### Test the API with cURL

```bash
# Send a message
curl -X POST http://localhost:3001/api/chat/message \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What is your return policy?"
  }'

# Get conversation history
curl http://localhost:3001/api/conversations/YOUR_CONVERSATION_ID

# Health check
curl http://localhost:3001/health
```

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for complete testing examples.

---

## 🔧 Troubleshooting

### Database Connection Error

**Problem:** `Error connecting to database`

**Solution:**
1. Verify DATABASE_URL is correct
2. Check PostgreSQL is running locally or Render database is accessible
3. Ensure credentials are correct

### AI API Error

**Problem:** `Failed to generate AI response`

**Solution:**
1. Verify GEMINI_API_KEY is set correctly
2. Check API key has sufficient quota
3. Ensure internet connection for API calls

### Frontend Build Error

**Problem:** `Module not found` or `TypeScript error`

**Solution:**
1. Delete `node_modules` and run `npm install` again
2. Clear npm cache: `npm cache clean --force`
3. Rebuild: `npm run build`

### Port Already in Use

**Problem:** `Error: listen EADDRINUSE :::3001`

**Solution:**
```bash
# Find and kill process using port 3001
lsof -i :3001
kill -9 <PID>

# Or use different port
PORT=3002 npm start
```

---

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

---

## 🤝 Support

- **Documentation:** Check [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) and [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md)
- **Issues:** Open an issue on [GitHub Issues](https://github.com/aayush-0018/Spur/issues)
- **Deployment Help:** See [DEPLOYMENT_RENDER.md](./DEPLOYMENT_RENDER.md)

---

## 🎉 Acknowledgments

- [Google Generative AI](https://ai.google/) - For Gemini API
- [Render](https://render.com/) - For hosting and deployment
- [Prisma](https://www.prisma.io/) - For database ORM
- [React](https://react.dev/) - For frontend framework
- [Express.js](https://expressjs.com/) - For backend framework

---

## 📊 Current Status

✅ **Production Ready**

- Frontend: Fully functional React application
- Backend: Express server with Gemini integration
- Database: PostgreSQL with Prisma ORM
- Deployment: Ready for Render

---

## 🗺️ Roadmap

- [ ] User authentication and profiles
- [ ] Message persistence and search
- [ ] Conversation analytics
- [ ] Admin dashboard
- [ ] Custom knowledge base integration
- [ ] Multi-language support
- [ ] Rate limiting and API keys
- [ ] Message reactions and feedback
- [ ] Voice chat support
- [ ] Mobile app (React Native)

---

## 📞 Contact

- **Author:** Aayush Goswami
- **GitHub:** [@aayush-0018](https://github.com/aayush-0018)
- **Repository:** [Spur](https://github.com/aayush-0018/Spur)

---

**Made with ❤️ for better customer support through AI**
