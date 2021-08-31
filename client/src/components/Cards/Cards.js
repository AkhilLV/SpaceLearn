import axios from "axios"
import { useState, useEffect } from "react"
import { useHistory } from "react-router"

import './Cards.css'

import Card from '../Card/Card'

const Cards = (props) => {
  const [cardsData, setCardsData] = useState("")

  const history = useHistory()
  useEffect(() => {
    if (!props.isLoggedIn) return history.push("/login")

    axios(
      {
        method: "GET",
        url: "http://localhost:4000/getCards",
        withCredentials: true
      }
    ).then(res => {
    })
  }, [])

  const [dateInput, setDateInput] = useState("")
  const addCard = () => {
    axios({
      method: "POST",
      data: {
        date: dateInput
      },
      url: `http://localhost:4000/addCard`,
      withCredentials: true,
    }).then(res => {
      console.log(res)
      setCardsData(res.data)
    })
  }

  return (
    <div className="container">
      <div className="add-card-bar">
        <input type="date" value={dateInput} onChange={(e) => setDateInput(e.target.value)} />
        <button title="Add new card" className="circle" onClick={addCard}>+</button>
      </div>

      <div className="cards">
        {
          cardsData ? cardsData.map((card) => <Card date={card.date} tasks={card.tasks} card_id={card.card_id} setCardsData={setCardsData} />) : "Nothing to see here!"
        }
      </div>
    </div>
  )
}

export default Cards