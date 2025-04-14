import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const Charts = () => {
  // Sample data for company job openings
  const companyData = [
    { name: "Accenture", jobOpenings: 30 },
    { name: "Salesforce", jobOpenings: 45 },
    { name: "dell", jobOpenings: 20 },
    { name: "VMware", jobOpenings: 40 },
  ];

  // Sample data for job market trends
  const marketTrendData = [
    { month: "Jan", marketTrends: 10 },
    { month: "Feb", marketTrends: 25 },
    { month: "Mar", marketTrends: 40 },
    { month: "Apr", marketTrends: 30 },
  ];

  return (
    <Row className="mt-4">
      {/* Bar Chart - Top Companies */}
      <Col lg={6} className="mb-4">
        <Card className="shadow-sm h-100">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="card-title mb-0">Top Companies</h5>
              <div className="badge bg-light text-dark">Monthly</div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={companyData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="jobOpenings" name="Job Openings" fill="#4CAF50" />
              </BarChart>
            </ResponsiveContainer>
          </Card.Body>
        </Card>
      </Col>

      {/* Line Chart - Job Market Trends */}
      <Col lg={6} className="mb-4">
        <Card className="shadow-sm h-100">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="card-title mb-0">Job Market Trends</h5>
              <div className="badge bg-light text-dark">Monthly</div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={marketTrendData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="marketTrends"
                  name="Market Trends"
                  stroke="#4CAF50"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Charts;
