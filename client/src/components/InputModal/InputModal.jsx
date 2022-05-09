import { useEffect, useState } from "react";

import "./InputModal.css";
import close from "../../assets/close.svg";

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
      <div className="input-modal">
        <div className="header">
          <h3>Add card</h3>
          <img src={close} className="close" onClick={() => setShowInputModal(false)} />
        </div>
        <form onSubmit={handleSubmit}>

          <label>Card Name</label>
          <input className="input" type="text" value={cardName} onChange={(e) => setCardName(e.target.value)} placeholder="Ex: Chemistry" />

          <label>Start Date</label>
          <input className="input" type="date" value={cardDate} onChange={(e) => setCardDate(e.target.value)} />

          <button className="btn btn-small" type="submit">Create Card</button>
        </form>
      </div>

    </>
  );
}

export default InputModal;

// a loader for button
