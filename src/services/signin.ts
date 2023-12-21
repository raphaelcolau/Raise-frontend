import axios, { AxiosError } from 'axios';
import { SignInForm, SignInPropsRes } from '../components/type/types';
import { API_URL } from './api';

export const postSignIn = async (form: SignInForm) => {
    try {
        const response = await axios.post(`${API_URL}/api/auth/signin`, form);
        const data: SignInPropsRes = response.data;

        //Save the tokens to the storage
        console.log(data)

        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            const response = axiosError.response;

            if (response) {
                return {success: false}
            };
        }
    }

    return {success: false};
}