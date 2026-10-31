import { useState } from "react";
import { Link } from "react-router-dom";
import style from "./Checkout.module.css";

const readCart = () => {
  try {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    return Array.isArray(cart) ? cart : [];
  } catch {
    return [];
  }
};

const Checkout = () => {
  const [cart, setCart] = useState(readCart);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0,
  );

  const placeOrder = (event) => {
    event.preventDefault();
    localStorage.setItem("cart", JSON.stringify([]));
    window.dispatchEvent(new Event("cart-updated"));
    setCart([]);
    setOrderPlaced(true);
  };

  return (
    <main className={style.checkoutContainer}>
      <h1>Checkout</h1>

      {orderPlaced ? (
        <section className={style.orderSuccess} role="status">
          <h2>Order placed successfully!</h2>
          <p>Thank you for shopping with Chic Boutique.</p>
          <p>Your order has been received and will be processed soon.</p>
          <Link className={style.continueLink} to="/">
            Continue shopping
          </Link>
        </section>
      ) : cart.length === 0 ? (
        <p className={style.emptyCart}>
          Your cart is empty. <Link to="/">Continue shopping</Link>
        </p>
      ) : (
        <div className={style.checkoutWrapper}>
          <section className={style.checkoutFormSection}>
            <h2>Delivery Information</h2>
            <form onSubmit={placeOrder}>
              <div className={style.formGroup}>
                <label htmlFor="name">Full Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                />
              </div>

              <div className={style.formGroup}>
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                />
              </div>

              <div className={style.formGroup}>
                <label htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                />
              </div>

              <div className={style.formGroup}>
                <label htmlFor="address">Delivery Address</label>
                <textarea
                  id="address"
                  name="address"
                  autoComplete="street-address"
                  required
                />
              </div>

              <div className={style.formGroup}>
                <label htmlFor="payment">Payment Method</label>
                <select id="payment" name="payment" required defaultValue="">
                  <option value="" disabled>
                    Select payment method
                  </option>
                  <option value="cash">Cash on Delivery</option>
                  <option value="transfer">Bank Transfer</option>
                </select>
              </div>

              <button className={style.placeOrderBtn} type="submit">
                Place Order
              </button>
            </form>
          </section>

          <section className={style.orderSummary}>
            <h2>Order Summary</h2>
            <div className={style.checkoutItems}>
              {cart.map((item) => (
                <article className={style.checkoutItem} key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <div className={style.checkoutItemInfo}>
                    <h3>{item.name}</h3>
                    <p>
                      ${Number(item.price).toFixed(2)} × {item.quantity}
                    </p>
                  </div>
                  <strong>
                    ${(Number(item.price) * Number(item.quantity)).toFixed(2)}
                  </strong>
                </article>
              ))}
            </div>
            <div className={style.summaryTotal}>
              <strong>Total:</strong>
              <span>${total.toFixed(2)}</span>
            </div>
          </section>
        </div>
      )}
    </main>
  );
};

export default Checkout;
