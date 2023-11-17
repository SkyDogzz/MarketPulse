import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import About from "./page/About";
import Home from "./page/Home";
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
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}
