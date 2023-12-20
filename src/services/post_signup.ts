import axios, { AxiosError } from 'axios';
import { SignUpForm } from '../components/type/types';
import { API_URL } from './api';

export const postSignUp = async (form: SignUpForm) => {
    try {
        const response = await axios.post(`${API_URL}/api/auth/signup`, form);

        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            const response = axiosError.response;

            if (response) {
                console.log(response.data);

                return {
                    data: {
                        success: false,
                        message: response.data
                    }
                };
            }


        }


        return {
            data: {
                success: false,
                message: error
            }
        };
    }
}