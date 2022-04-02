import "./CardInputModal.css";

import { useEffect, useState } from "react";

import axios from "axios";
import baseUrl from "../../url/baseUrl";

import addDaysToDate from "../../helpers/addDaysToDate";

function InputModal({ setCards, setShowInputModal }) {
  const [cardNameInput, setCardNameInput] = useState("");
  const [cardDateInput, setCardDateInput] = useState("");
  const [cardDates, setCardDates] = useState([]);

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
      console.log(res);
      setCards(res.data);
      setShowInputModal(false);
    });
  };

  useEffect(() => {
    const startDate = new Date(cardDateInput);
    setCardDates([
      startDate,
      addDaysToDate(startDate, 1),
      addDaysToDate(startDate, 4),
      addDaysToDate(startDate, 9),
    ]);
  }, [cardDateInput]);

  const handleDateSelect = (e) => {
    setCardDateInput(e.target.value);
  };

  return (
    <>
      <div className="overlay" />
      <div className="input-modal">
        <label>Card Name</label>
        <input type="text" value={cardNameInput} onChange={(e) => setCardNameInput(e.target.value)} placeholder="Ex: Chemistry" />

        <label>Start Date</label>
        <input type="date" value={cardDateInput} onChange={handleDateSelect} />

        <button type="button" onClick={addCard}>Create Card</button>

        <span className="close" onClick={() => setShowInputModal(false)}>x</span>
      </div>
    </>
  );
}

export default InputModal;
