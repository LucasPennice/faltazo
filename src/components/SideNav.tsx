import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { motion as m } from 'framer-motion';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdOutlineClose } from 'react-icons/md';
import { NotificationContext } from '../App';

const SideNav = () => {
	const notificationData = React.useContext(NotificationContext);

	const [sideNavOpen, setSideNavOpen] = React.useState(false);

	const closeNav = () => setSideNavOpen(false);

	return (
		<m.section
			className='gradient absolute rounded max-w-4xl shadow-xl shadow-black-400 z-10'
			initial={{ opacity: 0.5, width: '1rem', height: '1rem' }}
			animate={{
				margin: sideNavOpen ? '0rem' : '1rem',
				opacity: 1,
				borderRadius: sideNavOpen ? '0rem 0rem 1rem 1rem' : '50%',
				width: sideNavOpen ? '100%' : '3rem',
				height: sideNavOpen ? '30rem' : '3rem',
			}}
			transition={{ type: 'spring', stiffness: 100, damping: 15 }}>
			<m.button
				className='w-12 h-12 rounded-full flex justify-center items-center'
				onClick={() => setSideNavOpen(!sideNavOpen)}
				animate={{
					backgroundColor: sideNavOpen ? 'white' : 'transparent',
					margin: sideNavOpen ? '1rem' : '0rem',
					color: sideNavOpen ? 'black' : 'white',
				}}>
				{sideNavOpen ? <MdOutlineClose /> : <GiHamburgerMenu />}
			</m.button>
			{notificationData &&
				!notificationData.isLoading &&
				!notificationData.error &&
				notificationData.data!.length &&
				!sideNavOpen && <NotificationCounter qty={notificationData.data!.length} />}
			{sideNavOpen && (
				<m.div
					className='flex flex-wrap p-8 gap-8'
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3 }}>
					<NavLink to='/' onClick={closeNav}>
						<div className='h-24 min-w-24 px-4 bg-white rounded flex justify-center items-center shadow-xl shadow-black-400 tracking-wider'>
							HOME
						</div>
					</NavLink>
					<NavLink to='/search' onClick={closeNav}>
						<div className='h-24 min-w-24 px-4 bg-white rounded flex justify-center items-center shadow-xl shadow-black-400 tracking-wider'>
							SEARCH
						</div>
					</NavLink>
					<NavLink to='/create' onClick={closeNav}>
						<div className='h-24 min-w-24 px-4 bg-white rounded flex justify-center items-center shadow-xl shadow-black-400 tracking-wider'>
							CREATE GROUPE
						</div>
					</NavLink>
					<NavLink to='/notifications' onClick={closeNav}>
						<div className='h-24 min-w-24 px-4 bg-white rounded flex justify-center items-center shadow-xl shadow-black-400 tracking-wider'>
							NOTIFICATIONS
						</div>
					</NavLink>
					<NavLink to='/settings' onClick={closeNav}>
						<div className='h-24 min-w-24 px-4 bg-white rounded flex justify-center items-center shadow-xl shadow-black-400 tracking-wider'>
							SETTINGS
						</div>
					</NavLink>
				</m.div>
			)}
		</m.section>
	);
};

export default SideNav;

const NotificationCounter = ({ qty }: { qty: number }) => {
	return (
		<m.aside
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.7 }}
			className='animate-pulse absolute bottom-0 right-0 bg-white w-5 h-5 rounded-full shadow shadow-black-400 flex justify-center items-center'>
			{qty}
		</m.aside>
	);
};
