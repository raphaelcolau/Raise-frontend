import axios, { AxiosError } from "axios";
import { API_URL } from "./api";
import * as SecureStore from 'expo-secure-store';


export function interceptor() {
    axios.interceptors.request.use(
        function (config) {
            const token = SecureStore.getItemAsync("accessToken");
            return token.then((value) => {
                if (value) {
                    config.headers.Authorization = `Bearer ${value}`;
                }
                return config;
            });
        },
        function (error) {

            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                const response = axiosError.response;

                if (response && response.status === 401) {
                    refreshToken();
                }

                return Promise.reject(error);
            }
        }
    );
}


function refreshToken() {
    const refreshToken = SecureStore.getItemAsync("refreshToken");

    return refreshToken.then((value) => {
        if (value) {
            axios.post(`${API_URL}/api/auth/refreshtoken`, {
                refreshToken: value
            }).then((response) => {
                const data = response.data;

                if (data.success) {
                    SecureStore.setItemAsync("accessToken", data.data?.accessToken ?? "");
                    SecureStore.setItemAsync("refreshToken", data.data?.refreshToken ?? "");
                }
            });
        }
    });
}