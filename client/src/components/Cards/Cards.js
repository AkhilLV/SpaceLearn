import axios from "axios"
import { useState, useEffect } from "react"
import { useHistory } from "react-router"

import './Cards.css'

import Card from '../Card/Card'

const Cards = (props) => {
  const [Cards, setCards] = useState([
    {
      date: "12-12-2012",
      tasks: [["Walk cat", false], ["Walk cat", false]],
    },
    {
      date: "12-12-2012",
      tasks: [["Walk cat", false], ["Walk cat", false]],
    }
  ])

  const history = useHistory()

  useEffect(() => {
    if (!props.isLoggedIn) return history.push("/login")

    axios(
      {
        method: "GET",
        url: "http://localhost:4000/tasks",
        withCredentials: true
      }
    ).then(res => {
      console.log(res)
    })
  }, [])

  return (
    <div className="cards">
      {
        Cards.map((card) => <Card date={card.date} tasks={card.tasks} />)
      }
    </div>
  )
}

export default Cards