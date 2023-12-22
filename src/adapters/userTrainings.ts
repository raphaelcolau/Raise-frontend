import axios, { AxiosError } from "axios";
import { API_URL } from "./api";

export async function getUserTrainings() {
    try {
        const response = await axios.get(`${API_URL}/api/training/current-user`);
        const data = response.data;

        if (data.success) {
            return data.data;
        } else {
            return [];
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            const response = axiosError.response;

            if (response) {
                return [];
            };
        }
    }
}