import React, { useState, useEffect } from 'react';
import Search from './Search';
import CompanyCard from './CompanyCard';
import JoblyApi from './JoblyApi';

function Companies() {
	const [companies, setCompanies] = useState([]);

	useEffect(() => {
		getCompanies();
	}, []);

	async function getCompanies(search) {
		let companies = await JoblyApi.getCompanies(search);
		setCompanies(companies);
	}

	return (
		<div className='container row'>
			<Search className='Search' search={getCompanies} />
			{companies.map((company) => (
				<CompanyCard
					key={company.handle}
					handle={company.handle}
					name={company.name}
					description={company.description}
					logo_url={company.logo_url}
				/>
			))}
		</div>
	);
}

export default Companies;
