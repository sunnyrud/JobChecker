// src/components/Dashboard/LocationAnalysis.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { Card, Row, Col, Form, Spinner, Alert } from 'react-bootstrap';
import {
  BarChart as RechartsBarChart,
  Bar as RechartsBar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend as RechartsLegend,
  ResponsiveContainer,
} from 'recharts';

// Predefined color palette (can be expanded or dynamically generated)
const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28DFF', '#FF82A9',
  '#FF5733', '#C70039', '#900C3F', '#581845', '#82E0AA', '#AED6F1',
  '#F7DC6F', '#E59866', '#D7BDE2', '#F1948A'
];
const getColor = (index) => COLORS[index % COLORS.length];

const LocationAnalysis = ({ jobsData }) => {
  // --- State for Filters ---
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedJobType, setSelectedJobType] = useState('All');
  // This state now ONLY tracks manual exclusions when 'All' roles are selected in the main filter
  const [excludedRolesManual, setExcludedRolesManual] = useState(new Set());

  // --- State for Filter Options (Dynamically generated) ---
  const [roleOptions, setRoleOptions] = useState(['All']);
  const [jobTypeOptions, setJobTypeOptions] = useState(['All']);
  const [allRolesInData, setAllRolesInData] = useState([]); // All unique roles for legend/stacking

  // --- State for Chart Data ---
  const [topChartData, setTopChartData] = useState([]);
  const [bottomChartData, setBottomChartData] = useState([]);

  // --- Generate Filter Options ---
  const uniqueFilters = useMemo(() => {
    if (!jobsData || jobsData.length === 0) {
      return { roles: ['All'], jobTypes: ['All'], allRoles: [] };
    }
    const roles = [
      'All',
      ...new Set(jobsData.map(job => job.job_title).filter(Boolean))
    ].sort();
    const jobTypes = [
      'All',
      ...new Set(jobsData.map(job => job.job_type).filter(Boolean))
    ].sort();
    const allRoles = [...new Set(jobsData.map(job => job.job_title).filter(Boolean))].sort();

    return { roles, jobTypes, allRoles };
  }, [jobsData]);

  useEffect(() => {
    setRoleOptions(uniqueFilters.roles);
    setJobTypeOptions(uniqueFilters.jobTypes);
    setAllRolesInData(uniqueFilters.allRoles);
  }, [uniqueFilters]);

  // --- Process Data for Charts based on Filters ---
  useEffect(() => {
    if (!jobsData) return;

    // 1. Apply main filters (Role and Job Type dropdowns)
    const filteredByMain = jobsData.filter(job => {
      // Role match depends ONLY on the main filter selection
      const roleMatch = selectedRole === 'All' || job.job_title === selectedRole;
      const jobTypeMatch = selectedJobType === 'All' || job.job_type === selectedJobType;
      return roleMatch && jobTypeMatch;
    });

    // --- 2. Prepare Data for Top Chart (Jobs per Location) ---
    const countsByLocation = filteredByMain.reduce((acc, job) => {
      const loc = job.location || 'Unknown Location';
      acc[loc] = (acc[loc] || 0) + 1;
      return acc;
    }, {});

    const topData = Object.entries(countsByLocation)
      .map(([location, count]) => ({ location, count }))
      .sort((a, b) => b.count - a.count);
    setTopChartData(topData);

    // --- 3. Prepare Data for Bottom Chart (Stacked Roles per Location) ---
    // NOTE: We pivot based on the *main* filtered data. The exclusion logic happens during rendering.
    const pivotedData = filteredByMain.reduce((acc, job) => {
      const loc = job.location || 'Unknown Location';
      const role = job.job_title || 'Unknown Role';

      if (!acc[loc]) {
        acc[loc] = { location: loc };
        // Initialize counts for ALL possible roles found in the original data
        allRolesInData.forEach(r => { acc[loc][r] = 0; });
      }
      // Increment count for the specific role found in this location
      if (acc[loc][role] !== undefined) {
          acc[loc][role] = (acc[loc][role] || 0) + 1;
      }
      return acc;
    }, {});

    const bottomData = Object.values(pivotedData)
                           .sort((a, b) => a.location.localeCompare(b.location));
    setBottomChartData(bottomData);

  // IMPORTANT: excludedRolesManual is NOT a dependency here.
  // We recalculate the base data only when main filters or jobsData change.
  // The visual exclusion based on excludedRolesManual happens during render.
  }, [jobsData, selectedRole, selectedJobType, allRolesInData]);

  // --- Handler for Interactive Legend Click ---
  // This only functions when the main role filter is 'All'
  const handleLegendClick = (roleName) => {
    // Only allow manual toggling if the main filter is 'All'
    if (selectedRole === 'All') {
      setExcludedRolesManual(prevExcluded => {
        const newExcluded = new Set(prevExcluded);
        if (newExcluded.has(roleName)) {
          newExcluded.delete(roleName);
        } else {
          newExcluded.add(roleName);
        }
        return newExcluded;
      });
    }
    // If a specific role is selected in the main filter, do nothing on legend click
  };

  // --- Determine which roles to display in the bottom chart/legend ---
  const rolesToDisplay = useMemo(() => {
    if (selectedRole === 'All') {
      // If main filter is 'All', display roles not manually excluded
      return allRolesInData.filter(role => !excludedRolesManual.has(role));
    } else {
      // If a specific role is selected, display only that role
      // Check if it exists in the list of all roles first
      return allRolesInData.includes(selectedRole) ? [selectedRole] : [];
    }
  }, [selectedRole, allRolesInData, excludedRolesManual]);


  // --- Render Interactive Legend for Bottom Chart ---
  const renderBottomChartLegend = () => {
    // Determine which roles to show in the legend based on the main filter
    const rolesForLegend = (selectedRole === 'All') ? allRolesInData : (allRolesInData.includes(selectedRole) ? [selectedRole] : []);

    if (rolesForLegend.length === 0) return <p className="text-muted small px-1">No matching roles found for legend.</p>;

    const isInteractive = selectedRole === 'All'; // Legend is interactive only if 'All' roles selected

    return (
      <div className="mb-3 px-1" style={{ maxHeight: '100px', overflowY: 'auto' }}>
        <Row xs={2} sm={3} md={4} lg={5} xl={6} className="g-2">
          {rolesForLegend.map((role) => {
            const isExcluded = selectedRole === 'All' && excludedRolesManual.has(role);
            const roleIndex = allRolesInData.indexOf(role); // Get index for consistent color
            const color = getColor(roleIndex);

            return (
              <Col key={`legend-${role}`}>
                <div
                  onClick={() => isInteractive && handleLegendClick(role)} // Only clickable if interactive
                  style={{
                    cursor: isInteractive ? 'pointer' : 'default', // Change cursor based on interactivity
                    opacity: isExcluded ? 0.4 : 1,
                    display: 'flex', alignItems: 'center', fontSize: '0.75rem',
                    padding: '2px 4px', borderRadius: '4px',
                    backgroundColor: isExcluded ? '#e9ecef' : 'transparent',
                    border: '1px solid #dee2e6', marginBottom: '2px'
                  }}
                  title={isInteractive ? `Click to ${isExcluded ? 'show' : 'hide'} ${role}` : role}
                >
                  <span style={{
                    display: 'inline-block', width: '10px', height: '10px',
                    backgroundColor: color,
                    marginRight: '5px', borderRadius: '2px',
                  }}></span>
                  <span style={{ textDecoration: isExcluded ? 'line-through' : 'none' }}>
                    {role}
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
        <Card.Title as="h2" className="text-center mb-2">Location-Based Analysis</Card.Title>
        <p className="text-center text-muted mb-4">
            Distribution of jobs by location and category. Use filters to refine the data.
        </p>

        {/* --- Main Filters --- */}
        <Row className="mb-4 gx-3">
          <Col md={6}>
            <Form.Group controlId="locationAnalysisRoleFilter">
              <Form.Label className="fw-semibold">Job Role</Form.Label>
              <Form.Select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} size="sm">
                {roleOptions.map(role => (<option key={role} value={role}>{role}</option>))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="locationAnalysisJobTypeFilter">
              <Form.Label className="fw-semibold">Job Type</Form.Label>
              <Form.Select value={selectedJobType} onChange={(e) => setSelectedJobType(e.target.value)} size="sm">
                {jobTypeOptions.map(type => (<option key={type} value={type}>{type}</option>))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        {/* --- Top Chart Section --- */}
        <Card className="mb-4">
          <Card.Header as="h5">Number of Jobs by Location</Card.Header>
          <Card.Body>
            <div style={{ height: '350px', width: '100%' }}>
              {!jobsData ? <Spinner animation="border" /> : topChartData.length === 0 ? <p className="text-muted text-center mt-3">No data matches filters.</p> : (
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={topChartData} margin={{ top: 5, right: 15, left: 5, bottom: 70 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="location" angle={-45} textAnchor="end" interval={0} tick={{ fontSize: 11 }} />
                    <YAxis allowDecimals={false} />
                    <RechartsTooltip />
                    <RechartsLegend verticalAlign="top" />
                    <RechartsBar
                        dataKey="count"
                        fill="#8884d8"
                        name="Total Jobs"
                        // Add animation props
                        isAnimationActive={true}
                        animationDuration={500}
                     />
                  </RechartsBarChart>
                </ResponsiveContainer>
              )}
            </div>
          </Card.Body>
        </Card>

        {/* --- Bottom Chart Section --- */}
        <Card>
          <Card.Header as="h5">Job Categories by Location</Card.Header>
          <Card.Body>
            {/* Interactive Legend for Bottom Chart */}
            {renderBottomChartLegend()}

            <div style={{ height: '450px', width: '100%' }}>
              {!jobsData ? <Spinner animation="border" /> : bottomChartData.length === 0 ? <p className="text-muted text-center mt-3">No data matches filters.</p> : rolesToDisplay.length === 0 ? <p className="text-muted text-center mt-3">Selected role not found or all roles hidden.</p> : (
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={bottomChartData} margin={{ top: 5, right: 15, left: 5, bottom: 70 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="location" angle={-45} textAnchor="end" interval={0} tick={{ fontSize: 11 }} />
                    <YAxis allowDecimals={false} />
                    <RechartsTooltip />
                    {/* <RechartsLegend /> */} {/* Keep default legend commented out */}

                    {/* Dynamically create a Bar ONLY for rolesToDisplay */}
                    {rolesToDisplay.map((role) => {
                        const roleIndex = allRolesInData.indexOf(role); // Get original index for color
                        const color = getColor(roleIndex);
                        return (
                            <RechartsBar
                              key={role}
                              dataKey={role}
                              stackId="a" // Keep stackId for potential future stacking
                              fill={color}
                              name={role}
                              // Add animation props
                              isAnimationActive={true}
                              animationDuration={500}
                            />
                        );
                    })}
                  </RechartsBarChart>
                </ResponsiveContainer>
              )}
            </div>
          </Card.Body>
        </Card>

      </Card.Body>
    </Card>
  );
};

export default LocationAnalysis;
