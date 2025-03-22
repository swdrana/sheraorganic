// SalesLineChart.js
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "January", sales: 120 },
  { month: "February", sales: 190 },
  { month: "March", sales: 300 },
  { month: "April", sales: 500 },
  { month: "May", sales: 200 },
  { month: "June", sales: 400 },
];

const SalesLineChart = () => (
  <ResponsiveContainer width="100%" height={400} className="my-10">
    <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="sales" stroke="#8884d8" />
    </LineChart>
  </ResponsiveContainer>
);

export default SalesLineChart;
