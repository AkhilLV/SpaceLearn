import { Link } from 'react-router-dom'

import './Header.css'

const Header = () => {
  return (
    <header>
      <h2>Space Learn</h2>
      <ul>
        <li>
          <Link to="/">Home</Link></li>
        <li className="cta">
          <Link to="/login">Login</Link></li>
      </ul>
    </header >
  )
}

export default Header