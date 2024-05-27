import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoute from "./routes/auth.js";
import postRoute from "./routes/posts.js";
import commentRoute from "./routes/comments.js";
import fileUpload from "express-fileupload";
//import checkAuth from "./utils/checkAuth.js";
const app = express();
dotenv.config();
const corsOptions = {
  origin: "https://blog-frontend-iejpjw60t-vn23js-projects.vercel.app",
  optionsSuccessStatus: 200
};
//Constants
const PORT = process.env.PORT || 3001;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;
//Meddleware
app.use(cors(corsOptions));
app.use(fileUpload());
app.use(express.json());
app.use(express.static("uploads"));

//app.get("/", (req, res) => {
// return res.json({ message: "ALL is fine" });
//});

//Routes
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoute);
mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.h4ob913.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => console.log("DB ok"))
  .catch((err) => console.log("DB error", err));

async function start() {
  try {
    app.listen(PORT, () => console.log(`Server is running ${PORT}`));
  } catch (error) {
    console.log(error);
  }
}
start();
