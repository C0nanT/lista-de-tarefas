import axios from "./axiosInstance";

export async function completeTaskApi(id) {
    try {
        const response = await axios.patch(`tasks.php?id=${id}`);
        return response.data;
    } catch (error) {
        console.error("#01 - Erro ao completar task:", error);
        throw error;
    }
}
