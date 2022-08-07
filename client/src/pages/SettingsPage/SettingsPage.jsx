import { useContext } from "react";

import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";

import "./SettingsPage.css";
import ModalContext from "../../contexts/ModalContext";

import { logout } from "../../api";

function SettingsPage() {
  const navigate = useNavigate();

  const { setShowInfoModal } = useContext(ModalContext);

  const handleClick = async () => {
    localStorage.removeItem("username");
    localStorage.removeItem("password");

    await logout();

    setShowInfoModal([true, "Successfully logged out"]);
    navigate("/");
  };

  return (
    <div id="settings-page">
      <Sidebar />

      <div id="settings-page-content">
        <button type="button" onClick={handleClick} className="btn">
          Logout
        </button>
      </div>
    </div>
  );
}

export default SettingsPage;
