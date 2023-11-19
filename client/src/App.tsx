import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./page/Home";
import ProductList from "./page/ProductList";
import ProductDetail from "./page/ProductDetail";
import Login from "./page/Login";
import Register from "./page/Register";
import Cart from "./page/Cart";
import UserProfile from "./page/UserProfile";
import AdminProducts from "./page/AdminProducts";
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

function Checkout() {
  return <div>Checkout</div>;
}

function AdminOrders() {
  return <div>AdminOrders</div>;
}
