// src/components/Dashboard/FilterChart.jsx
import React, { useState, useEffect } from "react"; // Removed useState, useMemo if not needed locally
import { Card, Row, Col, Form, Spinner } from "react-bootstrap"; // Removed Alert if parent handles errors
import {
  BarChart as RechartsBarChart,
  Bar as RechartsBar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend as RechartsLegend,
  ResponsiveContainer,
} from "recharts";

// This component now receives filtered data, options, selections, and handlers via props
const FilterChart = ({
  jobsData, // This is PRE-FILTERED by the parent based on location/jobType
  locationOptions,
  jobTypeOptions,
  selectedLocation,
  selectedJobType,
  onLocationChange, // Function from parent to call on change
  onJobTypeChange, // Function from parent to call on change
}) => {
  // --- State for Chart Data (Specific to this component's aggregation) ---
  const [chartData, setChartData] = useState([]);

  // --- Data Aggregation (Based on the already filtered jobsData prop) ---
  useEffect(() => {
    // Process the received (filtered) jobsData
    if (!jobsData) {
      setChartData([]); // Handle case where jobsData might be null initially
      return;
    }

    // Aggregate by role for this specific chart's display
    const countsByRole = jobsData.reduce((acc, job) => {
      const role = job.job_title || "Unknown Role";
      acc[role] = (acc[role] || 0) + 1;
      return acc;
    }, {});

    const formattedData = Object.entries(countsByRole)
      .map(([role, count]) => ({ role, count }))
      .sort((a, b) => a.count - b.count);

    setChartData(formattedData);
  }, [jobsData]); // Re-run only when the filtered data from parent changes

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title className="mb-4">Job Roles Distribution</Card.Title>

        {/* Filter Controls Section - Now controlled by props */}
        <Row className="mb-4">
          <Col md={6} className="mb-3 mb-md-0">
            <Form.Group controlId="chartLocationFilter">
              <Form.Label className="fw-semibold">Location</Form.Label>
              <Form.Select
                // Value comes from props
                value={selectedLocation}
                // Call parent handler on change
                onChange={(e) => onLocationChange(e.target.value)}
                aria-label="Filter chart by location"
                size="sm"
              >
                {/* Options come from props */}
                {(locationOptions || ["All"]).map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="chartJobTypeFilter">
              <Form.Label className="fw-semibold">Job Type</Form.Label>
              <Form.Select
                // Value comes from props
                value={selectedJobType}
                // Call parent handler on change
                onChange={(e) => onJobTypeChange(e.target.value)}
                aria-label="Filter chart by job type"
                size="sm"
              >
                {/* Options come from props */}
                {(jobTypeOptions || ["All"]).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        {/* Chart Area - Height set to match PieFilter */}
        <div style={{ height: "650px", width: "100%" }}>
          {/* Display based on chartData derived from props */}
          {chartData.length === 0 ? (
            <div className="d-flex justify-content-center align-items-center h-100">
              <p className="text-muted">
                No job data matches the selected filters.
              </p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart
                layout="vertical"
                data={chartData} // Use locally aggregated data
                margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis
                  type="number"
                  allowDecimals={false}
                  tick={{ fontSize: 12 }}
                />
                <YAxis
                  dataKey="role"
                  type="category"
                  width={200}
                  tick={{ fontSize: 11 }}
                  interval={0}
                  axisLine={false}
                  tickLine={false}
                />
                <RechartsTooltip formatter={(value) => [value, "Jobs"]} />
                <RechartsLegend verticalAlign="top" height={36} />
                <RechartsBar
                  dataKey="count"
                  fill="#8884d8"
                  name="Number of Jobs"
                  radius={[0, 4, 4, 0]}
                  barSize={20}
                />
              </RechartsBarChart>
            </ResponsiveContainer>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default FilterChart;
