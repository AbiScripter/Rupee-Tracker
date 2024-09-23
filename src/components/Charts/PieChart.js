import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(ArcElement, Tooltip, Legend);
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
      // display:false
    },
    title: {
      display: true,
      text: "Total Expense",
    },
  },
};
function PieChart() {
  const expenses = useSelector((state) => state.user.user.expenses);

  let housing = 0;
  let groceries = 0;
  let health = 0;
  let debt = 0;
  let entertainment = 0;
  let education = 0;
  let personal = 0;

  expenses.forEach((expense) => {
    switch (expense.tag) {
      case "housing":
        housing += expense.amount;
        break;
      case "groceries":
        groceries += expense.amount;
        break;
      case "healthcare":
        health += expense.amount;
        break;
      case "debt":
        debt += expense.amount;
        break;
      case "entertainment":
        entertainment += expense.amount;
        break;
      case "education":
        education += expense.amount;
        break;
      case "personal":
        personal += expense.amount;
        break;
      default:
        break;
    }
  });

  const data = {
    labels: [
      "Housing",
      "Groceries/Food",
      "HealthCare",
      "Debt",
      "Entertainment",
      "Education",
      "Personal/Clothing",
    ],
    datasets: [
      {
        label: "Expenses in Rupees",
        data: [
          housing,
          groceries,
          health,
          debt,
          entertainment,
          education,
          personal,
        ],

        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(46, 204, 113, 0.2)",
        ],

        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(46, 204, 113, 1)",
        ],
        borderWidth: 1.3,
      },
    ],
  };

  return (
    <>
      {expenses.length === 0 ? (
        <h3 style={{ marginLeft: "1rem" }}>
          {" "}
          Seems like you haven't spend anything till now...
        </h3>
      ) : (
        <Doughnut data={data} options={options} />
      )}
    </>
  );
}

export default PieChart;
