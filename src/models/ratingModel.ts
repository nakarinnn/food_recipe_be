import mongoose, { Schema, Document } from "mongoose";

interface IRating extends Document {
  foodId: mongoose.Types.ObjectId;
  userId: string;
  rating: number;
}

const RatingSchema: Schema = new Schema({
  foodId: { type: Schema.Types.ObjectId, ref: "Food", required: true },
  userId: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 }
});

const Rating = mongoose.model<IRating>("Rating", RatingSchema, "rating");

export default Rating;
