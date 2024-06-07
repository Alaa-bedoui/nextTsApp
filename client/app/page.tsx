"use client";
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {

  return (
    <main className={styles.main}>
      <div className="main">
        <input type="checkbox" id="chk" aria-hidden="true" />
        <div className="login">
          <form className="form">
            <label htmlFor="chk" aria-hidden="true" className={styles.myLabel}>
              Log in
            </label>

            <input
              className="input"
              type="email"
              name="email"
              placeholder="Email"
              required={true}
            />
            <input
              className="input"
              type="password"
              name="pswd"
              placeholder="Password"
              required={true}
            />
            <button type="submit">Log in</button>
          </form>
          <p className={styles.switchForm}>
            Don't have an account?{" "}
            <label htmlFor="chk" className={styles.switchLabel}>
              Register
            </label>
          </p>
        </div>
        <div className="register">
          <form className="form" id="registerForm">
            <label htmlFor="chk" aria-hidden="true">
              Register
            </label>
            <input
              className="input"
              type="text"
              name="txt"
              placeholder="Username"
              required
            />
            <input
              className="input"
              type="email"
              name="email"
              placeholder="Email"
              required
            />
            <input
              className="input"
              type="password"
              name="pswd"
              placeholder="Password"
              required
            />
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </main>
  );
}
