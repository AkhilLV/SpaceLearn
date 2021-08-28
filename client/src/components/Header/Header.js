import { Link } from 'react-router-dom'

import './Header.css'
import logo from '../../assets/logo.svg'

const Header = () => {
  return (
    <header>
      <nav>
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
        <Link to="/login" className="link">
          <a>Login</a>
        </Link>
      </nav>
    </header >
  )
}

export default Header