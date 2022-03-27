import "./CardInputModal.css";

import { useState } from "react";

import axios from "axios";
import baseUrl from "../../url/baseUrl";

import addDaysToDate from "../../helpers/addDaysToDate";

function InputModal(props) {
  const [cardNameInput, setCardNameInput] = useState("");
  const [cardDateInput, setCardDateInput] = useState("");

  const cardDates = [
    cardDateInput,
    addDaysToDate(cardDateInput, 1),
    addDaysToDate(cardDateInput, 4),
    addDaysToDate(cardDateInput, 7),
  ];

  const addCard = () => {
    if (!cardNameInput || !cardDateInput) return alert("Invalid input");

    axios({
      method: "POST",
      data: {
        cardName: cardNameInput,
        cardDates,
      },
      url: `${baseUrl}/cards`,
      withCredentials: true,
    }).then((res) => {
      props.setCardsData(res.data);
      props.setShowInputModal(false);
    });
  };

  return (
    <div className="input-modal">
      <label>Card Name</label>
      <input type="text" value={cardNameInput} onChange={(e) => setCardNameInput(e.target.value)} placeholder="Ex: Chemistry" />

      <label>Start Date</label>
      <input type="date" value={cardDateInput} onChange={(e) => setCardDateInput(new Date(e.target.value))} />

      <button onClick={addCard}>Create Card</button>

      <span className="close" onClick={() => props.setShowInputModal(false)}>x</span>
    </div>
  );
}

export default InputModal;

// Exported To:
// 