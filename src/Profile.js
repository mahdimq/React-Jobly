import React, { useState, useContext, useRef, useEffect } from 'react';
import Alert from './Alert';
import JoblyApi from './JoblyApi';
import UserContext from './UserContext';
import './styles/Profile.css';

function Profile() {
	const { user, setUser } = useContext(UserContext);

	const INITIAL_STATE = {
		username: user.username,
		password: '',
		first_name: user.first_name || '',
		last_name: user.last_name || '',
		email: user.email || '',
		photo_url: user.photo_url || '',
		userSaved: false,
		errors: []
	};

	const [formData, setFormData] = useState(INITIAL_STATE);

	const messageShownRef = useRef(false);
	useEffect(
		function () {
			if (formData.userSaved && !messageShownRef.current) {
				messageShownRef.current = true;
				setTimeout(function () {
					setFormData((f) => ({ ...f, userSaved: false }));
					messageShownRef.current = false;
				}, 3000);
			}
		},
		[formData]
	);

	async function handleSubmit(evt) {
		evt.preventDefault();

		try {
			let profileData = {
				first_name: formData.first_name || undefined,
				last_name: formData.last_name || undefined,
				email: formData.email || undefined,
				photo_url: formData.photo_url || undefined,
				password: formData.password
			};

			let username = formData.username;
			let updatedUser = await JoblyApi.updateUser(username, profileData);
			console.log('UPDATED USER', updatedUser);
			setFormData((f) => ({
				...f,
				errors: [],
				userSaved: true,
				password: ''
			}));
			setUser(updatedUser);
		} catch (errors) {
			setFormData((f) => ({ ...f, errors }));
		}
	}
	/** Update local state w/curr state of input elem */

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((users) => ({
			...users,
			[name]: value,
			userSaved: false
		}));
	};

	return (
		<div className='Profile row container'>
			<form onSubmit={handleSubmit} className='col s12'>
				<div className='row'>
					<div className='input-field col s12 m6'>
						<i className='material-icons prefix'>account_box</i>
						<input
							id='first_name'
							className='validate'
							name='first_name'
							value={formData.first_name}
							onChange={handleChange}
						/>
						<label className='active' htmlFor='first_name'>
							First Name
						</label>
					</div>

					<div className='input-field col s12 m6'>
						<i className='material-icons prefix'>account_box</i>
						<input
							id='last_name'
							type='text'
							className='validate'
							name='last_name'
							value={formData.last_name}
							onChange={handleChange}
						/>
						<label className='active' htmlFor='last_name'>
							Last Name
						</label>
					</div>

					<div className='input-field col s12 m12 l6'>
						<i className='material-icons prefix'>account_circle</i>
						<input
							id='username'
							type='text'
							className='validate'
							name='username'
							value={formData.username}
							onChange={handleChange}
							disabled
						/>
						<label className='active' htmlFor='username'>
							Username
						</label>
					</div>

					<div className='input-field col s12 m12 l6'>
						<i className='material-icons prefix'>email</i>
						<input
							id='email'
							type='email'
							className='validate'
							name='email'
							value={formData.email}
							onChange={handleChange}
						/>
						<label className='active' htmlFor='email'>
							Email
						</label>
					</div>

					<div className='input-field col s12 m12 l6'>
						<i className='material-icons prefix'>insert_photo</i>
						<input
							id='photo'
							type='text'
							name='photo_url'
							value={formData.photo_url}
							onChange={handleChange}
						/>
						<label className='active' htmlFor='photo'>
							Photo URL
						</label>
					</div>

					<div className='input-field col s12 m12 l6'>
						<i className='material-icons prefix'>vpn_key</i>
						<input
							id='password'
							type='password'
							name='password'
							value={formData.password}
							onChange={handleChange}
							className='validate'
						/>
						<label className='active' htmlFor='password'>
							Re-Enter Password
						</label>
					</div>
				</div>
				{formData.errors.length ? <Alert messages={formData.errors} /> : null}
				{formData.userSaved ? <Alert messages={['User updated successfully.']} /> : null}

				<button className='right btn light-blue' type='submit'>
					Save
					<i className='material-icons right'>send</i>
				</button>
			</form>
		</div>
	);
}

export default Profile;
