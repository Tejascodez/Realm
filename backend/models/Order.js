import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    cartItems: [
      {
        Book: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Book', // or 'Course', depending on your context
          required: true,
        },
        title: String,      // snapshot of the product title
        price: Number,      // snapshot of the price at time of purchase
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
      default: 'pending',
    },
    // paymentDetails: {
    //   id: String,     // Payment gateway transaction ID
    //   method: String, // Payment method (card, UPI, etc.)
    //   status: String, // Paid/Failed/etc.
    // },
    totalAmount: {
      type: Number,
      required: true,
    },
    purchasedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
