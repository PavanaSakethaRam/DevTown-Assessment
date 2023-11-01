import React, { useEffect, useState } from 'react';
import { Container, TextField, Select, MenuItem, Box, Grid, Button, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

import axios from 'axios';
import ProductCard from './ProductCard';
import Categories from './Categories';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filterCategory, setFilterCategory] = useState('');
  const [sortValue, setSortValue] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const fetchProductData = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  const categories = Categories();

  const handleSortChange = (event) => {
    setSortValue(event.target.value);
  };

  const handleClearSort = () => {
    setSortValue('');
  };

  const filteredProducts = products
    .filter((product) => !filterCategory || product.category === filterCategory)
    .sort((a, b) => {
      if (sortValue === 'asc') {
        return a.price - b.price;
      } else if (sortValue === 'desc') {
        return b.price - a.price;
      } else {
        return 0;
      }
    });

  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

  const handleCategoryChange = (event) => {
    setFilterCategory(event.target.value);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedProducts = filteredProducts.slice(startIndex, endIndex);

  const getPageButtons = () => {
    const pageButtons = [];

    if (pageCount <= 6) {
      for (let i = 1; i <= pageCount; i++) {
        pageButtons.push(
          <Button
            key={i}
            variant={i === page ? 'contained' : 'outlined'}
            color="primary"
            onClick={() => handlePageChange(i)}
          >
            {i}
          </Button>
        );
      }
    } else {
      if (page <= 3) {
        for (let i = 1; i <= 5; i++) {
          pageButtons.push(
            <Button
              key={i}
              variant={i === page ? 'contained' : 'outlined'}
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
            variant={pageCount === page ? 'contained' : 'outlined'}
            color="primary"
            onClick={() => handlePageChange(pageCount)}
          >
            {pageCount}
          </Button>
        );
      } else if (page >= pageCount - 2) {
        pageButtons.push(
          <Button
            key={1}
            variant={1 === page ? 'contained' : 'outlined'}
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
              variant={i === page ? 'contained' : 'outlined'}
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
            variant={1 === page ? 'contained' : 'outlined'}
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
        for (let i = page - 1; i <= page + 1; i++) {
          pageButtons.push(
            <Button
              key={i}
              variant={i === page ? 'contained' : 'outlined'}
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
            variant={pageCount === page ? 'contained' : 'outlined'}
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

  return (
    <Container>
      <Box mt={4} mb={2} display="flex" alignItems="center">
        <TextField
          fullWidth
          select
          label="Filter by Category"
          value={filterCategory}
          onChange={handleCategoryChange}
        >
          <MenuItem value="">All</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </TextField>
        <Select
          value={sortValue}
          onChange={handleSortChange}
          displayEmpty
          style={{ marginLeft: '8px' }}
        >
          <MenuItem value="" disabled>
            Sort by Price
          </MenuItem>
          <MenuItem value="asc">Price (Low to High)</MenuItem>
          <MenuItem value="desc">Price (High to Low)</MenuItem>
        </Select>
        {sortValue && (
          <IconButton onClick={handleClearSort} color="primary">
            <ClearIcon />
          </IconButton>
        )}
      </Box>
      <Grid container spacing={3}      >
        {displayedProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={4}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
      <Box
        mt={2}
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: { xs: 'row', sm: 'row' },
          '& > *': { m: 1 },
          gap: 2,
          display: pageCount < 2 ? 'none' : 'flex',
        }}
      >
        <Button
          variant="outlined"
          color="primary"
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Previous
        </Button>
        {getPageButtons()}
        <Button
          variant="outlined"
          color="primary"
          onClick={() => handlePageChange(page + 1)}
          disabled={page === pageCount}
        >
          Next
        </Button>
      </Box>
    </Container>
  );
};

export default ProductList;