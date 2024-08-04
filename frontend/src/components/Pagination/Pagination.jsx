import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./Pagination.css";

const Pagination = () => {
  const { totalProductsCount } = useSelector((state) => state.products);
  const productsPerPage = 1;
  const totalButtons = Math.ceil(totalProductsCount / productsPerPage);
  const maxButtonsToShow = 4; // Maximum number of page buttons to show

  const [currentPage, setCurrentPage] = useState(1);

  // Generates an array of page numbers with possible ellipses
  const getPaginationButtons = () => {
    const buttons = [];
    let startPage, endPage;

    // Calculate start and end pages based on the current page
    if (totalButtons <= maxButtonsToShow) {
      startPage = 1;
      endPage = totalButtons;
    } else {
      const half = Math.floor(maxButtonsToShow / 2);
      if (currentPage <= half) {
        startPage = 1;
        endPage = maxButtonsToShow;
      } else if (currentPage + half >= totalButtons) {
        startPage = totalButtons - maxButtonsToShow + 1;
        endPage = totalButtons;
      } else {
        startPage = currentPage - half;
        endPage = currentPage + half;
      }
    }

    // Add ellipses and page numbers to the buttons array
    if (startPage > 1) {
      buttons.push(1);
      if (startPage > 2) buttons.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(i);
    }

    if (endPage < totalButtons) {
      if (endPage < totalButtons - 1) buttons.push("...");
      buttons.push(totalButtons);
    }

    return buttons;
  };

  return (
    <div className="pagination_wrapper">
      <div className="pagination_button">
        <button
          id="button"
          className="pagination_btn prev"
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
        >
          Prev
        </button>
        <div className="pagination_numbers">
          {getPaginationButtons().map((button, index) => (
            <button
              id="button"
              key={index}
              className={`pagination_btn ${
                button === currentPage ? "active" : ""
              }`}
              onClick={() => button !== "..." && setCurrentPage(button)}
            >
              {button}
            </button>
          ))}
        </div>
        <button
          id="button"
          className="pagination_btn next"
          onClick={() =>
            setCurrentPage(Math.min(totalButtons, currentPage + 1))
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
