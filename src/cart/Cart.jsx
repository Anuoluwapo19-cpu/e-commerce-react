import { useState } from "react";
import { Link } from "react-router-dom";
import style from "./Cart.module.css";

const readCart = () => {
  try {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    return Array.isArray(cart) ? cart : [];
  } catch {
    return [];
  }
};

const Cart = () => {
  const [cart, setCart] = useState(readCart);
  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0,
  );

  const updateCart = (nextCart) => {
    setCart(nextCart);
    localStorage.setItem("cart", JSON.stringify(nextCart));
    window.dispatchEvent(new Event("cart-updated"));
  };

  const changeQuantity = (productId, change) => {
    const nextCart = cart
      .map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + change }
          : item,
      )
      .filter((item) => item.quantity > 0);

    updateCart(nextCart);
  };

  return (
    <main className={style.cartContainer}>
      <h1>Your Shopping Cart</h1>

      {cart.length === 0 ? (
        <p className={style.emptyCartMessage}>
          Your cart is empty. <Link to="/">Continue shopping</Link>
        </p>
      ) : (
        <>
          <div className={style.cartItems}>
            {cart.map((item) => (
              <article className={style.cartItem} key={item.id}>
                <img src={item.image} alt={item.name} />
                <div className={style.cartItemInfo}>
                  <h2>{item.name}</h2>
                  <p>${Number(item.price).toFixed(2)} each</p>
                </div>
                <div className={style.quantityControls}>
                  <button
                    type="button"
                    aria-label={`Remove one ${item.name}`}
                    onClick={() => changeQuantity(item.id, -1)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    type="button"
                    aria-label={`Add one ${item.name}`}
                    onClick={() => changeQuantity(item.id, 1)}
                  >
                    +
                  </button>
                </div>
                <strong className={style.cartItemSubtotal}>
                  ${(Number(item.price) * Number(item.quantity)).toFixed(2)}
                </strong>
                <button
                  className={style.removeButton}
                  type="button"
                  onClick={() =>
                    updateCart(
                      cart.filter((cartItem) => cartItem.id !== item.id),
                    )
                  }
                >
                  Remove
                </button>
              </article>
            ))}
          </div>

          <div className={style.cartSummary}>
            <h2>Total: ${total.toFixed(2)}</h2>
            <Link className={style.continueLink} to="/">
              Continue shopping
            </Link>
            <Link className={style.checkoutLink} to="/checkout">
              Proceed to checkout
            </Link>
          </div>
        </>
      )}
    </main>
  );
};

export default Cart;
