import React from 'react';
import { useNavigate } from 'react-router-dom';

const MainDashboard = () => {

    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };
    
    return (
        <div className="min-h-screen bg-gradient-to-r from-[#673079] via-[#FC4C02] to-[#FC4C02] flex items-center justify-center p-8">
            <div className="w-full max-w-lg bg-white p-10 rounded-lg shadow-xl">
                <h1 className="text-3xl font-mono font-extrabold mb-8 text-center text-gray-800">OU Login</h1>
                <div className="space-y-4">
                    <div
                        className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 cursor-pointer hover:shadow-2xl text-white font-bold font-sans"
                        onClick={() => handleNavigation('/academic')}
                    >
                        Academic OU
                    </div>
                    <div
                        className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 cursor-pointer hover:shadow-2xl text-white font-bold font-sans"
                        onClick={() => handleNavigation('/retail')}
                    >
                        Retail OU
                    </div>
                    <div
                        className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 cursor-pointer hover:shadow-2xl text-white font-bold font-sans"
                        onClick={() => handleNavigation('/corporate')}
                    >
                        Corporate OU
                    </div>
                    <div
                        className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 cursor-pointer hover:shadow-2xl text-white font-bold font-sans"
                        onClick={() => handleNavigation('/government')}
                    >
                        Government OU 
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainDashboard;
