import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <nav>
      <ul className="pagination justify-content-end">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button className="page-link" style={{ boxShadow: "none", outline: "none" }} onClick={() => onPageChange(currentPage - 1)}>
          <i class="bi bi-chevron-double-left"></i>
          </button>
        </li>

        {Array.from({ length: totalPages }, (_, index) => (
          <li
            key={index}
            className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
          >
            <button className="page-link" style={{ boxShadow: "none", outline: "none" }} onClick={() => onPageChange(index + 1)}>
              {index + 1}
            </button>
          </li>
        ))}

        <li className={`page-item  ${currentPage === totalPages ? "disabled" : ""}`}>
          <button className="page-link "  style={{ boxShadow: "none", outline: "none" }} onClick={() => onPageChange(currentPage + 1)}>
          <i class="bi bi-chevron-double-right"></i>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
