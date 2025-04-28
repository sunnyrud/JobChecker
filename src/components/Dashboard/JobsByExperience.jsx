// src/components/Dashboard/JobsByExperience.jsx
import React from 'react';
import DonutChartWithFilters from './DonutChartWithFilters';

// This component displays jobs grouped by the 'experience' field (e.g., Entry Level)
// It receives the main jobsData from the Dashboard component
const JobsByExperience = ({ jobsData }) => {
  // Define the field to group by for this chart
  const groupByField = 'experience'; // The column name in your Supabase table

  // Define the fields that should have filter dropdowns
  // Exclude the 'experience' field itself
  const filterFields = ['location', 'job_title', 'role', 'job_type'];

  return (
    <DonutChartWithFilters
      jobsData={jobsData}
      title="Jobs by Experience Level"
      groupByField={groupByField}
      filterFields={filterFields}
    />
  );
};

export default JobsByExperience;
