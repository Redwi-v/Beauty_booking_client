import axios, { AxiosError } from 'axios'
import { error } from 'console'
import { Cookies } from 'react-cookie'

export const cookies = new Cookies()

const baseUrl = 'https://api.mybeautybooking.ru';
// const baseUrl = 'http://192.168.225.98:8888';

export const apiInstance = axios.create({
	baseURL: baseUrl,
	timeout: 10000,
});

apiInstance.interceptors.response.use(
	response => {
		return response;
	},
	(error: AxiosError) => {
		return Promise.reject(error.response?.data);
	},
);

export const getFileUrl = (fileName: string) => `${baseUrl}/files/${fileName}`; 