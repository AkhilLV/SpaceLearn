import "./Upcoming.css";

function getSuffix(day) {
  if (day >= 11 && day <= 13) {
    return "th";
  }
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  return `${month} ${day}${getSuffix(day)}`;
}

export default function Upcoming({ upcomingTasks }) {
  console.log("Upcoming");
  console.log(upcomingTasks);
  return (
    <div className="upcoming">
      <h1>Upcoming tasks</h1>
      <div className="upcoming-date">
        {upcomingTasks.map((taskContainer) => (
          <div>
            <h3>{formatDate(new Date(taskContainer.date))}</h3>
            {taskContainer.tasks.map((task) => (
              <>
                {" "}
                <p>{task.taskText}</p>
                <span>{task.cardName}</span>
              </>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
