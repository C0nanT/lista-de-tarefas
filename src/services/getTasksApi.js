import axios from "./axiosInstance";

export async function getTasksApi() {
    try {
        const response = await axios.get("tasks.php");
        return response.data;
    } catch (error) {
        console.error("#01 - Erro ao buscar dados:", error);
        throw error;
    }
}
