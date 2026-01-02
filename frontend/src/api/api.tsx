import axios from "axios";

const api = axios.create({
    // baseURL: "http://3.27.131.69:5000/",
    baseURL: "/",
    // baseURL: process.env.REACT_APP_BACKEND_URL,
    withCredentials: true,
})


export default api;