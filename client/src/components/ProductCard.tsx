import { Product } from "../types";
import { Link } from "react-router-dom";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link to={`/products/${product.id}`}>
      <li className="product-card">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
      </li>
    </Link>
  );
}
