import './pagination.css';

const Pagination = ({ totalCards, cardsPerPage, setActivePage, activePage }) => {
  const totalPages = Math.ceil(totalCards / cardsPerPage);
  const maxPagesToShow = 6;

// Function to generate the array of page numbers based on the current active page
const generatePages = () => {
  // Array to store the generated page numbers
  const pages = [];

  // Variables to determine the start and end of the range of pages to display
  let startPage, endPage;

  // Determine the range of pages to display
  if (totalPages <= maxPagesToShow) {
    // If the total number of pages is less than or equal to the maximum pages to show
    startPage = 1;
    endPage = totalPages;
  } else {
    // Calculate the number of pages before and after the ellipsis
    const maxPagesBeforeEllipsis = Math.floor((maxPagesToShow - 1) / 2);
    const maxPagesAfterEllipsis = maxPagesToShow - 1 - maxPagesBeforeEllipsis;

    // Adjust the range based on the active page position
    if (activePage <= maxPagesBeforeEllipsis) {
      startPage = 1;
      endPage = maxPagesToShow - 1;
    } else if (activePage >= totalPages - maxPagesAfterEllipsis) {
      startPage = totalPages - maxPagesToShow + 2;
      endPage = totalPages;
    } else {
      startPage = activePage - maxPagesBeforeEllipsis;
      endPage = activePage + maxPagesAfterEllipsis;
    }
  }

  // Generate the array of page numbers within the determined range
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  // Return the array of generated page numbers
  return pages;
};


  return (
    <div className='pagination'>
      {/* "Go to First Page" button */}
      {activePage > 1 && (
        <a onClick={() => setActivePage(1)}>&lsaquo;</a>
      )}

      {/* "Previous" button */}
      {activePage > 1 && (
        <a onClick={() => setActivePage(activePage - 1)}>&laquo;</a>
      )}

      {/* Page numbers */}
      {generatePages().map((page, index) => (
        <a
          key={index}
          onClick={() => setActivePage(page)}
          className={page === activePage ? 'active' : ''}
        >
          {page}
        </a>
      ))}

      {/* "Next" button */}
      {activePage < totalPages && (
        <a onClick={() => setActivePage(activePage + 1)}>&raquo;</a>
      )}

      {/* "Go to Last Page" button */}
      {activePage < totalPages && (
        <a onClick={() => setActivePage(totalPages)}>&rsaquo;</a>
      )}
    </div>
  );
};

export default Pagination;
  