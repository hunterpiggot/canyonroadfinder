import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import BackEndUrl from '../RouteUrls';

function LoginForm () {
	const history = useHistory();

	const [ formData, setFormData ] = useState({
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
		await axios.post(`${BackEndUrl}/auth/login`, formData).then((res) => {
			if (res.data['user'].length > 0) {
				localStorage.setItem('user', res.data['user']);
				window.location.replace('/');
			}
		});
	};

	return (
		<div className="LoginForm" onSubmit={handleSubmit}>
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
