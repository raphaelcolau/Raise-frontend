import axios from "axios";
import { API_URL } from "../api";
import { Series } from "../../components/type/types";

export interface AddExerciceToTrainingProps {
    trainingID: number;
    exerciceID: number;
    numberOfWarmUpSeries: number;
    notes: string;
    series: Series[];
}

export function addExerciceToTraining(props: AddExerciceToTrainingProps) {
    return axios.post(`${API_URL}/api/training/${props.trainingID}/exercice/${props.exerciceID}`, {
        numberOfWarmUpSeries: props.numberOfWarmUpSeries,
        notes: props.notes,
        series: props.series
    });
}