import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router';

import BackEndUrl from '../RouteUrls';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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
		<Form onSubmit={handleSubmit}>
			<Form.Group controlId="formGroupEmail">
				<Form.Label>Name</Form.Label>
				<Form.Control
					onChange={handleChange}
					name="name"
					value={formData.name}
					type="text"
					placeholder="Name"
				/>
			</Form.Group>
			<Form.Group controlId="formGroupPassword">
				<Form.Label>Password</Form.Label>
				<Form.Control
					onChange={handleChange}
					name="password"
					value={formData.password}
					type="password"
					placeholder="Password"
				/>
			</Form.Group>
			<Button onClick={handleSubmit}>Submit</Button>
		</Form>
	);
}

export default EditProfileForm;
