import axios, { AxiosError } from "axios";
import { API_URL } from "./api";
import { Training } from "../components/type/types";

export async function getUserTrainings(selectedDay: Date) {
    try {
        const response = await axios.get(`${API_URL}/api/training/validate-training-day/${selectedDay.toISOString()}`);
        const data = response.data;
        const trainings: Array<Training> = data.data;

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