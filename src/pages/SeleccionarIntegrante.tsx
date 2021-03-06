import * as React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { userData } from '../types';
import { motion as m, useMotionValue, useTransform } from 'framer-motion';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';

const SeleccionarIntegrante = () => {
	let location = useLocation();

	if (!location.state) return <Navigate to='/' replace={true} />;

	const state: any = location.state;
	console.log(state.groupeParticipants);

	return (
		<main className='pt-28 mx-4'>
			<m.h1 className='text-center text-3xl' initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}>
				Seleccionar al faltador
			</m.h1>
			<m.h2 className='text-center text-xl' initial={{ opacity: 0, y: 50 }} animate={{ opacity: 0.5, y: 0 }}>
				Swipe
			</m.h2>
			{state.groupeParticipants.map((user: userData, idx: number) => {
				return <SwippeableCard key={idx} idx={idx} data={user} />;
			})}
			<ToastContainer position={'top-center'} theme={'dark'} />
		</main>
	);
};

export default SeleccionarIntegrante;

const SwippeableCard = ({ idx, data }: { idx: number; data: userData }) => {
	const { nombre, img, bio } = data;
	const x = useMotionValue(0);
	const background = useTransform(x, [-150, 0, 150], ['#FB4D3D', '#AB54E4', '#FB4D3D']);

	useEffect(
		() =>
			x.onChange((latest) => {
				if (latest >= 150 || latest <= -150)
					toast(`matamos a ${nombre}`, {
						toastId: nombre,
					});
			}),
		[]
	);

	return (
		<m.div
			key={idx}
			drag='x'
			dragConstraints={{
				left: 0,
				right: 0,
			}}
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.3 + idx / 10 }}
			className='my-6 rounded h-20 flex justify-between items-center px-8 shadow-xl shadow-black-400'
			style={{ backgroundColor: background, x }}>
			<img src={img} className='w-12 h-12 rounded-full border border-black bg-white' />
			<aside className='text-white uppercase tracking-wider text-right'>
				<h1>{nombre}</h1>
				<h2 className='opacity-50'>{bio}</h2>
			</aside>
		</m.div>
	);
};
