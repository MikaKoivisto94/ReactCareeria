import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import CustomerService from './services/Customer'

const CustomerEdit = ({setMuokkausTila, setIsPositive, setMessage, setShowMessage, muokattavaCustomer}) => {

//Komponentin tilan määritys
const [newCustomerId, setNewCustomerId] = useState(muokattavaCustomer.customerId)
const [newCompanyName, setNewCompanyName] = useState(muokattavaCustomer.companyName)
const [newContactName, setNewContactName] = useState(muokattavaCustomer.contactName)
const [newContactTitle, setNewContactTitle] = useState(muokattavaCustomer.contactTitle)

const [newCountry, setNewCountry] = useState(muokattavaCustomer.country)
const [newAddress, setNewAddress] = useState(muokattavaCustomer.address)
const [newCity, setNewCity] = useState(muokattavaCustomer.city)

const [newPostalCode, setNewPostalCode] = useState(muokattavaCustomer.postalCode)
const [newPhone, setNewPhone] = useState(muokattavaCustomer.phone)
const [newFax, setNewFax] = useState(muokattavaCustomer.fax)

// onSubmit tapahtumankäsittelijäfunktio
const handleSubmit = (event) => {
    event.preventDefault()
    var newCustomer = {
      customerId: newCustomerId,
      companyName: newCompanyName,
      contactName: newContactName,
      contactTitle: newContactTitle,
      country: newCountry,
      address: newAddress,
      city: newCity,
      postalCode: newPostalCode,
      phone: newPhone,
      fax: newFax
    }

    CustomerService.update(newCustomer)
    .then(response => {
      if(response.status === 200) {
        setMessage("Edited existing customer: " + newCustomer.companyName)
        setIsPositive(true)
        setShowMessage(true)
        
        setTimeout(() => {
          setShowMessage(false)
        }, 5000)
        setMuokkausTila(false)
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

  return (
    <div id='edit'>
        <h2>Customer edit</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <input type='text' value={newCustomerId} disabled />
          </div>
          <div>
            <input type='text' value={newCompanyName} placeholder='Company Name'
              onChange={({ target }) => setNewCompanyName(target.value)} required />
          </div>
          <div>
            <input type='text' value={newContactName} placeholder='Contact Name'
              onChange={({ target }) => setNewContactName(target.value)} />
          </div>
          <div>
            <input type='text' value={newContactTitle} placeholder='Contact Title'
              onChange={({ target }) => setNewContactTitle(target.value)} />
          </div>
          <div>
            <input type='text' value={newAddress} placeholder='Address'
              onChange={({ target }) => setNewAddress(target.value)} />
          </div>
          <div>
            <input type='text' value={newCity} placeholder='City'
              onChange={({ target }) => setNewCity(target.value)} />
          </div>
          <div>
            <input type='text' value={newPostalCode} placeholder='Postal Code'
              onChange={({ target }) => setNewPostalCode(target.value)} />
          </div>
          <div>
            <input type='text' value={newCountry} placeholder='Country'
              onChange={({ target }) => setNewCountry(target.value)} />
          </div>
          <div>
            <input type='text' value={newPhone} placeholder='Phone'
              onChange={({ target }) => setNewPhone(target.value)} />
          </div>
          <div>
            <input type='text' value={newFax} placeholder='Fax'
              onChange={({ target }) => setNewFax(target.value)} />
          </div>

          <input type='submit' value='Save' />
          <input type='button' value='Back' onClick={() => setMuokkausTila(false)} />
        </form>
    </div>
  );
}

export default CustomerEdit;