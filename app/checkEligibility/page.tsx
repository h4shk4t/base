"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

const CLIENT_ID = "Ov23liiPa49iL2IoWe3H";

export default function GitHubCheck() {
  const [githubUsername, setGithubUsername] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [eligible, setEligible] = useState<boolean | null>(null); // null means not checked yet
  const router = useRouter();

  const checkEligibility = async () => {
    setIsLoading(true);
    // Simulate eligibility check (replace with actual API call)
    console.log(githubUsername);
    const res = await fetch('http://localhost:5000/api/check-eligibility', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: {githubUsername} }),
    });
    const data = await res.json();
    
    setEligible(data.eligible);
    setIsLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    checkEligibility();
  };

  function loginWithGithub ( ) {
    window.location.assign("https://github.com/login/oauth/authorize?client_id="+ CLIENT_ID);
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600 p-4">
        <div className="w-full max-w-md mx-auto bg-gray-900/60 backdrop-blur-md shadow-2xl border border-gray-700 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-center text-gray-100 mb-6">GitHub Eligibility Check</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="GitHub Username"
              value={githubUsername}
              onChange={(e) => setGithubUsername(e.target.value)}
              className="w-full bg-gray-800/50 border-gray-700 text-gray-100 placeholder-gray-400 focus:border-purple-400 focus:ring-purple-400 transition-all duration-300 p-3 rounded-lg"
              required
            />
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50"
              disabled={isLoading}
            >
              {isLoading ? 'Checking...' : 'Check Eligibility'}
            </button>
          </form>
          
          {eligible !== null && (
            <div className={`mt-4 text-center text-lg ${eligible ? 'text-green-400' : 'text-red-400'}`}>
              {eligible ? 'You are eligible!'  : 'Sorry, you are not eligible.'}
            </div>
          )}
          {eligible && (
            <button
              onClick={loginWithGithub}
              className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
            >
              Verify with GitHub
            </button>
          )}
        </div>
        
      </div>
      <Footer />
    </div>
  );
}
