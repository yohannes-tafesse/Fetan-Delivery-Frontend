import { Provider, useSelector } from "react-redux";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./custom.scss";
import { store } from "./store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProfile } from "./features/auth/authSlice";
import { fetchWebsite } from "./features/dashboard/builderSlice";
import { getAuthCookie } from "./utils/cookie";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import "./App.css";
import NotFound from "./components/NotFound";
import WebsiteNotFound from "./components/WebsiteNotFound";
import Dashboard from "./pages/dashboard/Dashboard";
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";
import Company from "./pages/dashboard/Builder/Company";
import DeliveryRequest from "./pages/dashboard/Builder/DeliveryRequest";
import Delivery from "./pages/dashboard/Builder/Delivery";

function App() {
  return (
    <Provider store={store}>
      <AuthCheck />
    </Provider>
  );
}

const AuthCheck = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getAuthCookie();
    if (token) {
      dispatch(fetchProfile());
      dispatch(fetchWebsite());
    }
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route
          path="/*"
          element={
            <Routes>
              <Route path="/auth/register" element={<Register />} />
              <Route path="/auth/login" element={<Login />} />
              <Route
                path="/dashboard"
                element={
                  <Layout>
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  </Layout>
                }
              />
              <Route
                path="/company"
                element={
                  <Layout>
                    <Company />
                  </Layout>
                }
              />
              <Route
                path="/delivery"
                element={
                  <Layout>
                    <Delivery />
                  </Layout>
                }
              />
              <Route
                path="/delivery-request"
                element={
                  <Layout>
                    <DeliveryRequest />
                  </Layout>
                }
              />

              <Route path="/" element={<Navigate to="/auth/login" replace />} />
              <Route path="/not-found" element={<WebsiteNotFound />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
