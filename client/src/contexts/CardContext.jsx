/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useState } from "react";

const CardContext = createContext();

export function CardProvider({ children }) {
  const [cards, setCards] = useState(false);
  const [cardData, setCardData] = useState(false);

  const [tasks, setTasks] = useState(false);
  const [selectedColor, setSelectedColor] = useState("ffffff");

  const date = new Date();

  const currentDate = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

  const [selectedDate, setSelectedDate] = useState(currentDate);

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
