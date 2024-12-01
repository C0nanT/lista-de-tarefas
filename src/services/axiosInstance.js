import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const baseURL = "sua_url_base_aqui";

const axiosInstance = axios.create({
    baseURL: baseURL + "/api/",
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosInstance;