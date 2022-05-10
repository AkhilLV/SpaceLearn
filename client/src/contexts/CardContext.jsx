import { createContext, useState } from "react";

const CardContext = createContext();

export function CardProvider({ children }) {
  const [cards, setCards] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(false);

  return (
    <CardContext.Provider value={{
      cards, setCards, selectedCardId, setSelectedCardId,
    }}
    >
      { children }
    </CardContext.Provider>
  );
}

export default CardContext;
