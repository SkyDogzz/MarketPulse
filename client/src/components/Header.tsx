import { Link } from "react-router-dom";
import useAuthStore from "../stores/authStore";

export default function Header() {
  const token = useAuthStore((state) => state.token);
  const isAdmin = useAuthStore((state) => state.user?.isAdmin);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const handleLogout = () => {
    clearAuth();
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
          {!token && <Link to="/login">Login</Link>}
          {!token && <Link to="/register">Register</Link>}
          {token && <Link to="/profile">Profile</Link>}
          {token && isAdmin && <Link to="/admin/products">Admin Products</Link>}
          {token && isAdmin && <Link to="/admin/orders">Admin Orders</Link>}
          {token && <button onClick={handleLogout}>Logout</button>}
        </ul>
      </nav>
    </div>
  );
}
