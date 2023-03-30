import { useParams } from "react-router-dom";
import { useEffect, useContext } from "react";

import { AnimatePresence, motion } from "framer-motion";
import CardContext from "../../contexts/CardContext";

import { getCard, getCardTasksByDate } from "../../api";

import "./CardPage.css";

import Sidebar from "../../components/Sidebar/Sidebar";

import CardHeader from "../../components/CardHeader/CardHeader";
import TaskInput from "../../components/TaskInput/TaskInput";
import Tasks from "../../components/Tasks/Tasks";

function CardPage() {
  const {
    setSelectedDate,
    setCardData,
    setTasks,
    tasks,
    cardData,
    selectedDate,
  } = useContext(CardContext);

  const { cardId } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const res = await getCard(cardId);

        setCardData(res.data.data);
        const resTasks = await getCardTasksByDate(cardId, selectedDate);
        setTasks(resTasks.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [cardId, selectedDate]);

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

            {/* <DateSelector /> */}

            {tasks && (
              <>
                <h2>
                  Your tasks for today{" "}
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </h2>
                <Tasks
                  tasks={tasks.filter((task) => !task.taskDone)}
                  taskDone={false}
                />
                <Tasks tasks={tasks.filter((task) => task.taskDone)} taskDone />
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default CardPage;
