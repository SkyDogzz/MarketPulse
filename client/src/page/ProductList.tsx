import { useState, useEffect } from "react";
import axios from "axios";
import { Product } from "../types";
import ProductCard from "../components/ProductCard";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const apiURL = import.meta.env.VITE_API_URL;
    axios.get(`${apiURL}/products`).then((res) => {
      setProducts(res.data.products);
    });
  }, []);

  return (
    <div>
      <h2>All products:</h2>
      {products !== null && products.length > 0 ? (
        <ul className="products">
          {products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
}
