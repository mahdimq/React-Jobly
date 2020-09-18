import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import JoblyApi from './JoblyApi';
import JobCard from './JobCard';
import UserContext from './UserContext';

function Company() {
	const { handle } = useParams();
	const { user } = useContext(UserContext);
	const [company, setCompany] = useState(null);

	useEffect(() => {
		async function getCompany() {
			const { jobs } = user;
			const c = await JoblyApi.getCompany(handle);

			const jobsApplied = new Set(jobs.map((job) => job.id));

			c.jobs = c.jobs.map((job) => ({
				...job,
				state: jobsApplied.has(job.id) ? 'applied' : null
			}));
			setCompany(c);
		}
		getCompany();
	}, [handle, user]);

	async function apply(id) {
		if (company.jobs.some((job) => job.id === id && !job.state)) {
			let message = await JoblyApi.apply(id);
			let newCompany = { ...company };
			newCompany.jobs = newCompany.jobs.map((job) =>
				job.id === id ? { ...job, state: message } : job
			);
			setCompany(newCompany);
		}
	}
	if (!company) {
		return (
			<div style={{ display: 'flex', justifyContent: 'center', marginTop: '4em' }}>
				<h5>Loading...</h5>
			</div>
		);
	}

	return (
		<div className='row container'>
			<h4>{company.name}</h4>
			<p>{company.description}</p>
			{company.jobs.map((job) => (
				<JobCard
					key={job.id}
					title={job.title}
					salary={job.salary}
					equity={job.equity}
					applied={job.state}
					handleApply={() => apply(job.id)}
				/>
			))}
		</div>
	);
}

export default Company;
