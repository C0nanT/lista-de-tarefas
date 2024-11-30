import api from "./axiosInstance";

export async function addTaskApi(task) {
    try {
        const response = await api.post("tasks.php", task);
        return response.data;
    } catch (error) {
        console.error("#01 - Erro ao criar dados:", error);
        throw error;
    }
}
