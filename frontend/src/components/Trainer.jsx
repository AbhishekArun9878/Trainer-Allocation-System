import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Trainer = () => {
  const [trainers, setTrainers] = useState([]);
  const [selectedVertical, setSelectedVertical] = useState("Academic OU");
  const [navbarTitle, setNavbarTitle] = useState("Academic OU");
  const [selectedProject, setSelectedProject] = useState({});
  const [selectedTime, setSelectedTime] = useState({});
  const [selectedStartDate, setSelectedStartDate] = useState({});
  const [selectedEndDate, setSelectedEndDate] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    try {
      const response = await axios.get("http://localhost:4000/trainer");
      setTrainers(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAssignClick = async (trainerId) => {
    const project = selectedProject[trainerId];
    const time = selectedTime[trainerId];
    const startDate = selectedStartDate[trainerId];
    const endDate = selectedEndDate[trainerId];

    if (!project || !time || !startDate || !endDate) {
      alert("Please fill in all fields before assigning.");
      return;
    }

    try {
      await axios.patch(`http://localhost:4000/trainer/${trainerId}/assign`, {
        projectName: project,
        timeSlot: time,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      });

      // Remove assigned trainer from trainers state
      setTrainers((prevTrainers) =>
        prevTrainers.filter((trainer) => trainer._id !== trainerId)
      );

      // Reset form fields and options
      setSelectedProject({
        ...selectedProject,
        [trainerId]: "",
      });
      setSelectedTime({
        ...selectedTime,
        [trainerId]: "",
      });
      setSelectedStartDate({
        ...selectedStartDate,
        [trainerId]: null,
      });
      setSelectedEndDate({
        ...selectedEndDate,
        [trainerId]: null,
      });

      // Optionally fetch trainers again to update the list
      fetchTrainers();

      alert("Trainer assigned successfully!");
      navigate("/trainerdashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to assign trainer. Please try again.");
    }
  };

  const handleVerticalChange = (vertical, title) => {
    setSelectedVertical(vertical);
    setNavbarTitle(title);
  };

  const handleProjectChange = (trainerId, project) => {
    setSelectedProject({
      ...selectedProject,
      [trainerId]: project,
    });
  };

  const handleTimeChange = (trainerId, time) => {
    setSelectedTime({
      ...selectedTime,
      [trainerId]: time,
    });
  };

  const handleStartDateChange = (trainerId, date) => {
    setSelectedStartDate({
      ...selectedStartDate,
      [trainerId]: date,
    });
  };

  const handleEndDateChange = (trainerId, date) => {
    setSelectedEndDate({
      ...selectedEndDate,
      [trainerId]: date,
    });
  };

  return (
    <div>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-center items-center">
          <div className="text-white text-lg font-bold">
            Trainer Allocation System
          </div>
        </div>
      </nav>
      <div className="container mx-auto p-4">
        <div className="mt-8">
          <div className="flex justify-around my-4">
            <button
              onClick={() =>
                handleVerticalChange("Academic OU", "Academic OU")
              }
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Academic OU
            </button>
            <button
              onClick={() =>
                handleVerticalChange("Retail OU", "Retail OU")
              }
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Retail OU
            </button>
            <button
              onClick={() =>
                handleVerticalChange("Corporate OU", "Corporate OU")
              }
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Corporate OU
            </button>
            <button
              onClick={() =>
                handleVerticalChange("Government OU", "Government OU")
              }
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Government OU
            </button>
          </div>
          <h1 className="text-2xl font-bold text-center mb-4">{navbarTitle}</h1>
          <div className="bg-black rounded-lg overflow-hidden">
            <table className="min-w-full bg-black divide-y divide-gray-400">
              <thead>
                <tr className="bg-gray-400">
                  <th className="py-2 px-4 border-b border-gray-200 text-left text-sm leading-4 font-medium text-black-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left text-sm leading-4 font-medium text-black-600 uppercase tracking-wider">
                    Projects
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left text-sm leading-4 font-medium text-black-600 uppercase tracking-wider">
                    Session
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left text-sm leading-4 font-medium text-black-600 uppercase tracking-wider">
                    Start Date
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left text-sm leading-4 font-medium text-black-600 uppercase tracking-wider">
                    End Date
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200"></th>
                </tr>
              </thead>
              <tbody>
                {trainers
                  .filter(
                    (trainer) =>
                      trainer.vertical === selectedVertical && trainer.available
                  )
                  .map((trainer) => (
                    <tr key={trainer._id} className="bg-gray-700">
                      <td className="py-2 px-4 border-b border-gray-200 text-sm leading-5 font-medium text-white">
                        {trainer.name}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 text-sm leading-5 font-medium text-white">
                        <select
                          onChange={(e) =>
                            handleProjectChange(trainer._id, e.target.value)
                          }
                          className="bg-gray-800 border border-gray-300 text-gray-300 py-2 px-4 rounded focus:outline-none focus:border-gray-500"
                          style={{ width: "200px" }}
                        >
                          <option value="">Select Project</option>
                          {trainer.projects.map((project, index) => (
                            <option key={index} value={project}>
                              {project}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 text-sm leading-5 font-medium text-white">
                        <select
                          onChange={(e) =>
                            handleTimeChange(trainer._id, e.target.value)
                          }
                          className="bg-gray-800 border border-gray-300 text-gray-300 py-2 px-4 rounded focus:outline-none focus:border-gray-500"
                        >
                          <option value="">Select Time</option>
                          <option value="forenoon">
                            Forenoon (9 AM - 12 PM)
                          </option>
                          <option value="afternoon">
                            Afternoon (1 PM - 4 PM)
                          </option>
                        </select>
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 text-sm leading-5 font-medium text-white">
                        <DatePicker
                          selected={selectedStartDate[trainer._id] || null}
                          onChange={(date) =>
                            handleStartDateChange(trainer._id, date)
                          }
                          dateFormat="yyyy-MM-dd"
                          className="bg-gray-800 border border-gray-300 text-gray-300 py-2 px-4 rounded focus:outline-none focus:border-gray-500"
                        />
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 text-sm leading-5 font-medium text-white">
                        <DatePicker
                          selected={selectedEndDate[trainer._id] || null}
                          onChange={(date) =>
                            handleEndDateChange(trainer._id, date)
                          }
                          dateFormat="yyyy-MM-dd"
                          className="bg-gray-800 border border-gray-300 text-gray-300 py-2 px-4 rounded focus:outline-none focus:border-gray-500"
                        />
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 text-right">
                        <button
                          onClick={() => handleAssignClick(trainer._id)}
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center" 
                          style={{ width: "155px", height: "40px" }}
                        >
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 4v16m8-8H4"
                            ></path>
                          </svg>
                          Assign
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trainer;
