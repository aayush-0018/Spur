import "dotenv/config";
import express, { Express } from "express";
import cors from "cors";
import "express-async-errors";
import chatRoutes from "./routes/chat.routes";
import conversationRoutes from "./routes/conversation.routes";
import { errorHandler } from "./middleware/errorHandler";

const app: Express = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/chat", chatRoutes);
app.use("/api/conversations", conversationRoutes);

// Health check
app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});

export default app;
