import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios

const AddTrainer = () => {
  const [name, setName] = useState("");
  const [vertical, setVertical] = useState("");
  const [projects, setProjects] = useState("");
  const [skills, setSkills] = useState("");
  const [dateOfJoining, setDateOfJoining] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!vertical.trim()) newErrors.vertical = "Vertical is required";
    if (!projects.trim()) newErrors.projects = "Projects assigned is required";
    if (!skills.trim()) newErrors.skills = "Skills are required";
    if (!dateOfJoining.trim())
      newErrors.dateOfJoining = "Date of joining is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/newtrainer/addtrainer",
        {
          name,
          verticals: vertical,
          projects: projects.split(",").map((proj) => proj.trim()),
          skills: skills.split(",").map((skill) => skill.trim()),
          dateofjoining: dateOfJoining,
        }
      );
      alert(response.data.message);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error adding trainer:", error);
      alert("Error adding trainer");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        backgroundImage:
          "radial-gradient(circle farthest-corner at 32.7% 82.7%, rgba(173,0,171,1) 8.3%, rgba(15,51,92,1) 79.4%)",
      }}
    >
      <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Add Trainer</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.name ? "border-red-500" : ""
              }`}
            />
            {errors.name && (
              <span className="absolute right-0 bottom-0 text-red-500 text-sm">
                {errors.name}
              </span>
            )}
          </div>
          <div className="mb-4 relative">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="vertical"
            >
              Verticals
            </label>
            <select
              id="vertical"
              value={vertical}
              onChange={(e) => setVertical(e.target.value)}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.vertical ? "border-red-500" : ""
              }`}
            >
              <option value="">Select Vertical</option>
              <option value="Technical Training">Academic OU</option>
              <option value="Soft Skills Training">Retail OU</option>
              <option value="Leadership Training">Corporate OU</option>
              <option value="Compliance Training">Government</option>
            </select>
            {errors.vertical && (
              <span className="absolute right-0 bottom-0 text-red-500 text-sm">
                {errors.vertical}
              </span>
            )}
          </div>
          <div className="mb-4 relative">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="projects"
            >
              Projects
            </label>
            <input
              id="projects"
              type="text"
              value={projects}
              onChange={(e) => setProjects(e.target.value)}
              placeholder="Enter projects separated by commas"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.projects ? "border-red-500" : ""
              }`}
            />
            {errors.projects && (
              <span className="absolute right-0 bottom-0 text-red-500 text-sm">
                {errors.projects}
              </span>
            )}
          </div>
          <div className="mb-4 relative">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="skills"
            >
              Skills
            </label>
            <input
              id="skills"
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="Enter skills separated by commas"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.skills ? "border-red-500" : ""
              }`}
            />
            {errors.skills && (
              <span className="absolute right-0 bottom-0 text-red-500 text-sm">
                {errors.skills}
              </span>
            )}
          </div>
          <div className="mb-4 relative">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="dateOfJoining"
            >
              Date of Joining
            </label>
            <input
              id="dateOfJoining"
              type="date"
              value={dateOfJoining}
              onChange={(e) => setDateOfJoining(e.target.value)}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.dateOfJoining ? "border-red-500" : ""
              }`}
            />
            {errors.dateOfJoining && (
              <span className="absolute right-0 bottom-0 text-red-500 text-sm">
                {errors.dateOfJoining}
              </span>
            )}
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Trainer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTrainer;
