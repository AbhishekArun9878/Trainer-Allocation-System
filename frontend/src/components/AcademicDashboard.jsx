import React from 'react';
import { useLocation } from 'react-router-dom';

const AcademicDashboard = () => {
  const location = useLocation();
  const { email } = location.state || { email: 'Guest' }; // Default to 'Guest' if email is not provided

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 p-4 flex justify-between items-center">
        <div className="text-white text-xl font-bold">Academic Dashboard</div>
        <button
          onClick={() => console.log('Logout clicked')}
          className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </nav>

      {/* Main Content */}
      <div className="flex-grow p-8">
        <h1 className="text-2xl font-bold">Welcome, {email}</h1>
        <p className="mt-4">Here you can manage academic-related tasks.</p>
      </div>
    </div>
  );
};

export default AcademicDashboard;