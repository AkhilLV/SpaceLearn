/* eslint-disable arrow-body-style */
import { useEffect, useState } from "react";

import { getCard } from "../../api";

import "./CardSection.css";

import DateSelector from "../DateSelector/DateSelector";
import TaskInput from "../TaskInput/TaskInput";
import Tasks from "../Tasks/Tasks";
import CompletedTasks from "../CompletedTasks/CompletedTasks";

function CardSection({ selectedCardId }) {
  const [selectedDateId, setSelectedDateId] = useState(false);

  const [state, setState] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await getCard(selectedCardId);
        setState({
          selectedDate: res.data.cardDates[0],
          cardData: res.data,
        });
      } catch (err) {
        console.log(err);
      }
    })();
  }, [selectedCardId]);

  return (
    state
      ? (
        <div className="card">
          <h2>{state.cardData.cardName}</h2>

          <DateSelector
            cardDates={state.cardData.cardDates}
            setState={setState}
            setSelectedDateId={setSelectedDateId}
          />

          <TaskInput cardId={state.cardData.cardId} setState={setState} />

          {state.cardData.tasks
            && (
            <>
              <Tasks
                tasks={state.cardData.tasks.filter((task) => {
                  return !task.taskDates[state.selectedDate].done;
                })}
              />
              <CompletedTasks
                tasks={state.cardData.tasks.filter((task) => {
                  return task.taskDates[state.selectedDate].done;
                })}
              />
            </>
            )}
        </div>
      ) : null
  );
}

export default CardSection;
