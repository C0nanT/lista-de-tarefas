import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const axiosInstance = axios.create({
    baseURL: process.env.BASE_URL,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosInstance;