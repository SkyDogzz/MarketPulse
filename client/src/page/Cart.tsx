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

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    axios
      .get(apiUrl + "/carts/" + user.id)
      .then(async (response) => {
        const cartItems = response.data.carts;
        console.log(cartItems);
        const productRequests = cartItems.map((item: CartTypes) =>
          axios.get(apiUrl + "/products/" + item.productId)
        );
        const productResponses = await Promise.all(productRequests);
        console.log(productResponses);
        const newCartItems = productResponses.map((res, index) => ({
          ...res.data.product,
          id: cartItems[index].id,
          quantity: cartItems[index].quantity,
        }));
        console.log(newCartItems);
        setCart(newCartItems);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    axios.delete(apiUrl + "/carts/" + id).then((response) => {
      console.log(response);
      setCart((prevState) => prevState.filter((item) => item.id !== id));
    });
  };

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    console.log("Add", e.target, id);
    axios.put(apiUrl + "/carts/add/" + id, { quantity: 1 }).then((response) => {
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

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    axios
      .put(apiUrl + "/carts/remove/" + id, { quantity: 1 })
      .then((response) => {
        console.log(response);
        setCart((prevState) => {
          const newCart = prevState.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                quantity: item.quantity - 1,
              };
            }
            return item;
          });
          return newCart;
        });
      });
  };

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
                  <button onClick={(event) => handleAdd(event, item.id)}>
                    +
                  </button>
                  <button onClick={(event) => handleRemove(event, item.id)}>
                    Remove
                  </button>
                  <button onClick={(event) => handleDelete(event, item.id)}>
                    Delete
                  </button>
                </td>
                <td>{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Your cart is empty.</p>
      )}
      <Link to="/checkout" state={{ cart: cart }}>
        Checkout
      </Link>
    </div>
  );
}
