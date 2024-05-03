import React, { useEffect, useState } from "react";
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
import { useSelector } from "react-redux";
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
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Balance History",
    },
  },
};

// export function LineGraph() {
//   const [chartData, setChartData] = useState(null);
//   const graphData = useSelector((state) => state.account.graphData);

//   useEffect(() => {
//     if (graphData.length > 0) {
//       const sortedGraphData = [...graphData].sort(
//         (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
//       );
//       const temp = [];
//       const labels = [];

//       function formateDateAndPush(date) {
//         const formattedDate = date.slice(4, 15);
//         labels.push(formattedDate);
//       }

//       const getCumulativeAmounts = () => {
//         let prevAmount = 0;
//         for (const transaction of sortedGraphData) {
//           prevAmount += transaction.amount;
//           temp.push(prevAmount);
//           formateDateAndPush(transaction.createdAt);
//         }
//         return temp;
//       };

//       const cumulativeAmount = getCumulativeAmounts();

//       const data = {
//         labels,
//         datasets: [
//           {
//             label: "Current Balance",
//             data: cumulativeAmount,
//             borderColor: "rgb(255, 99, 132)",
//             backgroundColor: "rgba(255, 99, 132, 0.5)",
//           },
//         ],
//       };

//       setChartData(data);
//     }
//   }, [graphData]);
//   console.log(graphData);

//   if (!chartData) {
//     return <div>Loading...</div>;
//   }

//   return <Line options={options} data={chartData} />;
// }

export function LineGraph() {
  const [chartData, setChartData] = useState(null);
  const graphData = useSelector((state) => state.account.graphData);

  const formateDateAndPush = (date, labels) => {
    const formattedDate = `${date.slice(4, 10)} ${date.slice(13, 15)}`;
    labels.push(formattedDate);
  };

  const getCumulativeAmounts = (sortedGraphData) => {
    let prevAmount = 0;
    const temp = [];
    const labels = [];

    for (const transaction of sortedGraphData) {
      prevAmount += transaction.amount;
      temp.push(prevAmount);
      formateDateAndPush(transaction.createdAt, labels);
    }

    return { cumulativeAmount: temp, labels };
  };

  useEffect(() => {
    if (graphData.length > 0) {
      const sortedGraphData = [...graphData].sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );

      const { cumulativeAmount, labels } =
        getCumulativeAmounts(sortedGraphData);

      const data = {
        labels,
        datasets: [
          {
            label: "Balance",
            data: cumulativeAmount,
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ],
      };

      setChartData(data);
    }
  }, [graphData]);

  // console.log(chartData);
  if (!chartData) {
    return <div>Loading...</div>;
  }

  return <Line options={options} data={chartData} />;
}

export default LineGraph;
