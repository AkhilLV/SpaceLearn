/* eslint-disable arrow-body-style */
import { useContext, useEffect, useState } from "react";

import { getCard } from "../../api";

import "./CardSection.css";

import CardHeader from "../CardHeader/CardHeader";
import DateSelector from "../DateSelector/DateSelector";
import TaskInput from "../TaskInput/TaskInput";
import Tasks from "../Tasks/Tasks";

import CardContext from "../../contexts/CardContext";

function CardSection() {
  const [state, setState] = useState(false);

  const { selectedCardId } = useContext(CardContext);

  useEffect(() => {
    (async () => {
      try {
        const res = await getCard(selectedCardId);
        setState({
          selectedDateId: res.data.cardDates[0].cardDateId,
          selectedDate: res.data.cardDates[0].cardDate,
          cardData: res.data,
        });
      } catch (err) {
        console.log(err);
      }
    })();
  }, [selectedCardId]);

  return (
    state
      && (
        <div className="card">

          <CardHeader cardName={state.cardData.cardName} />

          <DateSelector
            cardDates={state.cardData.cardDates}
            setState={setState}
          />

          <TaskInput cardId={state.cardData.cardId} setState={setState} />

          {state.cardData.tasks
            && (
              <>
                <Tasks
                  tasks={state.cardData.tasks.filter((task) => !task.taskDates[state.selectedDate])}
                  taskDone={false}
                  state={state}
                  setState={setState}
                />
                <Tasks
                  tasks={state.cardData.tasks.filter((task) => task.taskDates[state.selectedDate])}
                  taskDone
                  state={state}
                  setState={setState}
                />
              </>
            )}
        </div>
      )
  );
}

export default CardSection;
