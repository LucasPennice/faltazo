import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { motion as m } from 'framer-motion';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdOutlineClose } from 'react-icons/md';
import { NotificationContext } from '../App';
import { useAuth0 } from '@auth0/auth0-react';

const SideNav = () => {
	const notificationData = React.useContext(NotificationContext);
	const [sideNavOpen, setSideNavOpen] = React.useState(false);
	const { logout, user, isAuthenticated, isLoading } = useAuth0();
	const closeNav = () => setSideNavOpen(false);

	const isNotificationDataAvailable = () => {
		return notificationData && !notificationData.isLoading && !notificationData.error && notificationData.data!.length;
	};

	return (
		<m.section
			className='gradient absolute rounded max-w-4xl shadow-xl shadow-black-400 z-10'
			initial={{ opacity: 0.5, width: '1rem', height: '1rem' }}
			animate={{
				margin: sideNavOpen ? '0rem' : '1rem',
				opacity: 1,
				borderRadius: sideNavOpen ? '0rem 0rem 1rem 1rem' : '50%',
				width: sideNavOpen ? '100%' : '3rem',
				height: sideNavOpen ? '40rem' : '3rem',
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
			{isNotificationDataAvailable() && !sideNavOpen && <NotificationCounter qty={notificationData!.data!.length} />}
			{sideNavOpen && (
				<m.section
					className='p-8'
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.6 }}>
					<aside className='flex items-center mb-8 gap-4'>
						{user && <img src={user?.picture} className='h-10 w-10 rounded-full shadow-xl shadow-black-400' />}
						<m.h1 className='text-xl text-white tracking-wider'>Hello, {user && user.name}</m.h1>
					</aside>
					<m.div className='flex flex-wrap gap-8'>
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
								NOTIFICATIONS{' '}
								<mark style={{ color: '#CB56EC' }} className='bg-transparent pl-2 text-xl'>
									{isNotificationDataAvailable() && notificationData!.data!.length}
								</mark>
							</div>
						</NavLink>
						<NavLink to='/settings' onClick={closeNav}>
							<div className='h-24 min-w-24 px-4 bg-white rounded flex justify-center items-center shadow-xl shadow-black-400 tracking-wider'>
								SETTINGS
							</div>
						</NavLink>
						<div
							onClick={() => logout({ returnTo: window.location.origin })}
							className='h-24 min-w-24 px-4 bg-white rounded flex justify-center items-center shadow-xl shadow-black-400 tracking-wider cursor-pointer'>
							LOG OUT
						</div>
					</m.div>
				</m.section>
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
