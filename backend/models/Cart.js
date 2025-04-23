// models/Cart.ts
import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  title: String,
  author: String,
  price: Number,
  quantity: { type: Number, default: 1 },
});

const CartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  items: [CartItemSchema],
}, { timestamps: true });

export default mongoose.model("Cart", CartSchema);
