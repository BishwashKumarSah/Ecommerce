import React from "react";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale
);

const ProfitLineChart = ({ years, data }) => {
  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const datasets = [
    {
      label: `Cumulative Profits up to each month of ${years}`,
      data,
      borderColor: "rgba(75,192,192,1)",
      backgroundColor: "rgba(75,192,192,0.2)",
      borderWidth: 1,
    },
  ];
  const dataProp = { labels, datasets };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: "top", // Position of the legend
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `Profits: $${tooltipItem.raw}`; // Format the tooltip label with a dollar sign
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Month", // Label for the X-axis
        },
      },
      y: {
        title: {
          display: true,
          text: "Profits", // Label for the Y-axis
        },
        beginAtZero: true, // Ensure the Y-axis starts at 0
      },
    },
  };

  return (
    <div>
      <Line data={dataProp} options={options} />
    </div>
  );
};

export default ProfitLineChart;
