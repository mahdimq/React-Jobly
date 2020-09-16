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
		firstName: user.firstName || '',
		lastName: user.lastName || '',
		email: user.email || '',
		photo_url: user.photo_url || '',
		userSaved: false,
		errors: []
	};

	const [formData, setFormData] = useState(INITIAL_STATE);

	const messageShownRef = useRef(false);
	useEffect(
		function () {
			if (formData.saveConfirmed && !messageShownRef.current) {
				messageShownRef.current = true;
				setTimeout(function () {
					setFormData((f) => ({ ...f, saveConfirmed: false }));
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
				firstName: formData.firstName || undefined,
				lastName: formData.lastName || undefined,
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
				saveConfirmed: true,
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
							id='firstName'
							className='validate'
							name='firstName'
							value={formData.firstName}
							onChange={handleChange}
						/>
						<label className='active' htmlFor='firstName'>
							First Name
						</label>
					</div>

					<div className='input-field col s12 m6'>
						<i className='material-icons prefix'>account_box</i>
						<input
							id='lastName'
							type='text'
							className='validate'
							name='lastName'
							value={formData.lastName}
							onChange={handleChange}
						/>
						<label className='active' htmlFor='lastName'>
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

		// <formData onSubmit={handleSubmit}>
		// 	<div className='formData-group'>
		// 		<label>Username</label>
		// 		<p className='formData-control-plaintext'>{formData.username}</p>
		// 	</div>

		// 	<div className='formData-group'>
		// 		<label>Last name</label>
		// 		<input
		// 			name='lastName'
		// 			className='formData-control'
		// 			value={formData.lastName}
		// 			onChange={handleChange}
		// 		/>
		// 	</div>
		// 	<div className='formData-group'>
		// 		<label>Email</label>
		// 		<input
		// 			type='email'
		// 			name='email'
		// 			className='formData-control'
		// 			value={formData.email}
		// 			onChange={handleChange}
		// 		/>
		// 	</div>
		// 	<div className='formData-group'>
		// 		<label>Photo URL</label>
		// 		<input
		// 			type='photo_url'
		// 			name='photo_url'
		// 			className='formData-control'
		// 			value={formData.photo_url}
		// 			onChange={handleChange}
		// 		/>
		// 	</div>
		// 	<div className='formData-group'>
		// 		<label>Re-enter Password</label>
		// 		<input
		// 			type='password'
		// 			name='password'
		// 			className='formData-control'
		// 			value={formData.password}
		// 			onChange={handleChange}
		// 		/>
		// 	</div>
		// 	{formData.errors.length ? <Alert type='danger' messages={formData.errors} /> : null}
		// 	{formData.userSaved ? (
		// 		<Alert type='success' messages={['User updated successfully.']} />
		// 	) : null}
		// 	<button type='submit' className='btn btn-primary btn-block mt-4'>
		// 		Save Changes
		// 	</button>
		// </formData>
	);
}

export default Profile;
