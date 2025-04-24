import React, { useState, useEffect, useMemo } from "react";
import { Card, Col } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip as ChartJsTooltip,
  Legend as ChartJsLegend,
  Title,
} from "chart.js";
import { defaults } from 'chart.js';


ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ChartJsTooltip,
  ChartJsLegend,
  Title
);

// --- Constants defined outside the component ---
const allCompanies = [
  "Accenture", "Amazon", "Capgemini", "Cisco", "Cognizant", "Dell", "Google",
  "HCL", "IBM", "Infosys", "Intel", "Microsoft", "Oracle",
  "Red Hat", "SAP", "Salesforce", "ServiceNow", "TCS", "VMware", "Wipro",
];

const generateRandomData = (count) =>
  Array.from({ length: count }, () => Math.floor(Math.random() * 36) + 5);

const originalDatasetColors = {
  "AWS Solutions Architect": "#FF6384",
  "Azure DevOps Engineer": "#36A2EB",
  "Cloud Administrator": "#FFCE56",
  "Cloud Consultant": "#4BC0C0",
  "Cloud Data Engineer": "#9966FF",
  "Cloud Developer": "#FF9F40",
  "Cloud Engineer": "#E7E9ED",
  "Cloud Network Engineer": "#C9CBCF",
  "Cloud Operations Engineer": "#77DD77",
  "Cloud Security Specialist": "#FFB347",
  "Cloud Solutions Engineer": "#B39EB5",
  "Cloud Support Engineer": "#836FFF",
  "GCP Cloud Engineer": "#03C03C",
};

// --- ADDED --- Highlight color for non-selected bars
const NON_HIGHLIGHT_COLOR = "rgba(211, 211, 211, 0.6)"; // Light grey semi-transparent

// Base dataset structure (used for calculating dynamic colors)
const baseDatasets = Object.entries(originalDatasetColors).map(([label, color]) => ({
  label: label,
  data: generateRandomData(allCompanies.length),
  // We'll override backgroundColor dynamically
}));

// --- Component Starts Here ---

const CloudJobCompaniesChart = ({ highlightedCompany = null }) => {

  const [blinkOn, setBlinkOn] = useState(true);

  useEffect(() => {
    let intervalId = null;
    if (highlightedCompany) {
      intervalId = setInterval(() => {
        setBlinkOn(prev => !prev);
      }, 500);
    } else {
      setBlinkOn(true);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [highlightedCompany]);


  // --- MODIFIED --- Calculate dynamic datasets for bar colors
  const cloudJobCompanyData = useMemo(() => {
    const highlightedIndex = highlightedCompany
      ? allCompanies.indexOf(highlightedCompany)
      : -1; // Find index of the selected company

    const datasets = baseDatasets.map(dataset => {
      const originalColor = originalDatasetColors[dataset.label];
      // Create background color array for this dataset
      const backgroundColors = allCompanies.map((company, index) => {
        // If this index matches the highlighted company, use its ORIGINAL color
        // Otherwise, use the NON_HIGHLIGHT_COLOR to grey it out
        return index === highlightedIndex ? originalColor : NON_HIGHLIGHT_COLOR;
      });

      return {
        ...dataset, // Keep label and original data
        backgroundColor: backgroundColors, // Apply the dynamic colors
      };
    });

    return {
      labels: allCompanies,
      datasets: datasets,
    };
  }, [highlightedCompany]); // Recalculate datasets when highlight changes


  // --- Calculate dynamic options for axis label blinking ---
  const cloudJobCompanyOptions = useMemo(() => {
      const tickFontWeights = allCompanies.map(company =>
          company === highlightedCompany ? 'bold' : 'normal'
      );

      const tickFontColors = allCompanies.map(company => {
          if (company === highlightedCompany) {
              return blinkOn ? 'red' : defaults.color; // Blink color
          }
          return defaults.color; // Default color for others
      });

      return {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
              legend: { position: "right" },
              title: {
                  display: true,
                  text: "Distribution of Job Titles Across Cloud Job Companies (USA)",
              },
              tooltip: {
                  // Optional: Customize tooltip if needed, e.g., based on highlight
              },
          },
          scales: {
              x: {
                  stacked: true,
                  ticks: {
                      autoSkip: false,
                      maxRotation: 90,
                      minRotation: 45,
                      font: (context) => {
                          const weight = context.index < tickFontWeights.length ? tickFontWeights[context.index] : 'normal';
                          return { weight: weight };
                      },
                      color: (context) => {
                          return context.index < tickFontColors.length ? tickFontColors[context.index] : defaults.color;
                      }
                  },
              },
              y: { stacked: true, beginAtZero: true },
          },
      };
  }, [highlightedCompany, blinkOn]); // Recalculate options on highlight or blink change


  return (
    <Col lg={12} className="mb-4">
      <Card className="shadow-sm h-100">
        <Card.Body className="p-4 d-flex flex-column">
          <h5 className="card-title mb-4">Cloud Job Companies (USA)</h5>
          <div style={{ flexGrow: 1, height: "500px", position: 'relative' }}>
            {/* Pass the dynamic data and dynamic options */}
            <Bar data={cloudJobCompanyData} options={cloudJobCompanyOptions} />
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CloudJobCompaniesChart;
