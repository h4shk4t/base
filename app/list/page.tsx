"use client"
import { Check, Minus } from 'lucide-react'
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import { useState } from 'react';

type User = {
  id: number
  name: string
  role: string
  projects: number
  tasks: number
  performance: number
}

export default function UserList() {

  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);

  const handlePostRequest = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/contributors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: 'base-org' }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setResponseData(data);
    } catch (err:any) {
      setError(err.message);
    }
  };

  handlePostRequest();
  let sortedProducts ;  
  if ( responseData ){
    const entries = Object.entries(responseData);
    entries.sort((a, b) => b[1] - a[1]);
    sortedProducts = Object.fromEntries(entries);
    console.log(sortedProducts);
   
  } else { sortedProducts = responseData ; }
  const userRows = [];
  let i = -1 ;
  for (let key in sortedProducts ) {
    i += 1;
    userRows.push(
      <tr
        key={i} 
        className={i % 2 === 0 ? 'bg-gray-800/50' : 'bg-gray-900/50'}
      >
        <td className="px-4 py-4">
          <div className="flex items-center space-x-3">
            <span className="font-medium text-gray-200">{key}</span>
          </div>
        </td>
        <td className="px-4 py-4 text-center text-gray-300">{"Developer"}</td>
        <td className="px-4 py-4 text-center text-gray-300">{"base-org"}</td>
        <td className="px-4 py-4 text-center text-gray-300">{responseData[key]}</td>
        <td className="px-4 py-4 text-center text-gray-300">
          {responseData[key] >= 100 ? (
            <Check className="inline-block w-5 h-5 text-green-500" />
          ) : responseData[key] >= 10 ? (
            <Check className="inline-block w-5 h-5 text-yellow-500" />
          ) : (
            <Minus className="inline-block w-5 h-5 text-red-500" />
          )}
          <span className="ml-2">{responseData[key]/73}</span>
        </td>
      </tr>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600 p-4">
        <div className="max-w-6xl w-full bg-gray-900/60 backdrop-blur-md shadow-2xl border border-gray-700 rounded-xl transition-all duration-300 hover:shadow-purple-500/20 p-8">
          <div className="text-center space-y-4 mb-8">
            <p className="text-blue-300">Team Overview</p>
            <h2 className="text-4xl font-bold text-white">See all team members</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="px-4 py-2 text-left text-gray-300">Name</th>
                  <th className="px-4 py-2 text-center text-gray-300">Role</th>
                  <th className="px-4 py-2 text-center text-gray-300">Projects</th>
                  <th className="px-4 py-2 text-center text-gray-300">Tasks</th>
                  <th className="px-4 py-2 text-center text-gray-300">Performance</th>
                </tr>
              </thead>
              <tbody>
                {userRows.length > 0 ? userRows : (
                  <tr>
                    <td colSpan="5" className="text-center text-gray-300 py-4">
                      No team members available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>  
      </div>
      <Footer />
    </div>
  );

}