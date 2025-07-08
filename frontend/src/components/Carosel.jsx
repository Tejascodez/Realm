'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, BookOpen, ShoppingCart } from 'lucide-react';
import bg1 from '../assets/bg1.png'
import bg2 from '../assets/bg2.png'
import bk3 from '../assets/bk3.png'
import bk4 from '../assets/bk4.png'
import bk5 from '../assets/bk5.png'
import bk1 from '../assets/bk1.png'
import bk2 from '../assets/bk2.png'



const books = [
  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    image: bk1,
    backgroundImage: bg1,
    description: "Transform your life through the power of tiny changes",
    category: "Self-Help",
    rating: 4.8,
    price: "₹149"
  },
  {
    id: 2,
    title: "Deep Work",
    author: "Cal Newport",
    image: bk2,
    backgroundImage: bg2,
    description: "Master the art of focused success in a distracted world",
    category: "Productivity",
    rating: 4.6,
    price: "₹169"
  },
  {
    id: 3,
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    image: bk3,
    backgroundImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=80",
    description: "What the rich teach their kids about money",
    category: "Finance",
    rating: 4.7,
    price: "₹129"
  },
  {
    id: 4,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    image: bk4,
    backgroundImage: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1600&q=80",
    description: "Timeless lessons on wealth, greed, and happiness",
    category: "Finance",
    rating: 4.9,
    price: "₹159"
  },
  {
    id: 5,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    image: bk5,
    backgroundImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1600&q=80",
    description: "A brief history of humankind",
    category: "History",
    rating: 4.8,
    price: "₹189"
  }
];

export default function EnhancedHeroCarousel() {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handlePrev = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setIndex((prev) => (prev - 1 + books.length) % books.length);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [isTransitioning]);

  const handleNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setIndex((prev) => (prev + 1) % books.length);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [isTransitioning]);

  const goToSlide = (slideIndex) => {
    if (isTransitioning || slideIndex === index) return;
    setIsTransitioning(true);
    setIndex(slideIndex);
    setTimeout(() => setIsTransitioning(false), 700);
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
    <>
      <style jsx>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(1.05);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes fadeOutScale {
          from {
            opacity: 1;
            transform: scale(1);
          }
          to {
            opacity: 0;
            transform: scale(0.95);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px) rotateY(15deg);
          }
          to {
            opacity: 1;
            transform: translateX(0) rotateY(0deg);
          }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        .bg-transition {
          animation: fadeInScale 0.7s ease-in-out;
        }
        
        .content-animate {
          animation: slideInLeft 0.6s ease-out 0.2s both;
        }
        
        .visual-animate {
          animation: slideInRight 0.8s ease-out 0.3s both;
        }
        
        .category-animate {
          animation: slideInUp 0.4s ease-out 0.3s both;
        }
        
        .title-animate {
          animation: slideInUp 0.5s ease-out 0.4s both;
        }
        
        .author-animate {
          animation: slideInUp 0.4s ease-out 0.5s both;
        }
        
        .description-animate {
          animation: slideInUp 0.4s ease-out 0.6s both;
        }
        
        .buttons-animate {
          animation: slideInUp 0.4s ease-out 0.7s both;
        }
        
        .floating-element {
          animation: float 3s ease-in-out infinite;
        }
        
        .book-hover:hover {
          transform: scale(1.05) rotateY(5deg);
          transition: transform 0.3s ease;
        }
        
        .control-hover:hover {
          transform: scale(1.1);
          transition: transform 0.2s ease;
        }
        
        .control-hover:active {
          transform: scale(0.9);
        }
        
        .button-hover:hover {
          transform: scale(1.05);
          transition: transform 0.2s ease;
        }
        
        .button-hover:active {
          transform: scale(0.95);
        }
        
        .indicator-active {
          transform: scale(1.25);
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
      
      <section 
        className="relative h-screen overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Background Image with Enhanced Transitions */}
        <div className="absolute inset-0 w-full h-full">
          <div
            key={currentBook.id}
            className="absolute inset-0 w-full h-full bg-transition"
            style={{
              backgroundImage: `url(${currentBook.backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-black/50"></div>
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              
              {/* Text Content */}
              <div
                key={`content-${currentBook.id}`}
                className="text-white space-y-6 content-animate"
              >
                <div className="flex items-center gap-4 category-animate">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                    {currentBook.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">★</span>
                    <span className="text-sm font-medium">{currentBook.rating}</span>
                  </div>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight title-animate">
                  {currentBook.title}
                </h1>

                <p className="text-xl md:text-2xl font-light text-gray-200 author-animate">
                  by {currentBook.author}
                </p>

                <p className="text-lg text-gray-300 max-w-lg leading-relaxed description-animate">
                  {currentBook.description}
                </p>

                <div className="flex flex-wrap gap-4 pt-4 buttons-animate">
                  <button className="flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold shadow-xl hover:bg-gray-100 transition-all duration-200 button-hover">
                    <ShoppingCart className="w-5 h-5" />
                    Buy Now {currentBook.price}
                  </button>
                  
                  <button className="flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-xl font-semibold hover:bg-white/20 transition-all duration-200 button-hover">
                    <BookOpen className="w-5 h-5" />
                    Preview
                  </button>
                </div>
              </div>

              {/* Book Visual */}
              <div
                key={`visual-${currentBook.id}`}
                className="hidden lg:flex justify-center items-center visual-animate"
              >
                <div className="relative">
                  <div className="w-80 h-96 bg-white rounded-lg shadow-2xl overflow-hidden perspective-1000 book-hover">
                    <img
                      src={currentBook.image}
                      alt={currentBook.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Floating elements */}
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center floating-element">
                    <span className="text-2xl">📚</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Controls */}
        <div className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20">
          <button
            onClick={handlePrev}
            className="bg-white/10 backdrop-blur-md hover:bg-white/20 p-4 rounded-full shadow-lg transition-all duration-200 border border-white/20 control-hover"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
        </div>
        
        <div className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20">
          <button
            onClick={handleNext}
            className="bg-white/10 backdrop-blur-md hover:bg-white/20 p-4 rounded-full shadow-lg transition-all duration-200 border border-white/20 control-hover"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
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
                    ? 'bg-white indicator-active' 
                    : 'bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}