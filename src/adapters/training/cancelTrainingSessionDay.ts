import axios from "axios";
import { API_URL } from "../api";

export interface ValidateTrainingSessionProps {
    id: number;
    date: Date;
}

export function cancelTrainingSessionDay({ id, date }: ValidateTrainingSessionProps) {
    return axios.delete(`${API_URL}/api/training/${id}/cancel-training-session-day/${date.toISOString()}`);
}