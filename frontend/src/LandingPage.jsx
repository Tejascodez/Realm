import React, { useEffect } from "react";
import { motion, useAnimation, useScroll, useTransform } from "framer-motion";
import Carosel from "./components/Carosel";
import Navbar from "./components/Navbar";
import FeaturedBooks from "./components/FeaturedBooks";

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
      y: -10, 
      boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.15), 0 10px 10px -5px rgba(59, 130, 246, 0.08)" 
    }
  };
  
  const buttonVariants = {
    hover: { 
      scale: 1.05,
      boxShadow: "0 10px 15px -3px rgba(59, 130, 246, 0.4), 0 4px 6px -2px rgba(59, 130, 246, 0.1)",
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      }
    },
    tap: { scale: 0.95 }
  };

  const categories = [
    { name: "Fiction", desc: "Novels and stories from various genres", icon: "📚" },
    { name: "Non-fiction", desc: "Informative and factual books", icon: "📖" },
    { name: "Science", desc: "Scientific topics and discoveries", icon: "🔬" },
    { name: "Fantasy", desc: "Magic and mythical adventures", icon: "🐉" },
    { name: "History", desc: "Historical events and figures", icon: "🏛️" },
    { name: "Technology", desc: "Innovation and the digital world", icon: "💻" },
  ];

  const stats = [
    { number: "10,000+", label: "Books Available", icon: "📚" },
    { number: "50,000+", label: "Active Readers", icon: "👥" },
    { number: "500+", label: "New Releases Monthly", icon: "⭐" },
    { number: "24/7", label: "Customer Support", icon: "🛟" }
  ];

  const features = [
    {
      icon: "📱",
      title: "Cross-Platform Access",
      description: "Read on any device - phone, tablet, or computer. Your library syncs everywhere.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: "🔍",
      title: "Smart Search",
      description: "Find exactly what you're looking for with our AI-powered search and recommendations.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: "💾",
      title: "Offline Reading",
      description: "Download books for offline reading. Perfect for travel or areas with poor connectivity.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: "🎨",
      title: "Customizable Experience",
      description: "Adjust fonts, themes, and reading settings to create your perfect reading environment.",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Navbar */}
      <Navbar/>

      {/* Hero Section with Parallax */}
      <Carosel/>

      {/* Featured Books */}
      <FeaturedBooks/>

      {/* Stats Section */}
      <motion.section 
        className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Trusted by Readers Worldwide
            </h2>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">
              Join thousands of book lovers who have discovered their next favorite read with REALM
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            variants={staggerContainer}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                variants={cardVariants}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-blue-100 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        className="py-20 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Why Choose <span className="text-blue-600">REALM</span>?
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              We've built the ultimate reading experience with features designed for modern book lovers
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
            variants={staggerContainer}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200"
                variants={cardVariants}
                whileHover="hover"
              >
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br  ₹{feature.color} flex items-center justify-center text-2xl shadow-lg`}>
                      {feature.icon}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold text-slate-800 group-hover:text-blue-600 transition-colors duration-300">
                        {feature.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                <div className={`absolute inset-0 bg-gradient-to-br  ₹{feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Reading Experience Showcase */}
      <motion.section 
        className="py-20 bg-gradient-to-br from-slate-50 to-blue-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp}>
                <h2 className="text-4xl font-bold text-slate-800 mb-6">
                  Immersive Reading Experience
                </h2>
                <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                  Discover a new way to read with our advanced digital platform. From highlighting and note-taking to progress tracking and reading goals, every feature is designed to enhance your reading journey.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-slate-700">Personalized reading recommendations</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-slate-700">Advanced highlighting and note-taking</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-slate-700">Reading progress and goal tracking</span>
                  </div>
                </div>
                <motion.button 
                  className="mt-8 bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Reading Today
                </motion.button>
              </motion.div>
              
              <motion.div 
                className="relative"
                variants={fadeInUp}
              >
                <div className="bg-white rounded-2xl shadow-2xl p-8 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                  <div className="mb-6">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-blue-500 rounded-full mr-3"></div>
                      <div>
                        <div className="text-sm font-semibold text-slate-800">The Great Gatsby</div>
                        <div className="text-xs text-slate-500">by F. Scott Fitzgerald</div>
                      </div>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg text-sm text-slate-700 leading-relaxed">
                      "In his blue gardens men and girls came and went like moths among the whisperings and the champagne and the stars..."
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Reading Progress</span>
                      <span className="text-sm font-semibold text-blue-600">68%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full w-2/3"></div>
                    </div>
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>Chapter 7</span>
                      <span>2h 15m remaining</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Categories */}
      <motion.section
        className="bg-gradient-to-br from-slate-50 to-white py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-6">
          <motion.h3
            className="text-4xl font-bold mb-16 text-center text-slate-800 tracking-tight"
            variants={fadeInUp}
          >
            Browse Categories
          </motion.h3>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
          >
            {categories.map((cat, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
                className="bg-white p-8 rounded-2xl shadow-xl border border-slate-200 hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="flex justify-center mb-6">
                  <div className="text-5xl transition-transform duration-300 group-hover:scale-125">
                    {cat.icon}
                  </div>
                </div>
                <h4 className="text-xl font-semibold text-center text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors duration-300">
                  {cat.name}
                </h4>
                <p className="text-center text-slate-600 text-sm leading-relaxed">
                  {cat.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Subscription Section */}
      <motion.section 
        className="bg-white py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="text-center mb-12"
              variants={fadeInUp}
            >
              <h3 className="text-3xl font-bold mb-4 text-slate-800">
                Choose Your <span className="text-blue-600">Plan</span>
              </h3>
              <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                Unlock unlimited access to thousands of ebooks with our flexible subscription plans.
              </p>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
              variants={staggerContainer}
            >
              <motion.div 
                className="bg-white p-8 rounded-xl border-2 border-slate-200 hover:border-blue-300 transition-colors duration-300"
                variants={cardVariants}
                whileHover="hover"
              >
                <div className="text-center mb-6">
                  <h4 className="text-xl font-semibold mb-2 text-slate-800">Monthly Plan</h4>
                  <div className="text-4xl font-bold text-blue-600 mb-4">
                     ₹9.99<span className="text-lg text-slate-500 font-normal">/month</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-slate-600">
                    <svg className="h-5 w-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Access to 10,000+ ebooks
                  </li>
                  <li className="flex items-center text-slate-600">
                    <svg className="h-5 w-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    3 simultaneous rentals
                  </li>
                  <li className="flex items-center text-slate-600">
                    <svg className="h-5 w-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Standard support
                  </li>
                </ul>
                <motion.button 
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get Started
                </motion.button>
              </motion.div>
              
              <motion.div 
                className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl border-2 border-blue-200 relative overflow-hidden"
                variants={cardVariants}
                whileHover="hover"
              >
                <div className="absolute -right-8 -top-8 bg-blue-600 text-white text-sm font-bold px-8 py-2 rotate-45">
                  POPULAR
                </div>
                <div className="text-center mb-6">
                  <h4 className="text-xl font-semibold mb-2 text-slate-800">Yearly Plan</h4>
                  <div className="text-4xl font-bold text-blue-600 mb-4">
                     ₹89.99<span className="text-lg text-slate-500 font-normal">/year</span>
                  </div>
                  <p className="text-sm text-green-600 font-medium">Save 25%</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-slate-600">
                    <svg className="h-5 w-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Access to 10,000+ ebooks
                  </li>
                  <li className="flex items-center text-slate-600">
                    <svg className="h-5 w-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    5 simultaneous rentals
                  </li>
                  <li className="flex items-center text-slate-600">
                    <svg className="h-5 w-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Priority support
                  </li>
                  <li className="flex items-center text-slate-600">
                    <svg className="h-5 w-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Early access to new releases
                  </li>
                </ul>
                <motion.button 
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get Started
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
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