// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Paper,
//   Stepper,
//   Step,
//   MenuItem,
//   StepLabel,
//   IconButton,
//   CircularProgress,
//   useMediaQuery,
// } from "@mui/material";
// import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
// import { styled, keyframes } from "@mui/system";
// import { formatResponseText } from "../utils/formatText";
// import { steps } from "../constants/constants";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// const AskAI = () => {
//   const [activeStep, setActiveStep] = useState(0);
//   const [city, setCity] = useState("");
//   const [days, setDays] = useState(1);
//   const [budget, setBudget] = useState("");
//   const [mood, setMood] = useState("");
//   const [response, setResponse] = useState("");
//   const [loading, setLoading] = useState(false);

//   const isMobile = useMediaQuery("(max-width:600px)");

//   const handleNext = () => {
//     if (activeStep === steps.length - 1) {
//       handleSubmit();
//     } else {
//       setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     }
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   const handleBackMain = () => {
//     setActiveStep(0);
//     setCity("");
//     setDays(1);
//     setBudget("");
//     setMood("");
//     setResponse("");
//   };

//   const handleSubmit = async () => {
//     if (loading) return;
//     setLoading(true);

//     try {
//       const prompt = `Plan a concise ${days}-day trip to ${city} with a ${budget} budget (in USD). Focus on ${mood} activities and provide the top highlights for each day, including the best places to visit, recommended timings, and must-try experiences. Limit the itinerary to the most important details.`;
//       const result = await model.generateContent(prompt);

//       if (result && result.response) {
//         const aiResponse = await result.response.text();
//         const formattedResponse = formatResponseText(aiResponse);
//         setResponse(formattedResponse);
//       } else {
//         setResponse("No response received from the AI model.");
//       }
//     } catch (error) {
//       setResponse("Failed to get AI recommendation. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleIncrementDays = () => setDays((prevDays) => prevDays + 1);
//   const handleDecrementDays = () => days > 1 && setDays((prevDays) => prevDays - 1);

//   const isNextButtonDisabled = () => {
//     switch (activeStep) {
//       case 0:
//         return city.trim() === "";
//       case 1:
//         return days < 1;
//       case 2:
//         return budget.trim() === "";
//       case 3:
//         return mood.trim() === "";
//       default:
//         return false;
//     }
//   };

//   return (
//     <Container id="ai-section">
//       <Typography variant="h4" gutterBottom align="center" color="primary">
//         <b>Let CityCompass Plan Your Perfect Trip</b>
//       </Typography>
//       {!isMobile && (
//         <StyledStepper activeStep={activeStep}>
//           {steps.map((step) => (
//             <Step key={step.label}>
//               <StepLabel>{step.label}</StepLabel>
//             </Step>
//           ))}
//         </StyledStepper>
//       )}
//       <AnimatedBox>
//         {activeStep === 0 && (
//           <FadeInBox>
//             <Typography variant="h6" gutterBottom>
//               {steps[0].description}
//             </Typography>
//             <TextField
//               label="Which City?"
//               variant="outlined"
//               value={city}
//               onChange={(e) => setCity(e.target.value)}
//               fullWidth
//               required
//             />
//             <ButtonContainer>
//               <Button onClick={handleBack} disabled={activeStep === 0}>
//                 Back
//               </Button>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={handleNext}
//                 disabled={isNextButtonDisabled()}
//               >
//                 Next
//               </Button>
//             </ButtonContainer>
//           </FadeInBox>
//         )}
//         {activeStep === 1 && (
//           <FadeInBox>
//             <IconButton onClick={handleDecrementDays}>
//               <RemoveIcon />
//             </IconButton>
//             <TextField
//               label="Days"
//               variant="outlined"
//               value={days}
//               fullWidth
//               inputProps={{ readOnly: true, style: { textAlign: "center" } }}
//             />
//             <IconButton onClick={handleIncrementDays}>
//               <AddIcon />
//             </IconButton>
//             <ButtonContainer>
//               <Button onClick={handleBack}>Back</Button>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={handleNext}
//                 disabled={isNextButtonDisabled()}
//               >
//                 Next
//               </Button>
//             </ButtonContainer>
//           </FadeInBox>
//         )}
//         {activeStep === 2 && (
//           <FadeInBox>
//             <Typography variant="h6" gutterBottom>
//               {steps[2].description}
//             </Typography>
//             <TextField
//               label="Budget"
//               variant="outlined"
//               value={budget}
//               onChange={(e) => setBudget(e.target.value)}
//               fullWidth
//               select
//               required
//             >
//               <MenuItem value="Economic">Economic</MenuItem>
//               <MenuItem value="Normal">Normal</MenuItem>
//               <MenuItem value="Luxury">Luxury</MenuItem>
//             </TextField>
//             <ButtonContainer>
//               <Button onClick={handleBack}>Back</Button>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={handleNext}
//                 disabled={isNextButtonDisabled()}
//               >
//                 Next
//               </Button>
//             </ButtonContainer>
//           </FadeInBox>
//         )}
//         {activeStep === 3 && (
//           <FadeInBox>
//             {steps[3].options.map((option, index) => (
//               <Button
//                 key={index}
//                 variant="outlined"
//                 color="primary"
//                 fullWidth
//                 onClick={() => {
//                   setMood(option.label);
//                   handleSubmit();
//                   setActiveStep(4);
//                 }}
//               >
//                 {option.label}
//               </Button>
//             ))}
//             <ButtonContainer>
//               <Button onClick={handleBack}>Back</Button>
//             </ButtonContainer>
//           </FadeInBox>
//         )}
//         {activeStep === 4 && (
//           <OutputBox>
//             {loading ? (
//               <CircularProgress />
//             ) : response ? (
//               <FadeInBox>
//                 <Typography
//                   variant="body1"
//                   dangerouslySetInnerHTML={{ __html: response }}
//                 />
//               </FadeInBox>
//             ) : (
//               <Typography variant="body1">
//                 No response received. Please try again.
//               </Typography>
//             )}
//             <ButtonContainer>
//               <Button onClick={handleBackMain}>Back to Main</Button>
//             </ButtonContainer>
//           </OutputBox>
//         )}
//       </AnimatedBox>
//     </Container>
//   );
// };

// const Container = styled(Paper)({
//   padding: "24px",
//   backgroundColor: "#f0f2f5",
//   borderRadius: "8px",
//   boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//   animation: "fadeIn 0.5s ease-in-out",
// });

// const ButtonContainer = styled(Box)({
//   display: "flex",
//   justifyContent: "center",
//   gap: "16px",
//   marginTop: "16px",
// });

// const StyledStepper = styled(Stepper)({
//   backgroundColor: "transparent",
//   marginBottom: "24px",
// });

// const OutputBox = styled(Box)({
//   minHeight: "200px",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   padding: "16px",
//   border: "1px solid #ddd",
//   borderRadius: "4px",
// });

// const fadeIn = keyframes`
//   from {
//     opacity: 0;
//   }
//   to {
//     opacity: 1;
//   }
// `;

// const FadeInBox = styled(Box)({
//   animation: `${fadeIn} 0.5s ease-in-out`,
// });

// const AnimatedBox = styled(Box)({
//   animation: `${fadeIn} 1s ease-in-out`,
// });

// export default AskAI;

// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Paper,
//   Stepper,
//   Step,
//   MenuItem,
//   StepLabel,
//   IconButton,
//   CircularProgress,
//   useMediaQuery,
// } from "@mui/material";
// import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
// import { styled, keyframes } from "@mui/system";
// import { jsPDF } from "jspdf";
// import { formatResponseText } from "../utils/formatText";
// import { steps } from "../constants/constants";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// const AskAI = () => {
//   const [activeStep, setActiveStep] = useState(0);
//   const [city, setCity] = useState("");
//   const [days, setDays] = useState(1);
//   const [budget, setBudget] = useState("");
//   const [mood, setMood] = useState("");
//   const [response, setResponse] = useState("");
//   const [loading, setLoading] = useState(false);

//   const isMobile = useMediaQuery("(max-width:600px)");

//   const handleNext = () => {
//     if (activeStep === steps.length - 1) {
//       handleSubmit();
//     } else {
//       setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     }
//   };

//   const handleBack = () => {
//     if (activeStep > 0) {
//       setActiveStep((prevActiveStep) => prevActiveStep - 1);
//     }
//   };

//   const handleBackMain = () => {
//     setActiveStep(0);
//     setCity("");
//     setDays(1);
//     setBudget("");
//     setMood("");
//     setResponse("");
//   };

//   const handleSubmit = async () => {
//     if (loading) return;
//     setLoading(true);

//     try {
//       const prompt = `Plan a concise ${days}-day trip to ${city} with a ${budget} budget (in USD). Focus on ${mood} activities and provide the top highlights for each day, including the best places to visit, recommended timings, and must-try experiences. Limit the itinerary to the most important details.`;
//       const result = await model.generateContent(prompt);

//       if (result && result.response) {
//         const aiResponse = await result.response.text();
//         const formattedResponse = formatResponseText(aiResponse);
//         setResponse(formattedResponse);
//       } else {
//         setResponse("No response received from the AI model.");
//       }
//     } catch (error) {
//       setResponse("Failed to get AI recommendation. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleIncrementDays = () => setDays((prevDays) => prevDays + 1);
//   const handleDecrementDays = () => days > 1 && setDays((prevDays) => prevDays - 1);

//   const isNextButtonDisabled = () => {
//     switch (activeStep) {
//       case 0:
//         return city.trim() === "";
//       case 1:
//         return days < 1;
//       case 2:
//         return budget.trim() === "";
//       case 3:
//         return mood.trim() === "";
//       default:
//         return false;
//     }
//   };
//   const downloadPDF = () => {
//     if (!response) return;
  
//     const doc = new jsPDF();
  
//     // General configurations
//     const marginX = 10; // Left margin
//     const marginY = 20; // Top margin
//     const pageWidth = doc.internal.pageSize.getWidth() - 2 * marginX;
//     const pageHeight = doc.internal.pageSize.getHeight();
//     const lineHeight = 6;
//     const fontSize = 9;
//     const titleFontSize = 14;
//     let currentY = marginY;
  
//     // Draw margin lines
//     doc.setDrawColor(200, 200, 200); // Light gray
//     doc.line(marginX, marginY, marginX, pageHeight - marginY); // Left margin line
//     doc.line(pageWidth + marginX, marginY, pageWidth + marginX, pageHeight - marginY); // Right margin line
  
//     // Add title
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(titleFontSize);
//     doc.text("Your Personalized Itinerary", pageWidth / 2 + marginX, currentY, {
//       align: "center",
//     });
  
//     currentY += lineHeight + 4;
  
//     // Add horizontal separator
//     doc.setDrawColor(150, 150, 150); // Gray
//     doc.line(marginX, currentY, pageWidth + marginX, currentY);
//     currentY += lineHeight;
  
//     // Process response content
//     const content = response
//       .replace(/<br>/g, "\n") // Replace <br> tags with newlines
//       .replace(/<[^>]+>/g, "") // Remove all HTML tags
//       .trim();
  
//     const lines = content.split("\n").filter((line) => line.trim() !== "");
  
//     lines.forEach((line) => {
//       if (line.startsWith("Day")) {
//         // Section title (e.g., Day 1, Day 2)
//         doc.setFont("helvetica", "bold");
//         doc.setFontSize(fontSize + 1);
//         doc.text(line, marginX + 2, currentY);
//         currentY += lineHeight;
//       } else {
//         // Regular content
//         doc.setFont("helvetica", "normal");
//         doc.setFontSize(fontSize);
//         const wrappedText = doc.splitTextToSize(line, pageWidth - 4);
//         doc.text(wrappedText, marginX + 4, currentY);
//         currentY += wrappedText.length * lineHeight;
//       }
  
//       // Add a new page if content exceeds page height
//       if (currentY > pageHeight - marginY) {
//         doc.addPage();
  
//         // Redraw margin lines for new page
//         doc.setDrawColor(200, 200, 200); // Light gray
//         doc.line(marginX, marginY, marginX, pageHeight - marginY); // Left margin line
//         doc.line(pageWidth + marginX, marginY, pageWidth + marginX, pageHeight - marginY); // Right margin line
  
//         currentY = marginY;
//       }
//     });
  
//     // Footer
//     const footerText = "Generated by CityCompass AI";
//     doc.setFontSize(fontSize - 1);
//     doc.setFont("helvetica", "italic");
//     doc.setTextColor(100, 100, 100); // Light gray
//     doc.text(footerText, pageWidth / 2 + marginX, pageHeight - marginY, {
//       align: "center",
//     });
  
//     // Save the PDF
//     doc.save("itinerary.pdf");
//   };
  
  


//   return (
//     <Container id="ai-section">
//       <Typography variant="h4" gutterBottom align="center" color="primary">
//         <b>Let CityCompass Plan Your Perfect Trip</b>
//       </Typography>
//       {!isMobile && (
//         <StyledStepper activeStep={activeStep}>
//           {steps.map((step) => (
//             <Step key={step.label}>
//               <StepLabel>{step.label}</StepLabel>
//             </Step>
//           ))}
//         </StyledStepper>
//       )}
//       <AnimatedBox>
//         {activeStep === 0 && (
//           <FadeInBox>
//             <Typography variant="h6" gutterBottom>
//               {steps[0].description}
//             </Typography>
//             <TextField
//               label="Which City?"
//               variant="outlined"
//               value={city}
//               onChange={(e) => setCity(e.target.value)}
//               fullWidth
//               required
//             />
//             <ButtonContainer>
//               <Button onClick={handleBack} disabled={activeStep === 0}>
//                 Back
//               </Button>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={handleNext}
//                 disabled={isNextButtonDisabled()}
//               >
//                 Next
//               </Button>
//             </ButtonContainer>
//           </FadeInBox>
//         )}
//         {activeStep === 1 && (
//           <FadeInBox>
//             <IconButton onClick={handleDecrementDays}>
//               <RemoveIcon />
//             </IconButton>
//             <TextField
//               label="Days"
//               variant="outlined"
//               value={days}
//               fullWidth
//               inputProps={{ readOnly: true, style: { textAlign: "center" } }}
//             />
//             <IconButton onClick={handleIncrementDays}>
//               <AddIcon />
//             </IconButton>
//             <ButtonContainer>
//               <Button onClick={handleBack}>Back</Button>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={handleNext}
//                 disabled={isNextButtonDisabled()}
//               >
//                 Next
//               </Button>
//             </ButtonContainer>
//           </FadeInBox>
//         )}
//         {activeStep === 2 && (
//           <FadeInBox>
//             <Typography variant="h6" gutterBottom>
//               {steps[2].description}
//             </Typography>
//             <TextField
//               label="Budget"
//               variant="outlined"
//               value={budget}
//               onChange={(e) => setBudget(e.target.value)}
//               fullWidth
//               select
//               required
//             >
//               <MenuItem value="Economic">Economic</MenuItem>
//               <MenuItem value="Normal">Normal</MenuItem>
//               <MenuItem value="Luxury">Luxury</MenuItem>
//             </TextField>
//             <ButtonContainer>
//               <Button onClick={handleBack}>Back</Button>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={handleNext}
//                 disabled={isNextButtonDisabled()}
//               >
//                 Next
//               </Button>
//             </ButtonContainer>
//           </FadeInBox>
//         )}
//         {activeStep === 3 && (
//           <FadeInBox>
//             {steps[3].options.map((option, index) => (
//               <Button
//                 key={index}
//                 variant="outlined"
//                 color="primary"
//                 fullWidth
//                 onClick={() => {
//                   setMood(option.label);
//                   handleSubmit();
//                   setActiveStep(4);
//                 }}
//               >
//                 {option.label}
//               </Button>
//             ))}
//             <ButtonContainer>
//               <Button onClick={handleBack}>Back</Button>
//             </ButtonContainer>
//           </FadeInBox>
//         )}
//         {activeStep === 4 && (
//           <OutputBox>
//             {loading ? (
//               <CircularProgress />
//             ) : response ? (
//               <FadeInBox>
//                 <Typography
//                   variant="body1"
//                   dangerouslySetInnerHTML={{ __html: response }}
//                 />
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   onClick={downloadPDF}
//                 >
//                   Download as PDF
//                 </Button>
//               </FadeInBox>
//             ) : (
//               <Typography variant="body1">
//                 No response received. Please try again.
//               </Typography>
//             )}
//             <ButtonContainer>
//               <Button onClick={handleBackMain}>Back to Main</Button>
//             </ButtonContainer>
//           </OutputBox>
//         )}
//       </AnimatedBox>
//     </Container>
//   );
// };

// const Container = styled(Paper)({
//   padding: "24px",
//   backgroundColor: "#f0f2f5",
//   borderRadius: "8px",
//   boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//   animation: "fadeIn 0.5s ease-in-out",
// });

// const ButtonContainer = styled(Box)({
//   display: "flex",
//   justifyContent: "center",
//   gap: "16px",
//   marginTop: "16px",
// });

// const StyledStepper = styled(Stepper)({
//   backgroundColor: "transparent",
//   marginBottom: "24px",
// });

// const OutputBox = styled(Box)({
//   minHeight: "200px",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   padding: "16px",
//   border: "1px solid #ddd",
//   borderRadius: "4px",
// });

// const fadeIn = keyframes`
//   from {
//     opacity: 0;
//   }
//   to {
//     opacity: 1;
//   }
// `;

// const FadeInBox = styled(Box)({
//   animation: `${fadeIn} 0.5s ease-in-out`,
// });

// const AnimatedBox = styled(Box)({
//   animation: `${fadeIn} 1s ease-in-out`,
// });

// export default AskAI;