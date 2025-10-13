import React, { useState } from "react";

const NewPagination = ({ page, totalPages, setPage }) => {
  const [jumpPage, setJumpPage] = useState(page);

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handleJump = () => {
    const p = Math.max(1, Math.min(totalPages, Number(jumpPage)));
    setPage(p);
  };

  const getPageNumbers = () => {
    const pages = [];

    // Always show first page
    pages.push(1);

    // Show left dots if current page > 2
    if (page > 3) pages.push("...");

    // Show 1-2 pages around current page
    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Show right dots if current page < totalPages - 2
    if (page < totalPages - 2) pages.push("...");

    // Always show last page if more than 1
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  return (
    <div className="d-flex justify-content-end align-items-center gap-2">
      {/* Prev Button */}
      <button
        className="btn btn-outline-primary text-info bg-danger"
        style={{ boxShadow: "none", outline: "none" }}
        onClick={handlePrev}
        disabled={page === 1}
      >
        <i className="bi bi-arrow-left"></i> Prev
      </button>

      {/* Page Numbers */}
      {getPageNumbers().map((p, idx) =>
        p === "..." ? (
          <span key={idx} className="px-2">
            ...
          </span>
        ) : (
          <button
            key={idx}
            className={`btn ${
              p === page ? "btn-light text-white" : "btn-outline-light"
            }`}
            onClick={() => setPage(p)}
          >
            {p}
          </button>
        )
      )}

      {/* Next Button */}
      <button
        className="btn btn-outline-primary text-info bg-danger"
        style={{ boxShadow: "none", outline: "none" }}
        onClick={handleNext}
        disabled={page === totalPages}
      >
        Next <i className="bi bi-arrow-right"></i>
      </button>

      {/* Jump to page */}
      <div className="d-flex align-items-center gap-1 ms-2">
        <input
          type="number"
          className="form-control"
          style={{ width: "60px" }}
          value={jumpPage}
          min={1}
          max={totalPages}
          onChange={(e) => setJumpPage(e.target.value)}
        />
        <button
          className="btn btn-link bg-light text-info text-info border-primary"
          style={{ boxShadow: "none", outline: "none", textDecoration: "none" }}
          onClick={handleJump}
        >
          Go
        </button>
      </div>
    </div>
  );
};

export default NewPagination;
