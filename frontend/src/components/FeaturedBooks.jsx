import fb1 from '../assets/fb/fb1.png'
import fb2 from '../assets/fb/fb2.png'
import fb3 from '../assets/fb/fb3.png'

export default function FeaturedBooks() {
  const books = [
    { 
      id: 1, 
      title: "The Silent Echo", 
      author: "Maya Shepherd",
      price: " ₹250",
      originalPrice: " ₹499",
      ratings: 4.5,
      tags: ["Bestseller", "Mystery"],
      discount: 50,
      image: fb1
    },
    { 
      id: 2, 
      title: "Quantum Theory", 
      author: "Richard Dawkins",
      price: " ₹699",
      originalPrice: " ₹899",
      ratings: 4.7,
      tags: ["Science", "Physics"],
      discount: 46,
      image: fb2
    },
    { 
      id: 3, 
      title: "The Last Theorem", 
      author: "Samuel Johnson",
      price: " ₹597",
      originalPrice: " ₹990",
      ratings: 4.2,
      tags: ["Mathematics", "Classic"],
      discount: 45,
      image:fb3
    }
  ];

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={`full-${i}`} className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
          <defs>
            <linearGradient id="halfGrad">
              <stop offset="50%" stopColor="currentColor"/>
              <stop offset="50%" stopColor="lightgray"/>
            </linearGradient>
          </defs>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" fill="url(#halfGrad)"/>
        </svg>
      );
    }
    return stars;
  };

  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-800">Featured Books</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Discover our most popular titles handpicked for you</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {books.map((book) => (
            <div key={book.id} className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200 hover:border-blue-200 transition-colors">
              <div className="relative">
                <div className="absolute top-4 right-4 bg-red-500 text-white font-bold text-sm px-3 py-1 rounded-full shadow-md">
                  {book.discount}% OFF
                </div>

                <div className="relative h-60 overflow-hidden">
                  <img
                    src={book.image}
                    alt={`${book.title} book cover`}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="text-lg font-bold mb-1">{book.title}</div>
                      <div className="text-sm opacity-90">by {book.author}</div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {book.tags.map((tag, index) => (
                      <span key={index} className="bg-blue-100 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-xl font-bold text-slate-800 mb-2 line-clamp-1">{book.title}</h3>
                  <p className="text-slate-600 mb-4">By {book.author}</p>

                  <div className="flex justify-between items-center mb-5">
                    <div>
                      <span className="text-blue-600 font-bold text-xl">{book.price}</span>
                      <span className="text-slate-400 text-sm line-through ml-2">{book.originalPrice}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="flex mr-1">{renderStars(book.ratings)}</div>
                      <span className="text-slate-600 font-medium">{book.ratings}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button className="bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Rent Now
                    </button>
                    <button className="border border-slate-300 text-slate-700 py-3 rounded-xl hover:bg-slate-50 transition-colors font-medium flex items-center justify-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <button className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-full border border-blue-200 hover:bg-blue-50 transition-colors shadow-sm hover:shadow-md flex items-center mx-auto gap-2">
            View All Books
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
