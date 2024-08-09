import axios from 'axios';

export const setupInterceptors = (setLoading) => {
    axios.interceptors.request.use(
        (config) => {
            setLoading(true);
            return config;
        },
        (error) => {
            setLoading(false);
            return Promise.reject(error);
        }
    );

    axios.interceptors.response.use(
        (response) => {
            setLoading(false);
            return response;
        },
        (error) => {
            setLoading(false);
            return Promise.reject(error);
        }
    );
};