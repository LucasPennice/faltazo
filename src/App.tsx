import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LogIn from './pages/LogIn';
import Layout from './components/Layout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import CreateProfile from './pages/CreateProfilet';
import 'react-toastify/dist/ReactToastify.css';
import Search from './pages/Search';
import CreateGroupe from './pages/CreateGroupe';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';
import PasarFalta from './pages/PasarFalta';
import { groupe, notificationFalta } from './types';
import SeleccionarIntegrante from './pages/SeleccionarIntegrante';
import axios from 'axios';
import { BACKEND_URL } from './utils';

function App() {
	const [isLogin, setIsLogin] = useState(true);
	const [isUserProfileCreated, setIsUserProfileCreated] = useState(true);
	const [notificationStack, setNotificationStack] = useState<notificationFalta[]>([]);
	const [userGroupes, setUserGroupes] = useState<groupe[]>([]);

	useEffect(() => {
		axios.get(`${BACKEND_URL}/notifications`).then((res) => setNotificationStack(res.data));
		axios.get(`${BACKEND_URL}/groupes`).then((res) => setUserGroupes(res.data));
	}, []);

	useEffect(() => {
		console.log(userGroupes);
	}, [userGroupes]);

	const deleteNotification = (action: 'accept' | 'reject', notificationId: string) => {
		axios.delete(`${BACKEND_URL}/notifications/${action}/${notificationId}`).then((res) => console.log(res.data));
		setNotificationStack(notificationStack.filter((n) => n.idNotif !== notificationId));
	};

	return (
		<BrowserRouter>
			<Routes>
				{!isLogin && <Route path='*' element={<LogIn setIsLogin={setIsLogin} />} />}
				{isLogin &&
					(!isUserProfileCreated ? (
						<Route path='*' element={<CreateProfile setIsUserProfileCreated={setIsUserProfileCreated} />} />
					) : (
						<>
							<Route path='/' element={<Layout children={<Home notificationStack={notificationStack} />} />} />
							<Route path='/search' element={<Layout children={<Search />} />} />
							<Route path='/create' element={<Layout children={<CreateGroupe />} />} />
							<Route
								path='/notifications'
								element={
									<Layout
										children={
											<Notifications notificationStack={notificationStack} deleteNotification={deleteNotification} />
										}
									/>
								}
							/>
							<Route path='/settings' element={<Layout children={<Settings />} />} />
							<Route path='/pasarFalta' element={<Layout children={<PasarFalta userGroupes={userGroupes} />} />} />
							<Route path='/falta:idGrp' element={<Layout children={<SeleccionarIntegrante />} />} />
							<Route path='*' element={<Layout children={<NotFound />} />} />
						</>
					))}
			</Routes>
		</BrowserRouter>
	);
}

export default App;
