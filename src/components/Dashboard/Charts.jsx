import React, { useState, useEffect } from "react"; // Import useState and useEffect
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
  Tooltip as ChartJsTooltip, // Alias Chart.js Tooltip
  Legend as ChartJsLegend, // Alias Chart.js Legend
} from "chart.js"; // Added for Chart.js

// Register Chart.js components
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ChartJsTooltip,
  ChartJsLegend
);

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

// Default data (keep these for resetting)
const defaultDataJobType = [
  { name: "Remote", jobs: 500 },
  { name: "Hybrid", jobs: 400 },
  { name: "On-Site", jobs: 300 },
];

const defaultDataExperience = [
  { name: "Entry Level", value: 600 },
  { name: "Mid Level", value: 400 },
  { name: "Senior Level", value: 200 },
];

const Charts = ({ selectedCompany }) => {
  // Accept selectedCompany prop
  // State for dynamic chart data
  const [dataJobType, setDataJobType] = useState(defaultDataJobType);
  const [dataExperience, setDataExperience] = useState(defaultDataExperience);
  const [totalExperience, setTotalExperience] = useState(
    defaultDataExperience.reduce((sum, entry) => sum + entry.value, 0)
  );

  // Effect to update charts when selectedCompany changes
  useEffect(() => {
    if (selectedCompany) {
      // Generate random data for Job Type (15-35)
      const newJobTypeData = [
        { name: "Remote", jobs: Math.floor(Math.random() * 21) + 15 }, // 15-35
        { name: "Hybrid", jobs: Math.floor(Math.random() * 21) + 15 },
        { name: "On-Site", jobs: Math.floor(Math.random() * 21) + 15 },
      ];
      setDataJobType(newJobTypeData);

      // Generate random data for Experience Level (6-35), ensuring sum is ~100 for pie chart
      let expValues = [
        Math.floor(Math.random() * 30) + 6, // 6-35
        Math.floor(Math.random() * 30) + 6,
        Math.floor(Math.random() * 30) + 6,
      ];
      // Normalize to ensure they represent percentages reasonably (though not perfectly 100% due to floor)
      // A more robust approach might involve generating two random numbers and calculating the third.
      // For simplicity here, we'll just use the random values.
      const newExperienceData = [
        { name: "Entry Level", value: expValues[0] },
        { name: "Mid Level", value: expValues[1] },
        { name: "Senior Level", value: expValues[2] },
      ];
      setDataExperience(newExperienceData);
      setTotalExperience(expValues.reduce((sum, val) => sum + val, 0));
    } else {
      // Reset to default data if no company is selected
      setDataJobType(defaultDataJobType);
      setDataExperience(defaultDataExperience);
      setTotalExperience(
        defaultDataExperience.reduce((sum, entry) => sum + entry.value, 0)
      );
    }
  }, [selectedCompany]); // Dependency array includes selectedCompany

  // Sample data for company job openings (keep as is or make dynamic if needed)
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

  // New data for the stacked bar chart (All Companies)
  const allCompanies = [
    "Amazon",
    "Capgemini",
    "Cisco",
    "Cognizant",
    "Dell",
    "Google",
    "HCL",
    "IBM",
    "Infosys",
    "Intel",
    "Microsoft",
    "Oracle",
    "Red Hat",
    "SAP",
    "Salesforce",
    "ServiceNow",
    "TCS",
    "VMware",
    "Wipro",
  ];

  const generateRandomData = (count) =>
    Array.from({ length: count }, () => Math.floor(Math.random() * 36) + 5); // 5-40

  const cloudJobCompanyData = {
    labels: allCompanies,
    datasets: [
      {
        label: "AWS Solutions Architect",
        data: generateRandomData(allCompanies.length),
        backgroundColor: "#FF6384",
      },
      {
        label: "Azure DevOps Engineer",
        data: generateRandomData(allCompanies.length),
        backgroundColor: "#36A2EB",
      },
      {
        label: "Cloud Administrator",
        data: generateRandomData(allCompanies.length),
        backgroundColor: "#FFCE56",
      },
      {
        label: "Cloud Consultant",
        data: generateRandomData(allCompanies.length),
        backgroundColor: "#4BC0C0",
      },
      {
        label: "Cloud Data Engineer",
        data: generateRandomData(allCompanies.length),
        backgroundColor: "#9966FF",
      },
      {
        label: "Cloud Developer",
        data: generateRandomData(allCompanies.length),
        backgroundColor: "#FF9F40",
      },
      {
        label: "Cloud Engineer",
        data: generateRandomData(allCompanies.length),
        backgroundColor: "#E7E9ED",
      },
      {
        label: "Cloud Network Engineer",
        data: generateRandomData(allCompanies.length),
        backgroundColor: "#C9CBCF",
      },
      {
        label: "Cloud Operations Engineer",
        data: generateRandomData(allCompanies.length),
        backgroundColor: "#77DD77",
      },
      {
        label: "Cloud Security Specialist",
        data: generateRandomData(allCompanies.length),
        backgroundColor: "#FFB347",
      },
      {
        label: "Cloud Solutions Engineer",
        data: generateRandomData(allCompanies.length),
        backgroundColor: "#B39EB5",
      },
      {
        label: "Cloud Support Engineer",
        data: generateRandomData(allCompanies.length),
        backgroundColor: "#836FFF",
      },
      {
        label: "GCP Cloud Engineer",
        data: generateRandomData(allCompanies.length),
        backgroundColor: "#03C03C",
      },
    ],
  };

  const cloudJobCompanyOptions = {
    responsive: true,
    plugins: {
      legend: { position: "right" }, // Uses aliased ChartJsLegend implicitly via registration
      title: {
        display: true,
        text: "Distribution of Job Titles Across Cloud Job Companies (USA)", // Updated title
      },
      tooltip: {}, // Uses aliased ChartJsTooltip implicitly via registration
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          // Add ticks configuration for better readability if needed
          autoSkip: false, // Prevent labels from being skipped
          maxRotation: 90, // Rotate labels if they overlap
          minRotation: 45,
        },
      },
      y: { stacked: true, beginAtZero: true },
    },
  };

  return (
    <Row className="mt-4">
      {/* New Stacked Bar Chart - Cloud Job Companies (Chart.js) */}
      <Col lg={12} className="mb-4">
        {" "}
        {/* Make it full width */}
        <Card className="shadow-sm h-100">
          <Card.Body className="p-4">
            <h5 className="card-title mb-4">Cloud Job Companies (USA)</h5>{" "}
            {/* Updated title */}
            <div style={{ height: "500px" }}>
              {" "}
              {/* Increased height for better visibility */}{" "}
              {/* Set a fixed height or use ResponsiveContainer if preferred */}
              <Bar
                data={cloudJobCompanyData}
                options={cloudJobCompanyOptions}
              />{" "}
              {/* Use updated data/options */}
            </div>
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
                {/* Use state data */} {/* Use renamed Recharts component */}
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
                  data={dataExperience} // Use state data
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
                      key={`cell-${index}`} // Revert to template literal, ensure clean syntax
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <RechartsTooltip // Use renamed Recharts component
                  formatter={
                    (value) =>
                      `${
                        totalExperience > 0
                          ? ((value / totalExperience) * 100).toFixed(1)
                          : 0
                      }%` // Use state total
                  }
                />
              </PieChart>
            </ResponsiveContainer>
          </Card.Body>
        </Card>
      </Col>
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
    </Row>
  );
};

export default Charts;
