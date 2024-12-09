import React from 'react';
import Navbar from './Navbar';
const HomePage = () => {
  return (
    <>
    
<Navbar/>
    <div className="font-sans text-gray-800">
      {/* Hero Section */}
      <header className="bg-yellow-400 text-white text-center py-20">
        <h1 className="text-4xl font-bold mb-4">Welcome to GoParcel</h1>
        <p className="text-lg mb-6">Find and book experienced Delivery persons with ease and confidence.</p>
        <a
          href="#booking"
          className="bg-white text-yellow-500 py-3 px-6 rounded font-semibold hover:bg-gray-100 transition"
        >
          Book a Delivery Guy
        </a>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-8">Why Choose Us?</h2>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="w-full sm:w-1/3 bg-white p-6 border border-gray-200 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Experienced Professionals</h3>
            <p>Our deliveryPerson are skilled and experienced, ready to handle all your needs.</p>
          </div>
          <div className="w-full sm:w-1/3 bg-white p-6 border border-gray-200 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Transparent Pricing</h3>
            <p>No hidden fees or surprises—know the cost upfront before you book.</p>
          </div>
          <div className="w-full sm:w-1/3 bg-white p-6 border border-gray-200 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Quick and Easy Booking</h3>
            <p>Book a delivery service in just a few clicks with our user-friendly interface.</p>
          </div>
        </div>
      </section>



      {/* Footer Section */}
      <footer className="bg-gray-800 text-white text-center py-6">
        <p>&copy; 2024 GoParcel Booking Service. All rights reserved.</p>
      </footer>
    </div>
    
    </>
  );
};

export default HomePage;
