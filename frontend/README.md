# Frontend - AI Chat Agent

A modern React + TypeScript frontend for the AI Live Chat Agent.

## 🎨 Features

- **Clean Chat UI** - Beautiful, intuitive chat interface
- **Real-time Messages** - Instant message sending and AI responses
- **Auto-scrolling** - Automatically scrolls to latest message
- **Loading States** - Typing indicator while waiting for AI response
- **Error Handling** - User-friendly error messages
- **Persistent Conversations** - Conversations saved in localStorage
- **Responsive Design** - Works on desktop and mobile

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Environment Variables

The frontend uses the `.env` file:

```env
REACT_APP_API_URL=http://localhost:3001
```

Change the API URL if your backend is running on a different port or server.

### 3. Start Development Server

```bash
npm start
```

Server will open at `http://localhost:3000`

### 4. Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
src/
├── api/
│   └── chatAPI.ts       # API client for backend communication
├── components/
│   ├── ChatWindow.tsx   # Main chat interface
│   ├── ChatWindow.css
│   ├── ChatMessage.tsx  # Individual message component
│   └── ChatMessage.css
├── App.tsx              # Main app logic
├── App.css
├── index.tsx            # React entry point
├── index.css
public/
└── index.html           # HTML template
```

## 🔌 API Integration

The frontend connects to the backend at `REACT_APP_API_URL`:

### Send Message
```typescript
POST /api/chat/message
Body: { message: string, conversationId?: string }
Response: { conversationId, userMessage, aiMessage }
```

### Get Conversation
```typescript
GET /api/conversations/:conversationId
Response: { id, createdAt, updatedAt, messages[] }
```

## 💾 Local Storage

The app saves conversation IDs in localStorage for persistence:
- `conversationId` - Current conversation ID

Users can start a new chat with the "New Chat" button.

## 🎯 User Flow

1. User opens the app
2. If they have a saved conversation, it loads automatically
3. User types a message and presses Enter or clicks Send
4. Frontend sends message to backend
5. Backend calls Gemini API and responds
6. Frontend displays both user and AI messages
7. User can continue chatting or start a new conversation

## 🎨 UI Components

### ChatWindow
Main container with:
- Header with welcome message
- Messages area with auto-scroll
- Empty state with suggestions
- Input field with send button
- Typing indicator while loading

### ChatMessage
Individual message component with:
- Avatar (👤 for user, 🤖 for AI)
- Message content
- Timestamp
- Different styling for user/AI messages

## 🌈 Styling

Modern gradient design with:
- Purple gradient primary colors (#667eea to #764ba2)
- Smooth animations and transitions
- Mobile-friendly responsive layout
- Dark mode-friendly colors

## 📦 Dependencies

- **react** - UI framework
- **react-dom** - React DOM rendering
- **axios** - HTTP client for API calls
- **typescript** - Type safety
- **react-scripts** - Create React App build tools

## 🔄 Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `REACT_APP_API_URL` | `http://localhost:3001` | Backend API URL |

## 🚀 Deployment

### Deploy to Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm run build
# Then drag-and-drop the build folder to Netlify
```

### Deploy to Any Static Host

```bash
npm run build
# Upload the `build` folder to your hosting service
```

**Note:** Make sure to set `REACT_APP_API_URL` environment variable in your deployment platform to point to your backend URL.

## ⚠️ Known Limitations

- Conversations only persist in browser localStorage (limited to ~5-10MB)
- No image/file upload support
- No user authentication
- No conversation search or filtering

## 🔧 Troubleshooting

### "Failed to connect to backend"
- Ensure backend is running on the correct port
- Check `REACT_APP_API_URL` environment variable
- Verify CORS is enabled on backend

### "Conversation not loading"
- Check browser localStorage for corrupted data
- Clear localStorage and start a new chat
- Check browser console for errors

### Slow performance
- Check network tab for large payloads
- Consider pagination for long conversations
- Check browser DevTools performance tab

---

**Built with ❤️ for Spur Engineering Interview**
