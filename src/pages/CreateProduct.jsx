
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "../css/CreateProduct.module.css";
import apiClient from "../axiosClient";

const CreateProduct = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const productData = {
        ...formData,
        price: Number(formData.price),
      };

      await apiClient.createProduct(productData);

      alert("Product created successfully!");

      navigate("/");
    } catch (error) {
      console.error("Error creating product:", error);
      setError(
        error.response?.data?.message || "Failed to create product."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style.createProduct}>
      <div className={style.formContainer}>
        <h1>Create New Product</h1>

        <p className={style.subtitle}>
          Add a new product to your boutique collection.
        </p>

        <form onSubmit={handleSubmit}>
          <div className={style.formGroup}>
            <label>Product Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter product name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className={style.formGroup}>
            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select category</option>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="children">Children</option>
            </select>
          </div>

          <div className={style.formGroup}>
            <label>Price</label>
            <input
              type="number"
              name="price"
              placeholder="Enter product price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              required
            />
          </div>

          <div className={style.formGroup}>
            <label>Image URL</label>
            <input
              type="url"
              name="image"
              placeholder="Enter product image URL"
              value={formData.image}
              onChange={handleChange}
              required
            />
          </div>

          {error && (
            <p className={style.errorMessage}>{error}</p>
          )}

          <button
            type="submit"
            className={style.createButton}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
