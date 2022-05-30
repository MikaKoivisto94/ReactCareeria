import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import ProductService from './services/Product'

const ProductAdd = ({setLisäysTila, setIsPositive, setMessage, setShowMessage}) => {

//Komponentin tilan määritys
const [newProductName, setNewProductName] = useState('')
const [newSupplierId, setNewSupplierId] = useState(0)
const [newCategoryId, setNewCategoryId] = useState(0)

const [newQuantityPerUnit, setNewQuantityPerUnit] = useState('')
const [newUnitPrice, setNewUnitPrice] = useState(0)
const [newUnitsInStock, setNewUnitsInStock] = useState(0)

const [newUnitsOnOrder, setNewUnitsOnOrder] = useState(0)
const [newReorderLevel, setNewReorderLevel] = useState(0)
const [newDiscontinued, setNewDiscontinued] = useState(false)
const [newImageLink, setNewImageLink] = useState('')

// onSubmit tapahtumankäsittelijäfunktio
const handleSubmit = (event) => {
    event.preventDefault()
    var newProduct = {
      productName: newProductName,
      supplierId: parseInt(newSupplierId),
      categoryId: parseInt(newCategoryId),
      quantityPerUnit: newQuantityPerUnit,
      unitPrice: parseFloat(newUnitPrice),
      unitsInStock: parseInt(newUnitsInStock),
      unitsOnOrder: parseInt(newUnitsOnOrder),
      reorderLevel: parseInt(newReorderLevel),
      discontinued: newDiscontinued,
      imageLink: newImageLink
    }

    const token = localStorage.getItem('token')
    ProductService
        .setToken(token)

    ProductService.create(newProduct)
    .then(response => {
      if(response.status === 200) {
        setMessage("Added new product: " + newProduct.productName)
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

const radioChange = (value) => {
    let valinta = value
    if (valinta === "false") {
      setNewDiscontinued(false)
    }
    else {
      setNewDiscontinued(true)
    }
}

  return (
    <div id='addNew'>
        <h2>Product add</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <input type='text' value={newProductName} placeholder='Product Name'
              onChange={({ target }) => setNewProductName(target.value)} required />
          </div>
          <div>
            <input type='text' value={newSupplierId} placeholder='Supplier ID'
              onChange={({ target }) => setNewSupplierId(target.value)} />
          </div>
          <div>
            <input type='text' value={newCategoryId} placeholder='Category ID'
              onChange={({ target }) => setNewCategoryId(target.value)} />
          </div>
          <div>
            <input type='text' value={newQuantityPerUnit} placeholder='Quantity Per Unit'
              onChange={({ target }) => setNewQuantityPerUnit(target.value)} />
          </div>
          <div>
            <input type='text' value={newUnitPrice} placeholder='Unit Price'
              onChange={({ target }) => setNewUnitPrice(target.value)} />
          </div>
          <div>
            <input type='text' value={newUnitsInStock} placeholder='Units In Stock'
              onChange={({ target }) => setNewUnitsInStock(target.value)} />
          </div>
          <div>
            <input type='text' value={newUnitsOnOrder} placeholder='Units On Order'
              onChange={({ target }) => setNewUnitsOnOrder(target.value)} />
          </div>
          <div>
            <input type='text' value={newReorderLevel} placeholder='Reorder Level'
              onChange={({ target }) => setNewReorderLevel(target.value)} />
          </div>
          <div>
            <label>Discontinued</label>
            <div onChange={({target}) => radioChange(target.value)}>
            <input type='radio' name="discontinued" value="true"
              /> No
            <input type='radio' name="discontinued" value="false"
              /> Yes
          </div>
          </div>
          <div>
            <input type='text' value={newImageLink} placeholder='Image Link'
              onChange={({ target }) => setNewImageLink(target.value)} />
          </div>

          <input type='submit' value='Save' />
          <input type='button' value='Back' onClick={() => setLisäysTila(false)} />
        </form>
    </div>
  );
}

export default ProductAdd;