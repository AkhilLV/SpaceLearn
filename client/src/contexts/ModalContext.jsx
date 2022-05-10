import { createContext, useState } from "react";

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [showModal, setShowModal] = useState([false, ""]);

  return (
    <ModalContext.Provider value={{ showModal, setShowModal }}>{ children }</ModalContext.Provider>
  );
}

export default ModalContext;
