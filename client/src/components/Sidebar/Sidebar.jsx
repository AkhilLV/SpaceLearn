import CardListing from "../CardListing/CardListing";

function Sidebar() {
  return (
    <div className="control-bar">
      <button type="button" title="Add new card" className="circle" onClick={() => setShowInputModal(true)}>+</button>

      <CardListing />
    </div>
  );
}

export default Sidebar;
