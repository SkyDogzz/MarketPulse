import { useNavigate } from "react-router-dom";
import useAuthStore from "../stores/authStore";
import { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "../types";

export default function AdminProducts() {
  const navigate = useNavigate();
  const isAdmin = useAuthStore((state) => state.user?.isAdmin);
  const token = useAuthStore((state) => state.token);

  const [products, setProducts] = useState<Product[]>([]);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
    }

    axios.get(`${apiUrl}/products`).then((res) => {
      setProducts(res.data.products);
    });
  }, []);

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      axios
        .delete(apiUrl + "/products/" + id, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          console.log(response);
          setProducts((prevState) =>
            prevState.filter((item) => item.id !== id)
          );
        });
    }
  };

  return (
    <div className="cart-container">
      <h1 className="cart-title">All Products</h1>
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
                  <button
                    className="cart-button remove"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                  <button className="cart-button delete"
                    onClick={() => navigate(`/admin/products/${product.id}`)}
                  >Edit</button>
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
