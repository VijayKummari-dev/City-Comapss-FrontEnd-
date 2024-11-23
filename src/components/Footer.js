// src/components/Footer.js
import React from 'react';
import './Footer.css'; // Import your CSS for the footer

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
   
        <div className="footer-links">
          <h4>About Us</h4>
          <a href="/about">Our Story</a>
          
        </div>
        <div className="footer-links">
          <h4>Help</h4> {/* Added Help section */}
          <a href="/faq">FAQ</a>
          <a href="/contact">Contact Us</a>
          <a href="/terms">Terms of Service</a>

        </div>

        <div className="footer-links">
          <h4>Follow Us</h4>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
        <div className="footer-links">
          <h4>Services</h4>
          <a href="/track-service">Track Your Services</a>
          <a href="/track-jobs">Track Your Applied Jobs</a>
          <a href="/update-profile">Update Account</a>
        </div>
      </div>
      <div className="footer-info">
        <p>&copy; {new Date().getFullYear()} City Compass. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
