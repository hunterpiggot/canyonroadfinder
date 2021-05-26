import axios from 'axios';
import { useEffect } from 'react';
import BackEndUrl from '../RouteUrls';

function Logout () {
	// When the user hits this route, it will remove them from local storage and redirect them to the home page
	useEffect(() => {
		const removeSession = async () => {
			await axios.get(`${BackEndUrl}/auth/logout`).then(() => {
				localStorage.removeItem('user');
				window.location.replace('/');
			});
		};
		removeSession();
	}, []);
	return (
		<div>
			<h1>Logout</h1>
		</div>
	);
}

export default Logout;
