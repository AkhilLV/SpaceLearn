/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */

import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./index.css";

import Hero from "./components/Hero/Hero";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import Cards from "./components/Cards/Cards";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div className="App">

        <Switch>

          <Route path="/" exact>
            <Header />
            <Hero />
          </Route>

          <Route path="/login">
            <Header />
            <Login setIsLoggedIn={setIsLoggedIn} />
          </Route>

          <Route path="/tasks">
            <Cards isLoggedIn={isLoggedIn} />
          </Route>

        </Switch>

      </div>
    </Router>
  );
}

export default App;
