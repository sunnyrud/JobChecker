// src/components/Dashboard/Dashboard.jsx
import React, { useState, useEffect, useMemo } from "react"; // Added useMemo
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import {
  FaBuilding,
  FaBriefcase,
  FaPlusCircle,
  FaChartLine,
  FaAngleDown,
  FaAngleUp,
} from "react-icons/fa";
import { supabase } from "../../supabase/supabaseClient"; // Ensure this path is correct

// Import child components
import FilterChart from "./FilterChart"; // Adjust path if needed
import PieFilter from "./PieFilter"; // Adjust path if needed
import CloudJobCompaniesChart from "./CloudJobCompaniesChart"; // Adjust path if needed
import Charts from "./Charts"; // Adjust path if needed
import JobPortal from "../JobPortal/JobPortal"; // Ensure this path is correct
import LocationAnalysis from "./LocationAnalysis"; // Adjust path if needed
import JobsByRoleType from "./JobsByRoleType"; // Adjust path if needed
import JobsByJobType from "./JobsByJobType"; // Adjust path if needed
import JobsByExperience from "./JobsByExperience"; // Adjust path if needed

const Dashboard = () => {
  // --- Core Data State ---
  const [allJobs, setAllJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- UI Toggle State ---
  const [stats, setStats] = useState({
    totalCompanies: 0,
    totalJobs: 0,
    newJobs: 4, // Example
    marketIncrease: "+20%", // Example
    companies: [],
  });
  const [showCompanies, setShowCompanies] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showJobPortal, setShowJobPortal] = useState(false);
  const [showNewJobs, setShowNewJobs] = useState(false);

  // --- Shared Filter State ---
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedJobType, setSelectedJobType] = useState("All");

  // --- Fetch Data ---
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [jobsCountRes, companyDataRes, allJobsRes] = await Promise.all([
          supabase.from("jobs").select("*", { count: "exact", head: true }),
          supabase.from("jobs").select("company_name"),
          supabase.from("jobs").select("*"),
        ]);

        if (jobsCountRes.error) throw jobsCountRes.error;
        if (companyDataRes.error) throw companyDataRes.error;
        if (allJobsRes.error) throw allJobsRes.error;

        const uniqueCompanies = Array.from(
          new Set(
            companyDataRes.data.map((job) => job.company_name).filter(Boolean)
          )
        ).sort();

        setStats((prevStats) => ({
          ...prevStats,
          totalCompanies: uniqueCompanies.length,
          totalJobs: jobsCountRes.count || 0,
          companies: uniqueCompanies,
        }));
        setAllJobs(allJobsRes.data || []);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data. Please try refreshing.");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  // --- Derive Filter Options ---
  const filterOptions = useMemo(() => {
    if (!allJobs || allJobs.length === 0) {
      return { locations: ["All"], jobTypes: ["All"] };
    }
    const locations = [
      "All",
      ...new Set(allJobs.map((job) => job.location).filter(Boolean)),
    ].sort();
    const jobTypes = [
      "All",
      ...new Set(allJobs.map((job) => job.job_type).filter(Boolean)),
    ].sort();
    return { locations, jobTypes };
  }, [allJobs]);

  // --- Derive Filtered Data (based on shared filters) ---
  const filteredJobsData = useMemo(() => {
    if (!allJobs) return [];
    return allJobs.filter((job) => {
      const locationMatch =
        selectedLocation === "All" || job.location === selectedLocation;
      const jobTypeMatch =
        selectedJobType === "All" || job.job_type === selectedJobType;
      return locationMatch && jobTypeMatch;
    });
  }, [allJobs, selectedLocation, selectedJobType]);

  // --- Filter Change Handlers ---
  const handleLocationChange = (location) => {
    setSelectedLocation(location);
  };

  const handleJobTypeChange = (jobType) => {
    setSelectedJobType(jobType);
  };

  // --- UI Toggle Functions ---
  const toggleCompanies = () => {
    const closing = showCompanies;
    setShowCompanies(!showCompanies);
    if (closing) {
      setSelectedCompany(null);
    }
  };
  const toggleNewJobs = () => setShowNewJobs(!showNewJobs);
  const toggleJobPortal = () => setShowJobPortal(!showJobPortal);
  const handleCompanyClick = (companyName) => {
    setSelectedCompany((prev) => (prev === companyName ? null : companyName));
  };

  return (
    <Container fluid className="py-4">
      <h1 className="text-center mb-2">Welcome to JobPortal</h1>
      <p className="text-center text-muted mb-5">
        We help you to find the jobs
      </p>

      {loading ? (
        <div className="text-center py-5">
          {" "}
          <Spinner animation="border" variant="primary" />{" "}
        </div>
      ) : error ? (
        <div className="text-center py-5">
          {" "}
          <Alert variant="danger">{error}</Alert>{" "}
        </div>
      ) : (
        <>
          {/* Stats Row */}
          <Row>
            {/* Total Companies Card */}
            <Col lg={3} md={6} className="mb-4">
              <Card
                className="h-100 shadow-sm"
                style={{ cursor: "pointer" }}
                onClick={toggleCompanies}
              >
                <Card.Body className="p-4">
                  <p className="text-muted mb-2 fw-bold text-center">
                    Total Companies
                  </p>
                  <h2 className="fw-bold mb-3">{stats.totalCompanies}</h2>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="text-primary">
                      <FaBuilding size={24} />
                    </div>
                    <div className="text-primary">
                      {showCompanies ? (
                        <FaAngleUp size={24} />
                      ) : (
                        <FaAngleDown size={24} />
                      )}
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            {/* Total Jobs Card */}
            <Col lg={3} md={6} className="mb-4">
              <Card
                className="h-100 shadow-sm"
                style={{ cursor: "pointer" }}
                onClick={toggleJobPortal}
              >
                <Card.Body className="p-4">
                  <p className="text-muted mb-2 fw-bold text-center">
                    Total Jobs
                  </p>
                  <h2 className="fw-bold mb-3">{stats.totalJobs}</h2>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="text-primary">
                      <FaBriefcase size={24} />
                    </div>
                    <div className="text-primary">
                      {showJobPortal ? (
                        <FaAngleUp size={24} />
                      ) : (
                        <FaAngleDown size={24} />
                      )}
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            {/* New Jobs Card */}
            <Col lg={3} md={6} className="mb-4">
              <Card
                className="h-100 shadow-sm"
                style={{ cursor: "pointer" }}
                onClick={toggleNewJobs}
              >
                <Card.Body className="p-4">
                  <p className="text-muted mb-2 fw-bold text-center">
                    New Jobs on cloud
                  </p>
                  <h2 className="fw-bold mb-3">{stats.newJobs}</h2>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="text-primary">
                      <FaPlusCircle size={24} />
                    </div>
                    <div className="text-primary">
                      {showNewJobs ? (
                        <FaAngleUp size={24} />
                      ) : (
                        <FaAngleDown size={24} />
                      )}
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            {/* Market Increase Card */}
            <Col lg={3} md={6} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body className="p-4">
                  <p className="text-muted mb-2 fw-bold text-center">
                    Job Market Increase
                  </p>
                  <h2 className="fw-bold mb-3">{stats.marketIncrease}</h2>
                  <div className="text-primary">
                    <FaChartLine size={24} />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Conditionally Rendered Sections */}
          {showCompanies && (
            <Row className="mt-4">
              <Col>
                <Card className="shadow-sm">
                  <Card.Body>
                    <h3 className="mb-4">Company List (Click to highlight)</h3>
                    <Row>
                      {stats.companies.map((company, index) => (
                        <Col key={index} lg={3} md={4} sm={6} className="mb-3">
                          <div
                            className={`p-3 border rounded d-flex align-items-center ${
                              selectedCompany === company ? "bg-light" : ""
                            }`}
                            style={{ cursor: "pointer" }}
                            onClick={() => handleCompanyClick(company)}
                          >
                            <FaBuilding className="text-primary me-2" />
                            <span>{company}</span>
                          </div>
                        </Col>
                      ))}
                      {stats.companies.length === 0 && (
                        <Col>
                          <p>No companies found.</p>
                        </Col>
                      )}
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}
          {showNewJobs && (
            <Row className="mt-4">
              <Col>
                <Card className="shadow-sm">
                  <Card.Body>
                    <h3 className="mb-4">New Job Listings (Sample)</h3>
                    {/* Add sample table or dynamic list here if needed */}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}
          {showJobPortal && (
            <div className="mt-4">
              <JobPortal jobsData={allJobs} /> {/* JobPortal needs all data */}
            </div>
          )}

          {/* --- Charts Row 1 (FilterChart & PieFilter with Shared Filters) --- */}
          <Row className="mt-4">
            <Col md={6} className="mb-4">
              <FilterChart
                jobsData={filteredJobsData} // Pass filtered data
                locationOptions={filterOptions.locations}
                jobTypeOptions={filterOptions.jobTypes}
                selectedLocation={selectedLocation}
                selectedJobType={selectedJobType}
                onLocationChange={handleLocationChange} // Pass handlers
                onJobTypeChange={handleJobTypeChange}
              />
            </Col>
            <Col md={6} className="mb-4 d-flex justify-content-center">
              <div style={{ width: "100%" }}>
                <PieFilter
                  jobsData={filteredJobsData} // Pass filtered data
                  allJobsData={allJobs} // Pass all data for legend context
                  selectedLocation={selectedLocation} // Pass filter status
                  selectedJobType={selectedJobType} // Pass filter status
                />
              </div>
            </Col>
          </Row>

          {/* --- Charts Row 2 (Donut Charts - Using allJobs for now) --- */}
          <Row className="mt-4">
            <Col md={4} className="mb-4">
              <JobsByRoleType jobsData={allJobs} />
            </Col>
            <Col md={4} className="mb-4">
              <JobsByJobType jobsData={allJobs} />
            </Col>
            <Col md={4} className="mb-4">
              <JobsByExperience jobsData={allJobs} />
            </Col>
          </Row>

          {/* --- Charts Row 3 (Other Existing Charts) --- */}
          <Row className="mt-4">
            <Col>
              <CloudJobCompaniesChart highlightedCompany={selectedCompany} />
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <Charts selectedCompany={selectedCompany} />
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              {/* LocationAnalysis might need filtered data too, or its own filters */}
              <LocationAnalysis jobsData={allJobs} />
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default Dashboard;
