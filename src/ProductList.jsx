import logo from './logo.svg';
import './App.css'
import React, {useState, useEffect} from 'react'
import ProductService from './services/Product'
import Product from './Product'
import ProductAdd from './ProductAdd'
import ProductEdit from './ProductEdit'

const ProductList = ({setIsPositive, setShowMessage, setMessage}) => {

//Komponentin tilan määritys
const [products, setProducts] = useState([])
const [showProducts, setShowProducts] = useState(false)
const [lisäysTila, setLisäysTila] = useState(false)
const [muokkausTila, setMuokkausTila] = useState(false)
const [reload, reloadNow] = useState(false)
const [muokattavaProduct, setMuokattavaProduct] = useState(false)
const [search, setSearch] = useState("")

useEffect(() => {
    const token = localStorage.getItem('token')
        ProductService
            .setToken(token)

    ProductService.getAll()
    .then(data => {
        setProducts(data)
    });
}
,[lisäysTila, reload, muokkausTila]    
)

// Hakukentän onChange tapahtumankäsittelijä
const handleSearchInputChange = (event) => {
    setShowProducts(true)
    setSearch(event.target.value.toLowerCase())
}

const editProduct = (product) => {
    setMuokattavaProduct(product)
    setMuokkausTila(true)
}

  return (
    <>
        <h1><nobr style ={{ cursor: 'pointer '}}
            onClick={() => setShowProducts(!showProducts)}>Products</nobr>

            {!lisäysTila && <button className='nappi' onClick={() => setLisäysTila(true)}>Add new</button>}</h1>

            {!lisäysTila && !muokkausTila &&
            <input placeholder="Search by product name" value={search} onChange={handleSearchInputChange} />
            }   

            {lisäysTila && <ProductAdd setLisäysTila={setLisäysTila} 
            setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
            />}

            {muokkausTila && <ProductEdit setMuokkausTila={setMuokkausTila} 
            setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
            muokattavaProduct={muokattavaProduct}
            />}

        {
            !lisäysTila && !muokkausTila && showProducts && products && products.map(p =>
                {
                   const lowerCaseName = p.productName.toLowerCase() 
                   if (lowerCaseName.indexOf(search) > -1) {
                       return (
                        <Product key={p.productId} product={p} reloadNow={reloadNow} reload={reload}
                        setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                        editProduct={editProduct}
                        />
                      )
                   }
                }
            )
        }
    </>
  );
}

export default ProductList;