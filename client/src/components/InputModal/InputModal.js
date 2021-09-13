import { useState } from "react"
import "./InputModal.css"

import axios from "axios"

const InputModal = (props) => {
  const [cardNameInput, setCardNameInput] = useState("")
  const [cardDateInput, setCardDateInput] = useState("")

  const addCard = () => {
    axios({
      method: "POST",
      data: {
        cardName: cardNameInput,
        cardDate: cardDateInput
      },
      url: "https://space-learn.herokuapp.com/addCard",
      withCredentials: true
    }).then((res) => {
      props.setCardsData(res.data)
      props.setShowInputModal(false)
    })
  }

  return (
    <div className="input-modal">
      <label>Card Name</label>
      <input type="text" value={cardNameInput} onChange={(e) => setCardNameInput(e.target.value)} />

      <label>Start Date</label>
      <input type="date" value={cardDateInput} onChange={(e) => setCardDateInput(e.target.value)} />

      <button onClick={addCard}>Create Card</button>

      <a href="#" className="close" onClick={() => props.setShowInputModal(false)}>x</a>
    </div>
  )
}

export default InputModal