import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import {
  BarChart as RechartsBarChart, // Renamed to avoid conflict
  Bar as RechartsBar, // Renamed to avoid conflict
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip, // Renamed to avoid conflict
  Legend as RechartsLegend, // Renamed to avoid conflict
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Bar } from "react-chartjs-2"; // Added for Chart.js Bar chart
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip, // Keep Tooltip from chart.js
  Legend, // Keep Legend from chart.js
} from "chart.js"; // Added for Chart.js

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// Sample data for Job Type
const dataJobType = [
  { name: "Remote", jobs: 500 },
  { name: "Hybrid", jobs: 400 },
  { name: "On-Site", jobs: 300 },
];

// Sample data for Experience Level
const dataExperience = [
  { name: "Entry Level", value: 600 }, // 600 / 1200 = 50%
  { name: "Mid Level", value: 400 }, // 400 / 1200 = 33.3%
  { name: "Senior Level", value: 200 }, // 200 / 1200 = 16.7%
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

// Calculate the total value for percentage calculation
const totalExperience = dataExperience.reduce(
  (sum, entry) => sum + entry.value,
  0
);

// Custom label renderer for Pie chart
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(1)}%`}
    </text>
  );
};

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

  // New data for the stacked bar chart (Top 5 Companies)
  const top5CompanyData = {
    labels: ["Salesforce", "Cisco", "Wipro", "Dell Technologies", "Oracle"],
    datasets: [
      {
        label: "AWS Solutions Architect",
        data: [
          Math.floor(Math.random() * 36) + 5,
          Math.floor(Math.random() * 36) + 5,
          Math.floor(Math.random() * 36) + 5,
          Math.floor(Math.random() * 36) + 5,
          Math.floor(Math.random() * 36) + 5,
        ],
        backgroundColor: "#FF6384",
      },
      {
        label: "Azure DevOps Engineer",
        data: [
          Math.floor(Math.random() * 36) + 5,
          Math.floor(Math.random() * 36) + 5,
          Math.floor(Math.random() * 36) + 5,
          Math.floor(Math.random() * 36) + 5,
          Math.floor(Math.random() * 36) + 5,
        ],
        backgroundColor: "#36A2EB",
      },
      {
        label: "Cloud Administrator",
        data: [
          Math.floor(Math.random() * 36) + 5,
          Math.floor(Math.random() * 36) + 5,
          Math.floor(Math.random() * 36) + 5,
          Math.floor(Math.random() * 36) + 5,
          Math.floor(Math.random() * 36) + 5,
        ],
        backgroundColor: "#FFCE56",
      },
      {
        label: "Cloud Consultant",
        data: [
          Math.floor(Math.random() * 36) + 5,
          Math.floor(Math.random() * 36) + 5,
          Math.floor(Math.random() * 36) + 5,
          Math.floor(Math.random() * 36) + 5,
          Math.floor(Math.random() * 36) + 5,
        ],
        backgroundColor: "#4BC0C0",
      },
      {
        label: "Cloud Data Engineer",
        data: [
          Math.floor(Math.random() * 36) + 5,
          Math.floor(Math.random() * 36) + 5,
          Math.floor(Math.random() * 36) + 5,
          Math.floor(Math.random() * 36) + 5,
          Math.floor(Math.random() * 36) + 5,
        ],
        backgroundColor: "#9966FF",
      },
      {
        label: "Cloud Developer",
        data: [
          Math.floor(Math.random() * 36) + 5,
          Math.floor(Math.random() * 36) + 5,
          Math.floor(Math.random() * 36) + 5,
          Math.floor(Math.random() * 36) + 5,
          Math.floor(Math.random() * 36) + 5,
        ],
        backgroundColor: "#FF9F40",
      },
      {
        label: "Cloud Engineer",
        data: [
          Math.floor(Math.random() * 36) + 5,
          Math.floor(Math.random() * 36) + 5,
          Math.floor(Math.random() * 36) + 5,
          Math.floor(Math.random() * 36) + 5,
          Math.floor(Math.random() * 36) + 5,
        ],
        backgroundColor: "#E7E9ED",
      },
      {
        label: "Cloud Network Engineer",
        data: [
          Math.floor(Math.random() * 36) + 5,
          Math.floor(Math.random() * 36) + 5,
          Math.floor(Math.random() * 36) + 5,
          Math.floor(Math.random() * 36) + 5,
          Math.floor(Math.random() * 36) + 5,
        ],
        backgroundColor: "#C9CBCF",
      },
      {
        label: "Cloud Operations Engineer",
        data: [
          Math.floor(Math.random() * 36) + 5,
          Math.floor(Math.random() * 36) + 5,
          Math.floor(Math.random() * 36) + 5,
          Math.floor(Math.random() * 36) + 5,
          Math.floor(Math.random() * 36) + 5,
        ],
        backgroundColor: "#77DD77",
      },
      {
        label: "Cloud Security Specialist",
        data: [
          Math.floor(Math.random() * 36) + 5,
          Math.floor(Math.random() * 36) + 5,
          Math.floor(Math.random() * 36) + 5,
          Math.floor(Math.random() * 36) + 5,
          Math.floor(Math.random() * 36) + 5,
        ],
        backgroundColor: "#FFB347",
      },
      {
        label: "Cloud Solutions Engineer",
        data: [
          Math.floor(Math.random() * 36) + 5,
          Math.floor(Math.random() * 36) + 5,
          Math.floor(Math.random() * 36) + 5,
          Math.floor(Math.random() * 36) + 5,
          Math.floor(Math.random() * 36) + 5,
        ],
        backgroundColor: "#B39EB5",
      },
      {
        label: "Cloud Support Engineer",
        data: [
          Math.floor(Math.random() * 36) + 5,
          Math.floor(Math.random() * 36) + 5,
          Math.floor(Math.random() * 36) + 5,
          Math.floor(Math.random() * 36) + 5,
          Math.floor(Math.random() * 36) + 5,
        ],
        backgroundColor: "#836FFF",
      },
      {
        label: "GCP Cloud Engineer",
        data: [
          Math.floor(Math.random() * 36) + 5,
          Math.floor(Math.random() * 36) + 5,
          Math.floor(Math.random() * 36) + 5,
          Math.floor(Math.random() * 36) + 5,
          Math.floor(Math.random() * 36) + 5,
        ],
        backgroundColor: "#03C03C",
      },
    ],
  };

  const top5CompanyOptions = {
    responsive: true,
    plugins: {
      legend: { position: "right" }, // Use Chart.js legend
      title: {
        display: true,
        text: "Distribution of Job Titles Across Top 5 Companies",
      },
      tooltip: {}, // Use Chart.js tooltip
    },
    scales: {
      x: { stacked: true },
      y: { stacked: true, beginAtZero: true },
    },
  };

  return (
    <Row className="mt-4">
      {/* Bar Chart - Top Companies (Recharts) */}
      <Col lg={6} className="mb-4">
        <Card className="shadow-sm h-100">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="card-title mb-0">Top Companies (Recharts)</h5>
              <div className="badge bg-light text-dark">Monthly</div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsBarChart // Use renamed Recharts component
                data={companyData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <RechartsTooltip /> {/* Use renamed Recharts component */}
                <RechartsLegend /> {/* Use renamed Recharts component */}
                <RechartsBar
                  dataKey="jobOpenings"
                  name="Job Openings"
                  fill="#4CAF50"
                />{" "}
                {/* Use renamed Recharts component */}
              </RechartsBarChart>
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
                <RechartsTooltip /> {/* Use renamed Recharts component */}
                <RechartsLegend /> {/* Use renamed Recharts component */}
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

      {/* Bar Chart - Job Type (Recharts) */}
      <Col lg={6} className="mb-4">
        <Card className="shadow-sm h-100">
          <Card.Body className="p-4">
            <h5 className="card-title mb-4">Jobs by Type (Recharts)</h5>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsBarChart data={dataJobType}>
                {" "}
                {/* Use renamed Recharts component */}
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <RechartsTooltip /> {/* Use renamed Recharts component */}
                <RechartsBar dataKey="jobs" fill="#8884d8" />{" "}
                {/* Use renamed Recharts component */}
              </RechartsBarChart>
            </ResponsiveContainer>
          </Card.Body>
        </Card>
      </Col>

      {/* Pie Chart - Experience Level */}
      <Col lg={6} className="mb-4">
        <Card className="shadow-sm h-100">
          <Card.Body className="p-4">
            <h5 className="card-title mb-4">Jobs by Experience Level</h5>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dataExperience}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  labelLine={false}
                  label={renderCustomizedLabel}
                >
                  {dataExperience.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <RechartsTooltip // Use renamed Recharts component
                  formatter={(value) =>
                    `${((value / totalExperience) * 100).toFixed(1)}%`
                  }
                />
              </PieChart>
            </ResponsiveContainer>
          </Card.Body>
        </Card>
      </Col>

      {/* New Stacked Bar Chart - Top 5 Companies (Chart.js) */}
      <Col lg={12} className="mb-4">
        {" "}
        {/* Make it full width */}
        <Card className="shadow-sm h-100">
          <Card.Body className="p-4">
            <h5 className="card-title mb-4">Top 5 Cloud Job Companies (USA)</h5>
            <div style={{ height: "400px" }}>
              {" "}
              {/* Set a fixed height or use ResponsiveContainer if preferred */}
              <Bar data={top5CompanyData} options={top5CompanyOptions} />
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Charts;
