import { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './index.css'

import Header from './components/Header/Header'
import Login from './components/Login/Login'
import Cards from './components/Cards/Cards'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <Router>
      <div className="App">
        <Header />

        <Switch>

          <Route path="/login"  >
            <Login setIsLoggedIn={setIsLoggedIn} />
          </Route>
          <Route path="/tasks"  >
            <Cards isLoggedIn={isLoggedIn} />
          </Route>

        </Switch>

      </div>
    </Router >
  )
}

export default App

