import axios, { AxiosError } from 'axios';
import { SignInForm, SignInPropsRes } from '../components/type/types';
import { API_URL } from './api';
import * as SecureStore from 'expo-secure-store';

export const postSignIn = async (form: SignInForm) => {
    try {
        const response = await axios.post(`${API_URL}/api/auth/signin`, form);
        const data: SignInPropsRes = response.data;


        if (data.success) {
            await SecureStore.setItemAsync("accessToken", data.data?.accessToken ?? "");
            await SecureStore.setItemAsync("refreshToken", data.data?.refreshToken ?? "");
        }

        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            const response = axiosError.response;


            if (response) {
                return {
                    success: false,
                    message: (response.data as any).message
                }
            };
        }
    }

    return {
        success: false,
        message: "Unknown error"
    };
}