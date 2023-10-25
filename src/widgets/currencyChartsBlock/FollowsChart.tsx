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
import { FC } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  scales: {
    y: {
      min: 0,
      max: 50,
      ticks: {
        stepSize: 10,
      },
    },
  },
  plugins: {
    legend: {
      // position: "bottom",
      display: false,
      // labels: {
      //   usePointStyle: true,
      //   pointStyle: "circle",
      //   boxWidth: 10,
      // },
    },
  },
};

const labels = [
  "00:00",
  "03:00",
  "06:00",
  "09:00",
  "12:00",
  "15:00",
  "18:00",
  "21:00",
  "00:00",
  "03:00",
];

const firstLinePoints = [];

export const data = {
  labels,
  datasets: [
    {
      label: "Прямые ссылки",
      data: [1, 5, 15, 10, 40, 5, 6, 10, 20, 5],
      borderColor: "#E96D52",
      backgroundColor: "#E96D52",
      pointRadius: 0,
      borderWidth: 2,
      tension: 1.1,
      fill: true,
    },
    {
      label: "Просмотры",
      data: [10, 20, 5, 30, 25, 40, 35, 45, 10, 15],
      borderColor: "#F28D2F",
      backgroundColor: "#F28D2F",
      tension: 1.1,
      pointRadius: 0,
      borderWidth: 2,
      fill: true,
    },
    {
      label: "Клики",
      data: [50, 5, 5, 15, 2, 10, 2, 3, 4, 5, 1, 2],
      borderColor: "#F8CF66",
      backgroundColor: "#F8CF66",
      tension: 1.1,
      pointRadius: 0,
      borderWidth: 2,
      fill: true,
    },
  ],
};

interface FollowsChartProps {}

export const FollowsChart: FC<FollowsChartProps> = () => {
  return <Line options={options} data={data} />;
};
