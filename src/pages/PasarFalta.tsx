import { motion as m } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { groupe } from '../types';

const PasarFalta = ({ userGroupes }: { userGroupes: groupe[] }) => {
	if (userGroupes.length === 0)
		return (
			<m.main
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				className='pt-28 mx-4 text-center text-3xl'>
				No hay grupos
				<section className='flex justify-between mt-8'>
					<NavLink to='/search'>
						<div className='h-24 min-w-24 px-4 gradient text-white rounded flex justify-center items-center shadow-xl shadow-black-400 tracking-wider'>
							SEARCH
						</div>
					</NavLink>
					<NavLink to='/create'>
						<div className='h-24 min-w-24 px-4 gradient text-white rounded flex justify-center items-center shadow-xl shadow-black-400 tracking-wider'>
							CREATE GROUPE
						</div>
					</NavLink>
				</section>
			</m.main>
		);

	return (
		<main className='pt-28 mx-4'>
			<m.h1 className='text-center text-3xl' initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}>
				Seleccionar un grupo
			</m.h1>
			{userGroupes.map((item: groupe, idx: number) => {
				return (
					<NavLink to={`/falta:${item.id}`} state={{ groupeParticipants: item.participants }} key={idx}>
						<m.div
							initial={{ opacity: 0, y: 50 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.3 + idx / 10 }}
							className='my-6 rounded h-20 flex justify-between items-center px-8 shadow-xl shadow-black-400 gradient'>
							<img src={item.img} className='w-12 h-12 rounded-full border border-black bg-white' />
							<aside className='text-white uppercase tracking-wider text-right'>
								<h1>{item.name}</h1>
								<h2 className='opacity-50'>{item.participants.length} integrantes</h2>
							</aside>
						</m.div>
					</NavLink>
				);
			})}
		</main>
	);
};

export default PasarFalta;
