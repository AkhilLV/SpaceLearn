/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */

import { useContext, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./index.css";

import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";

import { UserProvider } from "./contexts/UserContext";
import { CardProvider } from "./contexts/CardContext";

import Modal from "./components/Modal/Modal";
import ModalContext from "./contexts/ModalContext";

function App() {
  const { showModal } = useContext(ModalContext);

  return (
    <Router>
      <div className="App">

        {showModal[0] && <Modal /> }

        <Switch>

          <Route path="/" exact>
            <LandingPage />
          </Route>

          <UserProvider>
            <Route path="/auth">
              <AuthPage />
            </Route>

            <CardProvider>
              <Route path="/dashboard">
                <DashboardPage />
              </Route>
            </CardProvider>
          </UserProvider>

        </Switch>

      </div>
    </Router>
  );
}

export default App;
