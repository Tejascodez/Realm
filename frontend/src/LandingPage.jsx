
import  { useEffect, useState } from "react";
import Carosel from "./components/Carosel";
import Navbar from "./components/Navbar";
import FeaturedBooks from "./components/FeaturedBooks";
import { FaBook, FaLaptopCode, FaHistory } from "react-icons/fa";
import { GiMagicGate, GiMicroscope } from "react-icons/gi";
import { HiOutlineDocumentText } from "react-icons/hi";
import { FaBookOpen, FaCloudDownloadAlt, FaUserFriends, FaRegBookmark } from "react-icons/fa";
import SubscriptionSection from "./components/SubcriptionSection";


export default function LandingPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger animations on load
    setIsLoaded(true);
  }, []);
const categories = [
  {
    name: "Fiction",
    desc: "Novels and stories from various genres",
    icon: <FaBook />,
    color: "text-purple-600",
  },
  {
    name: "Non-fiction",
    desc: "Informative and factual books",
    icon: <HiOutlineDocumentText />,
    color: "text-emerald-600",
  },
  {
    name: "Science",
    desc: "Scientific topics and discoveries",
    icon: <GiMicroscope />,
    color: "text-blue-600",
  },
  {
    name: "Fantasy",
    desc: "Magic and mythical adventures",
    icon: <GiMagicGate />,
    color: "text-pink-600",
  },
  {
    name: "History",
    desc: "Historical events and figures",
    icon: <FaHistory />,
    color: "text-yellow-600",
  },
  {
    name: "Technology",
    desc: "Innovation and the digital world",
    icon: <FaLaptopCode />,
    color: "text-indigo-600",
  },
];
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
  {categories.map((category, index) => (
    <div
      key={index}
      className="bg-white p-6 rounded-2xl shadow-md border border-slate-200 hover:shadow-lg transition"
    >
      <div className={`text-4xl mb-4 ${category.color}`}>
        {category.icon}
      </div>
      <h3 className="text-xl font-semibold text-slate-800">{category.name}</h3>
      <p className="text-slate-600">{category.desc}</p>
    </div>
  ))}
</div>

  const stats = [
    { number: "10,000+", label: "Books Available", icon: "📚" },
    { number: "50,000+", label: "Active Readers", icon: "👥" },
    { number: "500+", label: "New Releases Monthly", icon: "⭐" },
    { number: "24/7", label: "Customer Support", icon: "🛟" }
  ];

const features = [
  {
    title: "Unlimited Access",
    description: "Read any book, anytime with no restrictions or limits.",
    icon: <FaBookOpen />,
    color: "from-purple-400 to-indigo-600",
  },
  {
    title: "Offline Mode",
    description: "Download books and read offline wherever you are.",
    icon: <FaCloudDownloadAlt />,
    color: "from-blue-400 to-teal-500",
  },
  {
    title: "Community Driven",
    description: "Join a community of book lovers and share reviews.",
    icon: <FaUserFriends />,
    color: "from-green-400 to-emerald-600",
  },
  {
    title: "Bookmark & Highlight",
    description: "Save your favorite parts and resume where you left off.",
    icon: <FaRegBookmark />,
    color: "from-pink-400 to-rose-500",
  },
]

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }

        .animate-slide-in-left {
          animation: slideInLeft 0.6s ease-out forwards;
        }

        .animate-slide-in-right {
          animation: slideInRight 0.6s ease-out forwards;
        }

        .animate-scale-in {
          animation: scaleIn 0.6s ease-out forwards;
        }

        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }

        .stagger-delay-1 {
          animation-delay: 0.1s;
        }

        .stagger-delay-2 {
          animation-delay: 0.2s;
        }

        .stagger-delay-3 {
          animation-delay: 0.3s;
        }

        .stagger-delay-4 {
          animation-delay: 0.4s;
        }

        .stagger-delay-5 {
          animation-delay: 0.5s;
        }

        .stagger-delay-6 {
          animation-delay: 0.6s;
        }

        .hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .hover-lift:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 25px -5px rgba(59, 130, 246, 0.15), 0 10px 10px -5px rgba(59, 130, 246, 0.08);
        }

        .hover-scale {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .hover-scale:hover {
          transform: scale(1.05);
        }

        .hover-button {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .hover-button:hover {
          transform: scale(1.05);
          box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.4), 0 4px 6px -2px rgba(59, 130, 246, 0.1);
        }

        .hover-button:active {
          transform: scale(0.95);
        }

        .parallax-hero {
          transform: translateY(0);
          transition: transform 0.1s ease-out;
        }

        .initial-hidden {
          opacity: 0;
          transform: translateY(20px);
        }

        .progress-bar {
          background: linear-gradient(90deg, #3b82f6 0%, #3b82f6 68%, #e2e8f0 68%, #e2e8f0 100%);
          animation: progress-fill 2s ease-out;
        }

        @keyframes progress-fill {
          from {
            background: linear-gradient(90deg, #3b82f6 0%, #3b82f6 0%, #e2e8f0 0%, #e2e8f0 100%);
          }
          to {
            background: linear-gradient(90deg, #3b82f6 0%, #3b82f6 68%, #e2e8f0 68%, #e2e8f0 100%);
          }
        }

        .feature-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }

        .feature-card:hover .feature-icon {
          transform: scale(1.1);
        }

        .feature-card:hover .feature-title {
          color: #2563eb;
        }

        .feature-icon {
          transition: transform 0.3s ease;
        }

        .feature-title {
          transition: color 0.3s ease;
        }

        .category-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .category-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }

        .category-card:hover .category-icon {
          transform: scale(1.25);
        }

        .category-card:hover .category-title {
          color: #4f46e5;
        }

        .category-icon {
          transition: transform 0.3s ease;
        }

        .category-title {
          transition: color 0.3s ease;
        }

        .plan-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .plan-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }

        .plan-button {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .plan-button:hover {
          transform: scale(1.02);
        }

        .plan-button:active {
          transform: scale(0.98);
        }
      `}</style>

      {/* Navbar */}
      <Navbar/>

      {/* Hero Section */}
      <Carosel/>

      {/* Featured Books */}
      <FeaturedBooks/>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 py-20">
        <div className="container mx-auto px-6">
          <div className={`text-center mb-16 initial-hidden ${isLoaded ? 'animate-fade-in-up' : ''}`}>
            <h2 className="text-4xl font-bold text-white mb-4">
              Trusted by Readers Worldwide
            </h2>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">
              Join thousands of book lovers who have discovered their next favorite read with REALM
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`text-center hover-scale initial-hidden ${isLoaded ? 'animate-scale-in' : ''} stagger-delay-${index + 1}`}
              >
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-blue-100 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className={`text-center mb-16 initial-hidden ${isLoaded ? 'animate-fade-in-up' : ''}`}>
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Why Choose <span className="text-blue-600">REALM</span>?
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              We've built the ultimate reading experience with features designed for modern book lovers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`feature-card group relative overflow-hidden bg-white rounded-2xl shadow-lg border border-slate-200 initial-hidden ${isLoaded ? 'animate-fade-in-up' : ''} stagger-delay-${index + 1}`}
              >
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <div className={`feature-icon w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-2xl shadow-lg`}>
                      {feature.icon}
                    </div>
                    <div className="ml-4">
                      <h3 className="feature-title text-xl font-semibold text-slate-800">
                        {feature.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reading Experience Showcase */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className={`initial-hidden ${isLoaded ? 'animate-slide-in-left' : ''}`}>
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
                <button className="mt-8 bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-lg hover-button">
                  Start Reading Today
                </button>
              </div>
              
              <div className={`relative initial-hidden ${isLoaded ? 'animate-slide-in-right' : ''}`}>
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
                      <div className="progress-bar h-2 rounded-full"></div>
                    </div>
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>Chapter 7</span>
                      <span>2h 15m remaining</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-gradient-to-br from-slate-50 to-white py-20">
        <div className="container mx-auto px-6">
          <h3 className={`text-4xl font-bold mb-16 text-center text-slate-800 tracking-tight initial-hidden ${isLoaded ? 'animate-fade-in-up' : ''}`}>
            Browse Categories
          </h3>
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
  {categories.map((category, index) => (
    <div
      key={index}
      className="bg-white p-6 rounded-2xl shadow-md border border-slate-200 hover:shadow-lg transition"
    >
      <div className={`text-4xl mb-4 ${category.color}`}>
        {category.icon}
      </div>
      <h3 className="text-xl font-semibold text-slate-800">{category.name}</h3>
      <p className="text-slate-600">{category.desc}</p>
    </div>
  ))}
</div>

        </div>
      </section>

      {/* Subscription Section */}
       <SubscriptionSection/>

      {/* Footer */}
  <footer className="bg-gray-900 text-gray-400 py-4">
  <div className="container mx-auto px-6 text-center">
    <div className="mt-6 border-t border-gray-800 pt-4 text-sm">
      &copy; {new Date().getFullYear()} REALM. Developed by <span className="text-blue-400 font-medium">Tejas</span>.
    </div>
  </div>
</footer>
    </div>
  );
}