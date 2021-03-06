import { motion as m } from 'framer-motion';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { GroupesContext } from '../App';
import LoadingIcon from '../components/LoadingIcon';
import { groupe } from '../types';

const PasarFalta = () => {
	const groupesData = useContext(GroupesContext);

	if (!groupesData || groupesData.isLoading) return <LoadingIcon />;

	if (groupesData.error) return <div>There has been an error fetching the groupe data</div>;

	if (groupesData.data!.length === 0)
		return (
			<m.main initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className='pt-28 mx-4 text-center text-xl'>
				No hay grupos
				<section className='flex justify-center gap-6 mt-8'>
					<NavLink to='/search'>
						<div className='h-24 min-w-24 px-4 gradient text-white rounded flex justify-center items-center shadow-xl shadow-black-400 tracking-wider'>
							BUSCAR
						</div>
					</NavLink>
					<NavLink to='/create'>
						<div className='h-24 min-w-24 px-4 gradient text-white rounded flex justify-center items-center shadow-xl shadow-black-400 tracking-wider'>
							CREAR GRUPO
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
			{groupesData.data!.map((item: groupe, idx: number) => {
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
