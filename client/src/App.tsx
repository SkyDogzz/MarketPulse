import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./page/Home";
import ProductList from "./page/ProductList";
import ProductDetail from "./page/ProductDetail";
import Login from "./page/Login";
import Register from "./page/Register";
import Cart from "./page/Cart";
import Checkout from "./page/Checkout";
import UserProfile from "./page/UserProfile";
import AdminProducts from "./page/AdminProducts";
import AdminProductsEdit from "./page/AdminProductsEdit";
import NotFound from "./page/NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./style/app.scss";

export default function App() {
  return (
    <div className="app-container">
      <Router>
        <Header />
        <div className="content-wrap">
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
            <Route path="/admin/products/:id" element={<AdminProductsEdit />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

function AdminOrders() {
  return <div>AdminOrders</div>;
}
