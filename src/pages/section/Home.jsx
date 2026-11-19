import { useState, useEffect } from "react";
import style from "./Home.module.css";
import apiClient from "../../axiosClient";
// const products = [
//   {
//     id: 1,
//     name: "Classic Jacket",
//     category: "men",
//     price: 59.99,
//     image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600",
//   },
//   {
//     id: 2,
//     name: "Summer Dress",
//     category: "women",
//     price: 44.99,
//     image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600",
//   },
//   {
//     id: 3,
//     name: "Kids' Hoodie",
//     category: "children",
//     price: 29.99,
//     image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600",
//   },
//   {
//     id: 1,
//     name: "Classic Jacket",
//     category: "men",
//     price: 59.99,
//     image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600",
//   },
//   {
//     id: 2,
//     name: "Summer Dress",
//     category: "women",
//     price: 44.99,
//     image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600",
//   },
//   {
//     id: 3,
//     name: "Kids' Hoodie",
//     category: "children",
//     price: 29.99,
//     image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600",
//   },
// ];
const editProduct = await apiClient.updateProduct(
   "6afef914138197af6b87ed8c",
     {
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600"
     }
);
  const products = await apiClient.getProducts();
 console.log(products)
const categories = ["all", "men", "women", "children"];

function readCart() {
  try {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  } catch {
    return [];
  }
}

const Home = () => {
  const [category, setCategory] = useState("all");
  const [cart, setCart] = useState(readCart);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await apiClient.getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  const visibleProducts =
    category === "all"
      ? products
      : products.filter((product) => product.category === category);

  function addToCart(product) {
    const updatedCart = [...cart];
    const existingProduct = updatedCart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cart-updated"));
  }

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <section className={style.hero}>
        <div className={style.container}>
          <h1>Welcome to Chic Boutique</h1>
          <p>Stylish wear for men, women, and children</p>
        </div>
      </section>

      <main className={style.container}>
        <p className={style.cartCount}>Cart: {cartItemCount} items</p>

        <div
          className={style.filterBar}
          aria-label="Filter products by category"
        >
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              className={`${style.filterBtn} ${
                category === item ? style.active : ""
              }`}
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
            >
              {item === "all"
                ? "All"
                : item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>

        <div className={style.productGrid}>
          {visibleProducts.length > 0 ? (
            visibleProducts.map((product) => (
              <article className={style.productCard} key={product.id}>
                <img
                  className={style.productImage}
                  src={product.image}
                  alt={product.name}
                />
                <div className={style.productInfo}>
                  <h2>{product.name}</h2>
                  <p className={style.productCategory}>{product.category}</p>
                  <p className={style.productPrice}>
                    ${product.price.toFixed(2)}
                  </p>
                  <button
                    className={style.addToCartBtn}
                    type="button"
                    onClick={() => addToCart(product)}
                  >
                    Add to cart
                  </button>
                </div>
              </article>
            ))
          ) : (
            <p className={style.emptyMessage}>No products in this category.</p>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
