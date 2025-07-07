import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99] 
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 15,
    },
  },
  hover: {
    y: -15,
    scale: 1.02,
    boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.25)",
    transition: { 
      duration: 0.3,
      ease: "easeOut"
    }
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.5 } 
  }
};

export default function FeaturedBooks() {
  const books = [
    { 
      id: 1, 
      title: "The Silent Echo", 
      author: "Maya Shepherd",
      price: " ₹4.99",
      originalPrice: " ₹9.99",
      ratings: 4.5,
      tags: ["Bestseller", "Mystery"],
      discount: 50,
      image: "https://via.placeholder.com/300x400/3B82F6/FFFFFF?text=The+Silent+Echo"
    },
    { 
      id: 2, 
      title: "Quantum Theory", 
      author: "Richard Dawkins",
      price: " ₹6.99",
      originalPrice: " ₹12.99",
      ratings: 4.7,
      tags: ["Science", "Physics"],
      discount: 46,
      image: "https://via.placeholder.com/300x400/059669/FFFFFF?text=Quantum+Theory"
    },
    { 
      id: 3, 
      title: "The Last Theorem", 
      author: "Samuel Johnson",
      price: " ₹5.99",
      originalPrice: " ₹10.99",
      ratings: 4.2,
      tags: ["Mathematics", "Classic"],
      discount: 45,
      image: "https://via.placeholder.com/300x400/7C3AED/FFFFFF?text=The+Last+Theorem"
    }
  ];

  // Generate star rating component
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg
          key={`empty- ₹{i}`}
          className="h-5 w-5 text-slate-300"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    
    return stars;
  };

  return (
    <motion.section
      className="bg-gradient-to-b from-blue-50 to-white py-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeInUp}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          variants={fadeIn}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4 text-slate-800"
            variants={fadeInUp}
          >
            Featured Books
          </motion.h2>
          <motion.p 
            className="text-lg text-slate-600 max-w-2xl mx-auto"
            variants={fadeInUp}
          >
            Discover our most popular titles handpicked for you
          </motion.p>
        </motion.div>
        
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          variants={staggerContainer}
        >
          {books.map((book) => (
            <motion.div
              key={book.id}
              className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200/80 hover:border-blue-200 transition-colors"
              variants={cardVariants}
              whileHover="hover"
              layout
            >
              <div className="relative">
                {/* Discount badge */}
                <motion.div 
                  className="absolute top-4 right-4 bg-red-500 text-white font-bold text-sm px-3 py-1 rounded-full z-10 shadow-md"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    delay: 0.3,
                    type: "spring",
                    stiffness: 300
                  }}
                >
                  {book.discount}% OFF
                </motion.div>
                
                {/* Book cover image */}
                <div className="relative h-60 overflow-hidden">
                  <motion.img
                    src={book.image}
                    alt={` ₹{book.title} book cover`}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      duration: 0.6,
                      ease: "easeOut"
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      transition: { duration: 0.3 }
                    }}
                  />
                  
                  {/* Optional overlay with title */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <motion.div 
                      className="absolute bottom-4 left-4 text-white"
                      initial={{ y: 20, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      <div className="text-lg font-bold mb-1">{book.title}</div>
                      <div className="text-sm opacity-90">by {book.author}</div>
                    </motion.div>
                  </motion.div>
                </div>
                
                <div className="p-6">
                  {/* Tags */}
                  <motion.div 
                    className="flex flex-wrap gap-2 mb-4"
                    variants={fadeIn}
                  >
                    {book.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="bg-blue-100 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </motion.div>
                  
                  <h3 className="text-xl font-bold text-slate-800 mb-2 line-clamp-1">
                    {book.title}
                  </h3>
                  <p className="text-slate-600 mb-4">By {book.author}</p>
                  
                  <div className="flex justify-between items-center mb-5">
                    <div>
                      <span className="text-blue-600 font-bold text-xl">
                        {book.price}
                      </span>
                      <span className="text-slate-400 text-sm line-through ml-2">
                        {book.originalPrice}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="flex mr-1">
                        {renderStars(book.ratings)}
                      </div>
                      <span className="text-slate-600 font-medium">
                        {book.ratings}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <motion.button
                      className="bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Rent Now
                    </motion.button>
                    
                    <motion.button
                      className="border border-slate-300 text-slate-700 py-3 rounded-xl hover:bg-slate-50 transition-colors font-medium flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Details
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-full border border-blue-200 hover:bg-blue-50 transition-colors shadow-sm hover:shadow-md flex items-center mx-auto gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Books
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
}