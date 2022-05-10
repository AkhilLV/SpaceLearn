import { useContext, useEffect } from "react";
import ModalContext from "../../contexts/ModalContext";

import "./Modal.css";

function Modal() {
  const { showModal, setShowModal } = useContext(ModalContext);

  useEffect(() => {
    setTimeout(() => {
      setShowModal([false, ""]);
    }, 3000);
  }, []);

  return (
    <div className="modal">
      <p>{showModal[1]}</p>
    </div>
  );
}

export default Modal;
