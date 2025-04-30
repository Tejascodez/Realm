import { useState, useEffect } from 'react';
import {
  BookOpen,
  Heart,
  Skull,
  BookMarked,
  Wand2,
  Library,
} from 'lucide-react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const iconMap = {
  fiction: <BookOpen className="text-blue-400" />,
  romance: <Heart className="text-pink-400" />,
  'dark-romance': <Skull className="text-purple-400" />,
  'non-fiction': <BookMarked className="text-green-400" />,
  fantasy: <Wand2 className="text-amber-400" />,
  others: <Library className="text-gray-400" />,
  all: <Library className="text-white" />,
};

const categories = [
  'all',
  'fiction',
  'non-fiction',
  'romance',
  'dark-romance',
  'fantasy',
  'others',
];

export default function Category() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/api/books')
      .then((res) => res.json())
      .then((json) => {
        setBooks(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredBooks(books);
    } else {
      const filtered = books.filter(
        (book) => book.category.toLowerCase() === selectedCategory
      );
      setFilteredBooks(filtered);
    }
  }, [selectedCategory, books]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-t-pink-500 border-purple-500 rounded-full animate-spin"></div>
          <p className="text-purple-300 font-medium">Loading your books...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Back Button */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-purple-300 hover:text-pink-400 transition-colors duration-300 bg-gray-900 bg-opacity-50 px-4 py-2 rounded-full"
          >
            <ArrowLeft size={18} />
            <span>Back</span>
          </button>
        </div>

        <header className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-purple-400 capitalize">
            {selectedCategory === 'all' ? 'All Books' : selectedCategory.replace('-', ' ')}
          </h1>
          <p className="text-lg text-purple-300 max-w-2xl mx-auto">
            {selectedCategory === 'all'
              ? 'Explore a wide variety of books across all categories.'
              : `Browse our curated selection of ${selectedCategory.replace('-', ' ')} books.`}
          </p>
        </header>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-sm shadow-lg ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white scale-105 shadow-pink-700/20'
                  : 'bg-gray-800/70 text-purple-300 hover:bg-purple-800/80 hover:scale-105'
              }`}
            >
              {iconMap[cat]} 
              <span className="capitalize">{cat.replace('-', ' ')}</span>
            </button>
          ))}
        </div>

        {/* Book Grid */}
        {filteredBooks.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-purple-300">No books found in this category yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredBooks.map((book) => (
              <div
                key={book._id}
                className="group bg-gradient-to-br from-gray-900 to-purple-950 rounded-xl overflow-hidden shadow-lg border border-purple-900/50 hover:border-pink-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-900/30 flex flex-col"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-72 object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <h2 className="text-xl font-bold text-white mb-1 group-hover:text-pink-400 transition-colors duration-300">{book.title}</h2>
                  <p className="text-sm text-purple-300 mb-3">by {book.author}</p>
                  <p className="text-sm text-gray-400 line-clamp-3 mb-4 flex-grow">{book.description}</p>
                  <div className="flex justify-between items-center mt-auto">
                    <span className="text-lg font-semibold text-pink-400">${book.price.toFixed(2)}</span>
                    <button className="px-4 py-2 bg-purple-800/50 hover:bg-pink-600 text-white rounded-lg transition-colors duration-300">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Pagination placeholder - could be implemented */}
        {filteredBooks.length > 0 && (
          <div className="mt-12 flex justify-center">
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-800 text-purple-300 hover:bg-purple-700 transition-colors">
                &lt;
              </button>
              <button className="w-10 h-10 rounded-full flex items-center justify-center bg-pink-600 text-white">
                1
              </button>
              <button className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-800 text-purple-300 hover:bg-purple-700 transition-colors">
                2
              </button>
              <button className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-800 text-purple-300 hover:bg-purple-700 transition-colors">
                3
              </button>
              <button className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-800 text-purple-300 hover:bg-purple-700 transition-colors">
                &gt;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}