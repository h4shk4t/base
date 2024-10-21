import React from "react";
import EigenLayerLogo from '../assets/eigenlayer-logo.svg'; // Add appropriate paths
import BaseLogo from '../assets/base-logo.svg';
import Link from 'next/link';

function Hero() {
  return (
    <section className="h-screen flex flex-col justify-center items-center bg-gradient-to-b from-purple-800 via-blue-900 to-black">
      <h1 className="text-5xl font-bold mb-4 text-white fade-in"> 
        Unlock the Power of Blockchain Analytics. 
      </h1>
      <p className="text-lg mb-8 text-center max-w-2xl text-white fade-in">
        Discover cutting-edge insights, manage decentralized protocols, and 
        optimize your blockchain with our futuristic analytics platform. 
      </p>
      <Link href="/createAirdrop">
      <button className="bg-blue-600 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg transition transform hover:scale-105 duration-300 mb-8">
        Get Started
      </button>
      </Link>
      <h3 className="text-2xl font-bold mb-4 text-white fade-in"> 
        Powered By
      </h3>
      {/* Powered by Logos Section */}
      <div className="flex justify-center items-center space-x-8 mt-6">
        {/* <img src={EigenLayerLogo} alt="EigenLayer" className="h-12 hover:opacity-80 transition-opacity duration-300" /> */}
        <img src="https://cdn.prod.website-files.com/65c8926a6b9399bd75cd1c02/661ee2fa17a584a2ea884221_Favicon-White%20(1).png" alt="Othentic" className="h-12 hover:opacity-80 transition-opacity duration-300" />
        {/* <img src={BaseLogo} alt="Base Blockchain" className="h-12 hover:opacity-80 transition-opacity duration-300" /> */}
      </div>
    </section>
  );
}

export default Hero;
