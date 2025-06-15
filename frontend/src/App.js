import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Signup from "./Signup";
import Login from "./Login";
import Home from "./Home";
import Welcome from "./Welcome";
import ForgotPassword from "./ForgotPassword";
import EmployeeProfile from './EmployeeProfile';
import EmployerDashboard from './EmployerDashboard';
import ProtectedRoute from './ProtectedRoute';
import ViewProfile from "./ViewProfile";
import AllProfiles from "./AllProfiles"
import MyProfiles from "./MyProfiles";
import EmployerProfile from "./EmployerProfile";
import PostProject from './PostProject';
import StartHiring from './StartHiring';
import AllProjects from "./AllProjects";
function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Navigate to="/welcome" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/post-project" element={<PostProject />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/allprojects" element={<AllProjects/>}/>
           <Route path="/allprofiles" element={<AllProfiles />} />
         <Route path="/view-profile/:id" element={<ViewProfile />} />
         <Route path="/start-hiring" element={<StartHiring />} />
         <Route path="/my-profiles" element={<MyProfiles />} />
         <Route
          path="/employee-profile"
          element={
            <ProtectedRoute>
              <EmployeeProfile />
            </ProtectedRoute>
          }
        />
         <Route
          path="/employer-profile"
          element={
            <ProtectedRoute>
              <EmployerProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employer-dashboard"
          element={
            <ProtectedRoute>
              <EmployerDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
