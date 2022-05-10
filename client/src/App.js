/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */

import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./index.css";

import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";

import { UserProvider } from "./contexts/user";

import Modal from "./components/Modal/Modal";

function App() {
  const [showModal, setShowModal] = useState([false, ""]);

  return (
    <UserProvider>
      <Router>
        <div className="App">

          {showModal[0] ? <Modal showModal={showModal} setShowModal={setShowModal} /> : null}

          <Switch>

            <Route path="/" exact>
              <LandingPage />
            </Route>

            <Route path="/auth">
              <AuthPage setShowModal={setShowModal} />
            </Route>

            <Route path="/dashboard">
              <DashboardPage setShowModal={setShowModal} />
            </Route>

          </Switch>

        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
