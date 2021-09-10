import { Link } from 'react-router-dom'

import './Header.css'
import logo from '../../assets/logo.svg'

const Header = (props) => {
  let value = "center"
  if (props.route === "home") { value = "space-between" }

  const navStyle = {
    "justify-content": value
  }

  return (
    <header>
      <nav style={navStyle}>
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
        {
          props.route === "home"
            ?
            <Link to="/login" className="link">
              <a>Login</a>
            </Link>
            : null
        }
      </nav>
    </header >
  )
}

export default Header

// Things to do
// 1. Sort out header design -> Done
// 2. Design the database: Next time, do this first -> Done
// 2. CRUD a card -> ADD, ...
// 3. CRUD a task -> NOW
// 4. Generate spaced learning cards
