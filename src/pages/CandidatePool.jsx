import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

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
    <Container fluid className="py-4">
      <h1 className="mb-4">Candidate Pool</h1>
      <Row xs={1} sm={2} md={3} className="g-4">
        {candidates.map((candidate) => (
          <Col key={candidate.id}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title as="h5" className="mb-2">
                  {candidate.fullName}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {candidate.email}
                </Card.Subtitle>
                <Card.Text className="text-muted">
                  📍 {candidate.location}
                </Card.Text>
                <div className="mt-3">
                  <Card.Text>
                    <strong>Experience:</strong> {candidate.experience}
                  </Card.Text>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CandidatePool;
