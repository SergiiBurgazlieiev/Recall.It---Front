import React, { useState } from "react";
import get from "lodash/get";
import ProductItem from "./components/productItem";
import ProductFilter from "./components/productFilter";
import "./ressources/style.css";

export default ({ prdValue, productsData }) => {
  const [filterBy, setFilterBy] = useState(prdValue);
  const getProducts = value => {
    switch (value) {
      case "Name":
        return get(productsData, "0", []);
      case "Type":
        return get(productsData, "1", []);
      case "Brand":
        return get(productsData, "2", []);
      default:
        return [];
    }
  };

  return (
    <div className="listOfProducts">
      <ProductFilter
        handleClick={e => {
          setFilterBy(e.currentTarget.textContent);
        }}
      />
      <div className="productContainer">
        {getProducts(filterBy).map((product, key) => (
          <ProductItem key={key} product={product} />
        ))}
      </div>
    </div>
  );
};
