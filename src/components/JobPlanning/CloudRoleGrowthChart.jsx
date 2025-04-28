// src/components/JobPlanning/CloudRoleGrowthChart.jsx
import React from "react";
import { Bar } from "react-chartjs-2";
import { Card } from 'react-bootstrap'; // Import Card
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useTheme } from '../../context/ThemeContext'; // Import useTheme hook

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CloudRoleGrowthChart = () => {
  // Get the current theme
  const { theme } = useTheme();

  // Define base colors (can be customized further)
  const gridColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
  const tickColor = theme === 'dark' ? '#adb5bd' : '#666'; // Match CSS variables
  const titleColor = theme === 'dark' ? '#dee2e6' : '#333';
  const barBackgroundColor = theme === 'dark' ? 'rgba(90, 150, 255, 0.7)' : 'rgba(59, 130, 246, 0.7)'; // Slightly different blue for dark

  const data = {
    labels: [
      "Cloud Security Engineer",
      "Cloud Architect",
      "DevOps Engineer",
      "Solutions Architect",
      "Cloud Data Engineer",
    ],
    datasets: [
      {
        label: "Growth (%)",
        data: [30, 28, 25, 22, 20],
        backgroundColor: barBackgroundColor, // Use theme-aware color
        borderRadius: 5, // Slightly less radius
        borderColor: theme === 'dark' ? 'rgba(90, 150, 255, 1)' : 'rgba(59, 130, 246, 1)', // Optional border
        borderWidth: 1, // Optional border width
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow chart to fill container height
    plugins: {
      legend: {
        display: false, // Legend is off
      },
      title: {
        display: true,
        text: "Top 5 High-Demand Cloud Roles (Growth %)",
        font: { size: 16 }, // Adjusted font size
        color: titleColor, // Theme-aware title color
        padding: {
            bottom: 20 // Add padding below title
        }
      },
       tooltip: {
         backgroundColor: theme === 'dark' ? 'rgba(40, 40, 40, 0.9)' : 'rgba(255, 255, 255, 0.9)',
         titleColor: titleColor,
         bodyColor: titleColor,
         borderColor: gridColor,
         borderWidth: 1,
       }
    },
    scales: {
      x: {
         grid: {
            color: gridColor, // Theme-aware grid color
            display: false // Often cleaner to hide x-axis grid lines
         },
         ticks: {
            color: tickColor, // Theme-aware tick color
            font: { size: 10 } // Adjust tick font size if needed
         }
      },
      y: {
        beginAtZero: true,
        max: 35,
        grid: {
           color: gridColor, // Theme-aware grid color
        },
        ticks: {
          stepSize: 5,
          color: tickColor, // Theme-aware tick color
        },
      },
    },
  };

  return (
    // Use Bootstrap Card for consistent styling
    // Add a custom class for potential specific CSS overrides if needed
    <Card className="shadow-sm cloud-growth-chart-card">
        <Card.Body>
            {/* Set a height for the chart container */}
            <div style={{ height: '350px' }}>
                 <Bar data={data} options={options} />
            </div>
        </Card.Body>
    </Card>

    // Old Tailwind structure (replaced):
    // <div className="max-w-3xl mx-auto p-4 bg-white rounded-xl shadow-md mt-4">
    //   <Bar data={data} options={options} />
    // </div>
  );
};

export default CloudRoleGrowthChart;
