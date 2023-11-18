import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./page/Home";
import ProductList from "./page/ProductList";
import ProductDetail from "./page/ProductDetail";
import Login from "./page/Login";
import NotFound from "./page/NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {

  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

function Cart() {
  return <div>Cart</div>;
}

function Checkout() {
  return <div>Checkout</div>;
}

function Register() {
  return <div>Register</div>;
}

function UserProfile() {
  return <div>UserProfile</div>;
}

function AdminProducts() {
  return <div>AdminProducts</div>;
}

function AdminOrders() {
  return <div>AdminOrders</div>;
}
