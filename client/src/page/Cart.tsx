import useAuthStore from "../stores/authStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Cart as CartTypes } from "../types";
import { Link } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);

  const [cart, setCart] = useState<CartTypes[]>([]);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    axios
      .get(apiUrl + "/carts/" + user.id, {
        headers: {
          Authorization: token,
        },
      })
      .then(async (response) => {
        const cartItems = response.data.carts;
        const productRequests = cartItems.map((item: CartTypes) =>
          axios.get(apiUrl + "/products/" + item.productId)
        );
        const productResponses = await Promise.all(productRequests);
        const newCartItems = productResponses.map((res, index) => ({
          ...res.data.product,
          id: cartItems[index].id,
          quantity: cartItems[index].quantity,
        }));
        setCart(newCartItems);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id: number) => {
    axios
      .delete(apiUrl + "/carts/" + id, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        console.log(response);
        setCart((prevState) => prevState.filter((item) => item.id !== id));
      });
  };

  const handleAdd = (id: number) => {
    axios
      .put(apiUrl + "/carts/add/" + id, {
        quantity: 1,
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        setCart((prevState) => {
          const newCart = prevState.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                quantity: item.quantity + 1,
              };
            }
            return item;
          });
          return newCart;
        });
      });
  };

  const handleRemove = (id: number) => {
    axios
      .put(apiUrl + "/carts/remove/" + id, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        setCart((prevState) => {
          return prevState.reduce((newCart: CartTypes[], item) => {
            if (item.id === id) {
              if (item.quantity > 1) {
                newCart.push({ ...item, quantity: item.quantity - 1 });
              }
            } else {
              newCart.push(item);
            }
            return newCart;
          }, []);
        });
      })
      .catch((error) => {
        console.error("Error removing item from cart:", error);
      });
  };

  return (
    <div className="cart-container">
      <h1 className="cart-title">Cart</h1>
      {cart && cart.length > 0 ? (
        <table className="cart-table">
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
                  <button
                    className="cart-button add"
                    onClick={() => handleAdd(item.id)}
                  >
                    Add one
                  </button>
                  <button
                    className="cart-button remove"
                    onClick={() => handleRemove(item.id)}
                  >
                    Remove one
                  </button>
                  <button
                    className="cart-button delete"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
                <td>${item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="cart-empty">Your cart is empty.</p>
      )}
      <Link className="cart-checkout" to="/checkout" state={{ cart: cart }}>
        Checkout
      </Link>
    </div>
  );
}
