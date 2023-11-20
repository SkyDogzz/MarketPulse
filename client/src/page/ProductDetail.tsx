import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Product } from "../types";

export default function ProductDetail() {
  const [product, setProduct] = useState<Product | null>(null);
  const { id } = useParams();

  console.log(product);

  useEffect(() => {
    const apiURL = import.meta.env.VITE_API_URL;
    axios.get(`${apiURL}/products/` + id).then((res) => {
      setProduct(res.data.product as Product);
    });
  }, []);

  return (
    <div className="product-detail">
      {product !== null ? (
        <div>
          <h2 className="product-detail-title">{product.title}</h2>
          <img 
            className="product-detail-image" 
            src={product.imageUrl} 
            alt={product.title} 
          />
          <p className="product-detail-description">{product.description}</p>
          <p className="product-detail-price">Price: ${product.price}</p>
        </div>
      ) : (
        <p className="product-detail-info">No products available</p>
      )}
    </div>
  );
  
}
