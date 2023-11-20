import axios from "axios";
import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { Product } from "../types";
import useSuccessStore from "../stores/successStore";

export default function Home() {
  const [products, setProducts] = useState([]);

  const success = useSuccessStore((state) => state.success);

  useEffect(() => {
    const apiURL = import.meta.env.VITE_API_URL;
    axios.get(`${apiURL}/products/last/4`).then((res) => {
      setProducts(res.data.products);
    });
  }, []);

  return (
    <div className="products-list">
      <h2 className="products-list-title">Last products:</h2>
      <p>{success}</p>
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
