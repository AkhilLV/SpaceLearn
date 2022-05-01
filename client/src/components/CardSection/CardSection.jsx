import { useEffect, useState } from "react";

import { getCard } from "../../api";

import "./CardSection.css";

import DateSelector from "../DateSelector/DateSelector";
import TaskInput from "../TaskInput/TaskInput";
import Tasks from "../Tasks/Tasks";

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

  return (
    cardData.cardName
      ? (
        <div className="card">
          <h2>{cardData.cardName}</h2>

          <DateSelector cardDates={cardData.cardDates} setSelectedDate={setSelectedDate} />

          <TaskInput />

          {cardData.tasks
            && (
            <Tasks tasks={cardData.tasks.filter((task) => !task.taskDates[selectedDate])} />
            )}

          {/* <CompletedTasks /> */}
        </div>
      ) : null
  );
}

export default CardSection;
