import axios from 'axios';
import { useEffect, useState } from 'react';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products/categories');
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return categories;
};

export default Categories;
