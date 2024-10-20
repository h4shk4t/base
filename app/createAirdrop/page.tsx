"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

export default function Component() {
  const [name, setName] = useState('');
  const [isSliding, setIsSliding] = useState(false);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSliding(true); // Trigger animation
    setTimeout(() => {
      // After animation ends, navigate to the new page
      router.push('/list'); // Replace with your target route
    }, 800); // Set the timeout duration to match animation time
  };

  return (
    <div>
      <Navbar />
      <div className={`min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600 p-4 
        ${isSliding ? 'slide-out' : ''}`}>
        <div className="w-full max-w-md mx-auto bg-gray-900/60 backdrop-blur-md shadow-2xl border border-gray-700 rounded-xl transition-all duration-300 hover:shadow-purple-500/20">
          <div className="text-2xl font-bold text-center text-gray-100 p-6">Create Profile</div>
          <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-800/50 border-gray-700 text-gray-100 placeholder-gray-400 focus:border-purple-400 focus:ring-purple-400 transition-all duration-300 p-3 rounded-lg"
              />
            </div>
            <div className="p-6">
              <button 
                type="submit" 
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
      <style jsx>{`
        .slide-out {
          animation: slideOut 0.8s forwards;
        }
        @keyframes slideOut {
          0% {
            transform: translateX(0);
            opacity: 1;
          }
          100% {
            transform: translateX(-100%);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
