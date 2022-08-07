import { useParams } from "react-router-dom";
import { useEffect, useContext } from "react";

import { AnimatePresence, motion } from "framer-motion";
import CardContext from "../../contexts/CardContext";

import { getCard } from "../../api";

import "./CardPage.css";

import Sidebar from "../../components/Sidebar/Sidebar";

import CardHeader from "../../components/CardHeader/CardHeader";
import DateSelector from "../../components/DateSelector/DateSelector";
import TaskInput from "../../components/TaskInput/TaskInput";
import Tasks from "../../components/Tasks/Tasks";

function CardPage() {
  const {
    setSelectedDateId,
    setSelectedDate,
    setCardData,
    cardData,
    selectedDate,
  } = useContext(CardContext);

  const { cardId } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const res = await getCard(cardId);

        setSelectedDateId(res.data.cardDates[0].cardDateId);
        setSelectedDate(res.data.cardDates[0].cardDate);

        setCardData(res.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [cardId]);

  const variants = {
    hidden: { scale: 0.9 },
    visible: { scale: 1 },
    exit: { scale: 0 },
  };

  return (
    <div id="card-page">
      <Sidebar />

      <AnimatePresence>
        {cardData && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            className="card"
          >
            <CardHeader />

            <TaskInput />

            <DateSelector />

            {cardData.tasks && (
              <>
                <Tasks
                  tasks={cardData.tasks.filter(
                    (task) => !task.taskDates[selectedDate]
                  )}
                  taskDone={false}
                />
                <Tasks
                  tasks={cardData.tasks.filter(
                    (task) => task.taskDates[selectedDate]
                  )}
                  taskDone
                />
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default CardPage;
