import { AnimatePresence, motion as m } from 'framer-motion';
import { useState } from 'react';
import { IoReloadCircle } from 'react-icons/io5';

const Search = () => {
	const [searchMode, setSearchMode] = useState<'person' | 'groupe' | undefined>(undefined);
	const [input, setInput] = useState('');

	return (
		<main className='pt-28 mx-4'>
			<m.h1
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.3 }}
				className='h-full text-center text-2xl'>
				{!searchMode && 'What do you want to search?'}
				{searchMode === 'person' && 'Searching People'}
				{searchMode === 'groupe' && 'Searching Groupes'}
				{searchMode && (
					<mark onClick={() => setSearchMode(undefined)} className='ml-4 bg-transparent inline-block cursor-pointer'>
						<IoReloadCircle color='#AB54E4' />
					</mark>
				)}
			</m.h1>
			{searchMode === 'groupe' && (
				<m.section
					initial={{ opacity: 0, y: 50 }}
					exit={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					className='flex w-full justify-evenly my-8 relative'>
					<input
						type='text'
						value={input}
						onChange={(e) => setInput(e.target.value)}
						placeholder='Search for a groupe'
						className='bg-gray-200 w-full h-16 rounded-3xl px-8 shadow-sm shadow-black-400 focus:shadow-md transition-all focus:outline-none'
					/>
					<i className='absolute right-5 top-5'>icon</i>
				</m.section>
			)}
			{searchMode === 'person' && (
				<m.section
					initial={{ opacity: 0, y: 50 }}
					exit={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					className='flex w-full justify-evenly my-8 relative'>
					<input
						type='text'
						value={input}
						onChange={(e) => setInput(e.target.value)}
						placeholder='Search for a mf'
						className='bg-gray-200 w-full h-16 rounded-3xl px-8 shadow-sm shadow-black-400 focus:shadow-md transition-all focus:outline-none'
					/>
					<i className='absolute right-5 top-5'>icon</i>
				</m.section>
			)}
			<AnimatePresence>
				{!searchMode && (
					<m.section
						initial={{ opacity: 0, y: 50 }}
						exit={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						className='flex w-full justify-evenly my-8'>
						<button
							onClick={() => setSearchMode('person')}
							className='w-1/3 h-28 rounded shadow-xl shadow-black-400 gradient text-white uppercase tracking-wider'>
							Persona
						</button>
						<button
							onClick={() => setSearchMode('groupe')}
							className='w-1/3 h-28 rounded shadow-xl shadow-black-400 gradient text-white uppercase tracking-wider'>
							Groupe
						</button>
					</m.section>
				)}
			</AnimatePresence>
		</main>
	);
};
export default Search;
