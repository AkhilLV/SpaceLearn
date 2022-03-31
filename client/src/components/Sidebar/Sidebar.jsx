import CardListing from "../CardListing/CardListing";

function Sidebar({ cards, setCards, setShowInputModal, setSelectedCardId }) {
  return (
    <div className="control-bar">
      <button type="button" title="Add new card" className="circle" onClick={() => setShowInputModal(true)}>+</button>

      <CardListing cards={cards} setCards={setCards} setSelectedCardId={setSelectedCardId} />
    </div>
  );
}

export default Sidebar;
