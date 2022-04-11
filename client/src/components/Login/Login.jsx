import "./Login.css";

import { useHistory } from "react-router-dom";
import { useState } from "react";

import axios from "axios";
import baseUrl from "../../url/baseUrl";

function Login({ setIsLoggedIn }) {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [action, setAction] = useState("login");

  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!usernameInput || !passwordInput) return alert("Invalid input");

    setIsLoading(true);

    axios({
      method: "POST",
      data: {
        username: usernameInput,
        password: passwordInput,
      },
      url: `${baseUrl}/auth/${action}`,
      withCredentials: true,
    }).then((res) => {
      setIsLoading(false);
      if (res.data.message === "user_logged_in") {
        setIsLoggedIn(true);
        history.push("/dashboard");
      }
    }).catch((error) => {
      setIsLoading(false);
      console.log(error.response.data.message);
      alert(error.response.data.message);
    });
  };

  const changeChoice = () => {
    if (action === "login") {
      setAction("register");
    } else {
      setAction("login");
    }
  };

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <h2>{action === "login" ? "Login" : "Register"}</h2>

        <label>Username:</label>
        <input onChange={(e) => setUsernameInput(e.target.value)} value={usernameInput} type="text" placeholder="Ex: John Doe" />

        <label>Password:</label>
        <input onChange={(e) => setPasswordInput(e.target.value)} value={passwordInput} type="password" placeholder="Ex: 12345" />

        <button type="submit">{isLoading ? <div className="loader" /> : action}</button>

        <a href="#" type="button" onClick={changeChoice}>{action === "login" ? "Sign up instead" : "Sign in instead"}</a>
      </form>
      <div className="image" />
    </div>
  );
}

export default Login;
