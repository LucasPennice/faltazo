import { AnimatePresence, motion as m, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { notificationFalta } from '../types';

type PropTypes = {
	notificationStack: notificationFalta[];
	deleteNotification: (action: 'accept' | 'reject', idxInStack: string) => void;
};

const Notifications = ({ notificationStack, deleteNotification }: PropTypes) => {
	useEffect(() => {
		console.log(notificationStack);
	}, [notificationStack]);

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
		<m.main className='pt-28 mx-4' animate={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 50 }}>
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

			<AnimatePresence>
				{notificationStack.map((item, idx) => {
					return <NotificationCard key={item.idNotif} idx={idx} item={item} deleteNotification={deleteNotification} />;
				})}
			</AnimatePresence>
			<ToastContainer position={'top-center'} theme={'dark'} />
		</m.main>
	);
};
export default Notifications;

type NotificationsPropTypes = {
	idx: number;
	item: notificationFalta;
	deleteNotification: (action: 'accept' | 'reject', idxInStack: string) => void;
};

const NotificationCard = ({ idx, item, deleteNotification }: NotificationsPropTypes) => {
	const x = useMotionValue(0);
	const background = useTransform(x, [-150, 0, 150], ['#FB4D3D', '#AB54E4', '#78BC61']);
	const [action, setAction] = useState<undefined | 'accept' | 'reject'>(undefined);

	useEffect(() => {
		const unsubscribeX = x.onChange((latest) => {
			if (latest >= 150) {
				if (action) return;
				toast(`aceptada`, {
					toastId: 'dqwd',
				});
				setAction('accept');
			} else if (latest <= -150) {
				if (action) return;
				toast('cancelada', {
					toastId: 'qwdqwdq',
				});
				setAction('reject');
			}
		});
		return () => unsubscribeX();
	}, []);

	useEffect(() => {
		if (action === 'accept') deleteNotification('accept', item.idNotif);
		if (action === 'reject') deleteNotification('reject', item.idNotif);
	}, [action]);

	return (
		<m.div
			key={idx}
			exit={{ opacity: 0, y: -50 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.5 + idx / 10 }}
			className='w-full shadow-lg shadow-black-300 my-4 h-40 p-6 rounded flex justify-between items-center'
			drag={action === undefined ? 'x' : undefined}
			style={{ x, backgroundColor: background }}
			dragConstraints={{
				left: 0,
				right: 0,
			}}>
			<img src={item.target.img} className='w-20 h-20 rounded-full object-cover shadow-lg shadow-black-300' />
			<h1 className='text-white w-2/3'>
				{item.creator.nombre} solicita ponerle falta a {item.target.nombre}
			</h1>
		</m.div>
	);
};
