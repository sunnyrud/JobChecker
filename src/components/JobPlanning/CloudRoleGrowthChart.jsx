import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CloudRoleGrowthChart = () => {
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
        backgroundColor: "rgba(59, 130, 246, 0.7)", // Tailwind blue-500
        borderRadius: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Top 5 High-Demand Cloud Roles (Growth %)",
        font: { size: 18 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 35,
        ticks: {
          stepSize: 5,
        },
      },
    },
  };

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded-xl shadow-md mt-4">
      <Bar data={data} options={options} />
    </div>
  );
};

export default CloudRoleGrowthChart;
