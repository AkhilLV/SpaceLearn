import { useContext, useEffect } from "react";
import ModalContext from "../../contexts/ModalContext";

import "./Modal.css";

function Modal() {
  const { showInfoModal, setShowInfoModal } = useContext(ModalContext);

  useEffect(() => {
    setTimeout(() => {
      setShowInfoModal([false, ""]);
    }, 3000);
  }, []);

  return (
    <div className="modal">
      <p>{showInfoModal[1]}</p>
    </div>
  );
}

export default Modal;
