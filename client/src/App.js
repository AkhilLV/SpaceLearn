import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Header from './components/Header/Header'
import Login from './components/Login/Login'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <Switch>
          <Route component={Login} path="/login" />
        </Switch>
      </div>
    </Router >
  )
}

export default App
