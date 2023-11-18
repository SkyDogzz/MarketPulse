import axios from "axios";
import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";

export type Product = {
  id: number;
  name: string;
  description: string;
};

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const apiURL = import.meta.env.VITE_API_URL;
    axios.get(`${apiURL}/products/last/4`).then((res) => {
      setProducts(res.data.products);
    });
  }, []);

  return (
    <div>
      <h2>Les 4 derniers produits ajoutés :</h2>
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
