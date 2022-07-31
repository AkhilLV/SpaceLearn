/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */

import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./index.css";

import { UserProvider } from "./contexts/UserContext";
import { CardProvider } from "./contexts/CardContext";

import CardPage from "./pages/CardPage/CardPage";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";

import Modal from "./components/Modal/Modal";
import ModalContext from "./contexts/ModalContext";
import ArchivePage from "./pages/ArchivePage/ArchivePage";

function App() {
  const { showInfoModal } = useContext(ModalContext);

  return (
    <Router>
      <div className="App">
        {showInfoModal[0] && <Modal />}

        <UserProvider>
          <CardProvider>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/cards/:cardId" element={<CardPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/archives" element={<ArchivePage />} />
            </Routes>
          </CardProvider>
        </UserProvider>
      </div>
    </Router>
  );
}

export default App;
