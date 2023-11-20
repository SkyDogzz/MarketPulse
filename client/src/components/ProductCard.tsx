import { Product } from "../types";
import { Link } from "react-router-dom";

export default function ProductCard({ product }: { product: Product }) {
  console.log(product);

  return (
    <li className="product-card">
      <Link to={`/product/${product.id}`}>
        <img
          className="product-card-img"
          src={product.imageUrl}
          alt={product.title}
        />
        <h2 className="product-card-title">{product.title}</h2>

        <p className="product-card-detail">{product.description}</p>
      </Link>
    </li>
  );
}
