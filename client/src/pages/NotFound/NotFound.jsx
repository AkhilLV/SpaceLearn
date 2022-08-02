import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  return (
    <div id="not-found-page" className="center">
      <h1>Oops. 404 Page not found</h1>
      <Link to="/">
        <button className="btn">Go back home</button>
      </Link>
    </div>
  );
}
