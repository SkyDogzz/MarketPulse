import useAuthStore from "../stores/authStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Cart as CartTypes } from "../types";

export default function Cart() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    const apiUrl = import.meta.env.VITE_API_URL;
    axios
      .get(apiUrl + "/carts/" + user?.id)
      .then((response) => {
        setCart(response.data.carts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>Cart</h1>
      {cart &&
        cart.map((item: CartTypes) => {
          return (
            <div key={item.id}>
              <h3>{item.userId}</h3>
              <h3>{item.productId}</h3>
            </div>
          );
        })}
    </div>
  );
}
