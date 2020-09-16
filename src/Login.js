import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import JoblyApi from './JoblyApi';
import Alert from './Alert';
import './styles/Login.css';

function Login({ setToken }) {
	const history = useHistory();
	const [active, setActive] = useState('login');
	const [loginData, setLoginData] = useState({
		username: '',
		password: '',
		firstName: '',
		lastName: '',
		email: '',
		errors: []
	});

	function setLogin() {
		setActive('login');
	}
	function setSignup() {
		setActive('signup');
	}

	async function handleSubmit(evt) {
		evt.preventDefault();
		let endpoint;
		let data;
		let token;

		if (active === 'signup') {
			data = {
				username: loginData.username,
				password: loginData.password,
				firstName: loginData.firstName || undefined,
				lastName: loginData.lastName || undefined,
				email: loginData.email || undefined
			};
			endpoint = 'register';
		} else {
			data = {
				username: loginData.username,
				password: loginData.password
			};
			endpoint = 'login';
		}

		try {
			token = await JoblyApi[endpoint](data);
		} catch (errors) {
			return setLoginData((sign) => ({ ...sign, errors }));
		}

		setToken(token);
		history.push('/jobs');
	}

	const handleChange = (e) => {
		const { name, value } = e.target;
		setLoginData((sign) => ({
			...sign,
			[name]: value
		}));
	};

	const signupFields = (
		<div>
			<div className='input-field col s12 m12 l6'>
				<i className='material-icons prefix'>account_box</i>
				<input
					id='firstName'
					type='text'
					className='validate'
					name='firstName'
					value={loginData.firstName}
					onChange={handleChange}
				/>
				<label htmlFor='firstName'>First Name</label>
			</div>

			<div className='input-field col s12 m12 l6'>
				<i className='material-icons prefix'>account_box</i>
				<input
					id='lastName'
					type='text'
					className='validate'
					name='lastName'
					value={loginData.lastName}
					onChange={handleChange}
				/>
				<label htmlFor='lastName'>Last Name</label>
			</div>

			<div className='input-field col s12 m12 l6'>
				<i className='material-icons prefix'>email</i>
				<input
					id='email'
					type='text'
					className='validate'
					name='email'
					value={loginData.email}
					onChange={handleChange}
				/>
				<label htmlFor='email'>Email</label>
			</div>
		</div>
	);

	return (
		<div className='Login row container'>
			<div className='col s12'>
				<div className='right'>
					<button
						className={`btn light-blue ${active === 'login' ? 'active' : ''}`}
						onClick={setLogin}>
						Login
					</button>
					<button
						className={`btn light-blue ${active === 'signup' ? 'active' : ''}`}
						onClick={setSignup}>
						Sign up
					</button>
				</div>

				<div className='card-content'>
					<form onSubmit={handleSubmit} className='col s12'>
						<div className='input-field col s12 m12 l6'>
							<i className='material-icons prefix'>account_circle</i>
							<input
								id='username'
								type='text'
								className='validate'
								name='username'
								value={loginData.username}
								onChange={handleChange}
							/>
							<label htmlFor='username'>Username</label>
						</div>

						<div className='input-field col s12 m12 l6'>
							<i className='material-icons prefix'>vpn_key</i>
							<input
								id='password'
								type='password'
								className='validate'
								name='password'
								value={loginData.password}
								onChange={handleChange}
							/>
							<label htmlFor='password'>Password</label>
						</div>

						{active === 'signup' ? signupFields : ''}
						{loginData.errors.length ? <Alert messages={loginData.errors} /> : null}
						<button type='submit' className='btn light-blue right'>
							Submit
							<i className='material-icons right'>send</i>
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Login;
