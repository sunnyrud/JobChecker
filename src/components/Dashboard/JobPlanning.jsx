import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FaCloud, FaCertificate, FaChartBar } from "react-icons/fa";
import "./JobPlanning.css";

const JobPlanning = () => {
  // Sample data for cloud role salary benchmarks
  const salaryData = [
    { role: "Cloud Architect", salary: 150000 },
    { role: "DevOps Engineer", salary: 130000 },
    { role: "Cloud Security", salary: 140000 },
    { role: "Solutions Architect", salary: 145000 },
    { role: "Cloud Engineer", salary: 125000 },
  ];

  return (
    <Row className="mt-4">
      {/* High-Demand Cloud Roles */}
      <Col lg={4} className="mb-4">
        <Card className="shadow-sm h-100 job-planning-card">
          <Card.Header className="bg-primary text-white d-flex align-items-center">
            <FaCloud className="me-2" /> High-Demand Cloud Roles
          </Card.Header>
          <Card.Body>
            <div className="mb-4 role-item">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span>Cloud Architect</span>
                <span className="badge bg-success rounded-pill">
                  Growth: +28%
                </span>
              </div>
            </div>

            <div className="mb-4 role-item">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span>DevOps Engineer</span>
                <span className="badge bg-success rounded-pill">
                  Growth: +25%
                </span>
              </div>
            </div>

            <div className="mb-4 role-item">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span>Cloud Security Engineer</span>
                <span className="badge bg-success rounded-pill">
                  Growth: +30%
                </span>
              </div>
            </div>

            <div className="mb-4 role-item">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span>Solutions Architect</span>
                <span className="badge bg-success rounded-pill">
                  Growth: +22%
                </span>
              </div>
            </div>

            <div className="mb-0 role-item">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span>Cloud Data Engineer</span>
                <span className="badge bg-success rounded-pill">
                  Growth: +20%
                </span>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>

      {/* Cloud Certifications */}
      <Col lg={4} className="mb-4">
        <Card className="shadow-sm h-100 job-planning-card">
          <Card.Header className="bg-danger text-white d-flex align-items-center">
            <FaCertificate className="me-2" /> Cloud Certifications
          </Card.Header>
          <Card.Body>
            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span>AWS Solutions Architect</span>
              </div>
              <div>
                <span className="badge bg-warning text-dark px-3 py-2 cert-badge">
                  AWS Certified Solutions Architect
                </span>
              </div>
            </div>

            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span>Microsoft Azure</span>
              </div>
              <div>
                <span className="badge bg-info text-dark px-3 py-2 cert-badge">
                  Azure Administrator
                </span>
              </div>
            </div>

            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span>Google Cloud</span>
              </div>
              <div>
                <span className="badge bg-primary text-white px-3 py-2 cert-badge">
                  GCP Professional Cloud Architect
                </span>
              </div>
            </div>

            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span>Multi-Cloud</span>
              </div>
              <div>
                <span className="badge bg-secondary text-white px-3 py-2 cert-badge">
                  CompTIA Cloud+
                </span>
              </div>
            </div>

            <div className="mb-0">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span>Cloud Security</span>
              </div>
              <div>
                <span className="badge bg-danger text-white px-3 py-2 cert-badge">
                  CCSP (Certified Cloud Security Professional)
                </span>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>

      {/* Salary Benchmarks */}
      <Col lg={4} className="mb-4">
        <Card className="shadow-sm h-100 job-planning-card">
          <Card.Header className="bg-info text-white d-flex align-items-center">
            <FaChartBar className="me-2" /> Salary Benchmarks
          </Card.Header>
          <Card.Body>
            <div className="text-center mb-3">
              <small className="text-muted">Average Salary ($ per year)</small>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={salaryData}
                margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="role" tick={{ fontSize: 10 }} />
                <YAxis
                  domain={[0, 200000]}
                  tickFormatter={(value) => `$${value / 1000}k`}
                />
                <Tooltip
                  formatter={(value) => [
                    `$${value.toLocaleString()}`,
                    "Salary",
                  ]}
                />
                <Legend />
                <Bar dataKey="salary" name="Salary" fill="#17a2b8" />
              </BarChart>
            </ResponsiveContainer>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default JobPlanning;
