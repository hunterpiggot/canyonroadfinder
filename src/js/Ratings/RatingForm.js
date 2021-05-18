import axios from 'axios';
import React, { useState } from 'react';

import BackEndUrl from '../RouteUrls';
function RatingFrom ({ road_id }) {
	const [ formData, setFromData ] = useState({
		road_id     : road_id,
		user_email  : localStorage.getItem('user'),
		overall     : '',
		difficulty  : '',
		description : ''
	});

	const handleChange = (e) => {
		const val = e.target.value;
		setFromData({
			...formData,
			[e.target.name]: val
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await axios
			.post(`${BackEndUrl}/road/${road_id}/rating/create`, formData)
			.then((res) => res.data)
			.then((data) => {
				if (data['success'] === 'true') {
					setFromData({
						road_id     : road_id,
						user_email  : localStorage.getItem('user'),
						overall     : '',
						difficulty  : '',
						description : ''
					});
					window.location.replace(`/roads/${road_id}`);
				}
			});
	};

	return (
		<div className="RatingFrom">
			<form onSubmit={handleSubmit}>
				<label>Overall (1-10)</label>
				<input value={formData.overall} name="overall" onChange={handleChange} type="number" min="1" max="10" />
				<label>Difficulty (1-10)</label>
				<input
					value={formData.difficulty}
					name="difficulty"
					onChange={handleChange}
					type="number"
					min="1"
					max="10"
				/>
				<label>Description</label>
				<input type="text" value={formData.description} name="description" onChange={handleChange} />
				<button>Submit</button>
			</form>
		</div>
	);
}

export default RatingFrom;
