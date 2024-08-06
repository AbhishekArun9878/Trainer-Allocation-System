import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Trainer from './components/Trainer';
import AddTrainer from './components/AddTrainer';
import Login from './components/Login';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import EditTrainer from './components/EditTrainer';
import TrainerSignup from './components/TrainerSignup';
import AddAdmin from './components/AddAdmin';
import MainDashboard from './components/MainDashboard';
import AcademicLogin from './components/AcademicLogin';
import RetailLogin from './components/RetailLogin';
import CorporateLogin from './components/CorporateLogin';
import GovernmentLogin from './components/GovernmentLogin';
import AcademicDashboard from './components/AcademicDashboard';

function App() {
  return (
    <>
    <Routes>
    <Route path={'/'} element={<Login/>}></Route>
    <Route path={'/trainer'} element={<Trainer/>}></Route>
    <Route path={'/addtrainer'} element={<AddTrainer/>}></Route>
    <Route path={'/adminlogin'} element={<AdminLogin/>}></Route>
    <Route path={'/dashboard'} element={<AdminDashboard/>}></Route>
    <Route path={'/edittrainer/:id'} element={<EditTrainer />} />
    <Route path={'/trainersignup'} element={<TrainerSignup />} />
    <Route path={'/addadmin'} element={<AddAdmin/>} />
    <Route path={'/main' }element={<MainDashboard/>} />
    <Route path={'/academic'} element={<AcademicLogin/>} />
    <Route path={'/retail'} element={<RetailLogin/>} />
    <Route path={'/corporate'} element={<CorporateLogin/>} />
    <Route path={'/government'} element={<GovernmentLogin/>} />
    <Route path={'/academicdashboard'} element={<AcademicDashboard/>} />
    </Routes>
    </>
  );
}

export default App;
