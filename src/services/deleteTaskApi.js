import api from "./axiosInstance";

export async function deleteTaskApi(id) {
    try {
        const response = await api.delete(`tasks.php?id=${id}`);
        return response.data;
    } catch (error) {
        console.error("#01 - Erro ao deletar dados:", error);
        throw error;
    }
}
