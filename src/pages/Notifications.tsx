import { motion as m, useMotionValue, useTransform } from 'framer-motion';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { notification } from '../types';

const Notifications = ({ notificationStack }: { notificationStack: notification[] }) => {
	if (notificationStack.length === 0)
		return (
			<main className='pt-28 mx-4'>
				<m.h1
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3 }}
					className='h-full text-center text-2xl'>
					No Notificaciones? 👀
				</m.h1>
			</main>
		);

	return (
		<main className='pt-28 mx-4'>
			<m.h1
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.3 }}
				className='h-full text-center text-2xl'>
				Notificaciones
			</m.h1>
			<m.h2
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 0.5, y: 0 }}
				transition={{ delay: 0.4 }}
				className='h-full text-center text-xl'>
				Swipe
			</m.h2>

			{notificationStack.map((item, idx) => {
				return <NotificationCard key={idx} idx={idx} item={item} />;
			})}
		</main>
	);
};
export default Notifications;

const NotificationCard = ({ idx, item }: { idx: number; item: notification }) => {
	const x = useMotionValue(0);
	const background = useTransform(x, [-150, 0, 150], ['#FB4D3D', '#AB54E4', '#78BC61']);

	useEffect(
		() =>
			x.onChange((latest) => {
				if (latest >= 150) {
					toast(`aceptada`, {
						toastId: 'dqwd',
					});
				} else if (latest <= -150) {
					toast('cancelada', {
						toastId: 'qwdqwdq',
					});
				}
			}),
		[]
	);

	return (
		<m.div
			key={idx}
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.5 + idx / 10 }}
			className='w-full shadow-lg shadow-black-300 my-4 h-40 p-6 rounded flex justify-between items-center'
			drag='x'
			style={{ x, backgroundColor: background }}
			dragConstraints={{
				left: 0,
				right: 0,
			}}>
			<img src={item.target.img} className='w-20 h-20 rounded-full object-cover shadow-lg shadow-black-300' />
			<h1 className='text-white'>
				{item.solicitador.nombre} solicita ponerle falta a {item.target.nombre}
			</h1>
		</m.div>
	);
};
