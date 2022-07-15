import { motion as m } from 'framer-motion';
import { useState } from 'react';
import { FilePond } from 'react-filepond';
import { toast, ToastContainer } from 'react-toastify';
import TextArea from '../components/TextArea';
import TextInput from '../components/TextInput';

const CreateGroupe = () => {
	const [userName, setUserName] = useState('');
	const [userDescription, setUserDescription] = useState('');
	const [userBio, setUserBio] = useState('');
	const [files, setFiles] = useState<any>([]);

	const handleSubmit = (e: any) => {
		e.preventDefault();
		if (!userName) return toast.warning('Username Empty');
		if (!userDescription) return toast.warning('User description empty');
		if (!userBio) return toast.warning('user bio empty');
		if (files.length === 0) return toast.warning('Upload a pic');
		toast.success('Hacer un llamado a la api de crear perfil, si devuelve 200 entonces esta todo ok');
	};

	return (
		<main className='pt-28 mx-4'>
			<m.h1
				className='mb-10 text-center'
				initial={{ opacity: 0, fontSize: '1rem' }}
				animate={{ opacity: 1, fontSize: '2rem' }}>
				CREAR Grupo
			</m.h1>
			<m.form
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2 }}
				onSubmit={handleSubmit}
				className='w-full px-8'>
				<section className='flex-col flex gap-3 mb-8'>
					<FilePond
						files={files}
						onupdatefiles={setFiles}
						allowMultiple={true}
						maxFiles={3}
						server='/api'
						name='files'
						labelIdle={`Drag & Drop your picture or <span class="filepond--label-action">Browse</span>`}
					/>

					<TextInput id='username' data={{ value: userName, setter: setUserName }} />
					<TextInput id='description' data={{ value: userDescription, setter: setUserDescription }} />
					<TextArea id='bio' data={{ value: userBio, setter: setUserBio }} />
				</section>
				<m.button
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4 }}
					className='gradient w-full py-3 rounded-3xl shadow-lg shadow-purple-500/50 text-white text-xl uppercase tracking-widest'>
					crear
				</m.button>
			</m.form>
			<ToastContainer position={'top-center'} theme={'dark'} />
		</main>
	);
};
export default CreateGroupe;
