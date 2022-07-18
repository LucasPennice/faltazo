import { createContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
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
import { useQuery, UseQueryResult } from 'react-query';
import { getAllNotifications } from './services/notifications';
import { getUserGroupes } from './services/groupes';
import { useAuth0 } from '@auth0/auth0-react';

export const NotificationContext = createContext<UseQueryResult<notificationFalta[], unknown> | undefined>(undefined);
export const GroupesContext = createContext<UseQueryResult<groupe[], unknown> | undefined>(undefined);

function App() {
	const notificationData = useQuery<notificationFalta[]>(['notifications'], getAllNotifications);
	const groupesData = useQuery<groupe[]>(['groupes'], getUserGroupes);
	const { isAuthenticated, isLoading } = useAuth0();

	if (!isLoading && !isAuthenticated) return <LogIn />;

	return (
		<NotificationContext.Provider value={notificationData}>
			<GroupesContext.Provider value={groupesData}>
				<Routes>
					<Route path='/' element={<Layout children={<Home />} />} />
					<Route path='/createProfile' element={<CreateProfile />} />
					<Route path='/search' element={<Layout children={<Search />} />} />
					<Route path='/create' element={<Layout children={<CreateGroupe />} />} />
					<Route path='/notifications' element={<Layout children={<Notifications />} />} />
					<Route path='/settings' element={<Layout children={<Settings />} />} />
					<Route path='/pasarFalta' element={<Layout children={<PasarFalta />} />} />
					<Route path='/falta:idGrp' element={<Layout children={<SeleccionarIntegrante />} />} />
					<Route path='*' element={<Layout children={<NotFound />} />} />
				</Routes>
			</GroupesContext.Provider>
		</NotificationContext.Provider>
	);
}

export default App;
