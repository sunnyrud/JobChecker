// src/components/Dashboard/PieFilter.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { Card, Row, Col, Spinner, Alert } from 'react-bootstrap';
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Legend as RechartsLegend
} from 'recharts';

// Predefined color palette for chart slices (add more colors if needed)
const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28DFF', '#FF82A9',
  '#FF5733', '#C70039', '#900C3F', '#581845', '#82E0AA', '#AED6F1',
  '#F7DC6F', '#E59866', '#D7BDE2', '#F1948A'
];

// Helper function to generate a color based on index
const getColor = (index) => COLORS[index % COLORS.length];

const PieFilter = ({ jobsData }) => {
  // State to hold the aggregated data (role counts)
  const [aggregatedData, setAggregatedData] = useState([]);
  // State to track which roles are currently excluded/hidden
  const [excludedRoles, setExcludedRoles] = useState(new Set());
  // State to hold the data actually passed to the chart (after filtering exclusions)
  const [chartDisplayData, setChartDisplayData] = useState([]);

  // --- 1. Aggregate Data by Job Role ---
  useEffect(() => {
    if (!jobsData) return;

    const countsByRole = jobsData.reduce((acc, job) => {
      const role = job.job_title || 'Unknown Role';
      acc[role] = (acc[role] || 0) + 1;
      return acc;
    }, {});

    // Format for Recharts and assign colors
    const formattedData = Object.entries(countsByRole)
      .map(([role, count], index) => ({
        name: role, // 'name' is used by Pie chart
        value: count, // 'value' is used by Pie chart
        color: getColor(index) // Assign a color based on index
      }))
      .sort((a, b) => b.value - a.value); // Sort by count descending

    setAggregatedData(formattedData);

  }, [jobsData]); // Re-run only when jobsData changes

  // --- 2. Filter Data Based on Exclusions ---
  useEffect(() => {
    // Filter the aggregated data, removing roles present in the excludedRoles set
    const filtered = aggregatedData.filter(item => !excludedRoles.has(item.name));
    setChartDisplayData(filtered);
  }, [aggregatedData, excludedRoles]); // Re-run when aggregated data or exclusions change

  // --- 3. Handle Legend Item Click ---
  const handleLegendClick = (roleName) => {
    setExcludedRoles(prevExcluded => {
      const newExcluded = new Set(prevExcluded);
      if (newExcluded.has(roleName)) {
        newExcluded.delete(roleName); // Role was excluded, so include it again
      } else {
        newExcluded.add(roleName); // Role was included, so exclude it
      }
      return newExcluded;
    });
  };

  // --- Custom Legend Rendering ---
  // Create the list of clickable legend items manually
  const renderCustomLegend = () => {
    if (aggregatedData.length === 0) return null;

    return (
      // Keep legend container height
      <div className="mb-3 px-3" style={{ maxHeight: '160px', overflowY: 'auto' }}>
        <Row xs={2} sm={3} md={4} lg={5} className="g-2"> {/* Responsive grid for legend */}
          {aggregatedData.map((entry) => (
            <Col key={`legend-${entry.name}`}>
              <div
                onClick={() => handleLegendClick(entry.name)}
                style={{
                  cursor: 'pointer',
                  opacity: excludedRoles.has(entry.name) ? 0.5 : 1, // Dim excluded items
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '0.8rem', // Smaller font size for legend
                  padding: '2px 4px',
                  borderRadius: '4px',
                  backgroundColor: excludedRoles.has(entry.name) ? '#f8f9fa' : 'transparent', // Background for excluded
                  border: '1px solid #dee2e6',
                  marginBottom: '2px'
                }}
                title={`Click to ${excludedRoles.has(entry.name) ? 'show' : 'hide'} ${entry.name}`}
              >
                <span style={{
                  display: 'inline-block',
                  width: '12px',
                  height: '12px',
                  backgroundColor: entry.color,
                  marginRight: '5px',
                  borderRadius: '2px', // Slightly rounded color swatch
                }}></span>
                <span style={{ textDecoration: excludedRoles.has(entry.name) ? 'line-through' : 'none' }}>
                  {entry.name} ({entry.value}) {/* Show count in legend */}
                </span>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    );
  };


  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title className="mb-2 text-center">Jobs by Role</Card.Title>

        {/* Render the Custom Interactive Legend */}
        {renderCustomLegend()}

        {/* Chart Area - Keep container height */}
        <div style={{ height: '650px', width: '100%' }}>
          {!jobsData ? (
             <div className="d-flex justify-content-center align-items-center h-100">
               <Spinner animation="border" role="status" variant="primary">
                 <span className="visually-hidden">Loading Chart Data...</span>
               </Spinner>
             </div>
          ) : aggregatedData.length === 0 ? (
             <div className="d-flex justify-content-center align-items-center h-100">
               <p className="text-muted">No job role data available.</p>
             </div>
          ) : chartDisplayData.length === 0 ? (
             <div className="d-flex justify-content-center align-items-center h-100">
                <p className="text-muted">All roles are currently hidden. Click on roles above to show them.</p>
             </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              {/* Adjusted PieChart margins if needed */}
              <RechartsPieChart margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                <Pie
                  data={chartDisplayData}
                  cx="50%"
                  // ADJUSTED cy to center pie slightly higher
                  cy="55%"
                  labelLine={false}
                  // ADJUSTED outerRadius slightly smaller
                  outerRadius="85%"
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                >
                  {chartDisplayData.map((entry) => (
                    <Cell key={`cell-${entry.name}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip
                  formatter={(value, name) => [`${value} jobs`, name]}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default PieFilter;
