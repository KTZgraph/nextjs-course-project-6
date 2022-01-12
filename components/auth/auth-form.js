import { useState, useRef } from "react";

import classes from "./auth-form.module.css";

// funckja rejestracji - można do innego pliku wrzucić
async function createUser(email, password) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json(); // też zwraca Promise
  if (!response.ok) {
    throw new Error(data.message || "Somethin wen wrong");
  }
}

function AuthForm() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(true);

  // przełączanie zaloguj / zarejestruj
  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // dodać walidacje na froncie, zeby user od razu coś widział, ale jej nie ufać bo po stronie klienta

    if (isLogin) {
      // tylko logowanie
    } else {
      // rejestracja
      try {
        const result = await createUser(enteredEmail, enteredPassword);
        // user was created  - notifkacja
        console.log(result);
      } catch (error) {
        // jakiś błąd przy rejestracji - notifkacja
        console.log(error);
      }
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
