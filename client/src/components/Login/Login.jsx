import "./Login.css";

import { useHistory } from "react-router-dom";
import { useState } from "react";

import { login, register } from "../../api";

function Login({ setIsLoggedIn, setShowModal }) {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [action, setAction] = useState("login");

  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) return setShowModal([true, "Fill all fields"]);

    setIsLoading(true);

    try {
      if (action === "login") {
        const res = await login({ username, password });

        if (res.data.message === "user_logged_in") {
          setIsLoggedIn(true);
          history.push("/dashboard");
        }

        // eslint-disable-next-line consistent-return
        return;
      }

      const res = await register({ username, password });
      setShowModal([true, res.data.message]);
    } catch (err) {
      setShowModal([true, err.response.data.message]);
    }

    setIsLoading(false);
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
        <input onChange={(e) => setusername(e.target.value)} value={username} type="text" placeholder="Ex: John Doe" />

        <label>Password:</label>
        <input onChange={(e) => setpassword(e.target.value)} value={password} type="password" placeholder="Ex: 12345" />

        <button type="submit">{isLoading ? <div className="loader" /> : action}</button>

        <a href="#" type="button" onClick={changeChoice}>{action === "login" ? "Sign up instead" : "Sign in instead"}</a>
      </form>
      <div className="image" />
    </div>
  );
}

export default Login;
