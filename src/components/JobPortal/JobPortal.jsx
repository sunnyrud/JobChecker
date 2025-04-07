import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  InputGroup,
  Badge,
} from "react-bootstrap";
import { FaSearch, FaFilter } from "react-icons/fa";
import { supabase } from "../../supabase/supabaseClient";
import "./JobPortal.css";

const JobPortal = () => {
  // State for jobs and loading status
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // State for filters
  const [searchTerm, setSearchTerm] = useState("");
  const [jobType, setJobType] = useState("");
  const [experience, setExperience] = useState("");
  const [minSalary, setMinSalary] = useState(0);
  const [maxSalary, setMaxSalary] = useState(200000);
  const [showFilters, setShowFilters] = useState(false);

  // Job type options
  const jobTypes = [
    "Full-Time",
    "Part-Time",
    "Contract",
    "Internship",
    "Remote",
    "Hybrid",
    "On-Site",
  ];

  // Experience level options
  const experienceLevels = ["Entry Level", "Mid Level", "Senior Level"];

  // Fetch jobs from Supabase
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.from("jobs").select("*");

        if (error) throw error;

        setJobs(data || []);
        setFilteredJobs(data || []);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Apply filters when filter values change
  useEffect(() => {
    applyFilters();
  }, [searchTerm, jobType, experience, minSalary, maxSalary]);

  // Filter jobs based on selected criteria
  const applyFilters = () => {
    let result = [...jobs];

    // Filter by search term (job title or company name)
    if (searchTerm) {
      result = result.filter(
        (job) =>
          job.job_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company_name.toLowerCase().includes(searchTerm.toLowerCase())
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

    // Filter by salary range
    result = result.filter(
      (job) => job.salary >= minSalary && job.salary <= maxSalary
    );

    setFilteredJobs(result);
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm("");
    setJobType("");
    setExperience("");
    setMinSalary(0);
    setMaxSalary(200000);
  };

  // Toggle filter section visibility
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
      <Container fluid className="py-4">
        <h1 className="text-center mb-2">Job Portal</h1>
        <p className="text-center text-muted mb-4">
          Find your dream job from our curated listings
        </p>

        {/* Search and Filter Section */}
        <Card className="mb-4 shadow-sm">
          <Card.Body>
            <Row className="align-items-center">
              <Col md={8}>
                <InputGroup>
                  <InputGroup.Text>
                    <FaSearch />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Search by job title or company"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
              </Col>
              <Col md={4} className="d-flex justify-content-end mt-3 mt-md-0">
                <Button
                  variant="outline-primary"
                  onClick={toggleFilters}
                  className="d-flex align-items-center"
                >
                  <FaFilter className="me-2" />
                  {showFilters ? "Hide Filters" : "Show Filters"}
                </Button>
              </Col>
            </Row>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="mt-3 pt-3 border-top">
                <Row>
                  <Col md={4} className="mb-3">
                    <Form.Group>
                      <Form.Label>Job Type</Form.Label>
                      <Form.Select
                        value={jobType}
                        onChange={(e) => setJobType(e.target.value)}
                      >
                        <option value="">All Types</option>
                        {jobTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={4} className="mb-3">
                    <Form.Group>
                      <Form.Label>Experience Level</Form.Label>
                      <Form.Select
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                      >
                        <option value="">All Levels</option>
                        {experienceLevels.map((level) => (
                          <option key={level} value={level}>
                            {level}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={4} className="mb-3">
                    <Form.Group>
                      <Form.Label>
                        Salary Range (${minSalary.toLocaleString()} - $
                        {maxSalary.toLocaleString()})
                      </Form.Label>
                      <div className="d-flex gap-2">
                        <Form.Control
                          type="range"
                          min="0"
                          max="200000"
                          step="10000"
                          value={minSalary}
                          onChange={(e) => setMinSalary(Number(e.target.value))}
                        />
                        <Form.Control
                          type="range"
                          min="0"
                          max="200000"
                          step="10000"
                          value={maxSalary}
                          onChange={(e) => setMaxSalary(Number(e.target.value))}
                        />
                      </div>
                    </Form.Group>
                  </Col>
                </Row>
                <div className="d-flex justify-content-end">
                  <Button
                    variant="secondary"
                    onClick={resetFilters}
                    className="me-2"
                  >
                    Reset Filters
                  </Button>
                </div>
              </div>
            )}
          </Card.Body>
        </Card>

        {/* Job Listings */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-5">
            <h3>No jobs found matching your criteria</h3>
            <p className="text-muted">Try adjusting your filters</p>
            <Button variant="primary" onClick={resetFilters}>
              Reset All Filters
            </Button>
          </div>
        ) : (
          <Row>
            {filteredJobs.map((job) => (
              <Col lg={4} md={6} className="mb-4" key={job.id}>
                <Card className="h-100 job-card shadow-sm">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div>
                        <h5 className="card-title mb-1">{job.job_title}</h5>
                        <h6 className="text-muted">{job.company_name}</h6>
                      </div>
                      <Badge bg="primary" className="job-type-badge">
                        {job.job_type}
                      </Badge>
                    </div>

                    <div className="mb-3">
                      <div className="d-flex align-items-center mb-2">
                        <strong className="me-2">Location:</strong>{" "}
                        {job.location}
                      </div>
                      <div className="d-flex align-items-center mb-2">
                        <strong className="me-2">Experience:</strong>{" "}
                        {job.experience}
                      </div>
                      <div className="d-flex align-items-center mb-2">
                        <strong className="me-2">Salary:</strong> $
                        {job.salary.toLocaleString()}
                      </div>
                    </div>

                    <div className="mb-3">
                      <strong>Skills:</strong>
                      <div className="mt-2 d-flex flex-wrap gap-1">
                        {job.required_skills && job.required_skills.map((skill, index) => (
                          <Badge
                            key={index}
                            bg="light"
                            text="dark"
                            className="skill-badge"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button variant="outline-primary" className="w-100 mt-2">
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
