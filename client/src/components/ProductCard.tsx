import { Product } from "../types";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <li className="product-card">
      <h3>{product.name}</h3>
      <p>{product.description}</p>
    </li>
  );
}
