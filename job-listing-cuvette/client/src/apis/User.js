import axios from 'axios';
import { toast } from 'react-toastify';
import { handleApiRes, handleApiErr } from '../utils/apiUtils';
const baseURL = import.meta.env.VITE_API_BASE_URL;

export const userLoginApi = async (userData) => {
    try {
        const response = await axios.post(`${baseURL}/user/login`, userData);

        const { status, token } = response.data;
        if (status === 'success') {
            return token;
        } else {
            handleApiRes(response.data);
        }
    } catch (error) {
        handleApiErr(error, navigate);
    }
};

export const userRegisterApi = async (userData) => {
    try {
        const response = await axios.post(`${baseURL}/user/register`, userData);

        const { status, msg, token } = response.data;
        if (status === 'success') {
            toast.success(msg);
            return token;
        } else {
            handleApiRes(response.data);
        }
    } catch (error) {
        handleApiErr(error, navigate);
    }
};

export const userDashboardApi = async (token) => {
    try {
        const response = await axios.get(`${baseURL}/user/dashboard`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        const { status, data } = response.data;
        if (status === 'success') {
            return data;
        } else {
            handleApiRes(response.data);
        }
    } catch (error) {
        handleApiErr(error, navigate);
    }
};