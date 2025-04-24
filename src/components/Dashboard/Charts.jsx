import React, { useState, useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";
import {
  BarChart as RechartsBarChart,
  Bar as RechartsBar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend as RechartsLegend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";


const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
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
  const [dataJobType, setDataJobType] = useState(defaultDataJobType);
  const [dataExperience, setDataExperience] = useState(defaultDataExperience);
  const [totalExperience, setTotalExperience] = useState(
    defaultDataExperience.reduce((sum, entry) => sum + entry.value, 0)
  );

  useEffect(() => {
    if (selectedCompany) {
      const newJobTypeData = [
        { name: "Remote", jobs: Math.floor(Math.random() * 21) + 15 },
        { name: "Hybrid", jobs: Math.floor(Math.random() * 21) + 15 },
        { name: "On-Site", jobs: Math.floor(Math.random() * 21) + 15 },
      ];
      setDataJobType(newJobTypeData);

      let expValues = [
        Math.floor(Math.random() * 30) + 6,
        Math.floor(Math.random() * 30) + 6,
        Math.floor(Math.random() * 30) + 6,
      ];

      const newExperienceData = [
        { name: "Entry Level", value: expValues[0] },
        { name: "Mid Level", value: expValues[1] },
        { name: "Senior Level", value: expValues[2] },
      ];
      setDataExperience(newExperienceData);
      setTotalExperience(expValues.reduce((sum, val) => sum + val, 0));
    } else {
      setDataJobType(defaultDataJobType);
      setDataExperience(defaultDataExperience);
      setTotalExperience(
        defaultDataExperience.reduce((sum, entry) => sum + entry.value, 0)
      );
    }
  }, [selectedCompany]);

  const companyData = [
    { name: "Accenture", jobOpenings: 30 },
    { name: "Salesforce", jobOpenings: 45 },
    { name: "dell", jobOpenings: 20 },
    { name: "VMware", jobOpenings: 40 },
  ];

  const marketTrendData = [
    { month: "Jan", marketTrends: 10 },
    { month: "Feb", marketTrends: 25 },
    { month: "Mar", marketTrends: 40 },
    { month: "Apr", marketTrends: 30 },
  ];

  return (
    <Row className="mt-4">
      <Col lg={6} className="mb-4">
        <Card className="shadow-sm h-100">
          <Card.Body className="p-4">
            <h5 className="card-title mb-4">Jobs by Type ({selectedCompany || 'All'})</h5>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsBarChart data={dataJobType}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <RechartsTooltip />
                <RechartsBar dataKey="jobs" fill="#8884d8" />
              </RechartsBarChart>
            </ResponsiveContainer>
          </Card.Body>
        </Card>
      </Col>

      <Col lg={6} className="mb-4">
        <Card className="shadow-sm h-100">
          <Card.Body className="p-4">
            <h5 className="card-title mb-4">Jobs by Experience Level ({selectedCompany || 'All'})</h5>
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
                <RechartsTooltip
                  formatter={(value) =>
                    `${
                      totalExperience > 0
                        ? ((value / totalExperience) * 100).toFixed(1)
                        : 0
                    }%`
                  }
                />
                 <RechartsLegend />
              </PieChart>
            </ResponsiveContainer>
          </Card.Body>
        </Card>
      </Col>

     

      <Col lg={6} className="mb-4">
        <Card className="shadow-sm h-100">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="card-title mb-0">Job Market Trends (Sample)</h5>
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
                <RechartsTooltip />
                <RechartsLegend />
                <Line
                  type="monotone"
                  dataKey="marketTrends"
                  name="Market Trends"
                  stroke="#82ca9d"
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
