import './Card.css'

const Card = (props) => {
  return (
    <div className="card">
      <h2>{props.date}</h2>
      <ul>
        {
          props.tasks.map((task) => <li className="strike">{task[0]}</li>)
        }
      </ul>
      <button>+</button>
    </div>
  )
}

export default Card