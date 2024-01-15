import axios from "axios";
import { API_URL } from "../api";
import { Series } from "../../components/type/types";

export interface AddExerciseToTrainingProps {
    trainingID: number;
    exerciceID: number;
    numberOfWarmUpSeries: number;
    notes: string;
    series: Series[];
}

export function addExerciseToTraining(props: AddExerciseToTrainingProps) {
    //Remove completed and ID from series
    const series = props.series.map((serie) => {
        const { completed, id, ...rest } = serie;
        return rest;
    })

    return axios.post(`${API_URL}/api/training/${props.trainingID}/exercise/${props.exerciceID}`, {
        numberOfWarmUpSeries: props.numberOfWarmUpSeries,
        notes: props.notes,
        series: series
    });
}