import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import ProductService from './services/Product'

// props on nimetty productiksi
const Product = ({product, editProduct, setIsPositive, setMessage, setShowMessage, reload, reloadNow}) => {

// Komponentin tilan määritys
const [showDetails, setShowDetails] = useState(false)

const deleteProduct = (product) => {
    let answer = window.confirm(`Remove product ${product.productName}`)
    
    if (answer === true) {
    ProductService.remove(product.productName)
    .then (res => {
        if (res.status === 200) {
        setMessage(`Successfully removed product ${product.productName}`)
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
    <div className='prodDiv'>
        <h4 onClick={() => setShowDetails(!showDetails)}>
            {product.productName}
        </h4>

        {showDetails && <div className='prodDetails'>
            <h3>{product.productName}</h3>
            <button onClick={() => deleteProduct(product)}>Delete</button>
            <button onClick={() => editProduct(product)}>Edit</button>
            <table>
                <thead>
                    <tr>
                        <th>Supplier ID</th>
                        <th>Category ID</th>
                        <th>Quantity Per Unit</th>
                        <th>Unit Price</th>
                        <th>Units In Stock</th>
                        <th>Units On Order</th>
                        <th>Discontinued</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{product.supplierId}</td>
                        <td>{product.categoryId}</td>
                        <td>{product.quantityPerUnit}</td>
                        <td>{product.unitPrice}</td>
                        <td>{product.unitsInStock}</td>
                        <td>{product.unitsOnOrder}</td>
                        <td>{product.Discontinued}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        }
    </div>
  );
}

export default Product;