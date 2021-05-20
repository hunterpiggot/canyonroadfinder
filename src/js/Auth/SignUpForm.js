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
			<div className="form">
				<form onSubmit={handleSubmit} class="login-form">
					<input onChange={handleChange} name="name" value={formData.name} type="text" placeholder="Name" />
					<input
						onChange={handleChange}
						name="email"
						value={formData.email}
						type="email"
						placeholder="E-mail"
					/>
					<input
						onChange={handleChange}
						name="password"
						value={formData.password}
						type="password"
						placeholder="password"
					/>
					<button>Sign Up</button>
				</form>
			</div>
			<div className="TestWarning" />
		</div>
	);
}

export default SignUpForm;
