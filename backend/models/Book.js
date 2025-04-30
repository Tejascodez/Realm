import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: String,
    description: String,
    coverImage: String, // URL or path
    price: {
      type: Number,
      required: true,
    },
    category: { 
      type: String, 
      enum: ['fiction', 'non-fiction', 'romance', 'dark-romance', 'fantasy', 'others'],
      required: true,
      lowercase: true,
      trim: true
    },
    contentPdf: {
      type: String, // Can be a URL or file path
      required: true,
    },
    isFree: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Book = mongoose.model('Book', bookSchema);
export default Book;
