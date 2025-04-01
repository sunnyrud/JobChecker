// src/components/JobCard.jsx
import React from "react";
import { Card, Button, Col } from "react-bootstrap";

const JobCard = ({ job }) => {
  return (
    // Apply column sizing here
    <Col xs={12} sm={6} lg={4}>
      <Card className="h-100 shadow-sm">
        <Card.Body>
          <Card.Title>{job.role}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {job.company}
          </Card.Subtitle>
          <Card.Text>
            <strong>City:</strong> {job.city} <br />
            {job.location && (
              <>
                <strong>Location:</strong> {job.location}
                <br />
              </>
            )}
            <strong>Type:</strong> {job.jobType}
          </Card.Text>
          <Button variant="primary" size="sm">
            View Details
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default JobCard;
