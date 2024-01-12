import axios from 'axios';
import { API_URL } from '../api';
import { TrainingProps } from '../../components/type/types';

export const postCreateTraining = async (props: TrainingProps) => {
  const response = await axios.post(`${API_URL}/api/training`, {
    name: props.name,
    description: props.description,
    trainingDays: props.trainingDays,
    sportPreset: props.sportPreset,
    startDate: props.startDate,
    endDate: props.endDate,
    hasWarmUp: props.hasWarmUp,
    hasStretching: props.hasStretching,
    iconName: "icon_" + props.iconName,
    iconHexadecimalColor: props.iconHexadecimalColor,
  });
  return response.data;
};