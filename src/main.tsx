import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Auth0Provider
			domain='dev-rrq5zqo5.us.auth0.com'
			clientId='XfhmfAO1R7dTiI6aUvEreel6j5rzempE'
			redirectUri={window.location.origin}>
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</QueryClientProvider>
		</Auth0Provider>
	</React.StrictMode>
);
