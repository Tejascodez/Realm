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
  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <button
          onClick={() => navigate(-1)}
          className="text-pink-400 flex items-center space-x-2 hover:text-pink-300 transition-colors"
        >
          <span className="text-xl">&larr;</span>
          <span>Back</span>
        </button>
        <h1 className="text-2xl font-bold text-pink-500">My Rentals</h1>
        <div className="w-20"></div> {/* Empty div for flex spacing */}
      </header>

      {/* Main Content */}
      <main>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse text-pink-400">Loading your books...</div>
          </div>
        ) : rentals.length === 0 ? (
          <div className="text-center py-16 border border-pink-600 rounded-2xl bg-gray-900">
            <p className="text-xl text-gray-400 mb-4">You haven't rented any books yet</p>
            <button 
              onClick={() => navigate('/browse')}
              className="bg-pink-500 text-black px-6 py-3 rounded-full hover:bg-pink-600 transition-colors"
            >
              Browse Books
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {rentals.map((book) => (
              <div key={book.id} className="bg-gray-900 rounded-2xl p-6 border border-pink-600 transition-all hover:border-pink-400">
                <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
                  {/* Book Cover */}
                  <div className="flex-shrink-0 rounded-lg overflow-hidden border border-pink-400 h-64 w-full md:w-48">
                    <img 
                      src={book.coverImage} 
                      alt={`${book.title} cover`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  
                  {/* Book Details */}
                  <div className="flex-1 border border-pink-400 rounded-lg p-6 relative">
                    <h2 className="text-2xl font-bold text-pink-300">{book.title}</h2>
                    <p className="text-lg text-gray-300 mb-4">by {book.author}</p>
                    
                    <div className="space-y-3 mb-16">
                      {/* Progress bar */}
                      <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-pink-500 h-full rounded-full" 
                          style={{ width: `${book.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-400">{book.progress}% completed</p>
                      
                      <div className="flex justify-between text-sm text-gray-400">
                        <p>Rented: {book.rentedDate}</p>
                        <p>Expires: {book.expiryDate}</p>
                      </div>
                    </div>
                    
                    <div className="absolute bottom-4 right-4 flex space-x-3">
                      <button 
                        className="border border-pink-500 text-pink-500 px-4 py-2 rounded-full hover:bg-pink-900 hover:bg-opacity-30 transition-all"
                        onClick={() => navigate(`/rental-details/${book.id}`)}
                      >
                        Details
                      </button>
                      <button 
                        className="bg-pink-500 text-black px-6 py-2 rounded-full hover:bg-pink-600 transition-all font-medium"
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
    </div>
  );
}