import axios from 'axios';
import { useQuery } from 'react-query';

const fetchAllProducts = () => {
  return axios.get('https://fakestoreapi.com/products');
};

export const useFetchAllProducts = () => {
  return useQuery('item', fetchAllProducts);
};
