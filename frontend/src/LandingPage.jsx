import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import { motion, useAnimation, useScroll, useTransform, AnimatePresence } from "framer-motion";

export default function LandingPage() {
  const { scrollY } = useScroll();
  const controls = useAnimation();
  
  // Parallax effect for hero section
  const heroY = useTransform(scrollY, [0, 300], [0, -50]);
  
  useEffect(() => {
    // Trigger animation sequence on load
    const sequence = async () => {
      await controls.start("visible");
    };
    sequence();
  }, [controls]);

  const books = [
    { 
      id: 1, 
      title: "The Silent Echo", 
      author: "Maya Shepherd",
      price: "$4.99",
      ratings: 4.5
    },
    { 
      id: 2, 
      title: "Quantum Theory", 
      author: "Richard Dawkins",
      price: "$6.99",
      ratings: 4.7
    },
    { 
      id: 3, 
      title: "The Last Theorem", 
      author: "Samuel Johnson",
      price: "$5.99",
      ratings: 4.2
    },
    { 
      id: 4, 
      title: "Midnight's Children", 
      author: "Salman Rushdie",
      price: "$7.99",
      ratings: 4.8
    },
    { 
      id: 5, 
      title: "Dark Matter", 
      author: "Blake Crouch",
      price: "$3.99",
      ratings: 4.6
    },
    { 
      id: 6, 
      title: "The Alchemist", 
      author: "Paulo Coelho",
      price: "$4.99",
      ratings: 4.9
    }
  ];

  // Featured books for carousel
  const featuredBooks = books.slice(0, 3);
  
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 12 
      }
    },
    hover: { 
      y: -15, 
      boxShadow: "0 20px 25px -5px rgba(236, 72, 153, 0.1), 0 10px 10px -5px rgba(236, 72, 153, 0.04)" 
    }
  };
  
  const buttonVariants = {
    hover: { 
      scale: 1.05,
      boxShadow: "0 10px 15px -3px rgba(236, 72, 153, 0.4), 0 4px 6px -2px rgba(236, 72, 153, 0.1)",
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      }
    },
    tap: { scale: 0.95 }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Navbar */}
      <Navbar/>

      {/* Hero Section with Parallax */}
      <motion.section 
        style={{ y: heroY }}
        className="relative container mx-auto px-6 py-28 text-center"
      >
        <motion.div 
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.h2 
            className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Rent & Read
            <br />
            <motion.span 
              className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              eBooks Online
            </motion.span>
          </motion.h2>
          <motion.div 
            className="relative max-w-2xl mx-auto mt-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <input
              type="text"
              placeholder="Search for eBooks..."
              className="w-full px-6 py-4 rounded-full bg-gray-900 border border-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent placeholder-gray-400 transition-all duration-300 hover:bg-gray-800"
            />
            <motion.button 
              className="absolute right-2 top-2 bg-gradient-to-r from-pink-500 to-purple-500 p-2 rounded-full transition-transform duration-300"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Featured Books with Slider Animation */}
      <motion.section 
        className="container mx-auto px-6 py-8 border-b border-gray-800"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <motion.h2 
          className="text-2xl font-bold mb-6"
          variants={fadeInUp}
        >
          Featured Books
        </motion.h2>
        <motion.div 
          className="relative w-full overflow-hidden rounded-xl bg-gray-900 p-6"
          variants={staggerContainer}
        >
          <motion.div 
            className="flex items-center space-x-8"
            initial={{ x: 300 }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 50 }}
          >
            {featuredBooks.map((book, index) => (
              <motion.div 
                key={book.id} 
                className="flex-shrink-0 w-full md:w-1/3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover="hover"
                variants={cardVariants}
              >
                <div className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 p-6 rounded-xl border border-pink-500/30 h-full">
                  <motion.div 
                    className="w-full h-48 bg-gray-800 rounded-lg mb-4 flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-16 w-16 text-pink-400 opacity-60" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                      initial={{ rotate: 0 }}
                      whileHover={{ rotate: 10, scale: 1.1 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </motion.svg>
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-2">{book.title}</h3>
                  <p className="text-gray-400 mb-2">By {book.author}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-pink-400 font-bold">{book.price}</span>
                    <div className="flex items-center">
                      <motion.svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5 text-yellow-400" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                        initial={{ rotate: 0 }}
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{ duration: 0.8 }}
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </motion.svg>
                      <span className="ml-1 text-gray-300">{book.ratings}</span>
                    </div>
                  </div>
                  <motion.button 
                    className="bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-2 rounded-full transition-all duration-300"
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(236, 72, 153, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Rent Now
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <motion.button 
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black rounded-full p-2 text-white z-10"
            whileHover={{ scale: 1.2, backgroundColor: "rgba(0,0,0,0.9)" }}
            whileTap={{ scale: 0.9 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
          <motion.button 
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black rounded-full p-2 text-white z-10"
            whileHover={{ scale: 1.2, backgroundColor: "rgba(0,0,0,0.9)" }}
            whileTap={{ scale: 0.9 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </motion.div>
      </motion.section>

      {/* Categories with SVG Icons */}
      <motion.section 
        className="container mx-auto px-6 py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <motion.h3 
          className="text-3xl font-bold mb-12 text-center"
          variants={fadeInUp}
        >
          Categories
        </motion.h3>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={staggerContainer}
        >
          {[
            { 
              name: "Fiction", 
              desc: "Novels and stories from various genres", 
              svg: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
              )
            },
            { 
              name: "Non-fiction", 
              desc: "Informative and factual books", 
              svg: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
              )
            },
            { 
              name: "Science", 
              desc: "Scientific topics and discoveries", 
              svg: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <path d="M9 18v-7"></path>
                  <path d="M15 18v-7"></path>
                  <path d="M9 14h6"></path>
                </svg>
              )
            },
            { 
              name: "Fantasy", 
              desc: "Magic and mythical adventures", 
              svg: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a3 3 0 0 0-3 3v1h6V5a3 3 0 0 0-3-3Z"></path>
                  <path d="M19 5H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z"></path>
                  <path d="M17 11v3a4 4 0 0 1-4 4h-2a4 4 0 0 1-4-4v-3"></path>
                  <path d="M11.35 15H8"></path>
                  <path d="M16 15h-2.35"></path>
                </svg>
              )
            },
            { 
              name: "History", 
              desc: "Historical events and figures", 
              svg: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              )
            },
            { 
              name: "Technology", 
              desc: "Innovation and digital world", 
              svg: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
              )
            },
          ].map((cat, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover="hover"
              custom={index}
            >
              <Link
                to={`/books?category=${encodeURIComponent(cat.name)}`}
                className="p-8 bg-gray-900 rounded-2xl border border-gray-800 hover:border-pink-500/40 hover:shadow-lg hover:shadow-pink-500/10 transition-all duration-300 cursor-pointer group block"
              >
                <motion.div 
                  className="mb-6 text-pink-400 transform transition-transform duration-500 group-hover:text-pink-300"
                  whileHover={{ rotate: 12 }}
                >
                  <motion.div 
                    className="w-16 h-16"
                    whileHover={{ scale: 1.1 }}
                  >{cat.svg}</motion.div>
                </motion.div>
                <h4 className="text-2xl font-semibold mb-3">{cat.name}</h4>
                <p className="text-gray-400 text-lg">{cat.desc}</p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-6 text-center">
          <motion.h3 
            className="text-4xl font-bold mb-8"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Start Your Reading Journey
          </motion.h3>
          <motion.div 
            className="flex justify-center gap-6"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <motion.button 
              className="bg-gradient-to-r from-pink-500 to-purple-500 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Explore Library
            </motion.button>
            <motion.button 
              className="px-8 py-4 rounded-full text-lg font-semibold border-2 border-pink-500 transition-all duration-300"
              variants={buttonVariants}
              whileHover={{ scale: 1.05, borderColor: "rgba(236, 72, 153, 0.8)" }}
              whileTap="tap"
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* Subscription Section */}
      <motion.section 
        className="container mx-auto px-6 py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <div className="flex flex-col md:flex-row items-center gap-12 max-w-6xl mx-auto">
          <motion.div 
            className="flex-1"
            variants={fadeInUp}
          >
            <h3 className="text-4xl font-bold mb-6">
              <motion.span 
                className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Subscribe
              </motion.span> to our plans
            </h3>
            <p className="text-gray-300 mb-8 text-lg">
              Unlock unlimited access to thousands of ebooks with our flexible subscription plans. Choose what works best for you.
            </p>
            <motion.div 
              className="space-y-4"
              variants={staggerContainer}
            >
              {[
                "Access to over 10,000 ebooks",
                "Read from any device",
                "New releases every week",
                "Cancel anytime",
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center"
                  variants={fadeInUp}
                  custom={index}
                >
                  <motion.svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 text-pink-400 mr-3" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, delay: index * 0.1 + 0.5 }}
                  >
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </motion.svg>
                  <span>{item}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={staggerContainer}
          >
            <motion.div 
              className="p-6 bg-gray-900 rounded-xl border border-gray-800 transition-all duration-300"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="text-lg font-semibold mb-1">Monthly</div>
              <div className="text-3xl font-bold mb-4">
                <span className="text-pink-400">$9.99</span>
                <span className="text-sm text-gray-400">/month</span>
              </div>
              <ul className="text-gray-400 space-y-2 mb-6">
                <li>1 active rental at a time</li>
                <li>10 books per month</li>
                <li>Basic support</li>
              </ul>
              <motion.button 
                className="w-full py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-300"
                whileHover={{ scale: 1.03, boxShadow: "0 10px 15px -3px rgba(236, 72, 153, 0.4)" }}
                whileTap={{ scale: 0.97 }}
              >
                Subscribe Now
              </motion.button>
            </motion.div>
            
            <motion.div 
              className="p-6 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-xl border border-pink-500/50 shadow-lg transition-all duration-300 relative overflow-hidden"
              variants={cardVariants}
              whileHover="hover"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <motion.div 
                className="absolute -right-6 -top-6 bg-pink-500 text-white text-xs font-bold px-8 py-1 rotate-45"
                animate={{ 
                  backgroundColor: ["#ec4899", "#a855f7", "#ec4899"],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                POPULAR
              </motion.div>
              <div className="text-lg font-semibold mb-1">Yearly</div>
              <div className="text-3xl font-bold mb-4">
                <span className="text-pink-400">$89.99</span>
                <span className="text-sm text-gray-400">/year</span>
              </div>
              <ul className="text-gray-300 space-y-2 mb-6">
                <li>3 active rentals at a time</li>
                <li>Unlimited books</li>
                <li>Priority support</li>
                <li>Early access to new titles</li>
              </ul>
              <motion.button 
                className="w-full py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 shadow-lg shadow-pink-500/30"
                whileHover={{ scale: 1.03, boxShadow: "0 10px 15px -3px rgba(236, 72, 153, 0.4)" }}
                whileTap={{ scale: 0.97 }}
              >
                Subscribe Now
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                REALM
              </h2>
              <p className="text-gray-400 mt-2">Your digital library, anywhere.</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                </svg>
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} REALM. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}