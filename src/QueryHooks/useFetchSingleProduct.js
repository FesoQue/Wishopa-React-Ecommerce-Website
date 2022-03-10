import axios from 'axios';
import { useQuery } from 'react-query';

const fetchSingleProducts = (productID) => {
  return axios.get(`https://fakestoreapi.com/products/${productID}`);
};

export const useSingleProductData = (productID) => {
  return useQuery(['products', productID], () =>
    fetchSingleProducts(productID)
  );
};
