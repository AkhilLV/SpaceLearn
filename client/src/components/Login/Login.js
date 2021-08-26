import { useState } from "react"
import { useHistory } from "react-router-dom"
import axios from "axios"

import './Login.css'

const Login = () => {
  const [usernameInput, setUsernameInput] = useState("")
  const [passwordInput, setPasswordInput] = useState("")
  const history = useHistory()

  const [login, setLogin] = useState(true)

  const handleSubmit = (e) => {
    e.preventDefault()

    const route = login ? "login" : "register"

    axios({
      method: "POST",
      data: {
        username: usernameInput,
        password: passwordInput
      },
      url: `http://localhost:4000/${route}`,
      withCredentials: true,
    }).then(res => {
      console.log(res.data.message)
      if (res.data === "Logged in") {
        history.push("/tasks")
      }
    })
  }

  return (
    <div className="login-form">
      <form>

        <h2>{login ? "Login" : "Register"}</h2>

        <label>Username:</label>
        <input onChange={(e) => setUsernameInput(e.target.value)} value={usernameInput} type="text" placeholder="Ex: John Doe" />

        <label>Password:</label>
        <input onChange={(e) => setPasswordInput(e.target.value)} value={passwordInput} type="text" placeholder="Ex: 12345" />

        <button onClick={handleSubmit}>{login ? "Login" : "Register"}</button>

        <a href="#" onClick={() => setLogin(!login)}>{login ? "Sign up instead" : "Log in instead"}</a>

      </form>


    </div>
  )
}

export default Login