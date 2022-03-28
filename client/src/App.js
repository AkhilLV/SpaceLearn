/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */

import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./index.css";

import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div className="App">

        <Switch>

          <Route path="/" exact>
            <LandingPage />
          </Route>

          <Route path="/auth">
            <AuthPage setIsLoggedIn={setIsLoggedIn} />
          </Route>

          <Route path="/dashboard">
            <DashboardPage isLoggedIn={isLoggedIn} />
          </Route>

        </Switch>

      </div>
    </Router>
  );
}

export default App;
