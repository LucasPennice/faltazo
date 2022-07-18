import axios from 'axios';
import { BACKEND_URL } from '../utils';

export const getAllNotifications = () => {
	return axios.get(`${BACKEND_URL}/notifications`).then((res) => {
		return res.data;
	});
};
