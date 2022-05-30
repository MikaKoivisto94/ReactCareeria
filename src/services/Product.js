import axios from "axios"

const baseUrl = "https://localhost:44326/api/products"

let token = null

// Tämä on metodi jota kutsutaan aina ennen kuin tehdään muu pyyntö serviceen
// Parametrinä annetaan token joka otetaan local storagesta
const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    const config = {
        headers: { Authorization : token },
    }
    const request = axios.get(baseUrl, config)
    return request.then(response => response.data)
}

const create = (newProduct) => {
    const config = {
        headers: { Authorization : token },
    }
    return axios.post(baseUrl, newProduct, config)
}

const remove = id => {
    const config = {
        headers: { Authorization : token },
    }
    return axios.delete(`${baseUrl}/${id}`, config)
}

const update = (id, object) => {
    const config = {
        headers: { Authorization : token },
    }
    return axios.put(`${baseUrl}/${id}`, object, config)
}


export default { getAll, create, remove, update, setToken }