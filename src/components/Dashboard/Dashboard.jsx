// src/components/Dashboard/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap"; // Added Spinner, Alert
import {
  FaBuilding,
  FaBriefcase,
  FaPlusCircle,
  FaChartLine,
  FaAngleDown,
  FaAngleUp,
} from "react-icons/fa";
import { supabase } from "../../supabase/supabaseClient"; // Ensure this path is correct
import FilterChart from './FilterChart'; // Adjust path if needed
import PieFilter from "./PieFilter";
// Import child components
import CloudJobCompaniesChart from "./CloudJobCompaniesChart";
import Charts from "./Charts";
import JobPortal from "../JobPortal/JobPortal"; // Ensure this path is correct
import LocationAnalysis from './LocationAnalysis';


// In Dashboard.jsx
import JobsByRoleType from './JobsByRoleType';
import JobsByJobType from './JobsByJobType';
import JobsByExperience from './JobsByExperience';




const Dashboard = () => {
  // State for dashboard statistics
  const [stats, setStats] = useState({
    totalCompanies: 0,
    totalJobs: 0,
    newJobs: 4, // Example: Consider fetching this dynamically too
    marketIncrease: "+20%", // Example: Consider fetching/calculating this
    companies: [],
  });

  // State to hold the complete list of jobs fetched once
  const [allJobs, setAllJobs] = useState([]);

  // State for loading and error handling during data fetch
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for UI toggles
  const [showCompanies, setShowCompanies] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showJobPortal, setShowJobPortal] = useState(false);
  const [showNewJobs, setShowNewJobs] = useState(false); // Keep or remove based on need

  // Fetch all necessary data when the component mounts
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true); // Start loading
      setError(null); // Reset error state

      try {
        // Fetch job count, company names, AND all job details in parallel
        const [jobsCountRes, companyDataRes, allJobsRes] = await Promise.all([
          supabase.from("jobs").select("*", { count: "exact", head: true }), // Get count
          supabase.from("jobs").select("company_name"), // Get company names for list
          supabase.from("jobs").select("*") // Get all job details for children
        ]);

        // Check for errors in each response
        if (jobsCountRes.error) throw jobsCountRes.error;
        if (companyDataRes.error) throw companyDataRes.error;
        if (allJobsRes.error) throw allJobsRes.error;

        // Process unique company names
        const uniqueCompanies = Array.from(
          new Set(companyDataRes.data.map((job) => job.company_name).filter(Boolean))
        ).sort();

        // Update statistics state
        setStats((prevStats) => ({
          ...prevStats,
          totalCompanies: uniqueCompanies.length,
          totalJobs: jobsCountRes.count || 0,
          companies: uniqueCompanies,
        }));

        // Store the fetched list of all jobs
        setAllJobs(allJobsRes.data || []);

      } catch (err) {
        // Handle any error during the fetch process
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data. Please try refreshing."); // Set user-friendly error
      } finally {
        // Stop loading indicator regardless of success or error
        setLoading(false);
      }
    };

    fetchDashboardData(); // Execute the fetch function
  }, []); // Empty dependency array ensures this runs only once on mount

  // --- UI Toggle Functions ---
  const toggleCompanies = () => {
    const closing = showCompanies;
    setShowCompanies(!showCompanies);
    if (closing) {
      setSelectedCompany(null); // Clear selection when closing
    }
  };

  const toggleNewJobs = () => {
    setShowNewJobs(!showNewJobs);
  };

  const toggleJobPortal = () => {
    setShowJobPortal(!showJobPortal);
  };

  const handleCompanyClick = (companyName) => {
    setSelectedCompany(prevSelected =>
      prevSelected === companyName ? null : companyName
    );
  };
  // --- End UI Toggle Functions ---

  return (
    <Container fluid className="py-4">
      <h1 className="text-center mb-2">Welcome to JobPortal</h1>
      <p className="text-center text-muted mb-5">
        We help you to find the jobs
      </p>

      {/* Display Loading Spinner or Error Message */}
      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" role="status" variant="primary">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : error ? (
         <div className="text-center py-5">
            <Alert variant="danger">{error}</Alert>
         </div>
      ) : (
        // Render dashboard content only after loading is complete and no error
        <>
          {/* Row for Stats Cards */}
          <Row>
            {/* Total Companies Card */}
            <Col lg={3} md={6} className="mb-4">
              <Card className="h-100 shadow-sm" style={{ cursor: "pointer" }} onClick={toggleCompanies}>
                <Card.Body className="p-4">
                  <p className="text-muted mb-2 fw-bold text-center">Total Companies</p>
                  <h2 className="fw-bold mb-3">{stats.totalCompanies}</h2>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="text-primary"><FaBuilding size={24} /></div>
                    <div className="text-primary">{showCompanies ? <FaAngleUp size={24} /> : <FaAngleDown size={24} />}</div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Total Jobs Card (Toggles JobPortal) */}
            <Col lg={3} md={6} className="mb-4">
              <Card className="h-100 shadow-sm" style={{ cursor: "pointer" }} onClick={toggleJobPortal}>
                <Card.Body className="p-4">
                  <p className="text-muted mb-2 fw-bold text-center">Total Jobs</p>
                  <h2 className="fw-bold mb-3">{stats.totalJobs}</h2>
                  <div className="d-flex justify-content-between align-items-center">
                     <div className="text-primary"><FaBriefcase size={24} /></div>
                     <div className="text-primary">{showJobPortal ? <FaAngleUp size={24} /> : <FaAngleDown size={24} />}</div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* New Jobs Card (Example) */}
            <Col lg={3} md={6} className="mb-4">
              <Card className="h-100 shadow-sm" style={{ cursor: "pointer" }} onClick={toggleNewJobs}>
                <Card.Body className="p-4">
                  <p className="text-muted mb-2 fw-bold text-center">New Jobs on cloud</p>
                  <h2 className="fw-bold mb-3">{stats.newJobs}</h2>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="text-primary"><FaPlusCircle size={24} /></div>
                    <div className="text-primary">{showNewJobs ? <FaAngleUp size={24} /> : <FaAngleDown size={24} />}</div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Market Increase Card (Example) */}
            <Col lg={3} md={6} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body className="p-4">
                  <p className="text-muted mb-2 fw-bold text-center">Job Market Increase</p>
                  <h2 className="fw-bold mb-3">{stats.marketIncrease}</h2>
                  <div className="text-primary"><FaChartLine size={24} /></div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Conditionally Rendered Company List */}
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
                      {stats.companies.length === 0 && <Col><p>No companies found.</p></Col>}
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}

          {/* Conditionally Rendered New Jobs Table (Example) */}
          {showNewJobs && (
             <Row className="mt-4">
               {/* Consider replacing this with a more dynamic component or removing */}
               <Col>
                 <Card className="shadow-sm">
                   <Card.Body>
                     <h3 className="mb-4">New Job Listings (Sample)</h3>
                     {/* ... Sample Table ... */}
                   </Card.Body>
                 </Card>
               </Col>
             </Row>
          )}

          {/* Conditionally Render JobPortal and pass the fetched data */}
          {showJobPortal && (
            <div className="mt-4">
              <JobPortal jobsData={allJobs} /> {/* Pass allJobs data as prop */}
            </div>
          )}

          {/* CloudJobCompaniesChart */}
          <Row className="mt-4">
            {/* Ensure this component uses selectedCompany if needed */}
            <CloudJobCompaniesChart highlightedCompany={selectedCompany} />
          </Row>

          {/* Charts Component */}
           <Row className="mt-4">
              <Col>
                  {/* Ensure this component uses selectedCompany if needed */}
                  <Charts selectedCompany={selectedCompany} />
              </Col>
           </Row>
           // Inside Dashboard.jsx's return, after loading/error checks:
           // Inside Dashboard.jsx's return statement
<Row className="mt-4">
  <Col md={6} className="mb-4"> {/* Column for FilterChart */}
    <FilterChart jobsData={allJobs} />
  </Col>
  <Col md={6} className="mb-4"> {/* Column for PieFilter */}
    <PieFilter jobsData={allJobs} />
  </Col>
</Row>

<Row className="mt-4">
  <Col> {/* Takes full width, or adjust Col size */}
    <LocationAnalysis jobsData={allJobs} />
  </Col>
</Row>


// Inside the return statement (adjust layout with Rows/Cols as needed)
<Row className="mt-4">
  <Col md={6} className="mb-4">
    <JobsByRoleType jobsData={allJobs} />
  </Col>
  <Col md={6} className="mb-4">
    <JobsByJobType jobsData={allJobs} />
  </Col>
  <Col md={6} className="mb-4">
    <JobsByExperience jobsData={allJobs} />
  </Col>
</Row>
         
        </>
      )}
    </Container>
  );
};

export default Dashboard;
