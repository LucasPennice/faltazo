type propType = {
	id: string;
	data: { value: string; setter: (value: string) => void };
};

const TextArea = ({ id, data }: propType) => {
	const { setter, value } = data;
	return (
		<>
			<label htmlFor={id} className='opacity-30'>
				{id.toUpperCase()}
			</label>
			<textarea
				id={id}
				value={value}
				onChange={(e) => setter(e.target.value)}
				className='border h-32 resize-none border-gray-300 focus:border-purple-800 transition-all p-1 rounded focus:outline-none'></textarea>
		</>
	);
};
export default TextArea;
