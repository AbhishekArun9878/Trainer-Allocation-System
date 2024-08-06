import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    try {
      const response = await axios.get('http://localhost:4000/newtrainer/all');
      setTrainers(response.data);
    } catch (error) {
      console.error('Error fetching trainers:', error);
    }
  };

  const handleAddClick = () => {
    navigate("/addtrainer");
  };

  const handleAddAdminClick = () => {
    navigate("/addadmin");
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminToken');
    navigate('/adminlogin');
  };

  const handleAssignTrainer = () => {
    navigate('/trainer'); 
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/trainer/${id}`);
      fetchTrainers();
    } catch (error) {
      console.error('Error deleting trainer:', error);
    }
  };

  const handleEditClick = (trainer) => {
    navigate(`/edittrainer/${trainer._id}`);
  };

  const renderAvailability = (trainer) => {
    const today = new Date();
    const endDate = new Date(trainer.lastProjectEndDate);
    const breakStartDate = new Date(trainer.onBreakUntil);

    if (endDate && today > endDate && today < breakStartDate) {
      return (
        <span className="flex items-center">
          <div className="h-3 w-3 bg-red-500 rounded-full mr-2"></div>
          <span className="font-bold text-red-500">On Duty</span>
        </span>
      );
    } else if (trainer.onBreakUntil && today >= breakStartDate) {
      return (
        <span className="flex items-center">
          <div className="h-3 w-3 bg-gray-500 rounded-full mr-2"></div>
          <span className="font-bold text-gray-500">On Break</span>
        </span>
      );
    } else if (!trainer.available) {
      return (
        <span className="flex items-center">
          <div className="h-3 w-3 bg-red-500 rounded-full mr-2"></div>
          <span className="font-bold text-red-500">On Duty</span>
        </span>
      );
    } else {
      return (
        <span className="flex items-center">
          <div className="h-3 w-3 bg-green-500 rounded-full mr-2"></div>
          <span className="font-bold text-green-500">Available</span>
        </span>
      );
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundImage: 'linear-gradient(to bottom right, #4F46E5, #9059FF)' }}>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-lg font-bold">Admin Dashboard</div>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
      </nav>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-center text-white">Trainers List</h2>
          <div className="flex items-center">
            <button
              onClick={handleAddClick}
              className="bg-purple-800 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded flex items-center mr-4"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
              </svg>
              Add Trainer
            </button>
            <button
              onClick={handleAddAdminClick}
              className="bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center mr-4"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v14m7-7H5"></path>
              </svg>
              Add Admin
            </button>
            <button
              onClick={handleAssignTrainer}
              className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v14m7-7H5"></path>
              </svg>
              Assign Trainer
            </button>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <table className="min-w-full bg-gray-800">
            <thead>
              <tr className="bg-black">
                <th className="py-3 px-6 text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">Trainer Name</th>
                <th className="py-3 px-6 text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">Project Assigned</th>
                <th className="py-3 px-6 text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">Vertical</th>
                <th className="py-3 px-6 text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">Status</th>
                <th className="py-3 px-6 text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {trainers.map((trainer) => (
                <tr key={trainer._id} className="bg-gray-700">
                  <td className="py-4 px-6 whitespace-no-wrap text-sm leading-5 font-medium text-white">{trainer.name}</td>
                  <td className="py-4 px-6 whitespace-no-wrap text-sm leading-5 font-medium text-white">{trainer.projects.join(', ')}</td>
                  <td className="py-4 px-6 whitespace-no-wrap text-sm leading-5 font-medium text-white">{trainer.vertical}</td>
                  <td className="py-4 px-6 whitespace-no-wrap text-sm leading-5 font-medium text-white">{renderAvailability(trainer)}</td>
                  <td className="py-4 px-6 whitespace-no-wrap text-sm leading-5 font-medium text-white">
                    <button
                      onClick={() => handleEditClick(trainer)}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mr-2"
                    >
                      <svg
                        className="w-4 h-4 mr-1 inline-block"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v12m6-6H6"></path>
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(trainer._id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                    >
                      <svg
                        className="w-4 h-4 mr-1 inline-block"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard