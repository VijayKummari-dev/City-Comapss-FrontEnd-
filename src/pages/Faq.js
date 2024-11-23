import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const faqData = [
  {
    category: "For Users",
    questions: [
      {
        question: "How do I create an account on City Compass?",
        answer:
          "To create an account, click on the 'Register' button on the home page, fill out your details, and submit. You’ll receive a confirmation email to activate your account.",
      },
      {
        question: "How do I book a service through the platform?",
        answer:
          "Navigate to the 'Find Services' section, browse available services, select a provider, and choose an available date and time to book the service.",
      },
      {
        question: "How does the Itinerary Planner work?",
        answer:
          "The Itinerary Planner uses AI to generate personalized travel plans based on your destination, preferences (e.g., nature, urban, chill), and budget (e.g., economic, luxury). Simply input your details, and the app will create a customized itinerary.",
      },
      {
        question: "Can I update my profile information after registration?",
        answer:
          "Yes, you can edit your personal details, such as your name, email, and password, in the 'Profile Update' section.",
      },
      {
        question: "How do I track or manage my service bookings?",
        answer:
          "You can view and manage your bookings on the 'Track Services' page, where you can also cancel or reschedule services.",
      },
      {
        question: "How do I search and apply for jobs?",
        answer:
          "Visit the 'Find Jobs' section, browse job opportunities, and apply directly through the platform. You can also save jobs to review later.",
      },
      {
        question: "What is the Community feature, and how do I use it?",
        answer:
          "The Community page allows users to share posts, comment, and engage with other users. It’s a great way to stay updated on local events and discussions.",
      },
      {
        question: "Are service providers and job listings verified?",
        answer:
          "Yes, all service providers and businesses posting jobs are verified by our team to ensure authenticity and reliability.",
      },
      {
        question: "How do I track the status of my job applications?",
        answer:
          "Go to the 'Track Jobs' page to view the status of your job applications and manage any actions required.",
      },
      {
        question: "Is my personal information secure on City Compass?",
        answer:
          "Yes, we prioritize your privacy and secure all data using advanced encryption methods, ensuring compliance with global data protection standards.",
      },
    ],
  },
  {
    category: "For Service Providers",
    questions: [
      {
        question: "How do I register as a service provider on City Compass?",
        answer:
          "To register, select the 'Service Provider Registration' option during signup. Provide your business details and submit the required licensing documentation for verification.",
      },
      {
        question: "How long does it take for my account to be verified?",
        answer:
          "Verification typically takes 1-3 business days. Once your documents are reviewed and approved, you’ll receive a confirmation email.",
      },
      {
        question: "How do I list my services on the platform?",
        answer:
          "Log in to the 'Service Provider Dashboard' and go to the 'Add Service' section. Fill in the service details (e.g., description, pricing) and submit. Your service will be visible to users once approved.",
      },
      {
        question: "Can I update or delete my services?",
        answer:
          "Yes, you can manage your listings through the 'Manage Services' section in your dashboard, where you can edit details or remove services.",
      },
      {
        question: "How do I handle bookings?",
        answer:
          "In the 'Bookings' section of your dashboard, you can view all requests, approve or decline them, and communicate with users if needed.",
      },
      {
        question: "Can I set my availability for services?",
        answer:
          "Yes, you can set available dates and time slots in the 'Schedule' section to manage user bookings effectively.",
      },
      {
        question: "What should I do if a user cancels a booking?",
        answer:
          "If a user cancels a booking, it will be reflected in your dashboard.",
      },
    ],
  },
  {
    category: "For Job Providers",
    questions: [
      {
        question: "How do I register as a job provider on City Compass?",
        answer:
          "During registration, select 'Job Provider Registration.' Provide your company details and upload the necessary licensing documents for verification.",
      },
      {
        question: "How do I post a job listing?",
        answer:
          "Once verified, go to the 'Job Provider Dashboard' and select 'Create Job Post.' Fill in the job details (e.g., title, description, requirements, salary) and submit.",
      },
      {
        question: "Can I edit or delete a job posting?",
        answer:
          "Yes, you can manage your job postings in the 'Manage Jobs' section by editing or deleting them as needed.",
      },
      {
        question: "How do I view applications for my job postings?",
        answer:
          "Navigate to the 'Applications' section in your dashboard, where you can view, download, and manage applications for each job posting.",
      },
      {
        question: "Can I change the status of a job application?",
        answer:
          "Yes, you can update the status of applications (e.g., Accepted, Rejected, Under Review) in the 'Applications' section.",
      },
      {
        question: "How are job listings verified?",
        answer:
          "City Compass verifies all job postings to ensure authenticity by reviewing the provided details and checking licenses.",
      },
    ],
  },
];

const Faq = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Frequently Asked Questions (FAQ)
      </Typography>
      {faqData.map((section, index) => (
        <div key={index}>
          <Typography variant="h5" sx={{ mt: 3 }}>
            {section.category}
          </Typography>
          {section.questions.map((q, i) => (
            <Accordion key={i}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{q.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{q.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      ))}
    </Container>
  );
};

export default Faq;
