import React, { FC, useEffect, useState } from 'react';
import SearchForm from '../SearchForm';
import Card from '../Card';
import { getProducts } from '../../utils/api';
import { IProductsArray } from '../../interfaces';
import reactSVG from '../../assets/react.svg';

const MainPage: FC = () => {
  const [products, setProducts] = useState<IProductsArray>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts();
        if (data) {
          const products = data.products;
          setProducts(products);
        }
      } catch (error) {
        console.error('Failed to load data', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="main-page">
      <SearchForm />
      {products.length ? (
        <div className="cards-container">
          {products.map((el) => (
            <Card key={el.id} {...el} />
          ))}
        </div>
      ) : (
        <img src={reactSVG} alt="react-logo" className="logo" />
      )}
    </div>
  );
};

export default MainPage;
