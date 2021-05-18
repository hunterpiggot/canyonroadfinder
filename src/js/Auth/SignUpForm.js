import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router';

import BackEndUrl from '../RouteUrls';

function SignUpForm () {
	const history = useHistory();

	const [ formData, setFormData ] = useState({
		name     : '',
		email    : '',
		password : ''
	});

	const handleChange = (e) => {
		const value = e.target.value;
		setFormData({
			...formData,
			[e.target.name]: value
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		localStorage.setItem('user', formData.email);
		await axios.post(`${BackEndUrl}/auth/signup`, formData);
		window.location.replace('/');
	};

	return (
		<div className="SignUpForm" onSubmit={handleSubmit}>
			<form>
				<label>Name</label>
				<input type="text" value={formData.name} name="name" onChange={handleChange} />
				<label>Email</label>
				<input type="email" value={formData.email} name="email" onChange={handleChange} />
				<label>Password</label>
				<input type="password" value={formData.password} name="password" onChange={handleChange} />
				<button>Submit</button>
			</form>
		</div>
	);
}

export default SignUpForm;
