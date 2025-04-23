import React from "react";

export default function PaymentPage() {
  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col gap-6">
      <h1 className="text-4xl font-bold text-pink-500">BookHub Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Book Details */}
        <div className="bg-gray-900 rounded-2xl p-4 shadow-lg">
          <h2 className="text-2xl text-pink-400 font-semibold mb-4">Book Details</h2>
          <div className="flex flex-col gap-3">
            <div className="bg-gray-800 p-3 rounded-xl">
              <p className="text-lg font-semibold">Book Name: <span className="text-pink-300">Atomic Habits</span></p>
              <p className="text-sm">Author: James Clear</p>
              <p className="text-sm">Price: ₹299</p>
            </div>
          </div>

          <h3 className="text-xl mt-6 text-pink-300 font-medium">More Like This</h3>
          <div className="grid grid-cols-2 gap-3 mt-2">
            <div className="bg-gray-800 rounded-lg p-2 text-center text-sm">Deep Work</div>
            <div className="bg-gray-800 rounded-lg p-2 text-center text-sm">The Power of Habit</div>
          </div>
        </div>

        {/* Payment Gateway */}
        <div className="bg-gray-900 rounded-2xl p-4 shadow-lg">
          <h2 className="text-2xl text-pink-400 font-semibold mb-4">Payment Gateway</h2>
          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Card Holder Name"
              className="p-3 rounded-lg bg-gray-800 text-white border border-pink-500 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Card Number"
              className="p-3 rounded-lg bg-gray-800 text-white border border-pink-500 focus:outline-none"
            />
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="MM/YY"
                className="p-3 w-1/2 rounded-lg bg-gray-800 text-white border border-pink-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder="CVV"
                className="p-3 w-1/2 rounded-lg bg-gray-800 text-white border border-pink-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="bg-pink-600 hover:bg-pink-700 text-white p-3 rounded-lg font-bold text-lg"
            >
              Pay ₹299
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
