import "./CardInputModal.css";

import { useState } from "react";

import axios from "axios";
import baseUrl from "../../url/baseUrl";

import addDaysToDate from "../../helpers/addDaysToDate";

function InputModal({ setCards, setShowInputModal }) {
  const [cardNameInput, setCardNameInput] = useState("");
  const [cardDateInput, setCardDateInput] = useState("");

  const addCard = () => {
    if (!cardNameInput || !cardDateInput) return alert("Invalid input");

    axios({
      method: "POST",
      data: {
        cardName: cardNameInput,
      },
      url: `${baseUrl}/cards`,
      withCredentials: true,
    }).then((res) => {
      console.log(res);
      setCards(res.data);
      setShowInputModal(false);
    });
  };

  return (
    <>
      <div className="overlay" />
      <div className="input-modal">
        <label>Card Name</label>
        <input type="text" value={cardNameInput} onChange={(e) => setCardNameInput(e.target.value)} placeholder="Ex: Chemistry" />

        <label>Start Date</label>
        <input type="date" value={cardDateInput} onChange={(e) => setCardDateInput(e.target.value)} />

        <button type="button" onClick={addCard}>Create Card</button>

        <span className="close" onClick={() => setShowInputModal(false)}>x</span>
      </div>
    </>
  );
}

export default InputModal;
