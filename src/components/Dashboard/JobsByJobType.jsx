// src/components/Dashboard/JobsByJobType.jsx
import React from 'react';
import DonutChartWithFilters from './DonutChartWithFilters';

// This component displays jobs grouped by the 'job_type' field (e.g., Remote, Hybrid)
// It receives the main jobsData from the Dashboard component
const JobsByJobType = ({ jobsData }) => {
  // Define the field to group by for this chart
  const groupByField = 'job_type'; // The column name in your Supabase table

  // Define the fields that should have filter dropdowns
  // Exclude the 'job_type' field itself
  const filterFields = ['location', 'job_title', 'role', 'experience'];

  return (
    <DonutChartWithFilters
      jobsData={jobsData}
      title="Jobs by Job Type (e.g., Remote)"
      groupByField={groupByField}
      filterFields={filterFields}
    />
  );
};

export default JobsByJobType;
