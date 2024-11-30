import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://lista.localhost/api/",
    timeout: 10000,
});

export default axiosInstance;
