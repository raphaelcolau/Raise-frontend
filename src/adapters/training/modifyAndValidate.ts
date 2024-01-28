import axios from 'axios';
import { API_URL } from '../api';
import { Training } from '../../components/type/types';
import store from '../../store/store';

export const modifyAndValidate = async (props: Training[]) => {
    try {
        const storedDate = store.getState().currentDay.day;
        const FormatDate = new Date(storedDate).toISOString();
        console.log("-------------------")
        console.log(props[0])
        console.log("-------------------")
      
        const response = await axios.post(`${API_URL}/api/training/${props[0].trainingId}/modify-and-validate/${FormatDate}`, {
          "trainingSession": props
        });
      
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as any;
            const response = axiosError.response;

            if (response) {
                console.log(response.data);
                // console.log(response.status);
                // console.log(response.headers);
                // console.log(response.config);
                return response.data;
            };
        }
    }
};