import { useEffect, useState } from "react";

import { getCard } from "../../api";

import DateSelector from "../DateSelector/DateSelector";
import TaskInput from "../TaskInput/TaskInput";

function CardSection({ selectedCardId }) {
  const [cardData, setCardData] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await getCard(selectedCardId);
        setCardData(res.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [selectedCardId]);

  useEffect(() => console.log(cardData), [cardData]);

  return (
    cardData.cardName
      ? (
        <div className="card">
          <h2>{cardData.cardName}</h2>

          <DateSelector cardDates={cardData.cardDates} setSelectedDate={setSelectedDate} />

          <TaskInput />
        </div>
      ) : null
  );
}

export default CardSection;
