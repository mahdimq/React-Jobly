import React from 'react';
import './styles/JobCard.css';

function JobCard({ title, salary, equity, applied, handleApply }) {
	return (
		<div className='JobCard col s12 l6'>
			<div className='card'>
				<div className='card-content'>
					<h4 className='JobCard-title card-title'>{title}</h4>
					<p>Salary: {salary}</p>
					<p>Equity: {equity}</p>
					<button className='JobCard-btn btn light-blue' disabled={applied} onClick={handleApply}>
						{applied ? 'Applied' : 'Apply'}
					</button>
				</div>
			</div>
		</div>
	);
}

export default JobCard;
