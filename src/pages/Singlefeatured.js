import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const Singlefeatured = () => {
  const [sample, setSample] = useState([]);
  const getProductData = () => {
    return axios
      .get('/data.json')
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        setSample(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getProductData();
  }, []);

  console.log(sample);
  return (
    <div>
      {sample.map((item) => {
        return <img src={item.image} alt='' />;
      })}
    </div>
  );
};

export default Singlefeatured;
