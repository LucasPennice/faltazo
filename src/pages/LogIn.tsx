import { motion as m } from 'framer-motion';

const LogIn = ({ setIsLogin }: { setIsLogin: (value: boolean) => void }) => {
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
						onClick={() => setIsLogin(true)}
						className='gradient shadow-lg shadow-gray-500/50 h-20 w-20 rounded-xl text-white'>
						Google
					</m.button>
					<m.button
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3 }}
						onClick={() => setIsLogin(true)}
						className='gradient shadow-lg shadow-gray-500/50 h-20 w-20 rounded-xl text-white'>
						GitHub
					</m.button>
					<m.button
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.4 }}
						onClick={() => setIsLogin(true)}
						className='gradient shadow-lg shadow-gray-500/50 h-20 w-20 rounded-xl text-white'>
						Twitter
					</m.button>
				</section>
			</section>
		</main>
	);
};

export default LogIn;
