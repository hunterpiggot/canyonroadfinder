import axios from 'axios';
import React, { useState } from 'react';

import BackEndUrl from '../RouteUrls';

function SignUpForm () {
	const [ formData, setFormData ] = useState({
		name     : '',
		email    : '',
		password : ''
	});

	const [ invalidInput, setInvalidInput ] = useState('');

	const handleChange = (e) => {
		const value = e.target.value;
		setFormData({
			...formData,
			[e.target.name]: value
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!formData['name'].length || !formData['email'] || !formData['password']) {
			setInvalidInput('Please Fill out all inputs');
		}
		else {
			await axios
				.post(`${BackEndUrl}/auth/signup`, formData)
				.then(() => {
					window.location.replace('/');
					localStorage.setItem('user', formData.email);
				})
				.catch((err) => setInvalidInput('Email Taken'));
		}
	};

	return (
		<div className="SignUpForm" onSubmit={handleSubmit}>
			{invalidInput.length ? <h3>{invalidInput}</h3> : <div className="validInput" />}
			<form>
				<label>Name</label>
				<input type="text" value={formData.name} name="name" onChange={handleChange} />
				<label>Email</label>
				<input type="email" value={formData.email} name="email" onChange={handleChange} />
				<label>Password</label>
				<input type="password" value={formData.password} name="password" onChange={handleChange} />
				<button>Submit</button>
			</form>
			<div className="TestWarning" />
		</div>
	);
}

export default SignUpForm;
