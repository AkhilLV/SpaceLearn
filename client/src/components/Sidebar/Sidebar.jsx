import "./Sidebar.css";
import taskBoard from "../../assets/task-board.svg";

import CardListing from "../CardListing/CardListing";

function Sidebar({
  cards, setCards, setShowInputModal, setSelectedCardId,
}) {
  return (
    <div className="sidebar">
      <button type="button" title="Add new card" className="circle" onClick={() => setShowInputModal(true)}>+</button>

      {cards
        ? <CardListing cards={cards} setCards={setCards} setSelectedCardId={setSelectedCardId} />
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
