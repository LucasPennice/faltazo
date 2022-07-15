import { motion as m } from 'framer-motion';

const Toggle = ({ data, label }: { data: [boolean, (value: boolean) => void]; label: [string, string] }) => {
	const [value, setter] = data;
	const [title, subtitle] = label;
	const toggleSwitch = () => setter(!value);

	return (
		<section onClick={toggleSwitch} className='flex justify-between items-center'>
			<aside>
				<h1 className='text-3xl'>{title}</h1>
				<h2 className='text-xl opacity-50'>{subtitle}</h2>
			</aside>
			<div
				className={`cursor-pointer w-24 h-12 gradient flex rounded-3xl p-2 ${value ? 'justify-end' : 'justify-start'}`}>
				<m.div
					className='w-8 h-8 rounded-full bg-white'
					layout
					transition={{
						type: 'spring',
						stiffness: 700,
						damping: 30,
					}}
				/>
			</div>
		</section>
	);
};

export default Toggle;
