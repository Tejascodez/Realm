import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function MyRentals() {
    const navigate = useNavigate();
    const [rentals, setRentals] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchRentals = async () => {
        try {
          const response = await axios.get('http://localhost:3000/api/rentals');
          const formatted = response.data.map((order) => ({
            id: order._id,
            title: order.bookId?.title || 'Untitled',
            author: order.bookId?.author || 'Unknown',
            coverImage: order.bookId?.coverImage || '/api/placeholder/250/350',
            rentedDate: new Date(order.createdAt).toISOString().split('T')[0],
            expiryDate: new Date(order.expiresAt).toISOString().split('T')[0],
            progress: Math.floor(Math.random() * 100), // Or use real progress if available
          }));
          setRentals(formatted);
          setLoading(false);
        } catch (err) {
          console.error('Failed to fetch rentals:', err);
          setLoading(false);
        }
      };
  
      fetchRentals();
    }, []);

    const handleStartReading = (id) => {
      navigate(`/read/${id}`);
    };
  
  return (
    <div className="min-h-screen bg-black text-white p-6 bg-gradient-to-b from-black to-gray-900">
      {/* Glowing pink accent at top */}
      <div className="absolute top-0 left-0 w-full h-1 bg-pink-500 shadow-lg shadow-pink-500/50"></div>
      
      {/* Header */}
      <header className="flex justify-between items-center mb-12 mt-4">
        <button
          onClick={() => navigate(-1)}
          className="text-pink-400 flex items-center space-x-2 hover:text-pink-300 transition-colors group"
        >
          <span className="text-xl group-hover:-translate-x-1 transition-transform">&larr;</span>
          <span>Back</span>
        </button>
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-pink-600">My Rentals</h1>
        <div className="w-20"></div> {/* Empty div for flex spacing */}
      </header>

      {/* Main Content */}
      <main>
        {loading ? (
          <div className="flex justify-center items-center h-64 ">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-pink-400">Loading your collection...</p>
            </div>
          </div>
        ) : rentals.length === 0 ? (
          <div className="text-center py-16 border border-pink-600 rounded-2xl bg-gray-900 shadow-lg shadow-pink-500/20">
            <p className="text-xl text-gray-400 mb-6">You haven't rented any books yet</p>
            <button 
              onClick={() => navigate('/browse')}
              className="bg-gradient-to-r from-pink-500 to-pink-600 text-black px-8 py-3 rounded-full hover:from-pink-600 hover:to-pink-700 transition-colors font-medium shadow-lg shadow-pink-500/30"
            >
              Browse Books
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 mx-30">
            {rentals.map((book) => (
              <div 
                key={book.id} 
                className="bg-gray-900 rounded-2xl p-4 border border-pink-600/50 transition-all hover:border-pink-400 shadow-lg hover:shadow-pink-500/30 group"
              >
                <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
                  {/* Book Cover */}
                  <div className="flex-shrink-0 rounded-lg overflow-hidden border-2 border-pink-400/80 h-64 w-full md:w-48 shadow-md shadow-pink-500/20 group-hover:shadow-pink-500/40 transition-all">
                    <img 
                      src={book.coverImage} 
                      alt={`${book.title} cover`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  
                  {/* Book Details */}
                  <div className="flex-1 bg-gray-900 rounded-lg p-6 relative">
                    <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-pink-500">{book.title}</h2>
                    <p className="text-lg text-gray-300 mb-6">by {book.author}</p>
                    
                    <div className="space-y-3 mb-16">
                      {/* Progress bar */}
                      <div className="w-full bg-gray-800 h-3 rounded-full overflow-hidden shadow-inner">
                        <div 
                          className="bg-gradient-to-r from-pink-400 to-pink-600 h-full rounded-full relative"
                          style={{ width: `${book.progress}%` }}
                        >
                          <div className="absolute right-0 top-0 h-full w-2 bg-pink-300 animate-pulse"></div>
                        </div>
                      </div>
                      <p className="text-sm text-pink-300 font-medium">{book.progress}% completed</p>
                      
                      <div className="flex justify-between text-sm mt-4">
                        <p className="text-gray-400">Rented: <span className="text-pink-200">{book.rentedDate}</span></p>
                        <p className="text-gray-400">Expires: <span className="text-pink-200">{book.expiryDate}</span></p>
                      </div>
                    </div>
                    
                    <div className="absolute bottom-4 right-4 flex space-x-3">
                      <button 
                        className="border border-pink-500 text-pink-400 px-4 py-2 rounded-full hover:bg-pink-900/30 transition-all hover:text-pink-300 hover:border-pink-400"
                        onClick={() => navigate(`/rental-details/${book.id}`)}
                      >
                        Details
                      </button>
                      <button 
                        className="bg-gradient-to-r from-pink-500 to-pink-600 text-black px-6 py-2 rounded-full hover:from-pink-600 hover:to-pink-700 transition-all font-medium shadow-md shadow-pink-500/30 group-hover:shadow-pink-500/50"
                        onClick={() => handleStartReading(book.id)}
                      >
                        Continue Reading
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      
      {/* Bottom accent */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-70"></div>
    </div>
  );
}