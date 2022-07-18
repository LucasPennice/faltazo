import { motion as m } from 'framer-motion';

const LoadingIcon = () => {
	return (
		<m.section className='w-full flex justify-center' initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}>
			<div className='lds-ring'>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</m.section>
	);
};

export default LoadingIcon;
