// src/components/Dashboard/JobsByRoleType.jsx
import React from 'react';
import DonutChartWithFilters from './DonutChartWithFilters';

// This component displays jobs grouped by the 'role' field (e.g., Internship, Full-Time)
// It receives the main jobsData from the Dashboard component
const JobsByRoleType = ({ jobsData }) => {
  // Define the field to group by for this chart
  const groupByField = 'role'; // The column name in your Supabase table

  // Define the fields that should have filter dropdowns
  // Exclude the 'role' field itself as it's the primary grouping dimension
  const filterFields = ['location', 'job_title', 'job_type', 'experience'];

  return (
    <DonutChartWithFilters
      jobsData={jobsData}
      title="Jobs by Role Type (e.g., Internship)"
      groupByField={groupByField}
      filterFields={filterFields}
    />
  );
};

export default JobsByRoleType;
