import React, { useState } from 'react';
import Swal from 'sweetalert2';

const RetailLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Both fields are required!',
      });
      return;
    }

    // Proceed with form submission
    console.log('Form submitted:', { email, password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#FF3CAC] via-[#562B7C] to-[#2B86C5] flex items-center justify-center">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-xl transform transition-transform hover:scale-105">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Retail Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-800 font-semibold mb-2">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-800 font-semibold mb-2">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-[#5f2c82] to-[#49a09d] text-white font-bold rounded-lg hover:opacity-80 transition-transform transform hover:scale-105"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default RetailLogin;