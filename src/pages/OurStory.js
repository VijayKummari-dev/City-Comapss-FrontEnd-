import React from "react";
import { Typography, Box } from "@mui/material";

const OurStory = () => {
    return (
        <Box sx={{ padding: 4, backgroundColor: "#f9f9f9", borderRadius: 2 }}>
            {/* Heading */}
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: "bold", textAlign: "center", color: "#333" }}>
                About Us
            </Typography>
            {/* Story Content */}
            <Typography variant="body1" sx={{ lineHeight: 1.8, color: "#555", textAlign: "justify" }}>
                City Compass wasn’t born in a fancy boardroom or with a perfectly laid-out plan. Nope—it all started with 10 exhausted master’s students, 
                a few broken appliances, and job hunts that made us wonder if “Professional Netflix Binger” was a legitimate career path. We were knee-deep 
                in our Computer Science capstone project when life threw in some extra plot twists: a clogged sink that turned our kitchen into a mini-swamp, 
                an AC unit that only seemed to work in winter, and a to-do list so long it needed its own zip code.
                <br /><br />
                In the midst of balancing our coursework and city-life crises, we had a lightbulb moment (or maybe it was the caffeine kicking in). If we could 
                code our way through academia, why not create something to help everyone navigate urban chaos a bit easier? And just like that, City Compass was born. 
                Need a reliable service? We’ve battled the plumbing demons. Looking for non-tech jobs that won’t leave you questioning your life choices? Been there. 
                And if you’re brave enough for an AI-generated city adventure, well, buckle up.
                <br /><br />
                Welcome to City Compass, where our misadventures inspired your go-to guide to city life.
            </Typography>
        </Box>
    );
}

export default OurStory;
