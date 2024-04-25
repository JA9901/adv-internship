import React, { useRef, useState } from "react";
import "./LoginModal.css";
import { FaTimes } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { BsPersonFill } from "react-icons/bs";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInAnonymously,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

function LoginModal({ toggleModal }) {
  const auth = getAuth();

  const [loginOrRegister, setLoginAndRegister] = useState("login");
  const [error, setError] = useState("");
  const provider = new GoogleAuthProvider();

  function toggleLoginAndRegister() {
    if (loginOrRegister === "login") {
      setLoginAndRegister("register");
      setError("");
    } else {
      setLoginAndRegister("login");
      setError("");
    }
  }

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  function register(event, emailRef, passwordRef) {
    event.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        toggleModal();
        // ...
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
        // ..
      });
  }

  function login(event, emailRef, passwordRef) {
    event.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        toggleModal();
        // ...
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
      });
  }

  function guestLogin() {
    signInAnonymously(auth)
      .then(() => {
        // Signed in..
        toggleModal();
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
        // ...
      });
  }

  function googleLogin() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        console.log(user);
        toggleModal();
      })
      .catch((error) => {
        // Handle Errors here.
        // const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        // const email = error.customData.email;
        // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        setError(errorMessage);
      });
  }

  return (
    <div className="auth__wrapper">
      <div className="auth">
        <div className="auth__content">
          <div className="auth__title">
            {loginOrRegister === "login"
              ? "Log in to Summarist"
              : "Sign up for Summarist"}
          </div>
          <div className="auth__error">{error !== "" && error}</div>
          {loginOrRegister === "login" && (
            <>
              <button className="btn guest__btn--wrapper" onClick={guestLogin}>
                <figure className="guest__icon--mask">
                  <BsPersonFill />
                </figure>
                Login as a Guest
              </button>
              <div className="auth__separator">
                <span className="auth__separator--text">or</span>
              </div>
            </>
          )}
          <button className="btn google__btn--wrapper" onClick={googleLogin}>
            <figure className="google__icon--mask">
              <FcGoogle />
            </figure>
            {loginOrRegister === "login"
              ? "Login with Google"
              : "Sign up with Google"}
          </button>
          <div className="auth__separator">
            <span className="auth__separator--text">or</span>
          </div>
          <form
            className="auth__main--form"
            onSubmit={(event) =>
              loginOrRegister === "login"
                ? login(event, emailRef, passwordRef)
                : register(event, emailRef, passwordRef)
            }
          >
            <input
              type="email"
              placeholder="Email Address"
              className="auth__main--input"
              ref={emailRef}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="auth__main--input"
              ref={passwordRef}
              required
            />
            <button type="submit" className="btn">
              {loginOrRegister === "login" ? "Login" : "Sign up"}
            </button>
          </form>
        </div>
        {loginOrRegister === "login" && (
          <div className="auth__forgot--password">Forgot your password?</div>
        )}
        <button className="auth__switch--btn" onClick={toggleLoginAndRegister}>
          {loginOrRegister === "login"
            ? "Don't have an account?"
            : "Already have an account?"}
        </button>
        <div className="auth__close--btn" onClick={toggleModal}>
          <FaTimes />
        </div>
      </div>
    </div>
  );
}

export default LoginModal;