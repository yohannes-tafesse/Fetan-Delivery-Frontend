import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProfile } from "../../features/auth/authSlice";
import Chart from "./Comp/Chart";
import { LanguageContext } from "../Languages/LanguageContext";
import { fetchStats } from "../../features/dashboard/builderSlice";

const Dashboard = () => {
  const { profile, isAuthenticated } = useSelector((state) => state.auth);
  const { t } = useContext(LanguageContext);
  const { stats, chart } = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

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

  useEffect(() => {
    dispatch(fetchProfile());
    // dispatch(fetchOrderchart());
    // dispatch(fetchStats());

    if (selectedYear && selectedMonth) {
      dispatch(fetchStats({ year: selectedYear, month: selectedMonth }));
    }
  }, [selectedYear, selectedMonth, dispatch]);

  const cardData = [
    {
      value: stats?.completed || 0,
      title: t.completed,
      icon: "bi bi-check-circle-fill",
    },
    { value: stats?.shipping || 0, title: t.shipping, icon: "bi bi-truck" },
    { value: stats?.failed || 0, title: t.failed, icon: "bi bi-x-circle-fill" },
    {
      value: stats?.return || 0,
      title: t.return,
      icon: "bi bi-arrow-return-left",
    },
  ];

  //   if (!isAuthenticated || !profile) {
  //     return <Navigate to="/login" />;
  //   }

  return (
    <>
      <div className="py-2 container-fluid ">
        <div className="row">
          <div className="container">
            <div className="d-flex justify-content-end align-items-center mb-3">
              <select
                className="form-select form-select-sm"
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
                disabled={!selectedYear} // disable until year is selected
              >
                <option value="">Select Month</option>
                {months.map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="row g-4">
              {cardData.map((card, index) => (
                <div key={index} className="col-md-6 col-lg-3">
                  <div
                    className="card shadow-sm bg-success text-info"
                    style={{ height: "100px" }}
                  >
                    <div className="card-body d-flex align-items-center">
                      <div
                        className="rounded-circle d-flex bg-danger justify-content-center align-items-center me-3"
                        style={{
                          width: "50px",
                          height: "50px",
                        }}
                      >
                        <i className={`${card.icon} text-info fs-4`}></i>
                      </div>
                      <div>
                        <h1 className="text-danger fs-5">{card.value}</h1>
                        <h1 className="fs-6 mb-1 text-light">{card.title}</h1>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Chart />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
