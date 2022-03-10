import axios from 'axios';
import { useQuery } from 'react-query';

const fetchCategory = (categoryName) => {
  return axios.get(
    `https://fakestoreapi.com/products/category/${categoryName}`
  );
};

export const useCategoryData = (categoryName) => {
  return useQuery(['category', categoryName], () =>
    fetchCategory(categoryName)
  );
};
