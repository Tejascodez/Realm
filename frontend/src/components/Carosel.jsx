'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause, BookOpen, ShoppingCart } from 'lucide-react';

const books = [
  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    image: "https://images.unsplash.com/photo-1611078489935-0cb9649d3601?auto=format&fit=crop&w=1600&q=80",
    backgroundImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1600&q=80",
    description: "Transform your life through the power of tiny changes",
    category: "Self-Help",
    rating: 4.8,
    price: "₹14.99"
  },
  {
    id: 2,
    title: "Deep Work",
    author: "Cal Newport",
    image: "https://images.unsplash.com/photo-1587614382346-4ec99c91f22e?auto=format&fit=crop&w=1600&q=80",
    backgroundImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1600&q=80",
    description: "Master the art of focused success in a distracted world",
    category: "Productivity",
    rating: 4.6,
    price: "₹16.99"
  },
  {
    id: 3,
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1600&q=80",
    backgroundImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=80",
    description: "What the rich teach their kids about money",
    category: "Finance",
    rating: 4.7,
    price: "₹12.99"
  },
  {
    id: 4,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=80",
    backgroundImage: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1600&q=80",
    description: "Timeless lessons on wealth, greed, and happiness",
    category: "Finance",
    rating: 4.9,
    price: "₹15.99"
  },
  {
    id: 5,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1600&q=80",
    backgroundImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1600&q=80",
    description: "A brief history of humankind",
    category: "History",
    rating: 4.8,
    price: "₹18.99"
  }
];

export default function EnhancedHeroCarousel() {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handlePrev = useCallback(() => {
    setIndex((prev) => (prev - 1 + books.length) % books.length);
  }, []);

  const handleNext = useCallback(() => {
    setIndex((prev) => (prev + 1) % books.length);
  }, []);

  const goToSlide = (slideIndex) => {
    setIndex(slideIndex);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === ' ') {
        e.preventDefault();
        togglePlayPause();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handlePrev, handleNext]);

  // Auto slide functionality
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isPlaying, handleNext]);

  // Touch handlers
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) handleNext();
    if (isRightSwipe) handlePrev();
  };

  const currentBook = books[index];

  return (
    <section 
      className="relative h-screen overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Image with Enhanced Transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentBook.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={currentBook.backgroundImage}
            alt={`${currentBook.title} background`}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-black/50"></div>
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        </motion.div>
      </AnimatePresence>

      {/* Content Grid */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Text Content */}
            <motion.div
              key={`content-${currentBook.id}`}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-white space-y-6"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-4"
              >
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                  {currentBook.category}
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400">★</span>
                  <span className="text-sm font-medium">{currentBook.rating}</span>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"
              >
                {currentBook.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-xl md:text-2xl font-light text-gray-200"
              >
                by {currentBook.author}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-lg text-gray-300 max-w-lg leading-relaxed"
              >
                {currentBook.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-wrap gap-4 pt-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold shadow-xl hover:bg-gray-100 transition-all duration-200"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Buy Now {currentBook.price}
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-xl font-semibold hover:bg-white/20 transition-all duration-200"
                >
                  <BookOpen className="w-5 h-5" />
                  Preview
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Book Visual */}
            <motion.div
              key={`visual-${currentBook.id}`}
              initial={{ opacity: 0, x: 50, rotateY: 15 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="hidden lg:flex justify-center items-center"
            >
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  transition={{ duration: 0.3 }}
                  className="w-80 h-96 bg-white rounded-lg shadow-2xl overflow-hidden transform perspective-1000"
                >
                  <img
                    src={currentBook.image}
                    alt={currentBook.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                {/* Floating elements */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 -right-4 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                >
                  <span className="text-2xl">📚</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Enhanced Controls */}
      <div className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handlePrev}
          className="bg-white/10 backdrop-blur-md hover:bg-white/20 p-4 rounded-full shadow-lg transition-all duration-200 border border-white/20"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </motion.button>
      </div>
      
      <div className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleNext}
          className="bg-white/10 backdrop-blur-md hover:bg-white/20 p-4 rounded-full shadow-lg transition-all duration-200 border border-white/20"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </motion.button>
      </div>

      {/* Play/Pause Button */}
      <div className="absolute top-8 left-8 z-20">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={togglePlayPause}
          className="bg-white/10 backdrop-blur-md hover:bg-white/20 p-3 rounded-full shadow-lg transition-all duration-200 border border-white/20"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 text-white" />
          ) : (
            <Play className="w-5 h-5 text-white" />
          )}
        </motion.button>
      </div>

      {/* Slide Counter */}
      <div className="absolute top-8 right-8 z-20">
        <div className="bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
          <span className="text-white text-sm font-medium">
            {index + 1} / {books.length}
          </span>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-2">
          {books.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === index 
                  ? 'bg-white scale-125' 
                  : 'bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}