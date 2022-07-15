import { motion as m } from 'framer-motion';
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
		</main>
	);
};
export default Notifications;
