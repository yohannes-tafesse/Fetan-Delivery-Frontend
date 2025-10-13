import React, { useContext, useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { LanguageContext } from "../../Languages/LanguageContext";

const PerformanceWaveChart = () => {
  const { t } = useContext(LanguageContext);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(
    String(new Date().getMonth() + 1).padStart(2, "0")
  );

  const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  // ✅ Local JSON data for the area chart
  const localTransactionData = {
    Jan: 120,
    Feb: 150,
    Mar: 200,
    Apr: 180,
    May: 220,
    Jun: 160,
    Jul: 240,
    Aug: 210,
    Sep: 250,
    Oct: 270,
    Nov: 300,
    Dec: 320,
  };

  const monthsOrder = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const [data, setData] = useState([]);

  useEffect(() => {
    // Simulate filtering data based on month/year
    const formatted = monthsOrder.map((month) => ({
      name: month,
      sales: localTransactionData[month] || 0,
    }));
    setData(formatted);
  }, [selectedYear, selectedMonth]);

  return (
    <div
      className="card shadow-sm p-2 rounded w-100 mx-auto"
      style={{ maxWidth: "800px", height: "340px" }}
    >
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="card-title mb-3 text-light">{t.review}</h5>

          <div className="d-sm-flex justify-content-between align-items-center mb-3">
            <select
              className="form-select form-select-sm me-2"
              style={{ width: "100px" }}
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>

            <select
              className="form-select form-select-sm"
              style={{ width: "120px" }}
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              disabled={!selectedYear}
            >
              <option value="">Select Month</option>
              {months.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={250}>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3f5263" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#3f5263" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="#39866d"
              fill="url(#colorSales)"
              strokeWidth={3}
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceWaveChart;
