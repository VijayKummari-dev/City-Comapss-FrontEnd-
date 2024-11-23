

import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
// import { isAdmin } from './components/utils/auth';
import AdminDashboard from './pages/AdminDashboard';
import './App.css'; // Import your main CSS
import Navbar from './components/Navbar'; // Import Navbar
import Footer from './components/Footer'; // Import Footer
import Home from './pages/Home';
import Services from './pages/Services';
import Jobs from './pages/Jobs';
import Itinerary from './pages/Itinerary';
import Community from './pages/Community';
import UserRegistration from './pages/UserRegistration';
import Login from './pages/Login';
import ServiceProvider from './pages/ServiceProvider';
import PlaceholderDashboard from './pages/PlaceholderDashboard'; // Ensure this path is correct
import NotAuthorized from './pages/NotAuthorized';
// import ServiceProviderDashboard from './pages/ServiceProviderDashboard';
import ViewServices from './pages/ViewServices';
import JobProvider from './pages/FindJobs/JobProvider';
import ProviderDashboard from './pages/ProviderDashboard';
import JobProviderDashboard from './pages/FindJobs/JobProviderDashboard';
import UserJobSearchByCompanyName from './pages/FindJobs/UserJobSearchByCompanyName';
import JobSearch from './pages/FindJobs/UserJobSearchByCompanyName';
import JobProviderJobPostings from './pages/FindJobs/JobProviderJobPostings';
import JobEdit from './pages/FindJobs/JobEdit';
import JobApplications from './pages/FindJobs/JobApplications';
import CompanyEdit from './pages/FindJobs/CompanyEdit';
import JobDetails from './pages/FindJobs/JobDetails';
import SaveJobs from './pages/FindJobs/SaveJobs';
import ViewApplications from './pages/FindJobs/ViewApplications';

import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/FindJobs/Dashboard';
import JobPostings from './pages/FindJobs/JobPostings';
import Applications from './pages/FindJobs/Applications';
import CompanyProfile from './pages/FindJobs/CompanyProfile';
import CreateJob from './pages/FindJobs/CreateJob';
import TrackServices from './pages/TrackServices';
import TrackJobs from './pages/TrackJobs';
import UpdateProfile from './pages/UpdateProfile';
import FindJobs from './pages/FindJobs';
import AskAI from './pages/AskAI';
import { ToastContainer } from 'react-toastify';
import JourneyBanner from './pages/JourneyBanner';
import OurStory from './pages/OurStory';
import Terms from './pages/Terms';
import Faq from './pages/Faq'


const AppRoutes = () => {
  const location = useLocation();
  const isAuthPage =  location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/Spregistration'|| location.pathname==='/Jpregistration'|| location.pathname==='/Spdashboard'|| location.pathname==='/admin'||location.pathname==='/job-provider-dashboard' || location.pathname==='/jobsadmin';
  return (
    <>
      {!isAuthPage && <Navbar />}

      <div className="content"> {/* Container for main content */}
        <Routes>
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<UserRegistration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/services" element={<Services />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/itinerary" element={<Itinerary />} />
          <Route path="/community" element={<Community />} />
          <Route path="/Spregistration" element={<ServiceProvider />} />
          <Route path="/Jpregistration" element={<JobProvider />} />
          <Route path="/entrepreneur-dashboard" element={<PlaceholderDashboard userType="JOB_PROVIDER" />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/not-authorized" element={<NotAuthorized />} />
          <Route path="/Spdashboard" element={<ProviderDashboard />} />
          <Route path="/view-services" element={<ViewServices />} />
          <Route path="/jobProvider" element={<JobProvider/>}/>
          <Route path="/job-provider-dashboard" element={<JobProviderDashboard/>}/>
          <Route path="/CompanySearchByName" element={<UserJobSearchByCompanyName />} />
          <Route path="/jobsearch" element={<JobSearch />} />
          <Route path="/jobPostings/company/getAllJobsBYCompany" element={<JobProviderJobPostings />} />
          <Route path="/jobEdit/:jobId" element={<JobEdit />} />
          <Route path="/jobPostings/company/applications/:jobId" element={<JobApplications />} />
          <Route path="/companyEdit" element={<CompanyEdit />} />
          <Route path="/job/:jobId" element={<JobDetails />} />
          <Route path="/save-jobs" element={<SaveJobs />} />
          <Route path="/view-applications" element={<ViewApplications />} />
          <Route path="/track-services" element={<TrackServices />} />
          <Route path="/track-jobs" element={<TrackJobs />} />
          <Route path="/Jpdashboard" element={<Dashboard />} />
          <Route path="/jobsadmin" element={<JobPostings />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/company" element={<CompanyProfile />} />
          <Route path="/create-job" element={<CreateJob />} />
          <Route path="/update-profile" element={<UpdateProfile />} />
          <Route path="/job" element={<FindJobs />} />
          <Route path ="/journeyBanner" element ={<JourneyBanner/>}/>
          <Route path ="/AskAI" element ={<AskAI/>}/>
          <Route path ="/About" element ={<OurStory/>}/>
          <Route  path = "/track-service" element ={<TrackServices/>}/>
          <Route  path = "/terms" element ={<Terms/>}/>
          <Route  path = "/faq" element ={<Faq/>}/>

          
        </Routes>
      </div>
      {!isAuthPage && <Footer />}
    </>
  );
};


const App = () => {
  return (
    <Router>
      <div className="App">
      <ToastContainer 
    position="top-right"
    autoClose={1000} // Close after 3 seconds
    hideProgressBar={false}
    newestOnTop={true}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
/>  

        <AppRoutes /> {/* Moved the routes into a separate component */}
      </div>
    </Router>
  );
};

export default App;
