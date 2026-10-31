import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import style from "../css/auth.module.css";

const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email").trim();
    const password = formData.get("password");

    let users;

    try {
      users = JSON.parse(localStorage.getItem("chicBoutiqueUsers") || "[]");
    } catch {
      setError("Unable to read saved accounts. Please try again.");
      return;
    }

    if (!Array.isArray(users)) {
      setError("Unable to read saved accounts. Please try again.");
      return;
    }

   const savedUser = users.find(
  (user) =>
    typeof user.email === "string" &&
    user.email.toLowerCase() === email.toLowerCase()
);

    if (!savedUser) {
      setError("No account found with this email.");
      return;
    }

    if (password !== savedUser.password) {
      setError("Incorrect password. Please try again.");
      return;
    }

    localStorage.setItem("loginUser", JSON.stringify(savedUser));
    window.dispatchEvent(new Event("auth-updated"));
    navigate("/");
  };

  return (
    <main className={`${style.container} ${style.authContainer}`}>
      <div className={style.authBox}>
        <h2>Login</h2>

        <form id="loginForm" onSubmit={handleSubmit}>
          <label htmlFor="loginEmail">Email</label>
          <input type="email" id="loginEmail" name="email" required />

          <label htmlFor="loginPassword">Password</label>
          <input type="password" id="loginPassword" name="password" required />

          <p className={style.errorMessage} id="loginError" role="alert">
            {error}
          </p>

          <button type="submit" className={style.btn}>
            Login
          </button>
        </form>

        <p className={style.authSwitch}>
          Don&apos;t have an account? <Link to="/signup">Sign up here</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
