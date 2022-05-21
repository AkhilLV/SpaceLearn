import "./DropdownMenu.css";
import { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import moreMenu from "../../assets/more-menu.svg";
import ModalContext from "../../contexts/ModalContext";

export default function DropdownMenu({ config }) {
  const { showDropdownMenu, setShowDropdownMenu } = useContext(ModalContext);

  return (
    <div className="menu">
      <img src={moreMenu} alt="more options" onClick={() => setShowDropdownMenu(true)} />

      {showDropdownMenu && <div className="overlay" onClick={() => setShowDropdownMenu(false)} />}

      {/* bug: the dropdown component is not removed from dom */}
      <AnimatePresence>
        {showDropdownMenu && (
          <motion.div key="123ds1" className="dropdown" initial={{ scale: 0.5 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
            {config.map((button) => <motion.button key={button.buttonName} type="button" onClick={button.handler}>{button.buttonName}</motion.button>)}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
