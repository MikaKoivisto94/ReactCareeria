import logo from './logo.svg';
import React, {useState, useEffect} from 'react'
import './App.css'
import Laskuri from './Laskuri'
import Posts from './Posts'
import CustomerList from './CustomerList'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css'
import Message from './Message'
import UserList from './UserList'
import Login from './Login'
import ProductList from './ProductList'

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'


const App = () => {

//App komponentin tila
const [showLaskuri, setShowLaskuri] = useState(false)
// Statet messagen näyttämistä varten
const [showMessage, setShowMessage] = useState(false)
const [message, setMessage] = useState('')
const [isPositive, setIsPositive] = useState(false)
const [loggedInUser, setLoggedInUser] = useState('')
const [isAdmin, setIsAdmin] = useState(false)

useEffect(() => {
  let storedUser = localStorage.getItem("username")
  if (storedUser !== null) {
      setLoggedInUser(storedUser)
  }
  let storedAccess = localStorage.getItem("accesslevelid")
  if (storedAccess != false) {
      setIsAdmin(true)
  }
  else {
    setIsAdmin(false)
  }
},[])

// Logout napin tapahtumankäsittelijä
const logout = () => {
  localStorage.clear()
  setLoggedInUser('')
}

  return (
    <div className="App">
          {!loggedInUser && <Login setMessage={setMessage} setIsPositive={setIsPositive}
      setShowMessage={setShowMessage} setLoggedInUser={setLoggedInUser} setIsAdmin={setIsAdmin}/>}

      { loggedInUser &&
        <Router>

       <Navbar bg='dark' variant="dark">
         <Nav className="mr-auto">
         <Link to={'/Customers'} className='nav-link'>Customers</Link>
         <Link to={'/Laskuri'} className='nav-link'>Laskuri</Link>
         <Link to={'/Posts'} className='nav-link'>Typicode Posts</Link>
         {isAdmin && <Link to={'/Users'} className='nav-link'>Users</Link>}
         <Link to={'/Products'} className='nav-link'>Products</Link>
         <button onClick={() => logout()}>Logout</button>
         </Nav>
       </Navbar>
       
       <h2>Northwind Traders</h2>
       
       {showMessage && <Message message={message} isPositive={isPositive} />}
        
        <Switch>
          <Route path="/Customers"><CustomerList setMessage={setMessage} setIsPositive={setIsPositive}
          setShowMessage={setShowMessage} /></Route>

          {isAdmin && <Route path="/Users"><UserList setMessage={setMessage} setIsPositive={setIsPositive}
          setShowMessage={setShowMessage} /></Route>}

          <Route path="/Products"><ProductList setMessage={setMessage} setIsPositive={setIsPositive}
          setShowMessage={setShowMessage} /></Route>

          <Route path="/Laskuri"><Laskuri /></Route>
          <Route path="/Posts"><Posts /></Route>

          </Switch>
        </Router>
      }
    </div>
  )
}

export default App;
