import axios from 'axios'

const url = "https://localhost:44326/api/authentication"

const authenticate = (userForAuth) => {
    const request = axios.post(url, userForAuth)
    return request.then(response => response)
}

export default { authenticate }