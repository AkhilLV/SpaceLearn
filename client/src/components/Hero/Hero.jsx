/* eslint-disable react/jsx-one-expression-per-line */
import "./Hero.css";
import { Link } from "react-router-dom";
import previewImage from "../../assets/previewImage.png";

function Hero() {
  return (
    <div className="hero">
      <h1>Up your game with <br /> spaced learning cards</h1>
      <p>
        After seven days of leaning something new, <br />you forget
        almost 90% of it. Let's fix that!
      </p>
      <Link to="/auth">
        <button type="button">Get started!</button>
      </Link>
      <a href="#" className="link">learn how it works</a>

      <div className="preview-image" />
    </div>
  );
}

export default Hero;
