import { useNavigate } from "react-router-dom";
import useAuthStore from "../stores/authStore";
import { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "../types";

export default function AdminProducts() {
  const navigate = useNavigate();
  const isAdmin = useAuthStore((state) => state.user?.isAdmin);

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
    }

    const apiUrl = import.meta.env.VITE_API_URL;
    axios.get(`${apiUrl}/products`).then((res) => {
      setProducts(res.data.products);
    });
  }, []);
  console.log(products);

  return (
    <div className="cart-container">
      <h1 className="cart-title">Admin Products</h1>
      {products && products.length > 0 ? (
        <table className="cart-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>
                  <button className="cart-button remove">Delete</button>
                  <button className="cart-button delete">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="cart-empty">No products available</p>
      )}
    </div>
  );
}
