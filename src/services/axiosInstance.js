import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://lista-de-tarefas-back.test/api/",
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosInstance;
