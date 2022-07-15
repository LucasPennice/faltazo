import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LogIn from './pages/LogIn';
import Layout from './components/Layout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import CreateProfile from './pages/CreateProfilet';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Search from './pages/Search';
import CreateGroupe from './pages/CreateGroupe';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';
import PasarFalta from './pages/PasarFalta';
import { MOCKDATAGROUPE, MOCKNOTIFICATION, notification } from './types';
import SeleccionarIntegrante from './pages/SeleccionarIntegrante';

function App() {
	const [isLogin, setIsLogin] = useState(true);
	const [isUserProfileCreated, setIsUserProfileCreated] = useState(true);
	const [notificationStack, setNotificationStack] = useState<notification[]>(MOCKNOTIFICATION);
	// const [notificationStack, setNotificationStack] = useState<notification[]>([]);
	const [userGroupes, setUserGroupes] = useState(MOCKDATAGROUPE);
	// const [userGroupes, setUserGroupes] = useState([]);

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
								element={<Layout children={<Notifications notificationStack={notificationStack} />} />}
							/>
							<Route path='/settings' element={<Layout children={<Settings />} />} />
							<Route path='/pasarFalta' element={<Layout children={<PasarFalta userGroupes={userGroupes} />} />} />
							<Route path='/falta:idGrp' element={<Layout children={<SeleccionarIntegrante />} />} />
							<Route path='*' element={<Layout children={<NotFound />} />} />
						</>
					))}
			</Routes>
			<ToastContainer position={'top-center'} theme={'dark'} />
		</BrowserRouter>
	);
}

export default App;
