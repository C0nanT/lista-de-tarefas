import api from "./axiosInstance";

export async function editTaskApi(task) {
    try {
        const response = await api.put("tasks.php", task);
        return response.data;
    } catch (error) {
        console.error("#01 - Erro ao deletar dados:", error);
        throw error;
    }
}
