import React from "react";
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

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ChartJsTooltip,
  ChartJsLegend,
  Title
);

const allCompanies = [
  "Amazon",
  "Capgemini",
  "Cisco",
  "Cognizant",
  "Dell",
  "Google",
  "HCL",
  "IBM",
  "Infosys",
  "Intel",
  "Microsoft",
  "Oracle",
  "Red Hat",
  "SAP",
  "Salesforce",
  "ServiceNow",
  "TCS",
  "VMware",
  "Wipro",
];

const generateRandomData = (count) =>
  Array.from({ length: count }, () => Math.floor(Math.random() * 36) + 5);

const cloudJobCompanyData = {
  labels: allCompanies,
  datasets: [
    {
      label: "AWS Solutions Architect",
      data: generateRandomData(allCompanies.length),
      backgroundColor: "#FF6384",
    },
    {
      label: "Azure DevOps Engineer",
      data: generateRandomData(allCompanies.length),
      backgroundColor: "#36A2EB",
    },
    {
      label: "Cloud Administrator",
      data: generateRandomData(allCompanies.length),
      backgroundColor: "#FFCE56",
    },
    {
      label: "Cloud Consultant",
      data: generateRandomData(allCompanies.length),
      backgroundColor: "#4BC0C0",
    },
    {
      label: "Cloud Data Engineer",
      data: generateRandomData(allCompanies.length),
      backgroundColor: "#9966FF",
    },
    {
      label: "Cloud Developer",
      data: generateRandomData(allCompanies.length),
      backgroundColor: "#FF9F40",
    },
    {
      label: "Cloud Engineer",
      data: generateRandomData(allCompanies.length),
      backgroundColor: "#E7E9ED",
    },
    {
      label: "Cloud Network Engineer",
      data: generateRandomData(allCompanies.length),
      backgroundColor: "#C9CBCF",
    },
    {
      label: "Cloud Operations Engineer",
      data: generateRandomData(allCompanies.length),
      backgroundColor: "#77DD77",
    },
    {
      label: "Cloud Security Specialist",
      data: generateRandomData(allCompanies.length),
      backgroundColor: "#FFB347",
    },
    {
      label: "Cloud Solutions Engineer",
      data: generateRandomData(allCompanies.length),
      backgroundColor: "#B39EB5",
    },
    {
      label: "Cloud Support Engineer",
      data: generateRandomData(allCompanies.length),
      backgroundColor: "#836FFF",
    },
    {
      label: "GCP Cloud Engineer",
      data: generateRandomData(allCompanies.length),
      backgroundColor: "#03C03C",
    },
  ],
};

const cloudJobCompanyOptions = {
  responsive: true,
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
      },
    },
    y: { stacked: true, beginAtZero: true },
  },
};

const CloudJobCompaniesChart = () => {
  return (
    <Col lg={12} className="mb-4">
      <Card className="shadow-sm h-100">
        <Card.Body className="p-4">
          <h5 className="card-title mb-4">Cloud Job Companies (USA)</h5>
          <div style={{ height: "500px" }}>
            <Bar data={cloudJobCompanyData} options={cloudJobCompanyOptions} />
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CloudJobCompaniesChart;
