import { useEffect, useState } from "react";

import { getCard } from "../../api";

import "./CardSection.css";

import DateSelector from "../DateSelector/DateSelector";
import TaskInput from "../TaskInput/TaskInput";
import Tasks from "../Tasks/Tasks";
import CompletedTasks from "../CompletedTasks/CompletedTasks";

function CardSection({ selectedCardId }) {
  const [cardData, setCardData] = useState(false);
  const [selectedDate, setSelectedDate] = useState(false);
  const [selectedDateId, setSelectedDateId] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await getCard(selectedCardId);
        setCardData(res.data);
        setSelectedDate(res.data.cardDates[0]);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [selectedCardId]);

  return (
    cardData && selectedDate
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
                selectedDate={selectedDate}
                tasks={cardData.tasks.filter((task) => !task.taskDates[selectedDate].done)}
              />
              {/* <CompletedTasks
                tasks={cardData.tasks.filter((task) => task.taskDates[selectedDate].done)}
              /> */}
            </>
            )}
        </div>
      ) : null
  );
}

export default CardSection;
