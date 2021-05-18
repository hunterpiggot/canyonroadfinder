import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router';

import BackEndUrl from '../RouteUrls';

function EditProfileForm () {
	const history = useHistory();
	const [ formData, setFromData ] = useState({
		name     : '',
		email    : '',
		password : ''
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
			.post(`${BackEndUrl}/auth/edit/${localStorage.getItem('user')}`, formData)
			.then((res) => res.data)
			.then((data) => {
				if (data['success'] === 'complete') {
					setFromData({
						name     : '',
						email    : '',
						password : ''
					});
				}
			});
		if (formData.email.length) {
			localStorage.setItem('user', formData.email);
		}
		history.push(`/profile/${localStorage.getItem('user')}`);
	};

	return (
		<div className="EditProfileForm">
			<form onSubmit={handleSubmit}>
				<label>Name</label>
				<input type="text" value={formData.name} name="name" onChange={handleChange} />
				{/* <label>Email</label>
				<input type="email" value={formData.email} name="email" onChange={handleChange} /> */}
				<label>Password</label>
				<input type="password" value={formData.password} name="password" onChange={handleChange} />
				<button>Submit</button>
			</form>
		</div>
	);
}

export default EditProfileForm;
