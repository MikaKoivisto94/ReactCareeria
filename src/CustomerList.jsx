import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';
import CustomerService from './services/Customer'
import Customer from './Customer';
import CustomerAdd from './CustomerAdd';

const CustomerList = () => {

//Komponentin tilan määritys
const [customers, setCustomers] = useState([])
const [showCustomers, setShowCustomers] = useState(false)
const [lisäysTila, setLisäysTila] = useState(false)

useEffect(() => {
    CustomerService.getAll()
    .then(data => {
        setCustomers(data)
    });
}
,[]    
)

  return (
    <>
        <h1><nobr style ={{ cursor: 'pointer '}}
            onClick={() => setShowCustomers(!showCustomers)}>Customers</nobr>
            {!lisäysTila && <button className='nappi' onClick={() => setLisäysTila(true)}>Add new</button>}</h1>

            {lisäysTila && <CustomerAdd setLisäysTila={setLisäysTila}/>}

        {
            showCustomers && customers && customers.map(c => (
                <Customer key={c.customerId} customer={c}/>
            )
            )
        }
    </>
  );
}

export default CustomerList;