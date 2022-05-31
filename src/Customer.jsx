import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import CustomerService from './services/Customer'

// props on nimetty customeriksi
const Customer = ({customer, editCustomer, setIsPositive, setMessage, setShowMessage, reload, reloadNow}) => {

// Komponentin tilan määritys
const [showDetails, setShowDetails] = useState(false)

const deleteCustomer = (customer) => {
    let answer = window.confirm(`Remove customer ${customer.companyName}`)
    
    if (answer === true) {
    CustomerService.remove(customer.customerId)
    .then (res => {
        if (res.status === 200) {
        setMessage(`Successfully removed customer ${customer.companyName}`)
        setIsPositive(true)
        setShowMessage(true)
        window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert
        // Ilmoituksen piilotus
        setTimeout(() => {
        setShowMessage(false)}, 
        5000
        )
        reloadNow(!reload)
        }
            }
        )
        .catch(error => {
            setMessage(error)
            setIsPositive(false)
            setShowMessage(true)
            window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert

            setTimeout(() => {
              setShowMessage(false)  
            }, 6000);
        })

    } // Jos poisto halutaankin perua
    else {
        setMessage(`Deleting cancelled successfully`)
        setIsPositive(true)
        setShowMessage(true)
        window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert
        // Ilmoituksen piilotus
        setTimeout(() => {
        setShowMessage(false)}, 
        5000)

    }
}

  return (
    <div className='custDiv'>
        <h4 onClick={() => setShowDetails(!showDetails)}>
            {customer.companyName} , {customer.country}
        </h4>

        {showDetails && <div className='custDetails'>
            <h3>{customer.companyName}</h3>
            <button onClick={() => deleteCustomer(customer)}>Delete</button>
            <button onClick={() => editCustomer(customer)}>Edit</button>
            <table id="custDetails">
                <thead>
                    <tr>
                        <th>Contact person</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>Country</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{customer.contactName}</td>
                        <td>{customer.phone}</td>
                        <td>{customer.address}</td>
                        <td>{customer.city}</td>
                        <td>{customer.country}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        }
    </div>
  );
}

export default Customer;