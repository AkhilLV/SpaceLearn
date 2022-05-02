import { useEffect, useState } from "react";

import { getCard } from "../../api";

import "./CardSection.css";

import DateSelector from "../DateSelector/DateSelector";
import TaskInput from "../TaskInput/TaskInput";
import Tasks from "../Tasks/Tasks";
import CompletedTasks from "../CompletedTasks/CompletedTasks";

function CardSection({ selectedCardId }) {
  const [cardData, setCardData] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDateId, setSelectedDateId] = useState(false);

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

  return (
    cardData.cardName
      ? (
        <div className="card">
          <h2>{cardData.cardName}</h2>

          <DateSelector
            cardDates={cardData.cardDates}
            setSelectedDate={setSelectedDate}
            setSelectedDateId={setSelectedDateId}
          />

          <TaskInput cardId={cardData.cardId} setCardData={setCardData} />

          {cardData.tasks
            && (
            <>
              <Tasks
                tasks={cardData.tasks.filter((task) => !task.taskDates[selectedDate])}
              />
              <CompletedTasks
                tasks={cardData.tasks.filter((task) => task.taskDates[selectedDate])}
              />
            </>
            )}
        </div>
      ) : null
  );
}

export default CardSection;
