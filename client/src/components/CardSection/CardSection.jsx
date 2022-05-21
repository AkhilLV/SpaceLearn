/* eslint-disable arrow-body-style */
import { useContext, useEffect } from "react";

import { motion } from "framer-motion";
import { getCard } from "../../api";

import "./CardSection.css";

import CardHeader from "../CardHeader/CardHeader";
import DateSelector from "../DateSelector/DateSelector";
import TaskInput from "../TaskInput/TaskInput";
import Tasks from "../Tasks/Tasks";

import CardContext from "../../contexts/CardContext";

function CardSection() {
  const {
    selectedCardId, setSelectedDateId, setSelectedDate, setCardData, cardData, selectedDate,
  } = useContext(CardContext);

  useEffect(() => {
    (async () => {
      try {
        const res = await getCard(selectedCardId);
        setSelectedDateId(res.data.cardDates[0].cardDateId);
        setSelectedDate(res.data.cardDates[0].cardDate);
        setCardData(res.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [selectedCardId]);

  const variants = {
    hidden: { scale: 0.9 },
    visible: { scale: 1 },
  };

  return (
    cardData
      && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={variants}
          className="card"
        >

          <CardHeader />

          <DateSelector />

          <TaskInput />

          {cardData.tasks
            && (
              <>
                <Tasks
                  tasks={cardData.tasks.filter((task) => !task.taskDates[selectedDate])}
                  taskDone={false}
                />
                <Tasks
                  tasks={cardData.tasks.filter((task) => task.taskDates[selectedDate])}
                  taskDone
                />
              </>
            )}
        </motion.div>
      )
  );
}

export default CardSection;
