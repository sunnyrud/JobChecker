import { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  FaBuilding,
  FaBriefcase,
  FaBriefcase as FaNewJobs,
  FaChartLine,
  FaAngleDown,
  FaAngleUp,
} from "react-icons/fa";
import { supabase } from "../../supabase/supabaseClient";
import Charts from "./Charts";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalCompanies: 0,
    totalJobs: 0,
    newJobs: 135,
    marketIncrease: "+12.5%",
    companies: [],
    jobs: [
      {
        id: 1,
        job_title: "Cloud Admin",
        company_name: "Dell",
        location: "Los Angeles, CA",
        job_type: "Remote",
        experience: "Entry Level",
      },
      {
        id: 2,
        job_title: "Cloud Ops",
        company_name: "Wipro",
        location: "New York, NY",
        job_type: "Hybrid",
        experience: "Entry Level",
      },
      {
        id: 3,
        job_title: "Cloud Dev",
        company_name: "Salesforce",
        location: "Atlanta, GA",
        job_type: "On-Site",
        experience: "Entry Level",
      },
      {
        id: 4,
        job_title: "Cloud Con",
        company_name: "Salesforce",
        location: "New York, NY",
        job_type: "Hybrid",
        experience: "Entry Level",
      },
    ],
  });
  const [loading, setLoading] = useState(true);
  const [showCompanies, setShowCompanies] = useState(false);
  const [showNewJobs, setShowNewJobs] = useState(false);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setLoading(true);

        // Get total jobs count
        const { count: jobsCount, error: jobsError } = await supabase
          .from("jobs")
          .select("*", { count: "exact", head: true });

        if (jobsError) throw jobsError;

        // Get unique companies count and names
        const { data: companies, error: companiesError } = await supabase
          .from("jobs")
          .select("company_name");

        if (companiesError) throw companiesError;

        const uniqueCompanies = Array.from(
          new Set(companies.map((job) => job.company_name))
        ).sort();

        setStats((prevStats) => ({
          ...prevStats,
          totalCompanies: uniqueCompanies.length,
          totalJobs: jobsCount || 0,
          newJobs: 135,
          marketIncrease: "+12.5%",
          companies: uniqueCompanies,
        }));
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  const toggleCompanies = () => {
    setShowCompanies(!showCompanies);
  };

  const toggleNewJobs = () => {
    setShowNewJobs(!showNewJobs);
  };

  const navigate = useNavigate();

  const handleJobsClick = () => {
    navigate("/job-portal");
  };

  return (
    <Container fluid className="py-4">
      <h1 className="text-center mb-2">Welcome to JobPortal</h1>
      <p className="text-center text-muted mb-5">
        We help you to find the jobs
      </p>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
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
                onClick={handleJobsClick}
              >
                <Card.Body className="p-4">
                  <p className="text-muted mb-2 fw-bold text-center">
                    Total Jobs
                  </p>
                  <h2 className="fw-bold mb-3">{stats.totalJobs}</h2>
                  <div className="text-primary">
                    <FaBriefcase size={24} />
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
                      <FaNewJobs size={24} />
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

            {/* Job Market Increase Card */}
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

          {/* Companies List */}
          {showCompanies && (
            <Row className="mt-4">
              <Col>
                <Card className="shadow-sm">
                  <Card.Body>
                    <h3 className="mb-4">Company List</h3>
                    <Row>
                      {stats.companies.map((company, index) => (
                        <Col key={index} lg={3} md={4} sm={6} className="mb-3">
                          <div className="p-3 border rounded d-flex align-items-center">
                            <FaBuilding className="text-primary me-2" />
                            <span>{company}</span>
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}

          {/* New Jobs List */}
          {showNewJobs && (
            <Row className="mt-4">
              <Col>
                <Card className="shadow-sm">
                  <Card.Body>
                    <h3 className="mb-4">New Job Listings</h3>
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Job Title</th>
                            <th>Company</th>
                            <th>Location</th>
                            <th>Job Type</th>
                            <th>Experience</th>
                          </tr>
                        </thead>
                        <tbody>
                          {stats.jobs.map((job) => (
                            <tr key={job.id}>
                              <td>
                                <div className="d-flex align-items-center">
                                  <FaBriefcase className="text-primary me-2" />
                                  <span className="fw-medium">
                                    {job.job_title}
                                  </span>
                                </div>
                              </td>
                              <td>{job.company_name}</td>
                              <td>{job.location}</td>
                              <td>
                                <span className="badge bg-light text-dark">
                                  {job.job_type}
                                </span>
                              </td>
                              <td>{job.experience}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}

          {/* Charts Section */}
          <Charts />
        </>
      )}
    </Container>
  );
};

export default Dashboard;
