import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Container,
} from "@mui/material";

const candidates = [
  {
    id: 1,
    fullName: "John Smith",
    email: "john.smith@example.com",
    location: "New York, NY",
    experience: "5 years of software development",
  },
  {
    id: 2,
    fullName: "Sarah Johnson",
    email: "sarah.j@example.com",
    location: "San Francisco, CA",
    experience: "3 years of UX design",
  },
  {
    id: 3,
    fullName: "Michael Chen",
    email: "mchen@example.com",
    location: "Seattle, WA",
    experience: "7 years of data science",
  },
  {
    id: 4,
    fullName: "Emily Brown",
    email: "emily.brown@example.com",
    location: "Austin, TX",
    experience: "4 years of product management",
  },
  {
    id: 5,
    fullName: "David Wilson",
    email: "david.w@example.com",
    location: "Boston, MA",
    experience: "6 years of full-stack development",
  },
];

const CandidatePool = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Candidate Pool
      </Typography>
      <Grid container spacing={3}>
        {candidates.map((candidate) => (
          <Grid item xs={12} sm={6} md={4} key={candidate.id}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {candidate.fullName}
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                  {candidate.email}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  📍 {candidate.location}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2">
                    Experience: {candidate.experience}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CandidatePool;
