import logo from './logo.svg';
import React, {useState} from 'react'
import './App.css'
import Laskuri from './Laskuri'
import Posts from './Posts'
import CustomerList from './CustomerList'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css'
import Message from './Message'
import UserList from './UserList'

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

const App = () => {

//App komponentin tila
const [showLaskuri, setShowLaskuri] = useState(false)
// Statet messagen näyttämistä varten
const [showMessage, setShowMessage] = useState(false)
const [message, setMessage] = useState('')
const [isPositive, setIsPositive] = useState(false)

  return (
    <div className="App">
        <Router>

       <Navbar bg='dark' variant="dark">
         <Nav className="mr-auto"></Nav>
         <Link to={'/Customers'} className='nav-link'>Customers</Link>
         <Link to={'/Laskuri'} className='nav-link'>Laskuri</Link>
         <Link to={'/Posts'} className='nav-link'>Typicode Posts</Link>
         <Link to={'/Users'} className='nav-link'>Users</Link>
       </Navbar>
       
       <h2>Northwind Traders</h2>
       
       {showMessage && <Message message={message} isPositive={isPositive} />}
        
        <Switch>
          <Route path="/Customers"><CustomerList setMessage={setMessage} setIsPositive={setIsPositive}
          setShowMessage={setShowMessage} /></Route>

          <Route path="/Users"><UserList setMessage={setMessage} setIsPositive={setIsPositive}
          setShowMessage={setShowMessage} /></Route>

          <Route path="/Laskuri"><Laskuri /></Route>
          <Route path="/Posts"><Posts /></Route>

          </Switch>
        </Router>

    </div>
  )
}

export default App;
