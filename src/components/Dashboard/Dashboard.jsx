// src/components/Dashboard/Dashboard.jsx
import React, { useState, useEffect, useMemo } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
  Badge,
} from "react-bootstrap";
import {
  FaBuilding,
  FaBriefcase,
  FaPlusCircle,
  FaChartLine,
  FaAngleDown,
  FaAngleUp,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase/supabaseClient";

// Import Recharts components needed for the Line Chart
import {
  LineChart,
  Line,
  XAxis as RechartsXAxis,
  YAxis as RechartsYAxis, // Renamed to avoid conflict
  CartesianGrid as RechartsCartesianGrid,
  Tooltip as RechartsTooltip,
  Legend as RechartsLegend,
  ResponsiveContainer,
} from "recharts";

// Import child components
import FilterChart from "./FilterChart";
import PieFilter from "./PieFilter";
import CloudJobCompaniesChart from "./CloudJobCompaniesChart";
import Charts from "./Charts"; // Still needed for the other 2 charts
import JobPortal from "../JobPortal/JobPortal";
import LocationAnalysis from "./LocationAnalysis";
import JobsByRoleType from "./JobsByRoleType";
import JobsByJobType from "./JobsByJobType";
import JobsByExperience from "./JobsByExperience";

const Dashboard = () => {
  // --- Core Data State ---
  const [allJobs, setAllJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- UI Toggle State ---
  const [stats, setStats] = useState({
    totalCompanies: 0,
    totalJobs: 0,
    newJobs: 4,
    marketIncrease: "+20%", // Keep example or calculate
    companies: [],
  });
  const [showCompanies, setShowCompanies] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showJobPortal, setShowJobPortal] = useState(false);
  const [showNewJobs, setShowNewJobs] = useState(false);
  const [showMarketTrendChart, setShowMarketTrendChart] = useState(false); // <-- State for trend chart

  // --- Shared Filter State ---
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedJobType, setSelectedJobType] = useState("All");

  // --- Navigation ---
  const navigate = useNavigate();

  // --- Fetch Data (remains the same) ---
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch Total Count FIRST
        const { count: totalJobsCount, error: countError } = await supabase
          .from("jobs")
          .select("*", { count: "exact", head: true });
        if (countError) throw countError;

        // Fetch ALL Job Details
        const { data: allJobsData, error: jobsError } = await supabase
          .from("jobs")
          .select("*")
          .order("id", { ascending: false });
        if (jobsError) throw jobsError;

        const fetchedJobs = allJobsData || [];
        setAllJobs(fetchedJobs);

        // Calculate stats based on the FULL dataset
        const uniqueCompanies = Array.from(
          new Set(fetchedJobs.map((job) => job.company_name).filter(Boolean))
        ).sort();
        const newJobsCount = Math.min(4, totalJobsCount || 0);

        setStats({
          totalCompanies: uniqueCompanies.length,
          totalJobs: totalJobsCount || 0,
          newJobs: newJobsCount,
          marketIncrease: "+20%", // Keep example or calculate
          companies: uniqueCompanies,
        });
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data. Please try refreshing.");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  // --- Derive Filter Options (remains the same) ---
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

  // --- Derive Filtered Data (remains the same) ---
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

  // --- Get Top 4 Jobs (remains the same) ---
  const topNewJobs = useMemo(() => {
    return allJobs.slice(0, stats.newJobs);
  }, [allJobs, stats.newJobs]);

  // --- Filter Change Handlers (remains the same) ---
  const handleLocationChange = (location) => setSelectedLocation(location);
  const handleJobTypeChange = (jobType) => setSelectedJobType(jobType);

  // --- UI Toggle Functions ---
  const toggleCompanies = () => {
    const closing = showCompanies;
    setShowCompanies(!showCompanies);
    if (closing) setSelectedCompany(null);
  };
  const toggleNewJobs = () => setShowNewJobs(!showNewJobs);
  const toggleJobPortal = () => setShowJobPortal(!showJobPortal);
  const handleCompanyClick = (companyName) => {
    setSelectedCompany((prev) => (prev === companyName ? null : companyName));
  };
  const toggleMarketTrendChart = () =>
    setShowMarketTrendChart(!showMarketTrendChart); // <-- Toggle function for trend chart

  // --- Sample Data for Market Trend Chart ---
  // (Moved from Charts.jsx - consider fetching real data later)
  const marketTrendData = [
    { month: "Jan", marketTrends: 25 },
    { month: "Feb", marketTrends: 20 },
    { month: "Mar", marketTrends: 40 },
    { month: "Apr", marketTrends: 30 },
    { month: "May", marketTrends: 50 }, // Added more sample data
    { month: "Jun", marketTrends: 45 },
  ];

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
                    New Job Listings
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
            {/* Market Increase Card - Now Clickable */}
            <Col lg={3} md={6} className="mb-4">
              <Card
                className="h-100 shadow-sm"
                style={{ cursor: "pointer" }}
                onClick={toggleMarketTrendChart}
              >
                {" "}
                {/* Added onClick */}
                <Card.Body className="p-4">
                  <p className="text-muted mb-2 fw-bold text-center">
                    Job Market Increase
                  </p>
                  <h2 className="fw-bold mb-3">{stats.marketIncrease}</h2>
                  {/* Added toggle icon */}
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="text-primary">
                      <FaChartLine size={24} />
                    </div>
                    <div className="text-primary">
                      {showMarketTrendChart ? (
                        <FaAngleUp size={24} />
                      ) : (
                        <FaAngleDown size={24} />
                      )}
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* --- Conditionally Rendered Market Trend Chart --- */}
          {showMarketTrendChart && (
            <Row className="mt-4">
              <Col>
                <Card className="shadow-sm">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="card-title mb-0">
                        Job Market Trends (Sample)
                      </h5>
                      <div className="badge bg-light text-dark">Monthly</div>{" "}
                      {/* Example badge */}
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart
                        data={marketTrendData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <RechartsCartesianGrid strokeDasharray="3 3" />
                        <RechartsXAxis dataKey="month" />
                        <RechartsYAxis />
                        <RechartsTooltip />
                        <RechartsLegend />
                        <Line
                          type="monotone"
                          dataKey="marketTrends"
                          name="Market Trends"
                          stroke="#82ca9d" // Chart color
                          activeDot={{ r: 8 }}
                          isAnimationActive={true} // Added animation
                          animationDuration={500}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}

          {/* --- Other Conditionally Rendered Sections --- */}
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
                  <Card.Header as="h5" className="py-3">
                    New Job Listings
                  </Card.Header>
                  <Card.Body>
                    {topNewJobs.length === 0 ? (
                      <p className="text-muted">No new jobs to display.</p>
                    ) : (
                      <Row>
                        {topNewJobs.map((job) => (
                          <Col
                            lg={6}
                            xl={3}
                            md={6}
                            className="mb-4"
                            key={`new-${job.id}`}
                          >
                            <Card className="h-100 job-card shadow-sm">
                              <Card.Body className="d-flex flex-column">
                                <div className="d-flex justify-content-between align-items-start mb-3">
                                  <div>
                                    <h5 className="card-title mb-1">
                                      {job.job_title || "N/A"}
                                    </h5>
                                    <h6 className="text-muted">
                                      {job.company_name || "N/A"}
                                    </h6>
                                  </div>
                                  <Badge
                                    bg="secondary"
                                    className="job-type-badge flex-shrink-0"
                                  >
                                    {job.job_type || "N/A"}
                                  </Badge>
                                </div>
                                <div className="mb-3">
                                  <div className="d-flex align-items-center mb-2 small text-muted">
                                    <strong className="me-2">Location:</strong>{" "}
                                    {job.location || "N/A"}
                                  </div>
                                  <div className="d-flex align-items-center mb-2 small text-muted">
                                    <strong className="me-2">
                                      Experience:
                                    </strong>{" "}
                                    {job.experience || "N/A"}
                                  </div>
                                  <div className="d-flex align-items-center mb-2 small text-muted">
                                    <strong className="me-2">Salary:</strong> $
                                    {job.salary?.toLocaleString() ?? "N/A"}
                                  </div>
                                </div>
                              </Card.Body>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}
          {showJobPortal && (
            <div className="mt-4">
              <JobPortal jobsData={allJobs} />
            </div>
          )}

          <Row className="mt-4">
            <Col>
              <CloudJobCompaniesChart
                highlightedCompany={selectedCompany}
                jobsData={allJobs}
              />{" "}
            </Col>{" "}
          </Row>

          <Row className="mt-4">
            {" "}
            <Col>
              {" "}
              <Charts
                selectedCompany={selectedCompany}
                jobsData={allJobs}
              />{" "}
            </Col>{" "}
          </Row>

          {/* --- Charts Rows --- */}
          {/* Row 1 (Filter & Pie) */}
          <Row className="mt-4">
            <Col md={6} className="mb-4">
              <FilterChart
                jobsData={filteredJobsData}
                locationOptions={filterOptions.locations}
                jobTypeOptions={filterOptions.jobTypes}
                selectedLocation={selectedLocation}
                selectedJobType={selectedJobType}
                onLocationChange={handleLocationChange}
                onJobTypeChange={handleJobTypeChange}
              />
            </Col>
            <Col md={6} className="mb-4 d-flex justify-content-center">
              <div style={{ width: "100%" }}>
                <PieFilter
                  jobsData={filteredJobsData}
                  allJobsData={allJobs}
                  selectedLocation={selectedLocation}
                  selectedJobType={selectedJobType}
                />
              </div>
            </Col>
          </Row>

          {/* Row 3 (Other Charts - Render remaining from Charts.jsx) */}

          <Row className="mt-4">
            {" "}
            <Col>
              {" "}
              <LocationAnalysis jobsData={allJobs} />{" "}
            </Col>{" "}
          </Row>
          {/* Row 2 (Donuts) */}
          <Row className="mt-4">
            <Col lg={4} md={6} className="mb-4">
              {" "}
              <JobsByRoleType jobsData={allJobs} />{" "}
            </Col>
            <Col lg={4} md={6} className="mb-4">
              {" "}
              <JobsByJobType jobsData={allJobs} />{" "}
            </Col>
            <Col lg={4} md={12} className="mb-4">
              {" "}
              <JobsByExperience jobsData={allJobs} />{" "}
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default Dashboard;
