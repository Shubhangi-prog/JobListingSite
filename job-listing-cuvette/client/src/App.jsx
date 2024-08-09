import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { LoaderContext } from "./contexts/LoaderContext";
import { setupInterceptors } from './utils/axios';
import Loader from './components/Loader';

import Homepage from "./pages/Homepage";
import UserLogin from "./pages/user/UserLogin";
import UserRegister from "./pages/user/UserRegister";
import JobCreate from "./pages/job/JobCreate";
import JobDetails from "./pages/job/JobDetails";
import JobUpdate from "./pages/job/JobUpdate.jsx";

const ScrollToTop = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [useLocation()]);

  return null;
};

function App() {
  const { loading, setLoading } = useContext(LoaderContext);

  useEffect(() => {
    setupInterceptors(setLoading);
  }, [setLoading]);

  return (
    <Router>
      {loading && <Loader />}
      <ScrollToTop />
      <ToastContainer position="bottom-center" theme="colored" closeButton={false} />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="user/signin" element={<UserLogin />} />
        <Route path="user/signup" element={<UserRegister />} />
        <Route path="job/create" element={<JobCreate />} />
        <Route path="job/details/:jid" element={<JobDetails />} />
        <Route path="job/update/:jid" element={<JobUpdate />} />
      </Routes>
    </Router>
  );
}

export default App;
