import { Link } from "react-router-dom";
import useAuthStore from "../stores/authStore";

export default function Header() {
  const clearToken = useAuthStore((state) => state.clearToken);
  const handleLogout = () => {
    clearToken();
  };

  return (
    <div>
      <h1>My App</h1>
      <nav>
        <ul>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/checkout">Checkout</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/admin/products">Admin Products</Link>
          <Link to="/admin/orders">Admin Orders</Link>

          <button onClick={handleLogout}>Logout</button>
        </ul>
      </nav>
    </div>
  );
}
