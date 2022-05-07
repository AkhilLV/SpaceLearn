import "./Sidebar.css";
import { useEffect } from "react";
import taskBoard from "../../assets/task-board.svg";
import CardListing from "../CardListing/CardListing";

import { getCards } from "../../api";

function Sidebar({
  cards, setCards, setShowInputModal, setSelectedCardId,
}) {
  useEffect(() => {
    (async () => {
      try {
        const res = await getCards();

        if (!res.data.length) {
          setCards(false);
        } else {
          setCards(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <div className="sidebar">
      <button type="button" title="Add new card" className="circle" onClick={() => setShowInputModal(true)}>+</button>

      {cards
        ? <CardListing cards={cards} setSelectedCardId={setSelectedCardId} />
        : (
          <div className="no-card-dialog">
            <img src={taskBoard} alt="a task board" />
            <p>You have no cards. Try adding some!</p>
          </div>
        )}
    </div>
  );
}

export default Sidebar;
