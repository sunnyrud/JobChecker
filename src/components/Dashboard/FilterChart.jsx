// src/components/Dashboard/FilterChart.jsx
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

// This component expects to receive the full list of jobs via the 'jobsData' prop
const FilterChart = ({ jobsData }) => {
  // State for the data formatted for the chart
  const [chartData, setChartData] = useState([]);

  // State for the selected filter values
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedJobType, setSelectedJobType] = useState('All');

  // State to hold the dynamically generated filter options
  const [locationOptions, setLocationOptions] = useState(['All']);
  const [jobTypeOptions, setJobTypeOptions] = useState(['All']);

  // --- Dynamic Filter Option Generation ---
  const uniqueFilters = useMemo(() => {
    if (!jobsData || jobsData.length === 0) {
      return { locations: ['All'], jobTypes: ['All'] };
    }
    const locations = [
      'All',
      ...new Set(jobsData.map(job => job.location).filter(Boolean))
    ].sort();
    const jobTypes = [
      'All',
      ...new Set(jobsData.map(job => job.job_type).filter(Boolean))
    ].sort();
    return { locations, jobTypes };
  }, [jobsData]);

  useEffect(() => {
    setLocationOptions(uniqueFilters.locations);
    setJobTypeOptions(uniqueFilters.jobTypes);
  }, [uniqueFilters]);

  // --- Data Filtering and Aggregation ---
  useEffect(() => {
    if (!jobsData) return;

    const filteredJobs = jobsData.filter(job => {
      const locationMatch = selectedLocation === 'All' || job.location === selectedLocation;
      const jobTypeMatch = selectedJobType === 'All' || job.job_type === selectedJobType;
      return locationMatch && jobTypeMatch;
    });

    const countsByRole = filteredJobs.reduce((acc, job) => {
      const role = job.job_title || 'Unknown Role';
      acc[role] = (acc[role] || 0) + 1;
      return acc;
    }, {});

    const formattedData = Object.entries(countsByRole)
      .map(([role, count]) => ({
        role,
        count,
      }))
      .sort((a, b) => a.count - b.count); // Sort ascending for horizontal bars looks better usually

    setChartData(formattedData);

  }, [jobsData, selectedLocation, selectedJobType]);

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title className="mb-4">Job Roles Distribution</Card.Title>

        {/* Filter Controls Section */}
        <Row className="mb-4">
          <Col md={6} className="mb-3 mb-md-0">
            <Form.Group controlId="chartLocationFilter">
              <Form.Label className="fw-semibold">Location</Form.Label>
              <Form.Select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                aria-label="Filter chart by location"
                size="sm"
              >
                {locationOptions.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="chartJobTypeFilter">
              <Form.Label className="fw-semibold">Job Type</Form.Label>
              <Form.Select
                value={selectedJobType}
                onChange={(e) => setSelectedJobType(e.target.value)}
                aria-label="Filter chart by job type"
                size="sm"
              >
                {jobTypeOptions.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        {/* Chart Area - Keep height */}
        <div style={{ height: '715px', width: '100%' }}>
          {!jobsData ? (
             <div className="d-flex justify-content-center align-items-center h-100">
               <Spinner animation="border" role="status" variant="primary">
                 <span className="visually-hidden">Loading Chart Data...</span>
               </Spinner>
             </div>
          ) : chartData.length === 0 ? (
             <div className="d-flex justify-content-center align-items-center h-100">
               <p className="text-muted">No job data matches the selected filters.</p>
             </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart
                layout="vertical"
                data={chartData}
                margin={{
                  top: 5,
                  right: 30,
                  // REDUCED left margin to 0
                  left: 0,
                  bottom: 5,
                }}
                // Optional: Adjust bar gap if needed
                // barCategoryGap="10%"
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0"/>
                <XAxis type="number" allowDecimals={false} tick={{ fontSize: 12 }} />
                <YAxis
                    dataKey="role"
                    type="category"
                    // Keep explicit width to allow space for labels
                    width={200} // Adjust this value based on the longest expected job title
                    tick={{ fontSize: 11 }}
                    interval={0} // Show all labels
                    // ADDED axisLine={false} to hide the vertical axis line
                    axisLine={false}
                    // Optional: hide tick lines as well
                    tickLine={false}
                 />
                <RechartsTooltip
                    contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '8px', padding: '8px' }}
                    cursor={{ fill: 'rgba(206, 206, 206, 0.2)' }}
                    formatter={(value, name) => [value, "Jobs"]} // Tooltip format
                />
                <RechartsLegend verticalAlign="top" height={36}/>
                <RechartsBar dataKey="count" fill="#8884d8" name="Number of Jobs" radius={[0, 4, 4, 0]} barSize={20} />
              </RechartsBarChart>
            </ResponsiveContainer>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default FilterChart;
