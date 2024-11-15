import axios from 'axios';
const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT || 'https://earthquake.usgs.gov/earthquakes/feed';

const axiosApi = axios.create({
    baseURL: API_ENDPOINT
});

/**
 * HTTP Request using GET method
 * 
 * @param {string} url A url endpoint
 * @param {string} params Query Params 
 * 
 * @returns HTTP Request Response
 */
export const apiGet = async (url: string, params?: Record<string, string>) => {
    try {
        const response = await axiosApi.get(url, {
            params: params,
        });

        if (response.status < 300) {
            return response.data;
        } else {
            throw Error(String(response?.data));
        }
    } catch (error) {
        throw error;
    }
};

// TODO: Add all CRUD apis here.