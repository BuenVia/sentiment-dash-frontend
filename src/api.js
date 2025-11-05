import axios from "axios"

const api = axios.create({
    baseURL: "https://mattclifford.pythonanywhere.com/api"
    // baseURL: "http://127.0.0.1:8000/api"
})

export default api