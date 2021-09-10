import axios from "axios"
import { useState, useEffect } from "react"
import { useHistory } from "react-router"

import './Cards.css'

import InputModal from "../InputModal/InputModal"
import Card from "../Card/Card"

const Cards = (props) => {
  const [cardsData, setCardsData] = useState("")

  const history = useHistory()

  useEffect(() => {
    // if (!props.isLoggedIn) return history.push("/login")
    axios({
      method: "GET",
      url: "http://localhost:4000/getCards",
      withCredentials: true
    }).then(res => {
      setCardsData(res.data)
    })
  }, [])

  const [showInputModal, setShowInputModal] = useState(false)

  return (
    <>
      <div className={showInputModal ? "overlay" : null}></div>
      {showInputModal ? <InputModal setShowInputModal={setShowInputModal} setCardsData={setCardsData} /> : null}

      <div className="container">
        <div className="control-bar">
          <button title="Add new card" className="circle" onClick={() => setShowInputModal(true)}>+</button>
        </div>

        <div className="cards">
          <div className="column"></div>
          <div className="column"></div>
          <div className="column"></div>
          {
            cardsData ? cardsData.map((card) => <Card key={card.card_id} card_name={card.card_name} card_date={card.card_date} card_id={card.card_id} setCardsData={setCardsData} />) : "Nothing to see here!"
          }
        </div>
      </div>
    </>
  )
}

export default Cards