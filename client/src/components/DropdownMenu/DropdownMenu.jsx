import "./DropdownMenu.css";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import moreMenu from "../../assets/icons/more-menu.svg";

export default function DropdownMenu({ buttons }) {
  const [showDropdownMenu, setShowDropdownMenu] = useState(false);

  return (
    <div className="menu">
      <button type="button" onClick={() => setShowDropdownMenu(true)}>
        <img src={moreMenu} alt="more options" />
      </button>

      {showDropdownMenu && (
        <div className="overlay" onClick={() => setShowDropdownMenu(false)} />
      )}

      {/* bug: the dropdown component is not removed from dom */}
      <AnimatePresence>
        {showDropdownMenu && (
          <motion.div
            className="dropdown"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            {buttons.map((button) => (
              <motion.button
                key={button.buttonName}
                type="button"
                className="btn-dropdown"
                onClick={(e) => {
                  button.handler(e, setShowDropdownMenu);
                }}
              >
                <img src={button.buttonIcon} />
                <p>{button.buttonName}</p>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
