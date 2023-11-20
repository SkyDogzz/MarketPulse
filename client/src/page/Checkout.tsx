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
    <div className="checkout-container">
      <h1 className="checkout-title">Checkout</h1>
      <p className="checkout-total">Total Price: {price}</p>

      <form className="checkout-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Card Number:</label>
          <input
            type="text"
            name="cardNumber"
            className="form-control"
            value={paymentDetails.cardNumber}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Card Holder:</label>
          <input
            type="text"
            name="cardHolder"
            className="form-control"
            value={paymentDetails.cardHolder}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Expiration Date:</label>
          <input
            type="text"
            name="expirationDate"
            className="form-control"
            value={paymentDetails.expirationDate}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>CVV:</label>
          <input
            type="text"
            name="cvv"
            className="form-control"
            value={paymentDetails.cvv}
            onChange={handleInputChange}
          />
        </div>

        <button className="submit-button" type="submit">
          Submit Payment
        </button>
      </form>
    </div>
  );
}
