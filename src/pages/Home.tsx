import { motion as m } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
	Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { notificationFalta } from '../types';
import LoadingIcon from '../components/LoadingIcon';
import { useContext, useEffect } from 'react';
import { NotificationContext } from '../App';
import { useAuth0 } from '@auth0/auth0-react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

export const options = {
	responsive: true,
	plugins: {
		legend: {
			position: 'top' as const,
		},
		title: {
			display: true,
			text: 'Chart.js Line Chart',
		},
	},
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
	labels,
	datasets: [
		{
			fill: true,
			label: 'Dataset 2',
			data: [0, 10, 5, 2, 20, 30, 45],
			borderColor: '#AB54E4',
			backgroundColor: 'rgba(236, 89, 246, 0.3)',
		},
	],
};

const Home = () => {
	const notificationData = useContext(NotificationContext);

	return (
		<main className='pt-24 mx-4'>
			<NavLink to='/pasarFalta'>
				<m.section
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3 }}
					className='p-4 my-4 m-auto text-white uppercase tracking-wider rounded text-center shadow-xl shadow-black-400 gradient'
					style={{ width: 'calc(100% - 4rem)' }}>
					PASAR FALTA
				</m.section>
			</NavLink>
			{notificationData && notificationData.isLoading && <LoadingIcon />}
			{notificationData && !notificationData.isLoading && !notificationData.error && notificationData.data?.length && (
				<NavLink to='/notifications'>
					<m.section
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3 }}
						className='p-4 my-4 m-auto text-white uppercase tracking-wider rounded text-center shadow-xl shadow-black-400 gradient'
						style={{ width: 'calc(100% - 4rem)' }}>
						Votaciones Pendientes
					</m.section>
				</NavLink>
			)}

			<m.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
				<Line options={options} data={data} />
			</m.div>
		</main>
	);
};
export default Home;
