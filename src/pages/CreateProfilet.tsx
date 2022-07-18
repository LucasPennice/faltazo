import * as React from 'react';
import { useState } from 'react';
import { motion as m } from 'framer-motion';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { BACKEND_URL } from '../utils';
import { ErrorMessage, Field, Form, Formik } from 'formik';
registerPlugin(FilePondPluginFileValidateType, FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const CreateProfile = () => {
	const [files, setFiles] = useState<any>([]);
	const [fileFinishedUploading, setfileFinishedUploading] = useState<boolean>(false);

	return (
		<div className='w-full flex justify-center'>
			<main className='flex flex-col justify-evenly items-center m-8 w-full' style={{ maxWidth: '750px' }}>
				<m.h1 className='mb-10' initial={{ opacity: 0, fontSize: '1rem' }} animate={{ opacity: 1, fontSize: '2rem' }}>
					CREAR PERFIL
				</m.h1>
				<Formik
					initialValues={{ profileName: '', profileBio: '' }}
					validate={(values) => {
						const errors: any = {};
						if (!values.profileName) {
							errors.profileName = 'Required';
						}
						if (!values.profileBio) {
							errors.profileBio = 'Required';
						}
						return errors;
					}}
					onSubmit={async (values, { setSubmitting }) => {
						if (files.length === 0) {
							toast.warning('Upload a pic');
							setSubmitting(false);
							return;
						}
						if (!fileFinishedUploading) {
							toast.warning('Please wait for the file to finish uploading');
							setSubmitting(false);
							return;
						}
						const response = await toast.promise(() => axios.post(`${BACKEND_URL}/profile`, values), {
							pending: 'Loading',
							success: {
								render() {
									console.log(values);
									setSubmitting(false);
									return `Profile created`;
								},
							},
							error: 'There was an error',
						});
						alert('reload the website for the user');
						console.log(response);
					}}>
					{({ isSubmitting }) => (
						<Form className='flex flex-col w-full gap-7'>
							<FilePond
								files={files}
								onupdatefiles={setFiles}
								allowMultiple={true}
								onprocessfile={() => setfileFinishedUploading(true)}
								acceptedFileTypes={['image/png', 'image/jpg', 'image/jpeg']}
								maxFiles={3}
								server={`${BACKEND_URL}/uploadSingleFile`}
								name='fileName'
								labelIdle={`Drag & Drop your picture or <span class="filepond--label-action">Browse</span>`}
							/>
							<Field
								type='text'
								name='profileName'
								className='border border-gray-300 focus:border-purple-800 transition-all p-1 rounded focus:outline-none'
							/>
							<ErrorMessage name='profileName' component='div' />
							<Field
								type='text'
								name='profileBio'
								className='border border-gray-300 focus:border-purple-800 transition-all p-1 rounded focus:outline-none'
							/>
							<ErrorMessage name='profileBio' component='div' />
							<m.button
								type='submit'
								disabled={isSubmitting}
								initial={{ opacity: 0, y: 50 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.4 }}
								className='gradient w-full py-3 rounded-3xl shadow-lg shadow-purple-500/50 text-white text-xl uppercase tracking-widest'>
								crear
							</m.button>
						</Form>
					)}
				</Formik>

				<ToastContainer position={'top-center'} theme={'dark'} />
			</main>
		</div>
	);
};
export default CreateProfile;
