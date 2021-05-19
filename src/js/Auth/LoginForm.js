import axios from 'axios';
import React, { useState } from 'react';
import BackEndUrl from '../RouteUrls';

function LoginForm () {
	const [ formData, setFormData ] = useState({
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
		if (!formData['email'].length || !formData['password'].length) {
			setInvalidInput('Please Fill out all Inputs');
		}
		else {
			await axios
				.post(`${BackEndUrl}/auth/login`, formData)
				.then((res) => {
					if (res.data['user'].length > 0) {
						localStorage.setItem('user', res.data['user']);
						window.location.replace('/');
					}
				})
				.catch((err) => setInvalidInput('Email or Password is Incorrect'));
		}
	};

	return (
		<div className="LoginForm" onSubmit={handleSubmit}>
			{invalidInput.length ? <h3>{invalidInput}</h3> : <div className="validInput" />}
			<form>
				<label>Email</label>
				<input type="email" value={formData.email} name="email" onChange={handleChange} />
				<label>Password</label>
				<input type="password" value={formData.password} name="password" onChange={handleChange} />
				<button>Login</button>
			</form>
		</div>
	);
}

export default LoginForm;
