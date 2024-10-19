import React from "react";
import Navbar from "./component/Navbar";
import Hero from "./component/Hero";
import Features from "./component/Features";
import Footer from "./component/Footer";

function App() {
  return (
    <div className="App bg-offwhite text-gray-900 transition-all duration-300 ease-in-out">
      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
}

// import NewPage from './components/NewPage'; // import the new page component

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/create" element={<NewPage />} />
//         {/* Other routes */}
//       </Routes>
//     </Router>
//   );
// }


export default App;
