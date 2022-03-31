import "./Sidebar.css";

import CardListing from "../CardListing/CardListing";

function Sidebar({
  cards, setCards, setShowInputModal, setSelectedCardId,
}) {
  return (
    <div className="sidebar">
      <button type="button" title="Add new card" className="circle" onClick={() => setShowInputModal(true)}>+</button>

      <div className="filter">
        <p>all</p>
        <p>today</p>
        <p>tomorrow</p>
      </div>

      <CardListing cards={cards} setCards={setCards} setSelectedCardId={setSelectedCardId} />
    </div>
  );
}

export default Sidebar;
