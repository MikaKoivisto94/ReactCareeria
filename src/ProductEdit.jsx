import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import ProductService from './services/Product'

const ProductEdit = ({setMuokkausTila, setIsPositive, setMessage, setShowMessage, muokattavaProduct}) => {

//Komponentin tilan määritys
const [newProductName, setNewProductName] = useState(muokattavaProduct.productName)
const [newSupplierId, setNewSupplierId] = useState(muokattavaProduct.supplierId)
const [newCategoryId, setNewCategoryId] = useState(muokattavaProduct.categoryId)

const [newQuantityPerUnit, setNewQuantityPerUnit] = useState(muokattavaProduct.quantityPerUnit)
const [newUnitPrice, setNewUnitPrice] = useState(muokattavaProduct.unitPrice)
const [newUnitsInStock, setNewUnitsInStock] = useState(muokattavaProduct.unitsInStock)

const [newUnitsOnOrder, setNewUnitsOnOrder] = useState(muokattavaProduct.unitsOnOrder)
const [newReorderLevel, setNewReorderLevel] = useState(muokattavaProduct.reorderLevel)
const [newDiscontinued, setNewDiscontinued] = useState(muokattavaProduct.discontinued)
const [newImageLink, setNewImageLink] = useState(muokattavaProduct.imageLink)

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

    ProductService.update(muokattavaProduct.productId, newProduct)
    .then(response => {
      if(response.status === 200) {
        setMessage("Edited product: " + newProduct.productName)
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
        <h2>Product edit</h2>

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

          <input type='submit' value='Save' />
          <input type='button' value='Back' onClick={() => setMuokkausTila(false)} />
        </form>
    </div>
  );
}

export default ProductEdit;