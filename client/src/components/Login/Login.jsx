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
      switch (res.data.message) {
        case ("Logged in"):
          setIsLoggedIn(true);
          history.push("/dashboard");
          break;
        case ("No user"):
          alert("User does not exist");
          break;
        case ("Exists"):
          alert("User Exists");
          break;
        case ("Added"):
          alert("User added");
          break;
        default:
          console.log("Login failed");
      }
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
      <form>

        <h2>{action === "login" ? "Login" : "Register"}</h2>

        <label>Username:</label>
        <input onChange={(e) => setUsernameInput(e.target.value)} value={usernameInput} type="text" placeholder="Ex: John Doe" />

        <label>Password:</label>
        <input onChange={(e) => setPasswordInput(e.target.value)} value={passwordInput} type="text" placeholder="Ex: 12345" />

        <button type="button" onClick={handleSubmit}>{isLoading ? <div className="loader" /> : action}</button>

        <button type="button" onClick={changeChoice}>{action === "login" ? "Sign up instead" : "Sign in instead"}</button>

      </form>

      <div className="image" />
    </div>
  );
}

export default Login;
