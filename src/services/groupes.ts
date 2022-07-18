import axios from 'axios';
import { BACKEND_URL } from '../utils';

export const getUserGroupes = () => {
	return axios.get(`${BACKEND_URL}/groupes`).then((res) => {
		return res.data;
	});
};
