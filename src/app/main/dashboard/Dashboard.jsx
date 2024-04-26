import React from "react";
import Layout from "../../../components/Layout";
import { Line, Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";

const data = {
  labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
  datasets: [
    {
      label: "Machines",
      data: [20000, 25000, 18000, 22000, 21000, 23000, 24000],
      borderColor: "rgba(255, 99, 132, 1)",
      backgroundColor: "rgba(255, 99, 132, 0.2)",
    },
    {
      label: "Vegetables",
      data: [15000, 16000, 17000, 18000, 19000, 20000, 21000],
      borderColor: "rgba(54, 162, 235, 1)",
      backgroundColor: "rgba(54, 162, 235, 0.2)",
    },
    {
      label: "Fruits",
      data: [12000, 13000, 14000, 15000, 16000, 17000, 18000],
      borderColor: "rgba(75, 192, 192, 1)",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
    },
  ],
};

const yScale = {
  type: "linear",
  ticks: {
    callback: function (value) {
      return value.toLocaleString("en-US", {
        style: "currency",
        currency: "LKR",
      });
    },
  },
};

// Chart.js options
const options = {
  scales: {
    y: yScale,
  },
};

const machinesData = {
  labels: ["Machine A", "Machine B", "Machine C"],
  datasets: [
    {
      label: "Machines",
      data: [30, 50, 20], // Sample data for machines sold this month
      backgroundColor: [
        "rgba(255, 99, 132, 0.6)",
        "rgba(54, 162, 235, 0.6)",
        "rgba(75, 192, 192, 0.6)",
      ],
    },
  ],
};

const vegetablesData = {
  labels: ["Carrots", "Potatoes", "Tomatoes"],
  datasets: [
    {
      label: "Vegetables",
      data: [40, 30, 30], // Sample data for vegetables sold this month
      backgroundColor: [
        "rgba(255, 99, 132, 0.6)",
        "rgba(54, 162, 235, 0.6)",
        "rgba(75, 192, 192, 0.6)",
      ],
    },
  ],
};

const fruitsData = {
  labels: ["Apples", "Bananas", "Oranges"],
  datasets: [
    {
      label: "Fruits",
      data: [50, 30, 20], // Sample data for fruits sold this month
      backgroundColor: [
        "rgba(255, 99, 132, 0.6)",
        "rgba(54, 162, 235, 0.6)",
        "rgba(75, 192, 192, 0.6)",
      ],
    },
  ],
};

const Dashboard = () => {
  return (
    <Layout
      body={
        <div className="px-4 pt-12">
          <div className="grid grid-cols-3 gap-3">
            <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm col-span-2">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                Sales this week
              </h3>
              <Line data={data} options={options} />
            </div>
            {/* <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm col-span-1">
              <h3 className="flex items-center mb-4 text-lg font-semibold text-gray-900">
                Statistics this month
              </h3>
            </div> */}
          </div>
          <div className="grid grid-cols-3 gap-3 mt-6">
            <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                Machines Sales this Month
              </h3>
              <Pie data={machinesData} />
            </div>
            <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                Vegetables Sales this Month
              </h3>
              <Pie data={vegetablesData} />
            </div>
            <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                Fruits Sales this Month
              </h3>
              <Pie data={fruitsData} />
            </div>
          </div>
        </div>
      }
    />
  );
};

export default Dashboard;
