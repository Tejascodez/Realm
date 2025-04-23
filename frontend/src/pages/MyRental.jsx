import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function MyRentals() {
  const navigate = useNavigate();
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data - replace with your actual API call
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      const mockRentals = [
        {
          id: '1',
          title: 'The Midnight Library',
          author: 'Matt Haig',
          coverImage: '/api/placeholder/250/350',
          rentedDate: '2025-04-15',
          expiryDate: '2025-05-15',
          progress: 23
        },
        {
          id: '2',
          title: 'Project Hail Mary',
          author: 'Andy Weir',
          coverImage: '/api/placeholder/250/350',
          rentedDate: '2025-04-10',
          expiryDate: '2025-05-10',
          progress: 78
        },
        {
          id: '3',
          title: 'Dune',
          author: 'Frank Herbert',
          coverImage: '/api/placeholder/250/350',
          rentedDate: '2025-04-20',
          expiryDate: '2025-05-20',
          progress: 5
        }
      ];
      setRentals(mockRentals);
      setLoading(false);
    }, 800);
  }, []);

  const handleStartReading = (id) => {
    navigate(`/read/${id}`);
  };

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
                  <div className="flex-1  rounded-lg p-6 relative">
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