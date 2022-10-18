import { useState, useContext, useEffect } from "react";

import "./Sidebar.css";
import { useNavigate, NavLink } from "react-router-dom";
import taskBoard from "../../assets/task-board.svg";

import Form from "../Form/Form";
import CardListing from "../CardListing/CardListing";

import addIcon from "../../assets/icons/add.svg";
import menuIcon from "../../assets/icons/menu.svg";
import archiveIcon from "../../assets/icons/archive.svg";
import settingsIcon from "../../assets/icons/settings.svg";

import { getCards, postCard } from "../../api";

import CardContext from "../../contexts/CardContext";
import ModalContext from "../../contexts/ModalContext";

function Sidebar() {
  const [showForm, setShowForm] = useState(false);

  const { setShowInfoModal } = useContext(ModalContext);
  const { setCards, cards, selectedColor, setSelectedColor } =
    useContext(CardContext);

  const navigate = useNavigate();

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

    if (!cardName) return setShowInfoModal([true, "Fill all fields"]);

    try {
      const postRes = await postCard({ cardName, cardColor: selectedColor });
      navigate(`/cards/${postRes.data.data.card.cardId}`);

      const res = await getCards();
      setCards(res.data);
      setShowForm(false);
      setSelectedColor("ffffff");
    } catch (err) {
      console.log(err);
      setShowForm(false);
      setShowInfoModal([true, "Oops. Something went wrong"]);
    }
  };

  return (
    <div className="sidebar">
      <button
        type="button"
        title="Add new card"
        className="add-card-btn"
        onClick={() => setShowForm(true)}
      >
        <img src={addIcon} alt="add" />
      </button>

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
              labelText: "Card Color",
              inputType: "ColorSelector",
            },
          ]}
          submitBtnText="Create card"
          onSubmit={handleAddCardForm}
          setShowForm={setShowForm}
        />
      )}

      <div className="dashboard-menu">
        <NavLink to="/dashboard" className="dashboard-link">
          <img src={menuIcon} alt="menu" />
          <p>Dashboard</p>
        </NavLink>
        <NavLink to="/archives" className="dashboard-link">
          <img src={archiveIcon} alt="archive" />
          <p>Archived</p>
        </NavLink>
        <NavLink to="/settings" className="dashboard-link">
          <img src={settingsIcon} alt="settings" />
          <p>Settings</p>
        </NavLink>
      </div>

      {cards.length ? (
        <CardListing />
      ) : (
        <div className="no-card-dialog center">
          <img src={taskBoard} alt="a task board" />
          <p>You have no cards. Try adding some!</p>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
