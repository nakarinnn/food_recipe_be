import express from "express";
import connectDB from "./db";
import cors from "cors";

import dotenv from "dotenv";

dotenv.config();

import userRoutes from "./routes/userRoutes";
import foodRoutes from "./routes/FoodRoutes";
import commentRoutes from "./routes/CommentRoutes";
import ratingRoutes from "./routes/RatingRoutes";


const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: process.env.fe_url,
  credentials: true,
};

app.use(cors(corsOptions));

connectDB();

app.use("/api", userRoutes);
app.use("/api", foodRoutes);
app.use("/api", commentRoutes);
app.use("/api", ratingRoutes);

app.get("/", (req, res) => {
  res.send("Hello, TypeScript with Node.js!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
