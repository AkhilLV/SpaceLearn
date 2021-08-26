import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './index.css'

import Header from './components/Header/Header'
import Login from './components/Login/Login'
import Tasks from './components/Tasks/Tasks'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <Switch>

          <Route component={Login} path="/login" />
          <Route component={Tasks} path="/tasks" />

        </Switch>

      </div>
    </Router >
  )
}

export default App
