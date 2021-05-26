import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router';

// Importing Bootstrap components and the url for the back end

import BackEndUrl from '../RouteUrls';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function EditProfileForm () {
	const history = useHistory();
	// This is where the form values are stored
	const [ formData, setFromData ] = useState({
		name     : '',
		email    : '',
		password : ''
	});

	// When the user types in the input, this is what updates the state to refelect the changes

	const handleChange = (e) => {
		const val = e.target.value;
		setFromData({
			...formData,
			[e.target.name]: val
		});
	};

	// When the user submits the form, this will make a post request to the back end to update the database

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

	// Bootstrap handles the form css, this is two inputs but the state is set up for a third (email)

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
