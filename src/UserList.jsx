import logo from './logo.svg';
import './App.css'
import React, {useState, useEffect} from 'react'
import UserService from './services/User'
import UserAdd from './UserAdd'

const UserList = ({setIsPositive, setShowMessage, setMessage}) => {

//Komponentin tilan määritys
const [users, setUsers] = useState([])
const [lisäysTila, setLisäysTila] = useState(false)
const [muokkausTila, setMuokkausTila] = useState(false)
const [reload, reloadNow] = useState(false)
const [muokattavaUser, setMuokattavaUser] = useState(false)
const [search, setSearch] = useState("")

// UseEffect ajetaan aina alussa kerran
useEffect(() => {
    UserService.getAll()
    .then(data => {
        setUsers(data)
    });
}
,[lisäysTila, reload, muokkausTila] //Nämä statet jos muuttuu niin useEffect() ajetaan uudestaan
)

// Hakukentän onChange tapahtumankäsittelijä
const handleSearchInputChange = (event) => {
    setSearch(event.target.value.toLowerCase())
}

const editUsers = (user) => {
    setMuokattavaUser(user)
    setMuokkausTila(true)
}

  return (
    <>
        <h1><nobr>Users</nobr>

            {lisäysTila && <UserAdd setLisäysTila={setLisäysTila}
            setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}/>}

            {!lisäysTila && <button className='nappi' onClick={() => setLisäysTila(true)}>Add new</button>}</h1>

            {!lisäysTila && !muokkausTila &&
            <input placeholder="Search by Last Name" value={search} onChange={handleSearchInputChange} />}   
            
            {!lisäysTila && !muokkausTila &&
            <table id="userTable">
                <thead>
                    <tr>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th> Email</th>
                      <th>Access Level</th>
                    </tr>
                </thead>
                <tbody>
            {
                users && users.map(u =>
                    {
                    const lowerCaseName = u.lastname.toLowerCase() 
                    if (lowerCaseName.indexOf(search) > -1) {
                        return (
                            <tr key={u.userId}>
                                <td>{u.firstname}</td>
                                <td>{u.lastname}</td>
                                <td>{u.email}</td>
                                <td>{u.accesslevelid}</td>
                            </tr>
                                )
                            }
                        }
                    )
                }
                </tbody>
            </table>
            }
        </>
    );
}

export default UserList;