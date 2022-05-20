import logo from './logo.svg';
import './App.css'
import React, {useState, useEffect} from 'react'
import CustomerService from './services/Customer'
import Customer from './Customer'
import CustomerAdd from './CustomerAdd'
import CustomerEdit from './CustomerEdit'

const CustomerList = ({setIsPositive, setShowMessage, setMessage}) => {

//Komponentin tilan määritys
const [customers, setCustomers] = useState([])
const [showCustomers, setShowCustomers] = useState(false)
const [lisäysTila, setLisäysTila] = useState(false)
const [muokkausTila, setMuokkausTila] = useState(false)
const [reload, reloadNow] = useState(false)
const [muokattavaCustomer, setMuokattavaCustomer] = useState(false)

useEffect(() => {
    CustomerService.getAll()
    .then(data => {
        setCustomers(data)
    });
}
,[lisäysTila, reload, muokkausTila]    
)

const editCustomer = (customer) => {
    setMuokattavaCustomer(customer)
    setMuokkausTila(true)
}

  return (
    <>
        <h1><nobr style ={{ cursor: 'pointer '}}
            onClick={() => setShowCustomers(!showCustomers)}>Customers</nobr>
            
            {!lisäysTila && <button className='nappi' onClick={() => setLisäysTila(true)}>Add new</button>}</h1>

            {lisäysTila && <CustomerAdd setLisäysTila={setLisäysTila} 
            setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
            />}

            {muokkausTila && <CustomerEdit setMuokkausTila={setMuokkausTila} 
            setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
            muokattavaCustomer={muokattavaCustomer}
            />}

        {
            showCustomers && customers && customers.map(c => (
                <Customer key={c.customerId} customer={c} reloadNow={reloadNow} reload={reload}
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                editCustomer={editCustomer}
                />
            )
            )
        }
    </>
  );
}

export default CustomerList;