import axios from 'axios';
import React from 'react';
import BackEndUrl from '../RouteUrls';

function RatingCard ({ overall, difficulty, user_email, description, road_id }) {
	const removeRating = async () => {
		const data = {
			user_email : localStorage.getItem('user')
		};
		axios.post(`${BackEndUrl}/road/${road_id}/rating/delete`, data);
		window.location.replace(`/roads/${road_id}`);
	};
	return (
		<div className="RatingCard">
			<h6>Rating</h6>
			<p>{overall}</p>
			<p>{difficulty}</p>
			<p>{user_email}</p>
			<p>{description}</p>
			{user_email === localStorage.getItem('user') ? <button onClick={removeRating}>Delete</button> : <div />}
		</div>
	);
}

export default RatingCard;
