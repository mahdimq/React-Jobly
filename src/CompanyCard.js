import React from 'react';
import { Link } from 'react-router-dom';
import building from './building.png';
import './styles/CompanyCard.css';

function CompanyCard({ handle, name, description, logo_url }) {
	return (
		<div className='CompanyCard'>
			<Link className='col m12' to={`/companies/${handle}`}>
				<div className='card'>
					<div className='card-content'>
						<div className='CompanyCard-header'>
							<h4 className='card-title'>{name}</h4>
							<img
								className='CompanyCard-building'
								src={logo_url || building}
								alt={`${name} Logo`}
							/>
						</div>
						<p>{description}</p>
					</div>
				</div>
			</Link>
		</div>
	);
}

export default CompanyCard;
