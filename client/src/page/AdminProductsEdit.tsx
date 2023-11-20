import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Product } from "../types";

export default function AdminProductsEdit() {
  const apiURL = import.meta.env.VITE_API_URL;
  const id = useParams().id;
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    axios.get(`${apiURL}/products/` + id).then((res) => {
      setProduct(res.data.product as Product);
    });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct!,
      id: prevProduct?.id ?? 0,
      [name]: value,
    }));
  };

  return (
    <div className="admin-products-edit">
      {product !== null ? (
        <form>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              className="form-control"
              value={product.title}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              className="form-control"
              value={product.description}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              id="price"
              className="form-control"
              value={product.price}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="imageUrl">Image URL</label>
            <input
              type="text"
              name="imageUrl"
              id="imageUrl"
              className="form-control"
              value={product.imageUrl}
              onChange={handleChange}
            />
          </div>
          <button className="btn btn-primary">Update</button>
        </form>
      ) : (
        <p className="product-detail-info">No products available</p>
      )}
    </div>
  );
}
