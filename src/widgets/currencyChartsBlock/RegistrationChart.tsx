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
      display: false,
      //   position: "bottom",
      labels: {
        // usePointStyle: true,
        // pointStyle: "circle",
        // // boxWidth: 100,
        // fontSize: 12,
      },
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

export const data = {
  labels,
  datasets: [
    {
      label: "Регистрация",
      // data: [1, 5, 15, 10, 40, 5, 6, 10, 20, 5],
      borderColor: "#F2DE2F",
      backgroundColor: "#F2DE2F",
      pointRadius: 0,
      borderWidth: 2,
      tension: 1.1,
      fill: true,
    },
    {
      label: "Новые аккаунты с депозитами",
      // data: [10, 20, 5, 30, 25, 40, 35, 45, 10, 15],
      borderColor: "#2FF24E",
      backgroundColor: "#2FF24E",
      pointRadius: 0,
      borderWidth: 2,
      tension: 1.1,
      fill: true,
    },
    {
      label: "Сумма коммиссий",
      // data: [50, 5, 5, 15, 2, 10, 2, 3, 4, 5, 1, 2],
      borderColor: "#CD4C30",
      backgroundColor: "#CD4C30",
      pointRadius: 0,
      borderWidth: 2,
      tension: 1.1,
      fill: true,
    },
  ],
};

interface RegistrationChartProps {}

export const RegistrationChart: FC<RegistrationChartProps> = () => {
  return <Line options={options} data={data} />;
};
