import { motion as m } from 'framer-motion';
import { useAuth0 } from '@auth0/auth0-react';

const LogIn = () => {
	const { loginWithRedirect } = useAuth0();

	return (
		<main className='h-screen flex flex-col justify-evenly items-center'>
			<m.h1
				initial={{ opacity: 0, fontSize: '1rem' }}
				animate={{ opacity: 1, fontSize: '3rem' }}
				className='tracking-widest'>
				FALTAZO
			</m.h1>
			<section>
				<h2 className='mt-4 mb-8 text-2xl opacity-30 text-center'>Log In</h2>
				<section className='flex gap-4 flex-wrap'>
					<m.button
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
						onClick={() => loginWithRedirect()}
						className='gradient shadow-lg shadow-gray-500/50 h-20 w-full px-11 rounded-xl text-white'>
						Log In / Log In With Google
					</m.button>
				</section>
			</section>
		</main>
	);
};

export default LogIn;
