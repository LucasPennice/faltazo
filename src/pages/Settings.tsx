import { useState } from 'react';
import { motion as m } from 'framer-motion';
import Toggle from '../components/Toggle';

const Settings = () => {
	const [isOn, setIsOn] = useState(false);

	return (
		<m.main
			className='pt-28 mx-4 flex flex-col gap-5'
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.3 }}>
			<Toggle data={[isOn, setIsOn]} label={['Dark Mode', 'Turns dark mode']} />
			<Toggle data={[isOn, setIsOn]} label={['Gamer Mode', 'Turns gamer mode']} />
			<Toggle data={[isOn, setIsOn]} label={['Looser Mode', 'Turns Looser mode']} />
		</m.main>
	);
};
export default Settings;
