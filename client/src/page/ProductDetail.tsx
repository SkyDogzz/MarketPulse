import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Product } from "../types";

export default function ProductDetail() {
  const [product, setProduct] = useState<Product | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const apiURL = import.meta.env.VITE_API_URL;
    axios.get(`${apiURL}/products/` + id).then((res) => {
      setProduct(res.data.product as Product);
    });
  }, []);

  console.log(product);

  return (
    <div>
      <h2>Product Detail:</h2>
      {product !== null ? (
        <div>
          <h3>{product.title}</h3>
          <p>{product.description}</p>
        </div>
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
}
