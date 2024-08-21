import "./Pagination.css";

const Pagination = ({
  currentPage,
  setCurrentPage,  
  totalButtons, 
}) => {
  const maxButtonsToShow = 4; // Maximum number of page buttons to show

  const getPaginationButtons = () => {
    /*** 
     Initially buttons = []
     here we want to show 4 buttons perPage.
     Generally there are three cases:
     a) if i am a the beginning of the pages (1,2,3,) dont include 4 cuz we need to press some buttons to move 
     b) if i am at the middle of the pages(we perform some calculations)
     c) if i am at the near end of the pages(ie 18,19,20,21)
     (1) so if i am at 1,2,3 i would simply get [1,2,3,4...end(21)] 
        
     (2) so if i am at middle: 
          so if i am at 4 it means i am far from beginning and some where in middle(near)
          so start = (4 - 2) = 2 and end = (4 + 2) = 6
          so we create array from [1,...,2,3,(4),5,6,...,21]
    
      (3) so if i am at end ie [18,19,20,21], i would simply return [1,...,18,19,20,21]     
    ****/

    const buttons = [];
    let startPage, endPage;
    const firstHalf = 3;
    const secondHalf = totalButtons - 3;

    if (totalButtons <= maxButtonsToShow) {
      startPage = 1;
      endPage = totalButtons;
    } else {
      const half = Math.floor(maxButtonsToShow / 2);
      if (currentPage <= firstHalf) {
        startPage = 1;
        endPage = maxButtonsToShow;
      } else if (currentPage > firstHalf && currentPage < secondHalf) {
        startPage = currentPage - half;
        endPage = currentPage + half;
      } else {
        startPage = secondHalf;
        endPage = maxButtonsToShow;
      }
    }
    if (startPage === 1 && endPage <= maxButtonsToShow) {
     
      for (let i = startPage; i <= endPage; i++) {
        buttons.push(i);
      }
    } else if (startPage === 1) {
      for (let i = startPage; i <= endPage; i++) {
        buttons.push(i);
      }
      buttons.push("...");
      buttons.push(totalButtons);
    } else if (startPage === secondHalf) {
      buttons.push(1);
      buttons.push("...");
      for (let i = startPage; i <= totalButtons; i++) {
        buttons.push(i);
      }
    } else {
      buttons.push(1);
      buttons.push("...");
      for (let i = startPage; i <= endPage; i++) {
        buttons.push(i);
      }
      buttons.push("...");
      buttons.push(totalButtons);
    }

    return buttons;
  };

  return (
    <div className="pagination_wrapper">
      <div className="pagination_button">
        <button
          className="prev_btn"
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <div className="pagination_numbers">
          {getPaginationButtons().map((button, index) =>
            button === "..." ? (
              <span key={index} className="pagination_ellipsis ">
                ...
              </span>
            ) : (
              <button
                key={index}
                onClick={() => setCurrentPage(button)}
                className={`pagination_btn ${
                  button === currentPage ? "active" : ""
                }`}
              >
                {button}
              </button>
            )
          )}
        </div>
        <button
          className="next_btn"
          onClick={() =>
            setCurrentPage((prev) => Math.min(totalButtons, prev + 1))
          }
          disabled={currentPage >= totalButtons}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
