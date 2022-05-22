import { useContext, useEffect } from "react";

import "./Sidebar.css";
import taskBoard from "../../assets/task-board.svg";

import CardListing from "../CardListing/CardListing";

import { getCards } from "../../api";
import CardContext from "../../contexts/CardContext";

function Sidebar({ setShowInputModal }) {
  const { setCards, cards } = useContext(CardContext);

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

  return (
    <div className="sidebar">
      <button type="button" title="Add new card" className="circle" onClick={() => setShowInputModal(true)}>+</button>

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
