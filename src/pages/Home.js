// //import React from 'react';
// import './Home.css'; // Add your styles here
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTools, faBriefcase, faMapMarkedAlt, faComments } from '@fortawesome/free-solid-svg-icons';
// import { Link } from 'react-router-dom'; // Import Link for routing
// import hireAPro from '../images/hire-a-pro.jpg';
// import becomeAPro from '../images/become-a-pro.jpg';
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


// // import Testimonials from '../components/Testimonials';
// // import Testimonials from '../components/Testimonials';



// const Home = () => {


//   const gridItems = [
//     {
//       title: 'Find Services',
//       description: 'Explore plumbers, electricians, mechanics, and more!',
//       buttonText: 'View Services',
//       link: '/services',
//       icon: faTools, // Icon for services
//     },
//     {
//       title: 'Job Opportunities',
//       description: 'Explore non-tech job openings available in your area!',
//       buttonText: 'Browse Jobs',
//       link: '/job',
//       icon: faBriefcase, // Icon for jobs
//     },
//     {
//       title: 'Plan Your Itinerary',
//       description: 'Discover the best places to visit in Corpus Christi!',
//       buttonText: 'Create Itinerary',
//       link: '/journeyBanner',
//       icon: faMapMarkedAlt, // Icon for itinerary
//     },
//     {
//       title: 'Community Forum',
//       description: 'Join discussions, share news, and connect with locals.',
//       buttonText: 'Visit Forum',
//       link: '/community',
//       icon: faComments, // Icon for forum
//     },
    
//   ];

//   return (
//     <div className="home">
//       <div className="hero">
//         <h1 className="hero-title">Welcome to City Compass</h1>
//         <p className="hero-subtitle">Your guide to local services and opportunities in Corpus Christi!</p>
//       </div>

//       <div className="grid-container">
//         {gridItems.map((item, index) => (
//           <div className="grid-item" key={index}>
//             <FontAwesomeIcon icon={item.icon} className="grid-icon" /> {/* Render the icon */}
//             <h2>{item.title}</h2>
//             <p>{item.description}</p>
//             <Link to={item.link}>
//               <button className="grid-button" aria-label={`Link to ${item.title}`}>{item.buttonText}</button>
//             </Link>
//           </div>
//         ))}
//       </div>
//       {/* <Testimonials /> */}

//       {/* Hire a Pro and Become a Pro Section */}
//       <div className="hire-become-section">
//     {/* Hire a Pro Section */}
//     <div className="section">
//         <img src={hireAPro} alt="Hire a Pro" className="section-image" />
//         <div className="section-text">
//             <h2>Looking to Hire?</h2>
//             <p>
//                 Empower your business by connecting with skilled professionals in your community! Find dedicated 
//                 talent to fill essential non-tech roles such as bakers, cashiers, maintenance staff, and tutors.
//             </p>
            
// <Link to="/Jpregistration">
//   <button className="cta-button">Join Us</button>
// </Link>
//         </div>
//     </div>

//     {/* Become a Pro Section */}
//     <div className="section">
//         <div className="section-text">
//             <h2>Become a Service Provider</h2>
//             <p>
//                 Unlock new opportunities by offering your skills and services to your neighbors! Whether you're a 
//                 plumber, electrician, mechanic, or cleaner, connect with local clients through City Compass.
//             </p>
            
// <Link to="/Spregistration">
//   <button className="cta-button">Join Us</button>
// </Link>
//         </div>
//         <img src={becomeAPro} alt="Become a Pro" className="section-image" />
//     </div>
// </div>
 


//       {/* Call to Action Section */}
//       <div className="cta">
//         <h2>Join City Compass Today!</h2>
//         <p>Sign up now to access all features and connect with your community.</p>
//         <Link to="/register">
//           <button className="cta-button">Create an Account</button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Home;







import React from 'react';
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTools, faBriefcase, faMapMarkedAlt, faComments } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import hireAPro from '../images/hire-a-pro.jpg';
import becomeAPro from '../images/become-a-pro.jpg';

const Home = () => {
  const gridItems = [
    {
      title: 'Find Services',
      description: 'Explore plumbers, electricians, mechanics, and more!',
      buttonText: 'View Services',
      link: '/services',
      icon: faTools,
    },
    {
      title: 'Job Opportunities',
      description: 'Explore non-tech job openings available in your area!',
      buttonText: 'Browse Jobs',
      link: '/job',
      icon: faBriefcase,
    },
    {
      title: 'Plan Your Itinerary',
      description: 'Discover the best places to visit in Corpus Christi!',
      buttonText: 'Create Itinerary',
      link: '/journeyBanner',
      icon: faMapMarkedAlt,
    },
    {
      title: 'Community Forum',
      description: 'Join discussions, share news, and connect with locals.',
      buttonText: 'Visit Forum',
      link: '/community',
      icon: faComments,
    },
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <div className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to <span className="highlight">City Compass</span></h1>
          <p className="hero-subtitle">Your guide to local services and opportunities </p>
        </div>
      </div>

      {/* Grid Section */}
      <div className="grid-container">
        {gridItems.map((item, index) => (
          <div className="grid-item" key={index}>
            <FontAwesomeIcon icon={item.icon} className="grid-icon" />
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <Link to={item.link}>
              <button className="grid-button" aria-label={`Link to ${item.title}`}>{item.buttonText}</button>
            </Link>
          </div>
        ))}
      </div>

      {/* Hire a Pro and Become a Pro Section */}
      <div className="hire-become-section">
        <div className="section">
          <img src={hireAPro} alt="Hire a Pro" className="section-image" />
          <div className="section-text">
            <h2>Looking to Hire?</h2>
            <p>Connect with skilled professionals in your community for essential non-tech roles like bakers, cashiers, and tutors.</p>
            <Link to="/Jpregistration">
              <button className="cta-button">Join Us</button>
            </Link>
          </div>
        </div>

        <div className="section">
          <div className="section-text">
            <h2>Become a Service Provider</h2>
            <p>Offer your skills as a plumber, electrician, or mechanic and connect with local clients through City Compass.</p>
            <Link to="/Spregistration">
              <button className="cta-button">Join Us</button>
            </Link>
          </div>
          <img src={becomeAPro} alt="Become a Pro" className="section-image" />
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="cta">
        <h2>Join City Compass Today!</h2>
        <p>Sign up now to access all features and connect with your community.</p>
        <Link to="/register">
          <button className="cta-button">Create an Account</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;