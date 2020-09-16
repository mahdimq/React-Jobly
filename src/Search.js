import React, { useState } from 'react';
import './styles/Search.css';

function Search({ search }) {
	const INITIAL_STATE = { search: '' };
	const [formData, setFormData] = useState(INITIAL_STATE);

	const handleSubmit = (evt) => {
		evt.preventDefault();
		search({ ...formData });
	};

	const handleChange = (evt) => {
		const { name, value } = evt.target;
		setFormData((fData) => ({
			...fData,
			[name]: value
		}));
	};

	return (
		<div className='Search container'>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					name='search'
					placeholder='Enter search term..'
					value={formData.search}
					onChange={handleChange}
				/>
				<button className='waves-effect waves-blue waves-ripple btn-flat right' type='submit'>
					Search
					<i className='material-icons right'>send</i>
				</button>
			</form>
		</div>
	);
}

export default Search;
