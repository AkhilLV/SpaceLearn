import { useContext, useState } from "react";

import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";

import "./SettingsPage.css";
import ModalContext from "../../contexts/ModalContext";

import { logout, reset } from "../../api";

import logoutIcon from "../../assets/icons/logout.svg";

function SettingsPage() {
  const navigate = useNavigate();

  const { setShowInfoModal } = useContext(ModalContext);

  const [newPassword, setNewPassword] = useState("");

  const handleLogoutClick = async () => {
    localStorage.removeItem("username");
    localStorage.removeItem("password");

    await logout();

    setShowInfoModal([true, "Successfully logged out"]);
    navigate("/");
  };

  const handleResetClick = async () => {
    if (newPassword.split("").length < 8) {
      return setShowInfoModal([
        true,
        "Password should be 8 characters or more",
      ]);
    }

    try {
      await reset({ newPassword });
      localStorage.setItem("password", newPassword);
      setShowInfoModal([true, "Password reset"]);
    } catch (err) {
      setShowInfoModal([true, "Server error. Try again"]);
    }
  };

  return (
    <div id="settings-page">
      <Sidebar />

      <div id="settings-page-content">
        <h1>Settings</h1>
        <div className="group">
          <label>Reset password</label>
          <input
            onChange={(e) => setNewPassword(e.target.value)}
            className="input"
            type="text"
            placeholder="Enter new password"
          />
          <button
            type="button"
            onClick={handleResetClick}
            className="btn btn-primary"
          >
            Reset
          </button>
        </div>

        <h3>Others</h3>
        <button
          type="button"
          onClick={handleLogoutClick}
          className="btn btn-red"
        >
          <img src={logoutIcon} alt="logout" />
          Logout
        </button>
      </div>
    </div>
  );
}

export default SettingsPage;
