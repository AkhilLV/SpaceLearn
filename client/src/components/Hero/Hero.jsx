/* eslint-disable react/jsx-one-expression-per-line */
import "./Hero.css";

import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="hero">
      <h1>Use<span>spaced learning</span>to remember better</h1>
      <p>
        After seven days of leaning something new, you forget
        almost 90% of it. Let's fix that!
      </p>
      <Link to="/auth">
        <button type="button">Get started!</button>
      </Link>
    </div>
  );
}

export default Hero;
