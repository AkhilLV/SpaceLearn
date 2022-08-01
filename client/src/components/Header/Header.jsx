import "./Header.css";

import { Link } from "react-router-dom";

function Header() {
  return (
    <header id="site-header" className="center">
      <Link to="/">
        <h3>space learn</h3>
      </Link>
    </header>
  );
}

export default Header;
