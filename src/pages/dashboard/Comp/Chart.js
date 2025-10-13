import React, { useContext, useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ComposedChart,
  Legend,
} from "recharts";
import PerformanceWaveChart from "./Performance";
import { LanguageContext } from "../../Languages/LanguageContext";

const Chart = () => {
  const { t } = useContext(LanguageContext);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(
    String(new Date().getMonth() + 1).padStart(2, "0")
  );

  // Local JSON dataset (simulate API response)
  const localChartData = {
    January: { views: 150, clicks: 80 },
    February: { views: 200, clicks: 120 },
    March: { views: 250, clicks: 150 },
    April: { views: 180, clicks: 90 },
    May: { views: 300, clicks: 180 },
    June: { views: 220, clicks: 130 },
    July: { views: 260, clicks: 160 },
    August: { views: 310, clicks: 190 },
    September: { views: 280, clicks: 140 },
    October: { views: 330, clicks: 210 },
    November: { views: 350, clicks: 230 },
    December: { views: 400, clicks: 250 },
  };

  const [performanceData, setPerformanceData] = useState([]);

  useEffect(() => {
    // Simulate filtering by selected month/year
    const filtered = Object.entries(localChartData).map(([month, values]) => ({
      name: month,
      views: values.views,
      clicks: values.clicks,
    }));
    setPerformanceData(filtered);
  }, [selectedYear, selectedMonth]);

  return (
    <div className="container py-4">
      <div className="row g-4">
        {/* Performance Chart */}
        <div className="col-lg-6">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="card-title text-light mb-0">{t.completed}</h5>
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
                    {[
                      "January",
                      "February",
                      "March",
                      "April",
                      "May",
                      "June",
                      "July",
                      "August",
                      "September",
                      "October",
                      "November",
                      "December",
                    ].map((month, i) => (
                      <option
                        key={month}
                        value={String(i + 1).padStart(2, "0")}
                      >
                        {month}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="views"
                    fill="#2c3a46"
                    barSize={15}
                    radius={[5, 5, 0, 0]}
                  />
                  <Line
                    type="monotone"
                    dataKey="clicks"
                    stroke="#3f5263"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Wave Chart */}
        <div className="col-lg-6">
          <div className="shadow-sm h-100">
            <PerformanceWaveChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chart;
