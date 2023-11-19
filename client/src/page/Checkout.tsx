import { useNavigate } from "react-router-dom";
import useAuthStore from "../stores/authStore";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Checkout() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const location = useLocation();
  const [price, setPrice] = useState(0);
  
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    cardHolder: "",
    expirationDate: "",
    cvv: "",
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (location.state) {
      const cart = location.state.cart;
      const totalPrice = cart.reduce((acc: number, item: any) => {
        return acc + item.price * item.quantity;
      }, 0);
      setPrice(totalPrice);
    }
  }, []);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Payment details:", paymentDetails);
  };

  return (
    <div>
      <h1>Checkout</h1>
      <p>Total Price: {price}</p>

      <form onSubmit={handleSubmit}>
        <label>
          Card Number:
          <input
            type="text"
            name="cardNumber"
            value={paymentDetails.cardNumber}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Card Holder:
          <input
            type="text"
            name="cardHolder"
            value={paymentDetails.cardHolder}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Expiration Date:
          <input
            type="text"
            name="expirationDate"
            value={paymentDetails.expirationDate}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          CVV:
          <input
            type="text"
            name="cvv"
            value={paymentDetails.cvv}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="submit">Submit Payment</button>
      </form>
    </div>
  );
}
