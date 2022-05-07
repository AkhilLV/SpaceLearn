import { useEffect, useState } from "react";

import "./InputModal.css";

import { getCards, postCard } from "../../api";

import addDaysToDate from "../../helpers/addDaysToDate";

function InputModal({ setCards, setShowInputModal, setShowModal }) {
  const [cardName, setCardName] = useState("");
  const [cardDate, setCardDate] = useState("");
  const [cardDates, setCardDates] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cardName || !cardDate) return setShowModal([true, "Fill all fields"]);

    try {
      await postCard({ cardName, cardDates });

      const res = await getCards();
      setCards(res.data);
      setShowInputModal(false);
    } catch (err) {
      console.log(err);
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

  return (
    <>
      <div className="overlay" />
      <form className="input-modal" onSubmit={handleSubmit}>
        <label>Card Name</label>
        <input type="text" value={cardName} onChange={(e) => setCardName(e.target.value)} placeholder="Ex: Chemistry" />

        <label>Start Date</label>
        <input type="date" value={cardDate} onChange={(e) => setCardDate(e.target.value)} />

        <button type="submit">Create Card</button>

        <span className="close" onClick={() => setShowInputModal(false)}>x</span>
      </form>
    </>
  );
}

export default InputModal;

// a loader for button
