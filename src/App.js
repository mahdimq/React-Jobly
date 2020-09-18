import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { decode } from 'jsonwebtoken';
import Routes from './Routes';
import Navigation from './Navigation';
import JoblyApi from './JoblyApi';
import UserContext from './UserContext';

function App() {
	const [user, setUser] = useState(null);
	const [infoLoaded, setInfoLoaded] = useState(false);

	const initialValue = localStorage.getItem('jobly-token') || null;
	const [token, setToken] = useState(initialValue);

	useEffect(() => {
		async function getUser() {
			try {
				let { username } = decode(token);
				let currentUser = await JoblyApi.getUser(username);
				setUser(currentUser);
			} catch (err) {
				setUser(null);
			}
			setInfoLoaded(true);
		}

		if (!token) {
			localStorage.removeItem('jobly-token');
		} else {
			localStorage.setItem('jobly-token', token);
		}
		setInfoLoaded(false);
		getUser();
	}, [token]);

	const logout = () => {
		setUser(null);
		setToken(null);
	};

	if (!infoLoaded) {
		return (
			<div className='spinner-layer spinner-red center'>
				<div className='circle-clipper left'>
					<div className='circle'></div>
				</div>
				<div className='gap-patch'>
					<div className='circle'></div>
				</div>
				<div className='circle-clipper right'>
					<div className='circle'></div>
				</div>
			</div>
		);
	}

	return (
		<div className='App'>
			<BrowserRouter>
				<UserContext.Provider value={{ user, setUser }}>
					<Navigation logout={logout} />
					<Routes setToken={setToken} />
				</UserContext.Provider>
			</BrowserRouter>
		</div>
	);
}

export default App;
