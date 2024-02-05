import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Line_chart = ({ data }) => {
  const maxDataValue = Math.max(...data.datasets[0].data);
  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: Math.ceil(maxDataValue * 1.1),
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "",
      },
    },
  };
  return <Line options={options} data={data} />;
};

export default Line_chart;
