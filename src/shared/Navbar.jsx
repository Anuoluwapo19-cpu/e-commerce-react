import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "./Navbar.module.css";

const getCart = () => {
  try {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  } catch {
    return [];
  }
};

const getLoginUser = () => {
  try {
    return JSON.parse(localStorage.getItem("loginUser") || "null");
  } catch {
    return null;
  }
};

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null);

  const refreshNavbar = () => {
    const cart = getCart();
    const totalItem = cart.reduce(
      (sum, item) => sum + (Number(item.quantity) || 0),
      0,
    );

    setCartCount(totalItem);
    setUser(getLoginUser());
  };

  useEffect(() => {
    refreshNavbar();
    window.addEventListener("cart-updated", refreshNavbar);
    window.addEventListener("auth-updated", refreshNavbar);
    return () => {
      window.removeEventListener("cart-updated", refreshNavbar);
      window.removeEventListener("auth-updated", refreshNavbar);
    };
  }, []);

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("loginUser");
    setUser(null);
    window.dispatchEvent(new Event("auth-updated"));
  };

  return (
    <header className={style.siteHeader}>
      <div className={style.container}>
        <Link to="/" className={style.logo}>
          Chic<span>Boutique</span>
        </Link>

        <nav className={style.mainNav}>
          <Link to="/">Home</Link>
          <Link to="/create-product">Create Product</Link>

          <Link to="/cart">
            Cart (<span>{cartCount}</span>)
          </Link>

          <span>
            {user ? (
              <>
                Hi, {user.name} |{" "}
                <a href="/" onClick={handleLogout}>
                  Logout
                </a>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link> &nbsp;|&nbsp;
                <Link to="/signup">Sign Up</Link>
              </>
            )}
          </span>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
