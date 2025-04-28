// src/components/JobPlanning/JobPlanning.jsx
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
import "./JobPlanning.css"; // Import updated CSS
import CloudRoleGrowthChart from "./CloudRoleGrowthChart"; // Assuming this component exists

const JobPlanning = () => {
  const salaryData = [
    { role: "Cloud Architect", salary: 150000 },
    { role: "DevOps Engineer", salary: 130000 },
    { role: "Cloud Security", salary: 140000 },
    { role: "Solutions Architect", salary: 145000 },
    { role: "Cloud Engineer", salary: 125000 },
  ];

  // Note: We rely on CSS variables for chart colors now, no need for useTheme here

  return (
    <>
      <Row className="mt-4">
        {/* High-Demand Roles Card */}
        <Col lg={4} className="mb-4">
          {/* Card component itself will adapt based on data-bs-theme */}
          <Card className="shadow-sm h-100 job-planning-card">
            {/* Keep bg-primary, remove explicit text-white */}
            <Card.Header className="bg-primary d-flex align-items-center">
              <FaCloud className="me-2" /> High-Demand Cloud Roles
            </Card.Header>
            <Card.Body>
              {/* Role items - Text color will be inherited */}
              <div className="mb-4 role-item">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span>Cloud Architect</span>
                  <span className="badge bg-success rounded-pill">Growth: +28%</span>
                </div>
              </div>
              <div className="mb-4 role-item">
                 <div className="d-flex justify-content-between align-items-center mb-2">
                   <span>DevOps Engineer</span>
                   <span className="badge bg-success rounded-pill">Growth: +25%</span>
                 </div>
              </div>
              <div className="mb-4 role-item">
                 <div className="d-flex justify-content-between align-items-center mb-2">
                   <span>Cloud Security Engineer</span>
                   <span className="badge bg-success rounded-pill">Growth: +30%</span>
                 </div>
              </div>
              <div className="mb-4 role-item">
                 <div className="d-flex justify-content-between align-items-center mb-2">
                   <span>Solutions Architect</span>
                   <span className="badge bg-success rounded-pill">Growth: +22%</span>
                 </div>
              </div>
              <div className="mb-0 role-item">
                 <div className="d-flex justify-content-between align-items-center mb-2">
                   <span>Cloud Data Engineer</span>
                   <span className="badge bg-success rounded-pill">Growth: +20%</span>
                 </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Cloud Certifications Card */}
        <Col lg={4} className="mb-4">
          <Card className="shadow-sm h-100 job-planning-card">
             {/* Keep bg-danger, remove explicit text-white */}
            <Card.Header className="bg-danger d-flex align-items-center">
              <FaCertificate className="me-2" /> Cloud Certifications
            </Card.Header>
            <Card.Body>
              {/* Badges: Remove explicit text-dark/text-white where possible */}
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span>AWS Solutions Architect</span>
                </div>
                <div>
                  {/* bg-warning might need text-dark explicitly, or use a different theme-aware bg */}
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
                   {/* bg-info might need text-dark explicitly */}
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
                   {/* bg-primary should handle text color */}
                   <span className="badge bg-primary px-3 py-2 cert-badge">
                     GCP Professional Cloud Architect
                   </span>
                 </div>
              </div>
              <div className="mb-4">
                 <div className="d-flex justify-content-between align-items-center mb-2">
                   <span>Multi-Cloud</span>
                 </div>
                 <div>
                   {/* bg-secondary should handle text color */}
                   <span className="badge bg-secondary px-3 py-2 cert-badge">
                     CompTIA Cloud+
                   </span>
                 </div>
              </div>
              <div className="mb-0">
                 <div className="d-flex justify-content-between align-items-center mb-2">
                   <span>Cloud Security</span>
                 </div>
                 <div>
                   {/* bg-danger should handle text color */}
                   <span className="badge bg-danger px-3 py-2 cert-badge">
                     CCSP (Certified Cloud Security Professional)
                   </span>
                 </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Salary Benchmarks Card */}
        <Col lg={4} className="mb-4">
          <Card className="shadow-sm h-100 job-planning-card">
             {/* Keep bg-info, remove explicit text-white */}
            <Card.Header className="bg-info d-flex align-items-center">
              <FaChartBar className="me-2" /> Salary Benchmarks
            </Card.Header>
            <Card.Body>
              <div className="text-center mb-3">
                {/* text-muted adapts reasonably well */}
                <small className="text-muted">Average Salary ($ per year)</small>
              </div>
              {/* ResponsiveContainer for the chart */}
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={salaryData}
                  margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
                >
                  {/* Grid lines color is now handled by CSS variable */}
                  <CartesianGrid strokeDasharray="3 3" />
                  {/* Axis text color is now handled by CSS variable */}
                  <XAxis dataKey="role" tick={{ fontSize: 10 }} />
                  <YAxis
                    domain={[0, 200000]}
                    tickFormatter={(value) => `$${value / 1000}k`}
                    tick={{ fontSize: 10 }} // Ensure consistent tick size
                  />
                  {/* Tooltip styling might need CSS check, but often adapts */}
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Salary"]} />
                  {/* Legend text color is now handled by CSS variable */}
                  <Legend />
                  {/* Bar fill color is hardcoded, could be themed if desired */}
                  <Bar dataKey="salary" name="Salary" fill="#17a2b8" />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* Assuming CloudRoleGrowthChart also needs theme adaptation */}
      <Row className="mt-4">
        <Col>
          <CloudRoleGrowthChart />
        </Col>
      </Row>
    </>
  );
};

export default JobPlanning;
