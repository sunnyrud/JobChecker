// src/components/JobList.jsx
import React from "react";
import { Row, Col } from "react-bootstrap";
import JobCard from "./JobCard"; // Import the JobCard component

const JobList = ({ jobs }) => {
  return (
    <>
      <h3 className="mb-3">Available Jobs ({jobs.length})</h3>
      <Row className="g-4">
        {" "}
        {/* Removed column props from Row */}
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <JobCard key={job.id} job={job} /> // Render JobCard for each job
          ))
        ) : (
          <Col>
            <p>No jobs found matching your filters.</p>
          </Col>
        )}
      </Row>
    </>
  );
};

export default JobList;
