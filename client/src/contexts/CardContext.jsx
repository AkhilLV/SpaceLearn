import { createContext, useState } from "react";

const CardContext = createContext();

export function CardProvider({ children }) {
  const [cards, setCards] = useState(false);
  const [cardData, setCardData] = useState(false);
  const [selectedDateId, setSelectedDateId] = useState(false);
  const [selectedDate, setSelectedDate] = useState(false);

  return (
    <CardContext.Provider value={{
      cards,
      setCards,

      cardData,
      setCardData,

      selectedDateId,
      setSelectedDateId,

      selectedDate,
      setSelectedDate,
    }}
    >
      { children }
    </CardContext.Provider>
  );
}

export default CardContext;
