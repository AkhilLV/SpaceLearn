import "./Login.css";

import { useHistory } from "react-router-dom";
import { useState } from "react";

import axios from "axios";
import baseUrl from "../../url/baseUrl";

function Login(props) {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [currentChoice, setCurrentChoice] = useState("login");
  const [choices, setChoices] = useState({
    login: {
      title: "Login",
      text: "Sign up instead",
      route: "login",
    },
    register: {
      title: "Sign up",
      text: "Log in instead",
      route: "register",
    },
  });

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
      url: `${baseUrl}/auth/${choices[currentChoice].route}`,
      withCredentials: true,
    }).then((res) => {
      setIsLoading(false);
      switch (res.data.message) {
        case ("Logged in"):
          props.setIsLoggedIn(true);
          history.push("/tasks");
          break;
        case ("No user"):
          alert("User does not exist");
          break;
        case ("Exists"):
          alert("User Exists");
          break;
        case ("Added"):
          alert("User added");
      }
    });
  };

  const changeChoice = () => {
    if (currentChoice === "login") {
      setCurrentChoice("register");
    } else {
      setCurrentChoice("login");
    }
  };

  return (
    <div className="login-form">
      <form>

        <h2>{choices[currentChoice].title}</h2>

        <label>Username:</label>
        <input onChange={(e) => setUsernameInput(e.target.value)} value={usernameInput} type="text" placeholder="Ex: John Doe" />

        <label>Password:</label>
        <input onChange={(e) => setPasswordInput(e.target.value)} value={passwordInput} type="text" placeholder="Ex: 12345" />

        <button onClick={handleSubmit}>{isLoading ? <div className="loader" /> : choices[currentChoice].title}</button>

        <a href="#" onClick={changeChoice}>{choices[currentChoice].text}</a>

      </form>

      <div className="image" />
    </div>
  );
}

export default Login;
