import "./Login.css";

import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

import { login, register } from "../../api";
import UserContext from "../../contexts/UserContext";
import ModalContext from "../../contexts/ModalContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [action, setAction] = useState("login");

  const { setIsLoggedIn } = useContext(UserContext);
  const { setShowInfoModal } = useContext(ModalContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim() || !password) return setShowInfoModal([true, "Fill all fields"]);

    setIsLoading(true);

    async function loginUser() {
      await login({ username, password });
      setIsLoggedIn(true);
      navigate("/dashboard");
    }

    try {
      if (action === "login") {
        await loginUser();
        // eslint-disable-next-line consistent-return
        return;
      }

      await register({ username, password });
      setShowInfoModal([true, "User registered"]);

      await loginUser();
    } catch (err) {
      console.log(err);
      if (err.response.data.message === "user_exists") {
        setShowInfoModal([true, "User exists"]);
      } else if (err.response.data.message === "user_not_found") {
        setShowInfoModal([true, "User not found"]);
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
        <h1>{action === "login" ? "Login" : "Register"}</h1>
        <a href="#" type="button" onClick={changeChoice}>{action === "login" ? "Sign up instead" : "Sign in instead"}</a>
        <label>Username:</label>
        <input className="input" onChange={(e) => setUsername(e.target.value)} value={username} type="text" placeholder="Ex: John Doe" />

        <label>Password:</label>
        <input className="input" onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Ex: 12345" />

        <button className="btn" type="submit">{isLoading ? <div className="loader" /> : action}</button>
      </form>
    </div>
  );
}

export default Login;
