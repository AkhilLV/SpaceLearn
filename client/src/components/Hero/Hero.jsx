/* eslint-disable react/jsx-one-expression-per-line */
import "./Hero.css";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="center" id="hero">
      <h1>
        Up your game with <br /> spaced learning cards
      </h1>
      <p>
        After seven days of learning something new, <br />
        you forget almost 90% of it. Let's fix that!
      </p>
      <Link to="/auth">
        <button className="btn" type="button">
          Get started!
        </button>
      </Link>
      <a href="#" className="link">
        learn how it works
      </a>

      <div className="preview-image" />
    </div>
  );
}

export default Hero;
