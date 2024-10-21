import React from "react";
import Link from 'next/link';

function Navbar() {
  return (
    <nav className="flex justify-between items-center py-4 px-8 bg-black shadow-lg">
      <h1 className="text-2xl font-bold text-white">BaseDrop</h1>
      <ul className="flex space-x-8">
        <li className="text-white hover:text-gray-300 transition duration-300 cursor-pointer">Home</li>
        <li className="text-white hover:text-gray-300 transition duration-300 cursor-pointer">About</li>
        <Link href="/checkEligibility">
        <li className="text-white hover:text-gray-300 transition duration-300 cursor-pointer">Claim</li>
        </Link>
        <li className="text-white hover:text-gray-300 transition duration-300 cursor-pointer">Contact</li>
      </ul>
      <div className="md:hidden flex items-center">
        <button className="text-white hover:text-gray-300 focus:outline-none">
          {/* Hamburger icon */}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
