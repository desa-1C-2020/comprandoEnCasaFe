import React from 'react'
import HomeScreen from './screens/HomeScreen'
import DeliveryScreen from './screens/DeliveryScreen'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={HomeScreen} />
        <Route exact path='/home' component={HomeScreen} />
        <Route exact path='/delivery' component={DeliveryScreen} />
      </Switch>
    </Router>
  )
}

export default App
