import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AddAdmin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const navigate = useNavigate(); 

  const validateForm = () => {
    const errors = { email: '', password: '' };
    let isValid = true;

    // Email validation regex: Accepts @gmail.com and @gmail.co.in
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.(com|co\.in))$/;

    if (!email) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(email)) {
      errors.email = 'Invalid email format';
      isValid = false;
    }

    if (!password) {
      errors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Post data to backend
        await axios.post('http://localhost:4000/admin/addadmin', { email, password });
        // Show success alert
        Swal.fire({
          title: 'Success!',
          text: 'Admin Added',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          navigate('/dashboard'); 
        });
        // Reset form fields
        setEmail('');
        setPassword('');
        setErrors({ email: '', password: '' });
      } catch (error) {
        // Show error alert for existing admin
        if (error.response && error.response.status === 400 && error.response.data.message === 'Admin already exists') {
          Swal.fire({
            title: 'Error!',
            text: 'An admin with this email already exists',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        } else {
          // Show general error alert
          Swal.fire({
            title: 'Error!',
            text: 'There was an error adding the admin',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-400 via-yellow-300 to-red-400 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add Admin</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-500'}`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-500'}`}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-orange-500 text-white font-semibold rounded-md shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            Add Admin
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAdmin;