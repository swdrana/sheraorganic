"use client";
import { useState, useEffect } from "react";
import { FiDownload, FiPrinter, FiCalendar } from "react-icons/fi";
import dayjs from "dayjs";

const PackingReports = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch orders by date
  const fetchOrdersByDate = async (date) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`/api/v1/orders/by-date?date=${date}`);
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      const data = await response.json();
      setOrders(data.orders || []);
    } catch (err) {
      setError("Error fetching orders: " + err.message);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  // Load orders when date changes
  useEffect(() => {
    fetchOrdersByDate(selectedDate);
  }, [selectedDate]);

  // Print function
  const handlePrint = () => {
    window.print();
  };

  // Download as CSV
  const handleDownload = () => {
    if (orders.length === 0) {
      alert("No orders to download");
      return;
    }

    const csvContent = [
      ["Order No", "Customer Name", "Contact", "Address", "Products", "Total", "Status", "Payment Method"],
      ...orders.map(order => [
        order.orderCode,
        order.user_info?.name || "N/A",
        order.user_info?.contact || "N/A",
        order.user_info?.address || "N/A",
        order.cart?.map(item => `${item.name} (${item.quantity})`).join("; ") || "N/A",
        `৳${order.total}`,
        order.status,
        order.paymentMethod
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `packing-reports-${selectedDate}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Packing Reports</h1>
            <p className="text-gray-600 mt-1">View and manage daily order reports</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FiPrinter className="w-4 h-4" />
              Print
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <FiDownload className="w-4 h-4" />
              Download CSV
            </button>
          </div>
        </div>
      </div>

      {/* Date Picker */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <FiCalendar className="w-5 h-5 text-gray-500" />
          <label htmlFor="date" className="text-sm font-medium text-gray-700">
            Select Date:
          </label>
          <input
            type="date"
            id="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <span className="text-sm text-gray-500">
            Total Orders: {orders.length}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {loading && (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">Loading orders...</span>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {!loading && !error && orders.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No orders found for {dayjs(selectedDate).format("MMMM D, YYYY")}</p>
          </div>
        )}

        {!loading && !error && orders.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">
                    Order No
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-48">
                    Customer Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Products
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">
                    Total
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                    Status
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">
                    Payment
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order, index) => (
                  <tr key={order._id || index} className="hover:bg-gray-50">
                    <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900 w-20">
                      #{order.orderCode}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 w-48">
                      <div>
                        <div className="font-medium text-gray-900 truncate">{order.user_info?.name || "N/A"}</div>
                        <div className="text-gray-500 truncate">{order.user_info?.contact || "N/A"}</div>
                        <div className="text-gray-500 text-xs truncate">{order.user_info?.address || "N/A"}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div className="max-w-md">
                        {order.cart?.map((item, idx) => (
                          <div key={idx} className="mb-1">
                            <span className="font-medium">{item.name}</span>
                            <span className="text-gray-400 ml-1">(Qty: {item.quantity})</span>
                          </div>
                        )) || "No products"}
                      </div>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900 w-20">
                      ৳{order.total}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap w-24">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        order.status === "Delivered" ? "bg-green-100 text-green-800" :
                        order.status === "Processing" ? "bg-yellow-100 text-yellow-800" :
                        order.status === "Pending" ? "bg-red-100 text-red-800" :
                        "bg-gray-100 text-gray-800"
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 w-20">
                      {order.paymentMethod?.toUpperCase() || "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-area, .print-area * {
            visibility: visible;
          }
          .print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          button {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default PackingReports;