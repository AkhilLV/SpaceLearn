import "./DropdownMenu.css";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import moreMenu from "../../assets/icons/more-menu.svg";

import editIcon from "../../assets/icons/edit.svg";
import deleteIcon from "../../assets/icons/delete.svg";

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
            <motion.button
              type="button"
              className="btn-dropdown"
              onClick={(e) => {
                buttons[0].handler(e, setShowDropdownMenu);
              }}
            >
              <img src={deleteIcon} alt="dropdown" />
              <p>Delete</p>
            </motion.button>

            <motion.button
              type="button"
              className="btn-dropdown"
              onClick={(e) => {
                buttons[1].handler(e, setShowDropdownMenu);
              }}
            >
              <img src={editIcon} alt="dropdown" />
              <p>Edit</p>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
