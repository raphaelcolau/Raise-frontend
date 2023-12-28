import axios from "axios";
import { API_URL } from "../api";

export interface ValidateTrainingSessionProps {
    id: number;
    date: Date;
}

export function validateTrainingSession({ id, date }: ValidateTrainingSessionProps) {
    //url = http://localhost:8081/api/training/:id/validate/:trainingDate
    return axios.post(`${API_URL}/api/training/${id}/validate/${date.toISOString()}`);
}