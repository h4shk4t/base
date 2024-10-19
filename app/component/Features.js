import React from "react";

function Features() {
  return (
    <section className="py-20 px-8 bg-black">
      <h2 className="text-4xl font-semibold text-center mb-10 text-white">Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 bg-purple-700 rounded-lg shadow-md hover:shadow-xl transition-transform duration-300 transform hover:scale-105">
          <h3 className="text-xl font-bold mb-4 text-white">Protocol Management</h3>
          <p className="text-gray-300">Manage decentralized protocols and streamline operations effortlessly.</p>
        </div>
        <div className="p-6 bg-blue-700 rounded-lg shadow-md hover:shadow-xl transition-transform duration-300 transform hover:scale-105">
          <h3 className="text-xl font-bold mb-4 text-white">DeFi Analytics</h3>
          <p className="text-gray-300">Gain deep insights into the performance of DeFi protocols and markets.</p>
        </div>
        <div className="p-6 bg-purple-600 rounded-lg shadow-md hover:shadow-xl transition-transform duration-300 transform hover:scale-105">
          <h3 className="text-xl font-bold mb-4 text-white">Incentive Optimization</h3>
          <p className="text-gray-300">Optimize your incentive models to maximize decentralized participation.</p>
        </div>
      </div>
    </section>
  );
}

export default Features;
