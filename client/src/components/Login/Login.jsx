import "./Login.css";

import { useHistory } from "react-router-dom";
import { useState } from "react";

import { login, register } from "../../api";

function Login({ setIsLoggedIn, setShowModal }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [action, setAction] = useState("login");

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) return setShowModal([true, "Fill all fields"]);

    setIsLoading(true);

    async function loginUser() {
      await login({ username, password });
      setIsLoggedIn(true);
      history.push("/dashboard");
    }

    try {
      if (action === "login") {
        await loginUser();
        // eslint-disable-next-line consistent-return
        return;
      }

      await register({ username, password });
      setShowModal([true, "User registered"]);

      await loginUser();
    } catch (err) {
      console.log(err);
      if (err.response.data.message === "user_exists") {
        setShowModal([true, "User exists"]);
      } else if (err.response.data.message === "user_not_found") {
        setShowModal([true, "User not found"]);
      }
      setIsLoading(false);
    }
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
        <input onChange={(e) => setUsername(e.target.value)} value={username} type="text" placeholder="Ex: John Doe" />

        <label>Password:</label>
        <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Ex: 12345" />

        <button type="submit">{isLoading ? <div className="loader" /> : action}</button>

        <a href="#" type="button" onClick={changeChoice}>{action === "login" ? "Sign up instead" : "Sign in instead"}</a>
      </form>
      <div className="image" loading="lazy" />
    </div>
  );
}

export default Login;
