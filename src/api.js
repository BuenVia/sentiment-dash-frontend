import axios from "axios"

const api = axios.create({
    baseURL: "https://mattclifford.pythonanywhere.com/api"
})

export default api