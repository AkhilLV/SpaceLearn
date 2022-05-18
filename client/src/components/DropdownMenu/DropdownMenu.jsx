import "./DropdownMenu.css";
import { useContext } from "react";
import moreMenu from "../../assets/more-menu.svg";
import ModalContext from "../../contexts/ModalContext";

export default function DropdownMenu({ config }) {
  const { showDropdownMenu, setShowDropdownMenu } = useContext(ModalContext);

  return (
    <div className="menu">
      <img src={moreMenu} alt="more options" onClick={() => setShowDropdownMenu(true)} />
      {showDropdownMenu
      && (
      <>
        <div className="overlay" onClick={() => setShowDropdownMenu(false)} />
        <div className="dropdown">
          {config.map((button) => <button key={button.buttonName} type="button" onClick={button.handler}>{button.buttonName}</button>)}
        </div>
      </>
      )}
    </div>
  );
}
