import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchPublishedWebsite, fetchProducts } from '../features/dashboard/builderSlice';
import Header from "../pages/Website/Header";
import Footer from "../pages/Website/Footer";

const WebsiteLayout = ({ children }) => {
  const { domain } = useParams();
  const dispatch = useDispatch();
  const { website, allProducts } = useSelector(state => state.dashboard);

  // Fetch website by domain
  useEffect(() => {
    if (!website || website.domain !== domain) {
      dispatch(fetchPublishedWebsite(domain)); // assumes fetchWebsite accepts domain
    }
  }, [domain, dispatch]);

  if (!website) {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 vw-100 position-fixed top-0 start-0 bg-white" style={{ zIndex: 1050 }}>
        <div className="text-center">
          <div className="spinner-border text-danger mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div><strong>Loading...</strong></div>
        </div>
      </div>
    );
  }
  return (
    <div style={{maxWidth:"1920px", margin:"auto"}}>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default WebsiteLayout;
