import React from "react";
import { Link } from "react-router-dom";

const WebsiteNotFound = () => {
  return (
    <div className="container text-center py-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <i className="bi bi-exclamation-triangle display-1 text-danger"></i>
          <h1 className="">Website Not Found</h1>
          <h4 className="mb-4">The store you're looking for doesn't exist.</h4>
          <p className="mb-4">
            We couldn’t find a website or store with the ID you entered. Please
            make sure the store number is correct or try again later.
          </p>

          <Link to="/" className="btn btn-danger rounded-pill py-3 px-5">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WebsiteNotFound;
