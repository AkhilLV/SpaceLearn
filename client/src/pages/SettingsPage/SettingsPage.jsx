import { useContext } from "react";

import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";

import "./SettingsPage.css";
import ModalContext from "../../contexts/ModalContext";

import { logout } from "../../api";

import logoutIcon from "../../assets/icons/logout.svg";

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
        <h1>Settings</h1>
        <div className="group">
          <label>Reset password</label>
          <input
            className="input"
            type="text"
            placeholder="Enter new password"
          />
          <button
            type="button"
            onClick={handleClick}
            className="btn btn-primary"
          >
            Reset
          </button>
        </div>

        <h3>Others</h3>
        <button type="button" onClick={handleClick} className="btn btn-red">
          <img src={logoutIcon} alt="logout" />
          Logout
        </button>
      </div>
    </div>
  );
}

export default SettingsPage;
