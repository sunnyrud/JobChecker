// src/components/JobPortal/JobPortal.jsx
import React, { useState, useEffect, useCallback } from "react";
import {
  Container, Row, Col, Card, Form, Button, InputGroup, Badge, Spinner, Alert // Added Spinner/Alert if needed for filtering feedback
} from "react-bootstrap";
import { FaSearch, FaFilter } from "react-icons/fa";
// REMOVED: import { supabase } from "../../supabase/supabaseClient"; // No longer needed here
import { useNavigate } from "react-router-dom";
import "./JobPortal.css"; // Ensure this path is correct

// Accept jobsData prop from the parent (Dashboard)
const JobPortal = ({ jobsData }) => {
  const navigate = useNavigate();

  // Initialize internal state based on the received prop
  // 'jobs' holds the full list received from the parent
  const [jobs, setJobs] = useState(jobsData || []);
  // 'filteredJobs' holds the list after applying local filters
  const [filteredJobs, setFilteredJobs] = useState(jobsData || []);

  // REMOVED: Initial loading state, as parent handles the initial fetch loading
  // const [loading, setLoading] = useState(true);

  // State for local filters within the JobPortal
  const [searchTerm, setSearchTerm] = useState("");
  const [jobType, setJobType] = useState("");
  const [experience, setExperience] = useState("");
  const [minSalary, setMinSalary] = useState(0);
  const [maxSalary, setMaxSalary] = useState(200000); // Default max, adjust if needed
  const [showFilters, setShowFilters] = useState(false);

  // Filter options (could also be derived from jobsData if needed)
  const jobTypes = ["Remote", "Hybrid", "On-Site"];
  const experienceLevels = ["Entry Level", "Mid Level", "Senior Level"];

  // Effect to update the internal state if the jobsData prop changes
  // This ensures the portal reflects updates if the parent re-fetches data
  useEffect(() => {
      setJobs(jobsData || []);
      setFilteredJobs(jobsData || []);
      // Optional: Reset filters when parent data changes?
      // resetFilters();
  }, [jobsData]); // Dependency on the prop

  // REMOVED: The useEffect hook that previously fetched data from Supabase

  // Callback function to apply local filters to the 'jobs' list (from props)
  const applyFilters = useCallback(() => {
    // Start with the full list received from the parent
    let result = [...jobs];

    // Apply search term filter
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      result = result.filter(
        (job) =>
          job.job_title?.toLowerCase().includes(lowerSearchTerm) || // Added optional chaining for safety
          job.company_name?.toLowerCase().includes(lowerSearchTerm)
      );
    }

    // Filter by job type
    if (jobType) {
      result = result.filter((job) => job.job_type === jobType);
    }

    // Filter by experience level
    if (experience) {
      result = result.filter((job) => job.experience === experience);
    }

    // Filter by salary range (Ensure salary field exists and is a number)
    result = result.filter(
      (job) => (job.salary ?? 0) >= minSalary && (job.salary ?? Infinity) <= maxSalary
    );

    // Update the state holding the filtered list for display
    setFilteredJobs(result);
  }, [jobs, searchTerm, jobType, experience, minSalary, maxSalary]); // Dependencies for the filter logic

  // Effect to automatically re-apply filters whenever a filter criterion changes
  useEffect(() => {
    applyFilters();
  }, [applyFilters]); // Dependency on the memoized applyFilters function

  // Function to reset all local filters to their default values
  const resetFilters = () => {
    setSearchTerm("");
    setJobType("");
    setExperience("");
    setMinSalary(0);
    setMaxSalary(200000);
    // applyFilters will run automatically via its useEffect dependency
  };

  // Function to toggle the visibility of the filter section
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <Container fluid className="py-4">
      {/* Portal Header */}
      <h1 className="text-center mb-2">Job Portal</h1>
      <p className="text-center text-muted mb-4">
        Find your dream job from our curated listings
      </p>

      {/* Search and Filter Controls Card */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          {/* Search Input and Filter Toggle Button */}
          <Row className="align-items-center">
            <Col md={8}>
              <InputGroup>
                <InputGroup.Text><FaSearch /></InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search by job title or company"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label="Search jobs"
                />
              </InputGroup>
            </Col>
            <Col md={4} className="d-flex justify-content-end mt-3 mt-md-0">
              <Button variant="outline-primary" onClick={toggleFilters} className="d-flex align-items-center">
                <FaFilter className="me-2" />
                {showFilters ? "Hide Filters" : "Show Filters"}
              </Button>
            </Col>
          </Row>

          {/* Collapsible Filter Section */}
          {showFilters && (
            <div className="mt-3 pt-3 border-top">
              <Row>
                {/* Job Type Filter */}
                <Col md={4} className="mb-3">
                  <Form.Group>
                    <Form.Label>Job Type</Form.Label>
                    <Form.Select value={jobType} onChange={(e) => setJobType(e.target.value)} aria-label="Filter by job type">
                      <option value="">All Types</option>
                      {jobTypes.map((type) => ( <option key={type} value={type}>{type}</option> ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                {/* Experience Level Filter */}
                <Col md={4} className="mb-3">
                  <Form.Group>
                    <Form.Label>Experience Level</Form.Label>
                    <Form.Select value={experience} onChange={(e) => setExperience(e.target.value)} aria-label="Filter by experience level">
                      <option value="">All Levels</option>
                      {experienceLevels.map((level) => ( <option key={level} value={level}>{level}</option> ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                {/* Salary Range Filter */}
                <Col md={4} className="mb-3">
                  <Form.Group>
                    <Form.Label>Salary Range (${minSalary.toLocaleString()} - ${maxSalary.toLocaleString()})</Form.Label>
                    {/* Consider using dedicated range slider components for better UX */}
                    <div className="d-flex gap-2">
                      <Form.Control type="range" min="0" max="200000" step="10000" value={minSalary} onChange={(e) => setMinSalary(Number(e.target.value))} aria-label="Minimum salary"/>
                      <Form.Control type="range" min="0" max="200000" step="10000" value={maxSalary} onChange={(e) => setMaxSalary(Number(e.target.value))} aria-label="Maximum salary"/>
                    </div>
                  </Form.Group>
                </Col>
              </Row>
              {/* Reset Button */}
              <div className="d-flex justify-content-end mt-2">
                <Button variant="secondary" onClick={resetFilters}>Reset Filters</Button>
              </div>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Job Listing Section */}
      {/* Display message if filters result in no matches */}
      {filteredJobs.length === 0 && jobs.length > 0 ? (
        <div className="text-center py-5">
          <h3>No jobs found matching your criteria</h3>
          <p className="text-muted">Try adjusting your filters</p>
          <Button variant="primary" onClick={resetFilters}>Reset All Filters</Button>
        </div>
      /* Display message if there was no initial data from the parent */
      ) : jobs.length === 0 ? (
         <div className="text-center py-5">
           <h3>No jobs available at the moment.</h3>
           <p className="text-muted">Please check back later.</p>
         </div>
      /* Display the list of filtered jobs */
      ) : (
        <Row>
          {filteredJobs.map((job) => (
            <Col lg={4} md={6} className="mb-4" key={job.id}>
              <Card className="h-100 job-card shadow-sm">
                <Card.Body className="d-flex flex-column"> {/* Use flex column for layout */}
                  {/* Job Title, Company, Type */}
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h5 className="card-title mb-1">{job.job_title || "N/A"}</h5>
                      <h6 className="text-muted">{job.company_name || "N/A"}</h6>
                    </div>
                    <Badge bg="primary" className="job-type-badge flex-shrink-0">{job.job_type || "N/A"}</Badge>
                  </div>

                  {/* Location, Experience, Salary */}
                  <div className="mb-3">
                    <div className="d-flex align-items-center mb-2">
                      <strong className="me-2">Location:</strong> {job.location || "N/A"}
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <strong className="me-2">Experience:</strong> {job.experience || "N/A"}
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <strong className="me-2">Salary:</strong> ${job.salary?.toLocaleString() ?? "N/A"}
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mb-3">
                    <strong>Skills:</strong>
                    <div className="mt-2 d-flex flex-wrap gap-1">
                      {job.required_skills && Array.isArray(job.required_skills) ? (
                        job.required_skills.map((skill, index) => (
                          <Badge key={index} bg="light" text="dark" className="skill-badge">{skill}</Badge>
                        ))
                      ) : (
                        <span className="text-muted small">No skills listed</span>
                      )}
                    </div>
                  </div>

                  {/* Apply Button (pushes content down) */}
                  <Button
                    variant="outline-primary"
                    className="w-100 mt-auto" // Use mt-auto to push to bottom
                    onClick={() => navigate("/apply-now")} // Ensure this route exists in your router setup
                  >
                    Apply Now
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default JobPortal;
