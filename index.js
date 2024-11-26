import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoute from "./routes/auth.js";
import postRoute from "./routes/posts.js";
import commentRoute from "./routes/comments.js";
import fileUpload from "express-fileupload";

dotenv.config();

const app = express();

// Constants
const PORT = process.env.PORT || 3001;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

// CORS options
const corsOptions = {
      origin:  "https://blog-three-zeta-97.vercel.app",
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(fileUpload());
app.use(express.json());
app.use(express.static("uploads"));

// Routes
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoute);

// Connect to MongoDB
mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.h4ob913.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    console.log("DB connected");
    // Start server only after DB connection is successful
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB connection error", err);
  });

// Handle 404 errors (Route Not Found)
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});
