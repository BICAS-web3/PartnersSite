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
// import Chart from "apexcharts";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// export const options = {
//   responsive: true,
//   scales: {
//     y: {
//       min: 0,
//       max: 50,
//       ticks: {
//         stepSize: 10,
//       },
//     },
//   },
//   plugins: {
//     legend: {
//       // position: "bottom",
//       display: false,
//       // labels: {
//       //   usePointStyle: true,
//       //   pointStyle: "circle",
//       //   boxWidth: 10,
//       // },
//     },
//   },
// };

// const labels = [
//   "00:00",
//   "03:00",
//   "06:00",
//   "09:00",
//   "12:00",
//   "15:00",
//   "18:00",
//   "21:00",
//   "00:00",
//   "03:00",
// ];

// const firstLinePoints = [];

// export const data = {
//   labels,
//   datasets: [
//     {
//       label: "Прямые ссылки",
//       // data: [1, 5, 15, 10, 40, 5, 6, 10, 20, 5],
//       borderColor: "#E96D52",
//       backgroundColor: "#E96D52",
//       pointRadius: 0,
//       borderWidth: 2,
//       tension: 1.1,
//       fill: true,
//     },
//     {
//       label: "Просмотры",
//       // data: [10, 20, 5, 30, 25, 40, 35, 45, 10, 15],
//       borderColor: "#F28D2F",
//       backgroundColor: "#F28D2F",
//       tension: 1.1,
//       pointRadius: 0,
//       borderWidth: 2,
//       fill: true,
//     },
//     {
//       label: "Клики",
//       // data: [50, 5, 5, 15, 2, 10, 2, 3, 4, 5, 1, 2],
//       borderColor: "#F8CF66",
//       backgroundColor: "#F8CF66",
//       tension: 1.1,
//       pointRadius: 0,
//       borderWidth: 2,
//       fill: true,
//     },
//   ],
// };const

// const series = [
//   {
//     data: [12, 41, 35, 22, 5, 3, 2, 1, 10, 22, 40, 50, 51, 49, 62, 69, 91, 148],
//   },
// ];

interface FollowsChartProps {}

export const FollowsChart: FC<FollowsChartProps> = () => {
  const data = [
    12, 41, 35, 22, 5, 3, 2, 1, 10, 22, 40, 50, 51, 49, 62, 69, 91, 148,
  ];
  const categories = ["00:00", "03:00", "05:00"];

  const options = {
    chart: {
      id: "line-chart",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: categories,
    },
    yaxis: {
      min: 0,
    },
  };

  const series = [
    {
      data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6],
    },
    {
      data: [20, 29, 37, 36, 44, 45, 50, 58],
    },
    {
      data: [12, 29, 32, 43, 5, 45, 50, 58],
    },
  ];
  return (
    <ReactApexChart
      options={options}
      series={series}
      type="line"
      height={350}
    />
  );
};
