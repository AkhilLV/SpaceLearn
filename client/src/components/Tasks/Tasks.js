import axios from "axios"
import { useEffect } from "react"

const Todolist = () => {
  useEffect(() => {
    axios(
      {
        method: "GET",
        url: "http://localhost:4000/tasks"
      }
    ).then(res => {
      console.log(res)
    })
  }, [])

  return (
    <div>
      <h1>Tasks</h1>
      <ul>
        <li>Walk cat</li>
        <li>Clean cat</li>
        <li>Kill cat</li>
      </ul>
    </div>
  )
}

export default Todolist