import React, { useState, useEffect } from 'react';
import './Testimonials.css';
const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  // Simulated fetching testimonials
  useEffect(() => {
    const fetchedTestimonials = [
      {
        id: 1,
        text: "City Compass helped me find the best local services with ease. Highly recommend it!",
        userName: "John Doe",
        userRole: "Entrepreneur",
        userImage: "https://via.placeholder.com/100", // Placeholder image for now
      },
      {
        id: 2,
        text: "I found a job in Corpus Christi thanks to City Compass! Great platform.",
        userName: "Jane Smith",
        userRole: "Freelancer",
        userImage: "https://via.placeholder.com/100", // Placeholder image for now
      },
      {
        id: 3,
        text: "The itinerary planner was perfect for my weekend visit. Loved the recommendations!",
        userName: "Sarah Johnson",
        userRole: "Visitor",
        userImage: "https://via.placeholder.com/100", // Placeholder image for now
      },
    ];

    setTestimonials(fetchedTestimonials);
  }, []);

  return (
    <div className="testimonials-section">
      <h2>What People Are Saying</h2>
      {testimonials.length === 0 ? (
        <p>No testimonials available at the moment.</p>
      ) : (
        <div className="testimonial-list">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial">
              <img src={testimonial.userImage} alt={`${testimonial.userName}`} className="testimonial-image" />
              <div className="testimonial-content">
                <p className="testimonial-text">"{testimonial.text}"</p>
                <p className="testimonial-user">
                  <strong>{testimonial.userName}</strong>, {testimonial.userRole}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Testimonials;
