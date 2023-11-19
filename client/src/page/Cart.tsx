import useAuthStore from "../stores/authStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Cart as CartTypes } from "../types";
import { Link } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  const [cart, setCart] = useState<CartTypes[]>([]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const apiUrl = import.meta.env.VITE_API_URL;
    axios
      .get(apiUrl + "/carts/" + user.id)
      .then(async (response) => {
        const cartItems = response.data.carts;
        const productRequests = cartItems.map((item: CartTypes) =>
          axios.get(apiUrl + "/products/" + item.productId)
        );
        const productResponses = await Promise.all(productRequests);
        const newCartItems = productResponses.map((res, index) => ({
          ...res.data.product,
          quantity: cartItems[index].quantity,
        }));
        setCart(newCartItems);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("Remove", e.target);
  };

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("Add", e.target);
  }

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("Remove", e.target);
  }

  return (
    <div>
      <h1>Cart</h1>
      {cart && cart.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Actions</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item: CartTypes) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>{item.quantity}</td>
                <td>
                  <button onClick={handleAdd}>+</button>
                  <button onClick={handleRemove}>-</button>
                  <button onClick={handleDelete}>Delete</button>
                </td>
                <td>{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Your cart is empty.</p>
      )}
      <Link to="/checkout" state={{ cart: cart }}>Checkout</Link>
    </div>
  );
}
