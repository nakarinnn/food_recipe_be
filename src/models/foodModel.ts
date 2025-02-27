import mongoose, { Schema, Document } from "mongoose";

interface IInstruction {
  step: number;
  description: string;
  time?: string;
}

interface IFood extends Document {
  name: string;
  category: "อาหารคาว" | "อาหารหวาน" | "เครื่องดื่ม";
  description: string;
  image: string;
  ingredients: mongoose.Types.ObjectId[];
  instructions: IInstruction[];
  ratings: mongoose.Types.ObjectId[];
  comments: mongoose.Types.ObjectId[];
}

const FoodSchema: Schema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true, enum: ["อาหารคาว", "อาหารหวาน", "เครื่องดื่ม"] },
  description: { type: String, required: true },
  image: { type: String },
  // ingredients: [{ type: Schema.Types.ObjectId, ref: "Ingredient" }],
  ingredients: [{
    name: { type: String, required: true },
    amount: { type: String, required: true },
    unit: { type: String, required: true },
  }],
  instructions: [
    {
      step: { type: Number, required: true },
      description: { type: String, required: true },
    }
  ],
  ratings: [{ type: Schema.Types.ObjectId, ref: "Rating" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }]
});

const Food = mongoose.model<IFood>("Food", FoodSchema, "foods");

export default Food;
