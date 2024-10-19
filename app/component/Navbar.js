import React from "react";

function Navbar() {
  return (
    <nav className="flex justify-between items-center py-4 px-8 bg-black shadow-lg">
      <h1 className="text-xl font-bold text-white">OpenBlock Labs</h1>
      <ul className="flex space-x-6">
        <li className="text-white hover:text-purple-400 transition duration-300">Home</li>
        <li className="text-white hover:text-purple-400 transition duration-300">About</li>
        <li className="text-white hover:text-purple-400 transition duration-300">Features</li>
        <li className="text-white hover:text-purple-400 transition duration-300">Contact</li>
      </ul>
    </nav>
  );
}

export default Navbar;
