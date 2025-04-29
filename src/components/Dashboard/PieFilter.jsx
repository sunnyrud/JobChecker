// src/components/Dashboard/PieFilter.jsx
import React, { useState, useEffect } from "react";
import { Card, Row, Col, Spinner } from "react-bootstrap"; // Removed Alert
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";

// Predefined color palette
const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A28DFF",
  "#FF82A9",
  "#FF5733",
  "#C70039",
  "#900C3F",
  "#581845",
  "#82E0AA",
  "#AED6F1",
  "#F7DC6F",
  "#E59866",
  "#D7BDE2",
  "#F1948A",
];
const getColor = (index) => COLORS[index % COLORS.length];

// Props:
// jobsData: Data PRE-FILTERED by parent based on Location/JobType
// allJobsData: The original, unfiltered data from the parent
// selectedLocation: Current location filter from parent
// selectedJobType: Current job type filter from parent
const PieFilter = ({
  jobsData,
  allJobsData,
  selectedLocation,
  selectedJobType,
}) => {
  // State for aggregated data based on the filtered jobsData prop
  const [aggregatedData, setAggregatedData] = useState([]);
  // State for roles manually excluded via the legend interaction
  const [excludedRolesManual, setExcludedRolesManual] = useState(new Set());
  // State for the final data to display in the pie chart slices
  const [chartDisplayData, setChartDisplayData] = useState([]);
  // State to hold the list of roles for the legend
  const [rolesForLegend, setRolesForLegend] = useState([]);
  // State to map roles to consistent colors
  const [roleColorMap, setRoleColorMap] = useState({});

  // --- Determine Full Role List & Color Mapping (from allJobsData) ---
  useEffect(() => {
    if (!allJobsData || allJobsData.length === 0) {
      setRoleColorMap({});
      return;
    }
    const allRoles = [
      ...new Set(allJobsData.map((job) => job.job_title).filter(Boolean)),
    ].sort();
    const newColorMap = allRoles.reduce((map, role, index) => {
      map[role] = getColor(index);
      return map;
    }, {});
    setRoleColorMap(newColorMap);
  }, [allJobsData]);

  // --- Determine Roles to Show in Legend ---
  useEffect(() => {
    const filtersActive =
      selectedLocation !== "All" || selectedJobType !== "All";

    if (!filtersActive) {
      // If no filters active, show all roles from the original data
      if (!allJobsData || allJobsData.length === 0) {
        setRolesForLegend([]);
      } else {
        const allRoles = [
          ...new Set(allJobsData.map((job) => job.job_title).filter(Boolean)),
        ].sort();
        setRolesForLegend(allRoles);
      }
    } else {
      // If filters are active, show only roles present in the filtered data
      if (!jobsData || jobsData.length === 0) {
        setRolesForLegend([]);
      } else {
        const filteredRoles = [
          ...new Set(jobsData.map((job) => job.job_title).filter(Boolean)),
        ].sort();
        setRolesForLegend(filteredRoles);
      }
    }
  }, [jobsData, allJobsData, selectedLocation, selectedJobType]);

  // --- Aggregate Data for Pie Slices (based on filtered jobsData) ---
  useEffect(() => {
    if (!jobsData) {
      setAggregatedData([]);
      return;
    }

    const countsByRole = jobsData.reduce((acc, job) => {
      const role = job.job_title || "Unknown Role";
      acc[role] = (acc[role] || 0) + 1;
      return acc;
    }, {});

    // Format using the consistent color map
    const formattedData = Object.entries(countsByRole)
      .map(([role, count]) => ({
        name: role,
        value: count,
        color: roleColorMap[role] || getColor(Object.keys(roleColorMap).length), // Fallback color
      }))
      .sort((a, b) => b.value - a.value);

    setAggregatedData(formattedData);
  }, [jobsData, roleColorMap]); // Depends on filtered data and the color map

  // --- Filter Data Based on Manual Exclusions for Pie Display ---
  useEffect(() => {
    // Filter the aggregated data, removing roles present in the excludedRolesManual set
    const filtered = aggregatedData.filter(
      (item) => !excludedRolesManual.has(item.name)
    );
    setChartDisplayData(filtered);
  }, [aggregatedData, excludedRolesManual]);

  // --- Handle Legend Item Click ---
  const handleLegendClick = (roleName) => {
    // Allow toggling only if the role is actually present in the current legend
    if (rolesForLegend.includes(roleName)) {
      setExcludedRolesManual((prevExcluded) => {
        const newExcluded = new Set(prevExcluded);
        if (newExcluded.has(roleName)) {
          newExcluded.delete(roleName);
        } else {
          newExcluded.add(roleName);
        }
        return newExcluded;
      });
    }
  };

  // --- Custom Legend Rendering ---
  const renderCustomLegend = () => {
    // Use the derived rolesForLegend state
    if (rolesForLegend.length === 0)
      return (
        <p className="text-muted small px-1">No roles to display in legend.</p>
      );

    return (
      <div
        className="mb-3 px-3"
        style={{ maxHeight: "160px", overflowY: "auto" }}
      >
        <Row xs={2} sm={3} md={4} lg={5} className="g-2">
          {rolesForLegend.map((role) => {
            const isExcluded = excludedRolesManual.has(role);
            const color = roleColorMap[role] || "#ccc"; // Use mapped color
            // Find the count from aggregatedData (if available)
            const dataEntry = aggregatedData.find((d) => d.name === role);
            const count = dataEntry ? dataEntry.value : 0;

            return (
              <Col key={`legend-${role}`}>
                <div
                  onClick={() => handleLegendClick(role)}
                  style={{
                    cursor: "pointer",
                    opacity: isExcluded ? 0.5 : 1,
                    display: "flex",
                    alignItems: "center",
                    fontSize: "0.8rem",
                    padding: "2px 4px",
                    borderRadius: "4px",
                    backgroundColor: isExcluded ? "#f8f9fa" : "transparent",
                    border: "1px solid #dee2e6",
                    marginBottom: "2px",
                  }}
                  title={`Click to ${isExcluded ? "show" : "hide"} ${role}`}
                >
                  <span
                    style={{
                      display: "inline-block",
                      width: "12px",
                      height: "12px",
                      backgroundColor: color,
                      marginRight: "5px",
                      borderRadius: "2px",
                    }}
                  ></span>
                  <span
                    style={{
                      textDecoration: isExcluded ? "line-through" : "none",
                    }}
                  >
                    {role} ({count}) {/* Show count */}
                  </span>
                </div>
              </Col>
            );
          })}
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

        {/* Chart Area */}
        <div style={{ height: "650px", width: "100%" }}>
          {/* Display based on chartDisplayData */}
          {chartDisplayData.length === 0 ? (
            <div className="d-flex justify-content-center align-items-center h-100">
              <p className="text-muted">
                No data matching filters or all roles hidden.
              </p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart
                margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
              >
                <Pie
                  data={chartDisplayData} // Use data filtered by legend clicks
                  cx="50%"
                  cy="55%"
                  labelLine={false}
                  outerRadius="85%"
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                >
                  {chartDisplayData.map((entry) => (
                    // Use consistent color from map
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
