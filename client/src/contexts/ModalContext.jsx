import { createContext, useState } from "react";

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [showInfoModal, setShowInfoModal] = useState([false, ""]);
  const [showDropdownMenu, setShowDropdownMenu] = useState(false);

  return (
    <ModalContext.Provider value={{
      showInfoModal, setShowInfoModal, showDropdownMenu, setShowDropdownMenu,
    }}
    >
      { children }
    </ModalContext.Provider>
  );
}

export default ModalContext;
