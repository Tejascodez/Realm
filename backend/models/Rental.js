import mongoose from 'mongoose';

const rentalSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: true,
    },
    rentStartDate: {
      type: Date,
      default: Date.now,
    },
    rentEndDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'expired', 'cancelled'],
      default: 'active',
    },
    isReturned: {
      type: Boolean,
      default: false,
    },
    rentalFee: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Rental = mongoose.model('Rental', rentalSchema);
export default Rental;
