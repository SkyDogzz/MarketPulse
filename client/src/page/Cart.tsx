import useAuthStore from "../stores/authStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Cart as CartTypes } from "../types";

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

  return (
    <div>
      <h1>Cart</h1>
      {cart &&
        cart.map((item: CartTypes) => {
          return (
            <div key={item.id}>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <p>{item.quantity}</p>
            </div>
          );
        })}
    </div>
  );
}
