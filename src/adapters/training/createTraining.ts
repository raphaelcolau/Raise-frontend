import axios from 'axios';
import { API_URL } from '../api';
import { CreateTrainingProps } from '../../components/type/types';

export const postCreateTraining = async (props: CreateTrainingProps) => {
    console.log(props)
  const response = await axios.post(`${API_URL}/api/training`, {
    name: props.name,
    description: props.description,
    trainingDays: props.trainingDays,
    sportPreset: props.sportPreset,
    startDate: props.startDate,
    endDate: props.endDate,
    hasWarmUp: props.hasWarmUp,
    hasStretching: props.hasStretching,
    iconName: props.iconName,
    iconHexadecimalColor: props.iconHexadecimalColor,
  });
  return response.data;
};