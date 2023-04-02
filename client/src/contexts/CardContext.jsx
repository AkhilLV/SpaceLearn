/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useState } from "react";

const CardContext = createContext();

export function CardProvider({ children }) {
  const [cards, setCards] = useState(false);
  const [cardData, setCardData] = useState(false);

  const [tasks, setTasks] = useState([]);
  const [selectedColor, setSelectedColor] = useState("ffffff");

  const currentDateAsYYYYMMDD = new Date().toISOString().substring(0, 10);
  const [selectedDate, setSelectedDate] = useState(currentDateAsYYYYMMDD);

  return (
    <CardContext.Provider
      value={{
        cards,
        setCards,

        cardData,
        setCardData,

        tasks,
        setTasks,

        selectedDate,
        setSelectedDate,

        selectedColor,
        setSelectedColor,
      }}
    >
      {children}
    </CardContext.Provider>
  );
}

export default CardContext;
