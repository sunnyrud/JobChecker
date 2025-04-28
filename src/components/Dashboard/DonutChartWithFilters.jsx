// src/components/Dashboard/DonutChartWithFilters.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { Card, Row, Col, Form, Spinner } from 'react-bootstrap';
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Legend, // Using default legend for simplicity here
} from 'recharts';

// Color palette
const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28DFF', '#FF82A9',
  '#FF5733', '#C70039', '#900C3F', '#581845', '#82E0AA', '#AED6F1',
];
const getColor = (index) => COLORS[index % COLORS.length];

// --- Helper Function to generate Title Case ---
const toTitleCase = (str) => {
  if (!str) return '';
  return str.replace(/_/g, ' ').replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
};

// --- Reusable Component ---
const DonutChartWithFilters = ({
  jobsData,          // The raw job data array
  title,             // Title for the card
  groupByField,      // The field to group data by for the chart (e.g., 'role', 'job_type')
  filterFields       // Array of field names to create filters for (e.g., ['location', 'job_title'])
}) => {

  // --- State for Filters ---
  const initialFilterState = useMemo(() =>
    filterFields.reduce((acc, field) => {
      acc[field] = 'All';
      return acc;
    }, {}),
    [filterFields]
  );
  const [filters, setFilters] = useState(initialFilterState);

  // --- State for Filter Options ---
  const initialOptionsState = useMemo(() =>
    filterFields.reduce((acc, field) => {
      acc[field] = ['All'];
      return acc;
    }, {}),
    [filterFields]
  );
  const [filterOptions, setFilterOptions] = useState(initialOptionsState);

  // --- State for Chart Data ---
  const [chartData, setChartData] = useState([]);

  // --- Generate Filter Options Dynamically ---
  useEffect(() => {
    if (!jobsData || jobsData.length === 0) {
        setFilterOptions(initialOptionsState);
        return;
    };

    const newOptions = { ...initialOptionsState };
    filterFields.forEach(field => {
      const uniqueValues = [
        'All',
        ...new Set(jobsData.map(job => job[field]).filter(Boolean))
      ].sort();
      newOptions[field] = uniqueValues;
    });
    setFilterOptions(newOptions);
  }, [jobsData, filterFields, initialOptionsState]);

  // --- Process Data for Chart based on Filters ---
  useEffect(() => {
    if (!jobsData) return;

    const filteredJobs = jobsData.filter(job => {
      return filterFields.every(field => {
        const filterValue = filters[field];
        return filterValue === 'All' || job[field] === filterValue;
      });
    });

    const counts = filteredJobs.reduce((acc, job) => {
      const groupValue = job[groupByField] || `Unknown ${toTitleCase(groupByField)}`;
      acc[groupValue] = (acc[groupValue] || 0) + 1;
      return acc;
    }, {});

    const formattedData = Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    setChartData(formattedData);

  }, [jobsData, filters, groupByField, filterFields]);

  // --- Handle Filter Changes ---
  const handleFilterChange = (field, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [field]: value,
    }));
  };

  return (
    // REMOVED h-100 from Card
    <Card className="shadow-sm">
      {/* REMOVED d-flex flex-column */}
      <Card.Body>
        <Card.Title className="mb-3">{title}</Card.Title>

        {/* --- Filter Controls --- */}
        <Row className="mb-3 gx-2">
          {filterFields.map(field => (
            <Col md={6} lg={4} className="mb-2" key={field}> {/* Adjusted columns for potentially fewer filters */}
              <Form.Group controlId={`filter-${field}`}>
                <Form.Label className="fw-semibold small">{toTitleCase(field)}</Form.Label>
                <Form.Select
                  value={filters[field]}
                  onChange={(e) => handleFilterChange(field, e.target.value)}
                  size="sm"
                  aria-label={`Filter by ${toTitleCase(field)}`}
                >
                  {(filterOptions[field] || ['All']).map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          ))}
        </Row>

        {/* --- Chart Area --- */}
        {/* REMOVED flex-grow-1, SET fixed height */}
        <div style={{ height: '350px', width: '100%' }}>
           {!jobsData ? (
             <div className="d-flex justify-content-center align-items-center h-100">
               <Spinner animation="border" variant="primary" />
             </div>
           ) : chartData.length === 0 ? (
             <div className="d-flex justify-content-center align-items-center h-100">
                <p className="text-muted">No data matches the selected filters.</p>
             </div>
           ) : (
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%" // Center the pie
                  innerRadius="60%"
                  outerRadius="85%"
                  fill="#8884d8"
                  paddingAngle={2}
                  dataKey="value"
                  nameKey="name"
                  labelLine={false}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getColor(index)} />
                  ))}
                </Pie>
                <RechartsTooltip formatter={(value, name) => [`${value} jobs`, name]} />
                {/* Keep legend, adjust layout if needed */}
                <Legend iconSize={10} wrapperStyle={{ paddingTop: '15px' }} />
              </RechartsPieChart>
            </ResponsiveContainer>
           )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default DonutChartWithFilters;
