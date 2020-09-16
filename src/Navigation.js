import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import UserContext from './UserContext';

function Navigation({ logout }) {
	const { user } = useContext(UserContext);

	return (
		<nav className='light-blue lighten-3 '>
			<div className='nav-wrapper container'>
				<NavLink className='left brand-logo' exact to='/'>
					Jobly
				</NavLink>
				<ul id='nav-mobile' className='right'>
					{user ? (
						<>
							<li>
								<NavLink to='/companies'>Companies</NavLink>
							</li>
							<li>
								<NavLink to='/jobs'>Jobs</NavLink>
							</li>
							<li>
								<NavLink to='/profile'>Profile</NavLink>
							</li>
							<li>
								<NavLink to='/' onClick={logout}>
									Logout
								</NavLink>
							</li>
						</>
					) : (
						<>
							<li>
								<NavLink to='/login'>Login</NavLink>
							</li>
						</>
					)}
				</ul>
			</div>
		</nav>
	);
}

export default Navigation;
