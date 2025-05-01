import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
  });

  const [revenueData, setRevenueData] = useState([]);

  // Simulate fetching real-time data
  useEffect(() => {
    const fetchData = () => {
      // Fake data for now
      const orders = [
        { id: 1, status: "Completed", amount: 150 },
        { id: 2, status: "Pending", amount: 300 },
        { id: 3, status: "Completed", amount: 500 },
        { id: 4, status: "Completed", amount: 120 },
      ];

      const totalSales = orders
        .filter((order) => order.status === "Completed")
        .reduce((acc, curr) => acc + curr.amount, 0);

      const completedOrders = orders.filter(
        (order) => order.status === "Completed"
      ).length;
      const pendingOrders = orders.filter(
        (order) => order.status === "Pending"
      ).length;

      setStats({
        totalSales,
        totalOrders: orders.length,
        pendingOrders,
        completedOrders,
      });

      setRevenueData(orders.map((order) => order.amount));
    };

    fetchData();
  }, []);

  const revenueChart = {
    labels: ["Order 1", "Order 2", "Order 3", "Order 4"],
    datasets: [
      {
        label: "Revenue ($)",
        data: revenueData,
        fill: true,
        backgroundColor: "rgba(251, 191, 36, 0.2)",
        borderColor: "#fb923c",
        tension: 0.3,
      },
    ],
  };

  const revenueOptions = {
    responsive: true,
    plugins: {
      legend: { display: true },
    },
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-zinc-800 mb-10 text-center">
        Admin Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
          <h2 className="text-lg font-semibold text-gray-500 mb-2">
            Total Sales
          </h2>
          <p className="text-3xl font-bold text-amber-700">
            ${stats.totalSales}
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
          <h2 className="text-lg font-semibold text-gray-500 mb-2">
            Total Orders
          </h2>
          <p className="text-3xl font-bold text-amber-700">
            {stats.totalOrders}
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
          <h2 className="text-lg font-semibold text-gray-500 mb-2">
            Pending Orders
          </h2>
          <p className="text-3xl font-bold text-red-500">
            {stats.pendingOrders}
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
          <h2 className="text-lg font-semibold text-gray-500 mb-2">
            Completed Orders
          </h2>
          <p className="text-3xl font-bold text-green-600">
            {stats.completedOrders}
          </p>
        </div>
      </div>

      {/* Revenue Graph */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-zinc-800 mb-6">
          Revenue Overview
        </h2>
        <Line data={revenueChart} options={revenueOptions} />
      </div>
    </div>
  );
};

export default AdminDashboard;
