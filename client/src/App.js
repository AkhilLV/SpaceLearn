import { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './index.css'


import Hero from './components/Hero/Hero'
import Header from './components/Header/Header'
import Login from './components/Login/Login'
import Cards from './components/Cards/Cards'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userInfo, setUserInfo] = useState({ username: "" })

  return (
    <Router>
      <div className="App">

        <Switch>

          <Route path="/" exact>
            <Header route="home" />
            <Hero />
          </Route>

          <Route path="/login"  >
            <Header route="login" />
            <Login setIsLoggedIn={setIsLoggedIn} setUserInfo={setUserInfo} />
          </Route>

          <Route path="/tasks"  >
            <Cards isLoggedIn={isLoggedIn} userInfo={userInfo} />
          </Route>

        </Switch>

      </div>
    </Router >
  )
}

export default App

