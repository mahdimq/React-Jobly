import React, { useState, useEffect } from 'react';
import Search from './Search';
import JobCard from './JobCard';
import JoblyApi from './JoblyApi';

function Jobs() {
	const [jobs, setJobs] = useState([]);

	async function getJobs(search) {
		let jobs = await JoblyApi.getJobs(search);
		setJobs(jobs);
	}

	useEffect(function () {
		getJobs();
	}, []);

	async function apply(id) {
		let message = await JoblyApi.apply(id);
		setJobs((j) => j.map((job) => (job.id === id ? { ...job, state: message } : job)));
	}

	return (
		<div className='row container'>
			<Search className='Search' search={getJobs} />

			{jobs.map((j) => (
				<JobCard
					className='container center'
					key={j.id}
					title={j.title}
					salary={j.salary}
					equity={j.equity}
					applied={j.state}
					handleApply={() => apply(j.id)}
				/>
			))}
		</div>
	);
}

export default Jobs;
