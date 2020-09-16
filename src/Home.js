import React, { useContext } from 'react';
import UserContext from './UserContext';
import { Link } from 'react-router-dom';
import './styles/Home.css';

function Home() {
	const { user } = useContext(UserContext);
	return (
		<section className='Home container'>
			<img
				className='Home-img'
				src='https://static.dribbble.com/users/1714010/screenshots/10822383/media/ea98dfbdc8c2a056427061871bb42edc.gif'
				alt='working'
			/>
			<div className='Home-text'>
				<h1>Jobly</h1>
				<p>All the jobs in one, convenient place.</p>
				{user ? (
					<h2>Welcome Back!</h2>
				) : (
					<Link className='btn light-blue' to='/login'>
						Log in
					</Link>
				)}
			</div>
		</section>
	);
}
export default Home;
