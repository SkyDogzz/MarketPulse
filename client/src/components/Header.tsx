import { Link } from "react-router-dom";

export default function Header() {
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
        </ul>
      </nav>
    </div>
  );
}
