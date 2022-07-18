import * as React from 'react';
import { useState } from 'react';
import TextArea from '../components/TextArea';
import { motion as m } from 'framer-motion';
import TextInput from '../components/TextInput';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { BACKEND_URL } from '../utils';
registerPlugin(FilePondPluginFileValidateType, FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const CreateProfile = () => {
	const [userName, setUserName] = useState('');
	const [userDescription, setUserDescription] = useState('');
	const [userBio, setUserBio] = useState('');
	const [files, setFiles] = useState<any>([]);
	const [fileFinishedUploading, setfileFinishedUploading] = useState<boolean>(false);

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		if (!userName) return toast.warning('Username Empty');
		if (!userDescription) return toast.warning('User description empty');
		if (!userBio) return toast.warning('user bio empty');
		if (!fileFinishedUploading) return toast.warning('Please wait for the file to finish uploading');
		if (files.length === 0) return toast.warning('Upload a pic');
		const response = await toast.promise(
			() => axios.post(`${BACKEND_URL}/profile`, { userName, userDescription, userBio }),
			{
				pending: 'Loading',
				success: {
					render() {
						console.log('teas');
						return `Profile created`;
					},
				},
				error: 'There was an error',
			}
		);
		console.log(response);
	};

	return (
		<div className='w-full flex justify-center'>
			<main className='flex flex-col justify-evenly items-center m-8 w-full' style={{ maxWidth: '750px' }}>
				<m.h1 className='mb-10' initial={{ opacity: 0, fontSize: '1rem' }} animate={{ opacity: 1, fontSize: '2rem' }}>
					CREAR PERFIL
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
							onprocessfile={() => setfileFinishedUploading(true)}
							acceptedFileTypes={['image/png', 'image/jpg', 'image/jpeg']}
							maxFiles={3}
							server={`${BACKEND_URL}/uploadProfilePicture`}
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
		</div>
	);
};
export default CreateProfile;
