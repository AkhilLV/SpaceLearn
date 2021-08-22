import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header>
      <h2>Space Learn</h2>
      <ul>
        <li>
          <Link to="/">Home</Link></li>
        <li>
          <Link to="/login">Login</Link></li>
      </ul>
    </header >
  )
}

export default Header