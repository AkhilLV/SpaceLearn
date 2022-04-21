import { useEffect, useState } from "react";
import "./Modal.css";

function Modal({ showModal, setShowModal }) {
  console.log("ran");
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
