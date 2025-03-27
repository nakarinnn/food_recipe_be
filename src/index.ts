import express from "express";
import connectDB from "./db";
import cors from "cors";

import dotenv from "dotenv";

dotenv.config();

import os from 'os'

import userRoutes from "./routes/userRoutes";
import foodRoutes from "./routes/FoodRoutes";
import commentRoutes from "./routes/CommentRoutes";
import ratingRoutes from "./routes/RatingRoutes";
import likeRoutes from "./routes/LikeRoutes";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT || 2000;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: ["https://food-recipe-fe.onrender.com"],
  // origin: [process.env.ORIGIN_URL as string|| "http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

connectDB();

app.use("/api/user", userRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/rating", ratingRoutes);
app.use("/api/like", likeRoutes);

app.get("/", (req, res) => {
  res.send("Hello, TypeScript with Node.js!");
});

app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to Food Recipe API!",
    hostname: os.hostname(),
    port: PORT,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
