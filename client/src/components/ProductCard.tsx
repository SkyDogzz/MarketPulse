import { Product } from "../types";
import { Link } from "react-router-dom";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <li className="product-card">
      <Link to={`/product/${product.id}`}>
        <h3>{product.title}</h3>
      </Link>
      <p>{product.description}</p>
    </li>
  );
}
