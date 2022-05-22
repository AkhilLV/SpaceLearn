import { createContext, useState } from "react";

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [showInfoModal, setShowInfoModal] = useState([false, ""]);

  return (
    <ModalContext.Provider value={{
      showInfoModal, setShowInfoModal,
    }}
    >
      { children }
    </ModalContext.Provider>
  );
}

export default ModalContext;
