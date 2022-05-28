import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import UserService from './services/User'
import md5 from 'md5'

const UserAdd = ({setLisäysTila, setIsPositive, setMessage, setShowMessage}) => {

//Komponentin tilan määritys
//Id arvo määritellään tietokannassa automaattisesti, emme anna sitä itse
const [newFirstname, setNewFirstname] = useState('')
const [newLastname, setNewLastname] = useState('')
const [newEmail, setNewEmail] = useState('')
const [newAccesslevelid, setNewAccesslvlid] = useState(2)
const [newUsername, setNewUsername] = useState('')
const [newPassword, setNewPassword] = useState('')

const [passwordInfo, setPasswordInfo] = useState('')
const [pwInfoStyle, setPwInfoStyle] = useState('red')

// onSubmit tapahtumankäsittelijäfunktio
const handleSubmit = (event) => {
    event.preventDefault()
    var newUser = {
      firstname: newFirstname,
      lastname: newLastname,
      email: newEmail,
      accesslevelid: parseInt(newAccesslevelid),
      username: newUsername,
      password: md5(newPassword) // Salataan md5 kirjaston metodilla
    }

    console.log(newUser)

    UserService.create(newUser)
    .then(response => {
      if(response.status === 200) {
        setMessage(`Added new user: ${newUser.firstname} ${newUser.lastname}`)
        setIsPositive(true)
        setShowMessage(true)
        
        setTimeout(() => {
          setShowMessage(false)
        }, 5000)
        setLisäysTila(false)
      }
    })
    .catch(error => {
      setMessage(error)
      setIsPositive(false)
      setShowMessage(true)
      setTimeout(() => {
        setShowMessage(false)
       }, 6000)
    })
}

// Salasanan varmistus
const confirm = (param) => {
  if (param !== newPassword) {
    setPasswordInfo("Passwords do not match")
    setPwInfoStyle('red')
  }
  else {
    setPasswordInfo("Passwords match")
    setPwInfoStyle('green')
  }
}

  return (
    <div id='addNew'>
        <h2>User add</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <input type='text' value={newFirstname} placeholder="First Name"
              onChange={({ target }) => setNewFirstname(target.value)} required />
          </div>
          <div>
            <input type='text' value={newLastname} placeholder='Last Name'
              onChange={({ target }) => setNewLastname(target.value)} required />
          </div>
          <div>
            <input type='email' value={newEmail} placeholder='Email'
              onChange={({ target }) => setNewEmail(target.value)} />
          </div>
          <div>
            <input type='number' value={newAccesslevelid} placeholder='Access Level'
              onChange={({ target }) => setNewAccesslvlid(target.value)} />
          </div>
          <div>
            <input type='text' value={newUsername} placeholder='Username'
              onChange={({ target }) => setNewUsername(target.value)} />
          </div>
          <div>
            <input type='password' value={newPassword} placeholder='Password'
              onChange={({ target }) => setNewPassword(target.value)} />
          </div>
          <div>
            <input type='password' placeholder='Confirm password'
              onChange={({target}) => confirm(target.value)} />
          </div>
          <div> 
            {pwInfoStyle === 'red' ?
            <label style={{color: 'red'}}>{passwordInfo}</label> :
            <label style={{color: 'green'}}>{passwordInfo}</label>
            }
          </div>
         
          {pwInfoStyle === 'red' && <input type='submit' value='Save' disabled/>}
          {pwInfoStyle === 'green' && <input type='submit' value='Save' />}
          <input type='button' value='Back' onClick={() => setLisäysTila(false)} />
        </form>
    </div>
  );
}

export default UserAdd;