import { useState, useContext, useEffect } from "react";

import "./Sidebar.css";
import taskBoard from "../../assets/task-board.svg";

import Form from "../Form/Form";
import CardListing from "../CardListing/CardListing";

import { getCards, postCard } from "../../api";
import CardContext from "../../contexts/CardContext";
import ModalContext from "../../contexts/ModalContext";
import generateCardDates from "../../helpers/generateCardDates";

function Sidebar() {
  const [showForm, setShowForm] = useState(false);

  const { setShowInfoModal } = useContext(ModalContext);
  const { setCards, cards, setSelectedCardId } = useContext(CardContext);

  useEffect(() => {
    (async () => {
      try {
        const res = await getCards();

        if (!res.data.length) return setCards(false);

        setCards(res.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const handleAddCardForm = async (e, inputValues) => {
    const cardName = inputValues[1];
    const cardDate = inputValues[2] && new Date(inputValues[2]);

    if (!(cardName && cardDate)) return setShowInfoModal([true, "Fill all fields"]);

    const cardDates = generateCardDates(cardDate);

    try {
      const postRes = await postCard({ cardName, cardDates });
      setSelectedCardId(postRes.data.card.cardId);

      const res = await getCards();
      setCards(res.data);
      setShowForm(false);
    } catch (err) {
      console.log(err);
      setShowInfoModal([true, "Oops. Something went wrong"]);
    }
  };

  return (
    <div className="sidebar">
      <button type="button" title="Add new card" className="circle" onClick={() => setShowForm(true)}>+</button>

      {showForm && (
      <Form
        headerText="Add card"
        inputItems={[
          {
            id: 1,
            labelText: "Card Name",
            inputType: "text",
          },
          {
            id: 2,
            labelText: "Card Date",
            inputType: "date",
          },
        ]}
        submitBtnText="Create card"
        onSubmit={handleAddCardForm}
        setShowForm={setShowForm}
      />
      )}

      {cards
        ? <CardListing />
        : (
          <div className="no-card-dialog center">
            <img src={taskBoard} alt="a task board" />
            <p>You have no cards. Try adding some!</p>
          </div>
        )}
    </div>
  );
}

export default Sidebar;
