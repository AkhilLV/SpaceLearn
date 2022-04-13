import "./CardInputModal.css";

import { useEffect, useState } from "react";

import { getCards, postCard } from "../../api";

import addDaysToDate from "../../helpers/addDaysToDate";

function InputModal({ setCards, setShowInputModal }) {
  const [cardName, setcardName] = useState("");
  const [cardDate, setcardDate] = useState("");
  const [cardDates, setCardDates] = useState([]);

  const addCard = async () => {
    if (!cardName || !cardDate) return alert("Invalid input");

    const resPost = await postCard({ cardName, cardDates });

    if (resPost.status === 200) {
      const resGet = await getCards();

      setCards(resGet.data);
      setShowInputModal(false);
    }
  };

  useEffect(() => {
    const startDate = new Date(cardDate);
    setCardDates([
      startDate,
      addDaysToDate(startDate, 1),
      addDaysToDate(startDate, 4),
      addDaysToDate(startDate, 9),
    ]);
  }, [cardDate]);

  const handleDateSelect = (e) => {
    setcardDate(e.target.value);
  };

  return (
    <>
      <div className="overlay" />
      <div className="input-modal">
        <label>Card Name</label>
        <input type="text" value={cardName} onChange={(e) => setcardName(e.target.value)} placeholder="Ex: Chemistry" />

        <label>Start Date</label>
        <input type="date" value={cardDate} onChange={handleDateSelect} />

        <button type="button" onClick={addCard}>Create Card</button>

        <span className="close" onClick={() => setShowInputModal(false)}>x</span>
      </div>
    </>
  );
}

export default InputModal;
