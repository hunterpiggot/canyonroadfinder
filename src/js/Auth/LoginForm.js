import axios from 'axios';
import React, { useState } from 'react';
import BackEndUrl from '../RouteUrls';
import '../../css/LoginForm.css';

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
			<div className="form">
				<form onSubmit={handleSubmit} class="login-form">
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
					<button>login</button>
				</form>
			</div>
		</div>
	);
}

export default LoginForm;
