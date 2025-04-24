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

const staticDatasets = Object.entries(originalDatasetColors).map(([label, color]) => ({
  label: label,
  data: generateRandomData(allCompanies.length),
  backgroundColor: color,
}));


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


  const cloudJobCompanyOptions = useMemo(() => {
      const tickFontWeights = allCompanies.map(company =>
          company === highlightedCompany ? 'bold' : 'normal'
      );

      const tickFontColors = allCompanies.map(company => {
          if (company === highlightedCompany) {
              return blinkOn ? 'red' : defaults.color;
          }
          return defaults.color;
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
              tooltip: {},
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
  }, [highlightedCompany, blinkOn]);


  const cloudJobCompanyData = {
      labels: allCompanies,
      datasets: staticDatasets,
  };

  return (
    <Col lg={12} className="mb-4">
      <Card className="shadow-sm h-100">
        <Card.Body className="p-4 d-flex flex-column">
          <h5 className="card-title mb-4">Cloud Job Companies (USA)</h5>
          <div style={{ flexGrow: 1, height: "500px", position: 'relative' }}>
            <Bar data={cloudJobCompanyData} options={cloudJobCompanyOptions} />
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CloudJobCompaniesChart;
