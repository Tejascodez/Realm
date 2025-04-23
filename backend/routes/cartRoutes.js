// routes/cartRoutes.ts
import express from "express";
import { getCart, addToCart, removeFromCart, clearCart } from "../controllers/cartController.js";

const router = express.Router();

router.get("/:userId", getCart);
router.post("/:userId", addToCart);
router.delete("/:userId/:bookId", removeFromCart);
router.delete("/:userId", clearCart);

export default router;
