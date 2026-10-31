import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import style from "../css/auth.module.css";

const Signup = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");
    const confirmPassword = String(formData.get("confirmPassword") || "");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const users = JSON.parse(
        localStorage.getItem("chicBoutiqueUsers") || "[]",
      );

      if (!Array.isArray(users)) {
        setError("Unable to read saved accounts. Please try again.");
        return;
      }

      const emailAlreadyExists = users.some(
        (user) => user.email?.toLowerCase() === email.toLowerCase(),
      );

      if (emailAlreadyExists) {
        setError("An account with this email already exists.");
        return;
      }

      users.push({ name, email, password });
      localStorage.setItem("chicBoutiqueUsers", JSON.stringify(users));
      navigate("/login");
    } catch {
      setError("Unable to save your account. Please try again.");
    }
  };

  return (
    <main className={`${style.container} ${style.authContainer}`}>
      <div className={style.authBox}>
        <h2>Sign Up</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="signupName">Name</label>
          <input
            type="text"
            id="signupName"
            name="name"
            autoComplete="name"
            required
          />

          <label htmlFor="signupEmail">Email</label>
          <input
            type="email"
            id="signupEmail"
            name="email"
            autoComplete="email"
            required
          />

          <label htmlFor="signupPassword">Password</label>
          <input
            type="password"
            id="signupPassword"
            name="password"
            autoComplete="new-password"
            minLength={6}
            required
          />

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            autoComplete="new-password"
            required
          />

          <p className={style.errorMessage} role="alert">
            {error}
          </p>

          <button type="submit" className={style.btn}>
            Sign Up
          </button>
        </form>

        <p className={style.authSwitch}>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </main>
  );
};

export default Signup;
