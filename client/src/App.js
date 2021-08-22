import './index.css'

import Sidebar from './components/Sidebar/Sidebar'
import Todolist from './components/Todolist/Todolist'
import Header from './components/Header/Header'
import Login from './components/Login/Login'

function App() {
  return (
    <div className="App">
      <Header />
      <Login />
    </div>
  )
}

export default App
