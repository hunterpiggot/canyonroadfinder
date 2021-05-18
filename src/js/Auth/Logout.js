import axios from 'axios';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
import BackEndUrl from '../RouteUrls';

function Logout () {
	const history = useHistory();
	useEffect(
		() => {
			const removeSession = async () => {
				await axios.get(`${BackEndUrl}/auth/logout`).then(() => {
					localStorage.removeItem('user');
					window.location.replace('/');
				});
			};
			removeSession();
		},
		[ 'user' ]
	);
	return (
		<div>
			<h1>Logout</h1>
		</div>
	);
}

export default Logout;
