export const BACKEND_URL = import.meta.env.PROD ? 'https://faltazo-server.vercel.app/api' : 'http://localhost:3200/api';
export const LOGIN_ROUTE = import.meta.env.PROD
	? 'https://faltazo-server.vercel.app/login'
	: 'http://localhost:3200/login';
