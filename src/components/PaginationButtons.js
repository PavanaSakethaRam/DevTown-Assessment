import React from 'react';
import Button from '@mui/material/Button';

export const getPageButtons = (currentPage, pageCount, handlePageChange) => {
  const pageButtons = [];

  if (pageCount <= 6) {
    for (let i = 1; i <= pageCount; i++) {
      pageButtons.push(
        <Button
          key={i}
          variant={i === currentPage ? 'contained' : 'outlined'}
          color="primary"
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Button>
      );
    }
  } else {
    if (currentPage <= 3) {
      for (let i = 1; i <= 5; i++) {
        pageButtons.push(
          <Button
            key={i}
            variant={i === currentPage ? 'contained' : 'outlined'}
            color="primary"
            onClick={() => handlePageChange(i)}
          >
            {i}
          </Button>
        );
      }
      pageButtons.push(
        <Button key="ellipsis1" disabled>
          ...
        </Button>
      );
      pageButtons.push(
        <Button
          key={pageCount}
          variant={pageCount === currentPage ? 'contained' : 'outlined'}
          color="primary"
          onClick={() => handlePageChange(pageCount)}
        >
          {pageCount}
        </Button>
      );
    } else if (currentPage >= pageCount - 2) {
      pageButtons.push(
        <Button
          key={1}
          variant={1 === currentPage ? 'contained' : 'outlined'}
          color="primary"
          onClick={() => handlePageChange(1)}
        >
          1
        </Button>
      );
      pageButtons.push(
        <Button key="ellipsis2" disabled>
          ...
        </Button>
      );
      for (let i = pageCount - 4; i <= pageCount; i++) {
        pageButtons.push(
          <Button
            key={i}
            variant={i === currentPage ? 'contained' : 'outlined'}
            color="primary"
            onClick={() => handlePageChange(i)}
          >
            {i}
          </Button>
        );
      }
    } else {
      pageButtons.push(
        <Button
          key={1}
          variant={1 === currentPage ? 'contained' : 'outlined'}
          color="primary"
          onClick={() => handlePageChange(1)}
        >
          1
        </Button>
      );
      pageButtons.push(
        <Button key="ellipsis3" disabled>
          ...
        </Button>
      );
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pageButtons.push(
          <Button
            key={i}
            variant={i === currentPage ? 'contained' : 'outlined'}
            color="primary"
            onClick={() => handlePageChange(i)}
          >
            {i}
          </Button>
        );
      }
      pageButtons.push(
        <Button key="ellipsis4" disabled>
          ...
        </Button>
      );
      pageButtons.push(
        <Button
          key={pageCount}
          variant={pageCount === currentPage ? 'contained' : 'outlined'}
          color="primary"
          onClick={() => handlePageChange(pageCount)}
        >
          {pageCount}
        </Button>
      );
    }
  }

  return pageButtons;
};
