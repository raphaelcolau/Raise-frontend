import axios, { AxiosError } from "axios";
import { API_URL } from "./api";
import store from "../store/store";


export function interceptor() {
    axios.interceptors.request.use(
        function (config) {
            const token = store.getState().auth.accessToken;

            if (token) {config.headers.Authorization = `Bearer ${token}`;}
            return config;

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
    const refreshToken = store.getState().auth.refreshToken;

    return (() => {
        if (refreshToken) {
            axios.post(`${API_URL}/api/auth/refreshtoken`, {
                refreshToken: refreshToken
            }).then((response) => {
                const data = response.data;

                if (data.success) {
                    store.dispatch({ type: "auth/setAccessToken", payload: data.data?.accessToken });
                    store.dispatch({ type: "auth/setRefreshToken", payload: data.data?.refreshToken });
                }
            });
        }
    })();
}